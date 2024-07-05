import React from 'react';
import { StyleSheet, PanResponder, Text, Animated } from 'react-native';

const DraggableText = ({
  textData,
  textDataList,
  setTextDataList,
  onStartDrag,
  onEndDrag,
}) => {
  const dragRate = 0.5;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      onStartDrag();
    },
    onPanResponderMove: (event, gesture) => {
      const updatedTextDataList = textDataList.map(item => {
        if (item.id === textData.id) {
          return {
            ...item,
            x: item.x + gesture.dx * dragRate,
            y: item.y + gesture.dy * dragRate,
          };
        }
        return item;
      });
      setTextDataList(updatedTextDataList);
    },
    onPanResponderRelease: () => {
      onEndDrag();
    },
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: textData.x,
        top: textData.y,
      }}
      {...panResponder.panHandlers}>
      <Text style={{ fontSize: textData.size, color: textData.color }}>
        {textData.text}
      </Text>
    </Animated.View>
  );
};

export default DraggableText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawingArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
