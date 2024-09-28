import {
  Alert,
  BackHandler,
  Dimensions,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { Black, THEME_COLOR, White } from '../../../utils/Color';
import RNSketchCanvas from '@sourcetoad/react-native-sketch-canvas';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFS from 'react-native-fs';
import moment from 'moment';
import DraggableText from '../../../components/DragableText/DragableText';
import { TextModal } from '../../../components/Modals/Modals';
import RecordScreen, { RecordingResult } from 'react-native-record-screen';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';
import Share from 'react-native-share';
import { captureRef } from 'react-native-view-shot';
import { PDFDocument } from 'pdf-lib';
import { encode } from 'base64-arraybuffer';
import Loader from '../../../components/Loader/Loader';
import { showMessage } from 'react-native-flash-message';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import OrientationLocker from 'react-native-orientation-locker';
import { PopingBold } from '../../../utils/Fonts';

const { height, width } = Dimensions.get('window');

const StaticWhiteBoard = ({ navigation }) => {
  const [textDataList, setTextDataList] = useState([]);
  const [selectedTextId, setSelectedTextId] = useState(null);
  const [modalVisibleText, setModalVisibleText] = useState(false);
  const [activeTextIndex, setActiveTextIndex] = useState(0);
  const [isRecording, setisRecording] = useState(false);
  const [androidVersion, setAndroidVersion] = useState('');
  const [shareLoading, setshareLoading] = useState(false);
  const [drawingPage, setDrawingPage] = useState(2);
  const svgRef = useRef(null);
  const textInputRef = useRef(null);
  const canvasRef = useRef();

  useEffect(() => {
    OrientationLocker.lockToLandscape();
    return () => {
      OrientationLocker.lockToPortrait();
    };
  }, []);

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

  const handleDeleteText = () => {
    setTextDataList(prevList =>
      prevList.filter(text => text.id !== selectedTextId),
    );
    setSelectedTextId(null);
  };

  const handleEditText = () => {
    setModalVisibleText(true);
  };

  const handleSelectText = id => {
    setSelectedTextId(id);
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

  const updateTextData = (index, updatedData) => {
    const updatedTextDataList = textDataList.map((textData, i) =>
      i === index ? { ...textData, ...updatedData } : textData,
    );
    setTextDataList(updatedTextDataList);
  };

  const addNewText = () => {
    const newTextData = createNewTextData();
    setTextDataList([...textDataList, newTextData]);
    setActiveTextIndex(textDataList.length);
    setModalVisibleText(true);
  };

  const createNewTextData = () => ({
    id: textDataList?.length + 1,
    text: '',
    color: '#000000',
    size: 16,
    x: width / 2.5,
    y: height / 2,
  });

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
      }
      console.log('startRecording....>', res);
    } catch (err) {
      console.error('Error starting recording:', err);
    }
  };

  const stopRecording = async () => {
    try {
      const res = await RecordScreen.stopRecording();
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
              `PDF doesn't share but saved successfully in Download as ${uniqueFilename}!`,
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

  return (
    <SafeAreaView style={styles.container}>
      {shareLoading && <Loader />}
      <StatusBar barStyle={'dark-content'} backgroundColor={White} />
      <View style={styles.main}>
        <View style={[styles.scrollIndicator]}>
          <MaterialCommunityIcons
            name="arrow-up"
            color={THEME_COLOR}
            size={30}
          />
          <MaterialCommunityIcons
            name="arrow-down"
            color={THEME_COLOR}
            size={30}
          />
        </View>
        <View style={styles.btnCOntainer}>
          <View style={styles.btnBox}>
            <TouchableOpacity
              style={styles.functionButton}
              onPress={addNewText}>
              <Image
                source={require('../../../assets/images/textool.png')}
                style={{ height: 30, width: 30 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.btnText}>Add text </Text>
          </View>
          <View style={styles.btnBox}>
            <TouchableOpacity
              style={{ ...styles.functionButton, backgroundColor: '#c0c0c0' }}
              onPress={() => {
                isRecording ? stopRecording() : requestPermissions('recording');
              }}>
              <MaterialCommunityIcons
                name={isRecording ? 'stop' : 'record'}
                size={26}
                color={'red'}
              />
            </TouchableOpacity>
            <Text style={styles.btnText}>Recording</Text>
          </View>
          <View style={styles.btnBox}>
            <TouchableOpacity
              style={styles.functionButton}
              onPress={() => handleFunctions('share')}>
              <Image
                source={require('../../../assets/images/share.png')}
                style={{ height: 30, width: 30 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.btnText}>share</Text>
          </View>
          <View style={styles.btnBox}>
            <TouchableOpacity style={styles.functionButton} onPress={addPages}>
              <Image
                source={require('../../../assets/images/addDocument.png')}
                style={{ height: 30, width: 30 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.btnText}>Add page</Text>
          </View>
          <View style={styles.btnBox}>
            <TouchableOpacity
              style={styles.functionButton}
              onPress={() => {
                canvasRef.current?.clear();
                setTextDataList([]);
              }}>
              <Image
                source={require('../../../assets/images/refresh.png')}
                style={{ height: 30, width: 30 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.btnText}>clear</Text>
          </View>
          <View style={styles.btnBox}>
            <TouchableOpacity
              style={{ ...styles.functionButton, backgroundColor: null }}
              onPress={() => {
                canvasRef.current?.undo();
              }}>
              <Image
                source={require('../../../assets/images/eraser.png')}
                style={{ height: 30, width: 30 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.btnText}>erase</Text>
          </View>
        </View>
        <ScrollView nestedScrollEnabled={false}>
          {/* <ReactNativeZoomableView
            bindToBorders={true}
            maxZoom={6}
            minZoom={0.9}
            zoomStep={0.5}
            initialZoom={1}> */}
          <View ref={svgRef} style={{ flex: 1, width: '96%', marginTop: 5 }}>
            <RNSketchCanvas
              ref={canvasRef}
              containerStyle={{
                backgroundColor: 'transparent',
                width: '100%',
                flex: 1,
              }}
              canvasStyle={{
                backgroundColor: '#EEE',
                height: height * 2 * drawingPage,
                width: '100%',
              }}
              defaultStrokeIndex={0}
              defaultStrokeWidth={2}
              // onClearPressed={() => setTextDataList([])}
              // undoComponent={
              //   <View style={styles.functionButton}>
              //     <MaterialCommunityIcons
              //       name="eraser"
              //       size={20}
              //       color={White}
              //     />
              //   </View>
              // }
              // clearComponent={
              //   <View style={styles.functionButton}>
              //     <MaterialCommunityIcons
              //       name="delete"
              //       size={20}
              //       color={White}
              //     />
              //   </View>
              // }
              // eraseComponent={
              //   <View style={styles.functionButton}>
              //     <MaterialCommunityIcons
              //       name="eraser"
              //       size={20}
              //       color={White}
              //     />
              //   </View>
              // }
              strokeComponent={color => (
                <View
                  style={[
                    {
                      backgroundColor: color,
                    },
                    styles.strokeColorButton,
                  ]}
                />
              )}
              // strokeSelectedComponent={(color, index, changed) => {
              //   return (
              //     <View
              //       style={[
              //         { backgroundColor: color, borderWidth: 2 },
              //         styles.strokeColorButton,
              //       ]}
              //     />
              //   );
              // }}
              // strokeWidthComponent={w => {
              //   return (
              //     <View style={styles.strokeWidthButton}>
              //       <View
              //         style={{
              //           backgroundColor: 'white',
              //           marginHorizontal: 2.5,
              //           width: Math.sqrt(w / 3) * 10,
              //           height: Math.sqrt(w / 3) * 10,
              //           borderRadius: (Math.sqrt(w / 3) * 10) / 2,
              //         }}
              //       />
              //     </View>
              //   );
              // }}
            />

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
          {/* </ReactNativeZoomableView> */}
        </ScrollView>

        <TextModal
          modalVisibleText={modalVisibleText}
          setModalVisibleText={setModalVisibleText}
          updateTextData={updateTextData}
          textDataList={textDataList}
          activeTextIndex={activeTextIndex}
          selectedTextId={selectedTextId}
          textInputRef={textInputRef}
          handleUpdateText={handleUpdateText}
        />
      </View>
    </SafeAreaView>
  );
};

export default StaticWhiteBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: White,
  },
  main: {
    flex: 1,
    width: '98%',
    alignSelf: 'center',
    backgroundColor: White,
  },
  strokeColorButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 360,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME_COLOR,
    zIndex: 1,
    position: 'absolute',
    bottom: 3,
    right: 3,
  },
  functionButton: {
    marginHorizontal: 2.5,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnCOntainer: {
    width: '96%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 5,
  },
  btnBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: Black,
    fontSize: 10,
    fontFamily: PopingBold,
    textTransform: 'uppercase',
  },
  scrollIndicator: {
    position: 'absolute',
    width: 28,
    top: 0,
    right: 0,
    borderRadius: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    height: height * 0.93,
  },
});
