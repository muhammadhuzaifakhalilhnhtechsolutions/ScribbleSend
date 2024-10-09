import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Alert,
  Dimensions,
  ScrollView,
  BackHandler,
  ActivityIndicator,
  Text,
} from 'react-native';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import { Black, THEME_COLOR, White } from '../../../utils/Color';
import { PoppinsRegular } from '../../../utils/Fonts';
import { Canvas, Path } from '@shopify/react-native-skia';
import { PenModal, TextModal } from '../../../components/Modals/Modals';
import { showMessage } from 'react-native-flash-message';
import RecordScreen, { RecordingResult } from 'react-native-record-screen';
import RNFS from 'react-native-fs';
import { PERMISSIONS, RESULTS } from 'react-native-permissions';
import moment, { max } from 'moment';
import { captureRef } from 'react-native-view-shot';
import { PDFDocument } from 'pdf-lib';
import { encode } from 'base64-arraybuffer';
import DraggableText from '../../../components/DragableText/DragableText';
import Share from 'react-native-share';
import ToolBars from './ToolBars';
import Loader from '../../../components/Loader/Loader';
import DeviceInfo from 'react-native-device-info';
import OrientationLocker from 'react-native-orientation-locker';

const { height, width } = Dimensions.get('screen');

const TestDraw = ({ navigation, route }) => {
  const AllData = route.params?.data;
  const [paths, setPaths] = useState([]);
  const [eraseMode, setEraseMode] = useState(false);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedWidth, setSelectedWidth] = useState(2);
  const [textDataList, setTextDataList] = useState([]);
  const [modalVisibleText, setModalVisibleText] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [drawingEnabled, setDrawingEnabled] = useState(true);
  const [activeTextIndex, setActiveTextIndex] = useState(0);
  const [isRecording, setisRecording] = useState(false);
  const [selectedTextId, setSelectedTextId] = useState(null);
  const [drawingPage, setDrawingPage] = useState(2);
  const [androidVersion, setAndroidVersion] = useState('');
  const [shareLoading, setshareLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const questions = AllData?.questions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    route?.params?.index,
  );

  const doubleClickThreshold = useRef(null);
  const openPenEditor = useRef(null);
  const textInputRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    OrientationLocker.lockToLandscape();
    return () => {
      OrientationLocker.lockToPortrait();
    };
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  useEffect(() => {
    const version = DeviceInfo.getSystemVersion();
    const majorVersion = version.split('.')[0];
    setAndroidVersion(majorVersion);

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const backAction = () => {
    Alert.alert(
      'Hold on!',
      'Are you sure you want to go back? All data will be lost.',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => navigation.goBack() },
      ],
    );
    return true;
  };

  const pan = Gesture.Pan()
    .onStart(g => addSegment(g.x, g.y, true))
    .onUpdate(g => addSegment(g.x, g.y))
    .minPointers(1)
    .maxPointers(1)
    .minDistance(1)
    .runOnJS(true);

  const addSegment = useCallback(
    (x, y, newPath = false) => {
      setPaths(prevPaths => {
        let pathsCopy = [...prevPaths];
        if (newPath) {
          pathsCopy.push({
            segments: [`M ${x} ${y}`],
            color: eraseMode ? '#EEEEEE' : selectedColor,
            width: eraseMode ? 10 : selectedWidth,
          });
        } else {
          if (pathsCopy.length > 0) {
            const lastPathIndex = pathsCopy.length - 1;
            pathsCopy[lastPathIndex].segments.push(`L ${x} ${y}`);
          }
        }
        return pathsCopy;
      });
    },
    [eraseMode, selectedColor, selectedWidth],
  );

  const createNewTextData = () => ({
    id: textDataList?.length + 1,
    text: '',
    color: 'black',
    size: 16,
    x: width / 2.6,
    y: height / 2.6,
  });

  const addNewText = () => {
    const newTextData = createNewTextData();
    setTextDataList([...textDataList, newTextData]);
    setActiveTextIndex(textDataList.length);
    setModalVisibleText(true);
  };

  const updateTextData = (index, updatedData) => {
    const updatedTextDataList = textDataList.map((textData, i) =>
      i === index ? { ...textData, ...updatedData } : textData,
    );
    setTextDataList(updatedTextDataList);
  };

  const clearBoard = () => {
    setPaths([]);
    setTextDataList([]);
  };

  const handleUndoClick = () => {
    if (doubleClickThreshold.current) {
      clearTimeout(doubleClickThreshold.current);
      doubleClickThreshold.current = null;
      setPaths(paths.slice(0, -1));
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

  const requestPermissions = async value => {
    if (Platform.OS === 'android') {
      await requestAndroidPermissions(value);
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
        if (value === 'share') {
          convertSvgToPdf();
        } else {
          startRecording();
        }
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

  const requestAndroidPermissions = async value => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        androidVersion >= 13
          ? requestPermissionsAbove
          : requestPermissionsArray,
      );
      console.log('Permissions granted ==>', granted);
      if (
        androidVersion >= 13
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
        if (value === 'share') {
          convertSvgToPdf();
        } else {
          startRecording();
        }
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
        const id = setInterval(() => {
          setCounter(prevCounter => prevCounter + 1);
        }, 1000);

        setIntervalId(id);
      }
      console.log('startRecording....>', res);
    } catch (err) {
      console.error('Error starting recording:', err);
    }
  };

  const stopRecording = async () => {
    try {
      const res = await RecordScreen.stopRecording();
      clearInterval(intervalId);
      setCounter(0);
      console.log('res stopped', res);
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
              `PDF doesn't share but saved successfully in Downloadq  s as ${uniqueFilename}!`,
            );
            setshareLoading(false);
          });
      } else {
        setshareLoading(false);
      }
    } catch (error) {
      setshareLoading(false);
      console.log('Error creating PDF:', error);
      showMessage({
        message: 'Failed',
        description: 'Failed to create PDF',
        type: 'danger',
        floating: true,
        animated: true,
      });
    }
  };

  const handleFunctions = val => {
    if (val == 'share') {
      requestPermissions('share');
    } else {
      requestPermissions('recording');
    }
  };

  const addPages = () => {
    setDrawingPage(() => drawingPage + 1);
  };

  const formatTime = () => {
    const duration = moment.duration(counter, 'seconds');
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={White} barStyle={'dark-content'} />
      {shareLoading && (
        <View style={styles.Loaders}>
          <ActivityIndicator size={'large'} color={THEME_COLOR} />
        </View>
      )}
      <View style={styles.main}>
        <ToolBars
          eraseMode={eraseMode}
          isRecording={isRecording}
          onPenPress={togglePenEditor}
          onPageAddPress={addPages}
          onClearPress={clearBoard}
          onErasePress={handleUndoClick}
          onSharePress={() => handleFunctions('share')}
          onTextPress={addNewText}
          onRecordingPress={() =>
            isRecording ? stopRecording() : requestPermissions('recording')
          }
        />

        {counter > 0 && (
          <View style={styles.counterDiv}>
            <Text style={styles.counterText}>{formatTime()}</Text>
          </View>
        )}

        <GestureHandlerRootView style={{ flex: 1, width: '100%' }}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            nestedScrollEnabled={true}>
            <GestureDetector gesture={pan}>
              <View
                ref={svgRef}
                style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
                <Canvas
                  style={{
                    marginVertical: 5,
                    flex: 1,
                    width: '100%',
                    height: height * 2 * drawingPage,
                  }}>
                  {paths.map((p, index) => (
                    <Path
                      key={index}
                      path={p.segments.join(' ')}
                      strokeWidth={p.width}
                      style="stroke"
                      color={p.color}
                    />
                  ))}
                </Canvas>

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
          </ScrollView>
        </GestureHandlerRootView>

        <PenModal
          modalVisible={modalVisible}
          setPenColor={setSelectedColor}
          penWidth={selectedWidth}
          setPenWidth={setSelectedWidth}
          setModalVisible={setModalVisible}
          penColor={selectedColor}
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFF',
  },
  main: {
    flex: 1,
    width: '98%',
    alignSelf: 'center',
    backgroundColor: White,
  },
  drawingArea: {
    flex: 1,
    width: '100%',
    backgroundColor: '#EEE',
  },
  topHeader: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#EEE',
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
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  Loaders: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 999,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    height: height,
    width: '100%',
  },
  counterDiv: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 25,
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 1,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    color: White,
    fontSize: 12,
    fontFamily: PoppinsRegular,
  },
});

export default TestDraw;
