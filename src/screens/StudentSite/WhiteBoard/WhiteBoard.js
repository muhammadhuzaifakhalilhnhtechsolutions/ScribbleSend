import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Alert,
  Dimensions,
  Text,
  ScrollView,
  Button,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DraggableText from '../../../components/DragableText/DragableText';
import { PenModal, TextModal } from '../../../components/Modals/Modals';
import RecordScreen, { RecordingResult } from 'react-native-record-screen';
import RNFS from 'react-native-fs';
import { PERMISSIONS, RESULTS } from 'react-native-permissions';
import moment from 'moment';
import { captureRef } from 'react-native-view-shot';
import { PDFDocument, scale } from 'pdf-lib';
import { encode } from 'base64-arraybuffer';
import Share from 'react-native-share';
import Loader from '../../../components/Loader/Loader';
import { Black } from '../../../utils/Color';
import { PoppinsRegular } from '../../../utils/Fonts';

const { height, width } = Dimensions.get('screen');

const WhiteBoard = ({ navigation, route }) => {
  const AllData = route.params?.data;
  const [currentStroke, setCurrentStroke] = useState({
    path: '',
    color: 'black',
    width: 4,
  });
  const [strokes, setStrokes] = useState([]);
  const [drawingEnabled, setDrawingEnabled] = useState(true);
  const [penColor, setPenColor] = useState('black');
  const [penWidth, setPenWidth] = useState(2);
  const [modalVisible, setModalVisible] = useState(false);
  const [baseScale, setBaseScale] = useState(1);
  const [pinchScale, setPinchScale] = useState(1);
  const [eraseMode, setEraseMode] = useState(false);
  const [zoomEnabled, setZoomEnabled] = useState(false);
  const zoomFactor = 2;
  const [textMode, setTextMode] = useState(false);
  const [modalVisibleText, setModalVisibleText] = useState(false);
  const [activeTextIndex, setActiveTextIndex] = useState(0);
  const [textDataList, setTextDataList] = useState([]);
  const [isRecording, setisRecording] = useState(false);
  const [selectedTextId, setSelectedTextId] = useState(null);
  const [shareLoading, setshareLoading] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const questions = AllData?.questions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [drawings, setDrawings] = useState({});
  const [textDrawings, setTextDrawings] = useState({});
  const [drawingAreaSize, setDrawingAreaSize] = useState({
    width: width,
    height: height,
  });
  const panMultiplier = 0.5;

  const doubleClickThreshold = useRef(null);
  const openPenEditor = useRef(null);
  const textInputRef = useRef(null);
  const doubleClickThresholdText = useRef(null);
  const svgRef = useRef(null);
  const mobileVersion = Platform.constants['Release'];

  useEffect(() => {
    loadDrawingForCurrentQuestion();
  }, [currentQuestionIndex]);

  const handleNext = () => {
    saveCurrentDrawing();
    if (currentQuestionIndex < questions?.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    saveCurrentDrawing();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const saveCurrentDrawing = () => {
    const drawingData = {
      strokes: strokes,
      textDataList: textDataList,
    };

    setDrawings(prevDrawings => ({
      ...prevDrawings,
      [currentQuestionIndex]: drawingData.strokes,
    }));

    setTextDrawings(prevTextDrawings => ({
      ...prevTextDrawings,
      [currentQuestionIndex]: drawingData.textDataList,
    }));
  };

  const loadDrawingForCurrentQuestion = () => {
    const savedDrawingData = drawings[currentQuestionIndex] || [];
    const savedTextData = textDrawings[currentQuestionIndex] || [];

    setStrokes(savedDrawingData);
    setTextDataList(savedTextData);
  };

  const createNewTextData = () => ({
    id: textDataList?.length + 1,
    text: '',
    color: 'black',
    size: 16,
    x: 100,
    y: 100,
  });

  const addNewText = () => {
    const newTextData = createNewTextData();
    setTextDataList([...textDataList, newTextData]);
    setActiveTextIndex(textDataList.length);
    setTextMode(true);
    setModalVisibleText(true);
  };

  const updateTextData = (index, updatedData) => {
    const updatedTextDataList = textDataList.map((textData, i) =>
      i === index ? { ...textData, ...updatedData } : textData,
    );
    setTextDataList(updatedTextDataList);
  };

  const handleDoubleClick = () => {
    if (doubleClickThresholdText.current) {
      clearTimeout(doubleClickThresholdText.current);
      doubleClickThresholdText.current = null;
      setModalVisibleText(true);
    } else {
      doubleClickThresholdText.current = setTimeout(() => {
        doubleClickThresholdText.current = null;
        if (textMode) {
          setTextMode(false);
        } else {
          addNewText();
          setTimeout(() => textInputRef.current.focus(), 100);
        }
      }, 300);
    }
  };

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(3)
    .onEnd(() => {
      setZoomEnabled(!zoomEnabled);
    })
    .runOnJS(true);

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      if (event.numberOfPointers === 2) {
        handlePanGesture(event);
      } else {
        handleGesture(event);
      }
    })
    .onBegin(event => handleStart(event))
    .onEnd(event => handleEnd(event))
    .runOnJS(true);

  const pinchGesture = Gesture.Pinch()
    .onUpdate(event => handlePinchGestureEvent(event))
    .onEnd(event => handlePinchHandlerStateChange(event))
    .runOnJS(true);

  const composedGesture = Gesture.Simultaneous(
    panGesture,
    pinchGesture,
    doubleTapGesture,
  );

  const handleGesture = event => {
    const { x, y } = event;
    if (eraseMode) {
      const newStrokes = strokes.filter(
        stroke => !isPointInPath(stroke.path, x, y),
      );
      setStrokes(newStrokes);
    } else if (drawingEnabled) {
      let newPath = currentStroke.path
        ? `${currentStroke.path} L ${x} ${y}`
        : `M ${x} ${y}`;
      setCurrentStroke({ ...currentStroke, path: newPath });
    }
  };

  const handlePanGesture = event => {
    setDrawingEnabled(false);
    const { translationX, translationY } = event;
    setPanOffset(prev => ({
      x: prev.x,
      y: prev.y + (translationY / 2) * panMultiplier,
      // x: prev.x + (translationX / 4) * panMultiplier,
      // y: prev.y + (translationY * panMultiplier) / 2,
    }));
    setDrawingAreaSize(prev => ({
      width: prev.width,
      height: prev.height - translationY * panMultiplier,
    }));
  };

  const handleStart = () => {
    setCurrentStroke({ path: '', color: penColor, width: penWidth });
  };

  const handleEnd = () => {
    setDrawingEnabled(true);
    if (currentStroke.path) {
      setStrokes([...strokes, currentStroke]);
      setCurrentStroke({ path: '', color: penColor, width: penWidth });
    }
  };

  const handlePinchGestureEvent = event => {
    setPinchScale(event?.scale);
    setDrawingEnabled(false);
  };

  const handlePinchHandlerStateChange = () => {
    setBaseScale(baseScale * pinchScale);
    setPinchScale(1);
    setDrawingEnabled(true);
  };

  const clearBoard = () => {
    setStrokes([]);
    setTextDataList([]);
  };

  const handleUndoClick = () => {
    if (doubleClickThreshold.current) {
      clearTimeout(doubleClickThreshold.current);
      doubleClickThreshold.current = null;
      setStrokes(strokes.slice(0, -1));
    } else {
      doubleClickThreshold.current = setTimeout(() => {
        doubleClickThreshold.current = null;
        setEraseMode(!eraseMode);
        setDrawingEnabled(!drawingEnabled);
      }, 300);
    }
  };

  const togglePenEditor = () => {
    if (openPenEditor.current) {
      clearTimeout(openPenEditor.current);
      openPenEditor.current = null;
      setModalVisible(true);
    } else {
      openPenEditor.current = setTimeout(() => {
        openPenEditor.current = null;
        setDrawingEnabled(!drawingEnabled);
        setEraseMode(false);
      }, 300);
    }
  };

  const isPointInPath = (path, x, y) => {
    const pathSegments = path.split(' ');
    for (let i = 0; i < pathSegments.length - 2; i += 3) {
      const x1 = parseFloat(pathSegments[i + 1]);
      const y1 = parseFloat(pathSegments[i + 2]);
      const x2 = parseFloat(pathSegments[i + 4]);
      const y2 = parseFloat(pathSegments[i + 5]);
      const distance = Math.hypot(x2 - x1, y2 - y1);
      const d1 = Math.hypot(x - x1, y - y1);
      const d2 = Math.hypot(x - x2, y - y2);
      if (Math.abs(d1 + d2 - distance) < 0.1) {
        return true;
      }
    }
    return false;
  };

  const handleSelectText = id => {
    setSelectedTextId(id);
  };

  const handleDeleteText = () => {
    setTextDataList(prevList =>
      prevList.filter(text => text.id !== selectedTextId),
    );
    setSelectedTextId(null);
  };

  const handleEditText = () => {
    setModalVisibleText(true);
  };

  const handleUpdateText = newTextData => {
    const updatedTextDataList = textDataList.map(text => {
      if (text.id === selectedTextId) {
        return { ...text, ...newTextData };
      }
      return text;
    });
    setTextDataList(updatedTextDataList);
    setModalVisibleText(false);
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      await requestAndroidPermissions();
    } else {
      const statuses = await request(
        PERMISSIONS.IOS.PHOTO_LIBRARY,
        PERMISSIONS.IOS.MICROPHONE,
      );
      if (
        statuses[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.GRANTED &&
        statuses[PERMISSIONS.IOS.MICROPHONE] === RESULTS.GRANTED
      ) {
        console.log('All permissions granted');
        startRecording();
      } else {
        console.log('Permissions denied');
      }
    }
  };

  const requestPermissionsArray = [
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    'android.permission.POST_NOTIFICATIONS',
  ];

  const requestPermissionsAbove = [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO];

  const requestAndroidPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        mobileVersion >= 13 ? requestPermissionsAbove : requestPermissionsArray,
      );
      console.log('Permissions granted ==>', granted);
      if (
        mobileVersion >= 13
          ? granted['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
          : (granted['android.permission.READ_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
              granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
                PermissionsAndroid.RESULTS.GRANTED &&
              granted['android.permission.RECORD_AUDIO'] ===
                PermissionsAndroid.RESULTS.GRANTED) ||
            granted['android.permission.POST_NOTIFICATIONS'] ===
              PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('All permissions granted');
        startRecording();
      } else {
        console.log('Permissions denied');
      }
    } catch (err) {
      console.log('err permissions', err);
    }
  };

  const startRecording = async () => {
    try {
      const res = await RecordScreen.startRecording();
      if (res === RecordingResult.Started) {
        setisRecording(true);
      }
      console.log('startRecording....>', res);
    } catch (err) {
      console.error('Error starting recording:', err);
    }
  };

  const stopRecording = async () => {
    try {
      const res = await RecordScreen.stopRecording();
      if (res?.status === 'success') {
        const destinationPath = `${
          RNFS.DownloadDirectoryPath
        }/recorded_video${moment().format('YYYY_MM_DD_HH_MM_SS')}.mp4`;
        await RNFS.moveFile(res.result.outputURL, destinationPath);
        setisRecording(false);
        await Share.open({
          url: `file://${destinationPath}`,
          type: 'video/mp4',
        })
          .then(res => {
            setshareLoading(false);
          })
          .catch(err => {
            setshareLoading(false);
          });
        ToastAndroid.show(
          'Recording saved successfully !',
          ToastAndroid.BOTTOM,
        );
        console.log('stopRecording');
      } else {
        setisRecording(false);
      }
    } catch (err) {
      console.error('Error stopping recording:', err);
    }
  };

  const convertSvgToPdf = async () => {
    setshareLoading(true);
    try {
      if (svgRef.current) {
        const filePath = await captureRef(svgRef.current, {
          format: 'png',
          quality: 1.0,
        });
        const pdfDoc = await PDFDocument.create();
        const pngImageBytes = await fetch(filePath).then(res =>
          res.arrayBuffer(),
        );
        const pngImage = await pdfDoc.embedPng(pngImageBytes);
        const pngDims = pngImage.scale(1);
        const page = pdfDoc.addPage([pngDims.width, pngDims.height]);

        page.drawImage(pngImage, {
          x: 0,
          y: 0,
          width: pngDims.width,
          height: pngDims.height,
          opacity: 1,
        });

        const pdfBytes = await pdfDoc.save();
        const pdfBase64 = encode(pdfBytes);
        const uniqueFilename = `scribble_send_${moment().format(
          'YYYYMMDD_HHmmss',
        )}.pdf`;
        const downloadPath = `${RNFS.DownloadDirectoryPath}/${uniqueFilename}`;
        await RNFS.writeFile(downloadPath, pdfBase64, 'base64');

        await Share.open({
          url: `file://${downloadPath}`,
          type: 'application/pdf',
        })
          .then(res => {
            setshareLoading(false);
          })
          .catch(err => {
            Alert.alert(
              'Success',
              `PDF doesn't share but saved successfully in Downloads as ${uniqueFilename}!`,
            );
            setshareLoading(false);
          });
      } else {
        setshareLoading(false);
      }
    } catch (error) {
      setshareLoading(false);
      console.log('Error creating PDF:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#EEEEEE'} barStyle={'dark-content'} />
      {shareLoading && <Loader />}
      <View style={styles.topHeader}>
        <Text numberOfLines={1} style={styles.worksheetText}>
          {moment(questions[currentQuestionIndex]?.created_at).format(
            'DD-MM-YY',
          ) +
            ' ' +
            questions[currentQuestionIndex]?.question_text}
        </Text>
        <Text style={styles.totalQues}>
          {currentQuestionIndex + 1} / {questions?.length}
        </Text>
      </View>
      <View style={styles.navigationBox}>
        <TouchableOpacity
          onPress={handlePrevious}
          disabled={currentQuestionIndex === 0}>
          <Ionicons name="chevron-back" size={30} color="#007bff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          disabled={currentQuestionIndex === questions.length - 1}>
          <Ionicons name="chevron-forward" size={30} color="#007bff" />
        </TouchableOpacity>
      </View>
      <GestureHandlerRootView style={{ flex: 1, width: '100%' }}>
        <GestureDetector gesture={composedGesture}>
          <View
            style={{
              width: drawingAreaSize.width,
              height: drawingAreaSize.height,
              backgroundColor: '#EEE',
              transform: [
                { translateX: panOffset.x },
                { translateY: panOffset.y },
                {
                  scale: zoomEnabled
                    ? zoomFactor * baseScale * pinchScale
                    : baseScale * pinchScale,
                },
              ],
            }}>
            <Svg
              ref={svgRef}
              xmlns="http://www.w3.org/2000/svg"
              onPress={() =>
                setCurrentStroke({
                  path: '',
                  color: penColor,
                  width: penWidth,
                })
              }>
              {strokes.map((stroke, index) => (
                <Path
                  key={index}
                  d={stroke.path}
                  stroke={stroke.color}
                  strokeWidth={stroke.width}
                  fill="none"
                />
              ))}
              {currentStroke.path ? (
                <Path
                  d={currentStroke.path}
                  stroke={currentStroke.color}
                  strokeWidth={currentStroke.width}
                  fill="none"
                />
              ) : null}
            </Svg>
            {textDataList.map(textData => (
              <DraggableText
                key={textData.id}
                textData={textData}
                textDataList={textDataList}
                setTextDataList={setTextDataList}
                isSelected={textData.id == selectedTextId}
                onSelectText={handleSelectText}
                onStartDrag={() => setSelectedTextId(() => textData.id)}
                onEndDrag={() => setSelectedTextId(() => null)}
                handleEditText={handleEditText}
                handleDeleteText={handleDeleteText}
              />
            ))}
          </View>
        </GestureDetector>
      </GestureHandlerRootView>

      <View style={styles.toolBar}>
        <TouchableOpacity onPress={handleUndoClick}>
          <MaterialCommunityIcons
            name="eraser"
            size={24}
            color={eraseMode ? 'red' : 'black'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={clearBoard}>
          <MaterialCommunityIcons name="delete" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePenEditor}>
          <MaterialCommunityIcons
            name="pen"
            size={24}
            color={drawingEnabled ? 'black' : 'red'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            isRecording ? stopRecording() : requestPermissions();
          }}>
          <Fontisto
            name={isRecording ? 'stop' : 'record'}
            size={20}
            color={'red'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={addNewText} onLongPress={handleDoubleClick}>
          <MaterialCommunityIcons name="format-text" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={convertSvgToPdf}>
          <MaterialCommunityIcons name="share" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <PenModal
        modalVisible={modalVisible}
        setPenColor={setPenColor}
        penWidth={penWidth}
        setPenWidth={setPenWidth}
        setModalVisible={setModalVisible}
        penColor={penColor}
      />

      <TextModal
        modalVisibleText={modalVisibleText}
        setModalVisibleText={setModalVisibleText}
        updateTextData={updateTextData}
        textDataList={textDataList}
        activeTextIndex={activeTextIndex}
        selectedTextId={selectedTextId}
        textInputRef={textInputRef}
        handleUpdateText={handleUpdateText}
        setDrawingEnabled={setDrawingEnabled}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFF',
  },
  drawingArea: {
    flex: 1,
    width: '100%',
    backgroundColor: '#EEE',
  },
  toolBar: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  topHeader: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#EEE',
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  worksheetText: {
    color: Black,
    fontSize: 14,
    fontFamily: PoppinsRegular,
    width: '85%',
  },
  totalQues: {
    color: Black,
    fontSize: 14,
    fontFamily: PoppinsRegular,
    width: '14%',
    textAlign: 'center',
  },
  navigationBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: '45%',
    width: '100%',
    zIndex: 1,
  },
});

export default WhiteBoard;
