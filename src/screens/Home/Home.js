import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  StatusBar,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

  const colors = ['black', 'red', 'blue', 'green', 'yellow'];
  const doubleClickThreshold = useRef(null);
  const openPenEditor = useRef(null);

  const panGesture = Gesture.Pan()
    .onUpdate(event => handleGesture(event))
    .onBegin(event => handleStart(event))
    .onEnd(event => handleEnd(event))
    .runOnJS(true);

  const pinchGesture = Gesture.Pinch()
    .onUpdate(event => handlePinchGestureEvent(event))
    .onEnd(event => handlePinchHandlerStateChange(event))
    .runOnJS(true);

  const composedGesture = Gesture.Simultaneous(panGesture, pinchGesture);

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
    setPinchScale(event.scale);
    setDrawingEnabled(false);
  };

  const handlePinchHandlerStateChange = () => {
    setBaseScale(baseScale * pinchScale);
    setPinchScale(1);
    setDrawingEnabled(true);
  };

  const clearBoard = () => {
    setStrokes([]);
  };

  const undoLastStroke = () => {
    setStrokes(strokes.slice(0, -1));
  };

  const handleUndoClick = () => {
    if (doubleClickThreshold.current) {
      clearTimeout(doubleClickThreshold.current);
      doubleClickThreshold.current = null;
      undoLastStroke();
    } else {
      doubleClickThreshold.current = setTimeout(() => {
        doubleClickThreshold.current = null;
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

  const toggleEraseMode = () => {
    setEraseMode(!eraseMode);
    setDrawingEnabled(!drawingEnabled);
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
          <Svg
            style={{
              ...styles.drawingArea,
              transform: [{ scale: baseScale * pinchScale }],
            }}
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
        </GestureDetector>
      </GestureHandlerRootView>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={togglePenEditor}>
          {drawingEnabled ? (
            <MaterialCommunityIcons name="pencil" size={26} color={'#000'} />
          ) : (
            <MaterialCommunityIcons
              name="pencil-lock"
              size={26}
              color={'red'}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={toggleEraseMode}>
          {eraseMode ? (
            <MaterialCommunityIcons name="eraser" size={26} color={'blue'} />
          ) : (
            <MaterialCommunityIcons name="eraser" size={26} color={'#000'} />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleUndoClick}>
          <MaterialCommunityIcons name="undo" size={26} color={'#000'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={clearBoard}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setModalVisible(false)}>
            <MaterialCommunityIcons name="close" size={24} color={'white'} />
          </TouchableOpacity>
          <Text
            style={{
              color: 'black',
              marginVertical: 10,
              fontWeight: '600',
              textTransform: 'capitalize',
            }}>
            Pick Pen Colour: {penColor}
          </Text>
          <View style={styles.colorsBox}>
            {colors.map(color => (
              <TouchableOpacity
                key={color}
                style={{ ...styles.colorsStyle, backgroundColor: color }}
                onPress={() => {
                  setPenColor(color);
                  setModalVisible(false);
                }}></TouchableOpacity>
            ))}
          </View>
          <Text
            style={{ color: 'black', marginVertical: 10, fontWeight: '600' }}>
            Pick Pen Width: {penWidth.toFixed(1)}
          </Text>
          <Slider
            style={{ width: 200, height: 40, marginBottom: 20 }}
            minimumValue={1}
            maximumValue={10}
            step={0.1}
            value={penWidth}
            onValueChange={value => setPenWidth(value)}
            minimumTrackTintColor="#000000"
            maximumTrackTintColor="#000000"
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  drawingArea: {
    width: '100%',
    height: '100%',
    backgroundColor: '#EEE',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
  },
  button: {
    backgroundColor: '#999',
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeBtn: {
    height: 30,
    width: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderTopRightRadius: 10,
    marginBottom: 20,
  },
  colorsStyle: {
    height: 45,
    width: 45,
    marginHorizontal: 4,
    borderRadius: 5,
  },
  colorsBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
