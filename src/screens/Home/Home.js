import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DraggableText from '../../components/DragableText/DragableText';
import { PenModal, TextModal } from '../../components/Modals/Modals';

const Home = () => {
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

  const doubleClickThreshold = useRef(null);
  const openPenEditor = useRef(null);
  const textInputRef = useRef(null);
  const doubleClickThresholdText = useRef(null);
  const [selectedTextId, setSelectedTextId] = useState(null);

  const createNewTextData = () => ({
    id: textDataList?.length + 1,
    text: '',
    color: 'black',
    size: 16,
    x: 0,
    y: 0,
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
    .numberOfTaps(2)
    .onEnd(() => {
      setZoomEnabled(!zoomEnabled);
    })
    .runOnJS(true);

  const panGesture = Gesture.Pan()
    .onUpdate(event => handleGesture(event))
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

  const handleStart = () => {
    setCurrentStroke({ path: '', color: penColor, width: penWidth });
  };

  const handleEnd = () => {
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#EEE'} barStyle={'dark-content'} />
      <GestureHandlerRootView style={{ flex: 1, width: '100%' }}>
        <GestureDetector gesture={composedGesture}>
          <View
            style={{
              ...styles.drawingArea,
              transform: [
                {
                  scale: zoomEnabled
                    ? zoomFactor * baseScale * pinchScale
                    : baseScale * pinchScale,
                },
              ],
            }}>
            <Svg
              onPress={() =>
                setCurrentStroke({ path: '', color: penColor, width: penWidth })
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
                onStartDrag={() => setSelectedTextId(() => textData.id)}
                onEndDrag={() => setSelectedTextId(() => null)}
              />
            ))}
          </View>
        </GestureDetector>
      </GestureHandlerRootView>

      <View style={styles.toolBar}>
        <TouchableOpacity onPress={handleUndoClick}>
          <MaterialCommunityIcons
            name="undo"
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
        <TouchableOpacity onPress={addNewText} onLongPress={handleDoubleClick}>
          <MaterialCommunityIcons name="format-text" size={24} color="black" />
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
        textInputRef={textInputRef}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  drawingArea: {
    flex: 1,
    backgroundColor: '#EEE',
  },
  toolBar: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
});

export default Home;
