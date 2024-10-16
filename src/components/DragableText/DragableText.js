import React from 'react';
import { StyleSheet, Text, PanResponder } from 'react-native';
import Animated from 'react-native-reanimated';
import { THEME_COLOR } from '../../utils/Color';
import { PoppinsRegular } from '../../utils/Fonts';

// const DraggableText = ({
//   textData,
//   textDataList,
//   setTextDataList,
//   onStartDrag,
//   onEndDrag,
// onSelectText,
// isSelected,
// handleEditText,
// handleDeleteText,
// setDrawingEnabled = () => {},
// }) => {
//   const dragRate = 0.5;

//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onMoveShouldSetPanResponder: () => true,
//     onPanResponderGrant: () => {
//       onStartDrag();
//     },
//     onPanResponderMove: (event, gesture) => {
//       setDrawingEnabled(false);
//       const updatedTextDataList = textDataList.map(item => {
//         if (item.id === textData.id) {
//           return {
//             ...item,
//             x: textData.x + gesture.dx * dragRate,
//             y: textData.y + gesture.dy * dragRate,
//           };
//         }
//         return item;
//       });
//       setTextDataList(() => updatedTextDataList);
//       setDrawingEnabled(true);
//     },
//     onPanResponderRelease: () => {
//       onEndDrag();
//     },
//   });

//   return (
//     <Animated.View
//       style={[
//         {
//           position: 'absolute',
//           left: textData.x,
//           top: textData.y,
//         },
//         isSelected && styles.selectedText,
//       ]}
//       {...panResponder.panHandlers}>
//       <TouchableOpacity onPress={() => onSelectText(textData.id)}>
//         <Text style={{ fontSize: textData.size, color: textData.color }}>
//           {textData.text}
//         </Text>
// {isSelected && (
//   <View style={styles.options}>
//     <TouchableOpacity onPress={handleEditText}>
//       <MaterialCommunityIcons name="pencil" size={20} color="black" />
//     </TouchableOpacity>
//     <TouchableOpacity onPress={handleDeleteText}>
//       <MaterialCommunityIcons name="delete" size={20} color="black" />
//     </TouchableOpacity>
//   </View>
// )}
//       </TouchableOpacity>
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   selectedText: {
//     borderColor: 'blue',
//     borderWidth: 1,
//   },
//   options: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
// });

// export default DraggableText;

const DraggableText = ({
  textData,
  textDataList,
  setTextDataList,
  onStartDrag,
  onEndDrag,
  isSelected,
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
        padding: 10,
        borderRadius: 5,
        borderColor: isSelected ? THEME_COLOR : null,
        borderWidth: isSelected ? 1 : null,
      }}
      {...panResponder.panHandlers}>
      <Text
        style={{
          fontSize: textData.size,
          color: textData.color,
          fontFamily: PoppinsRegular,
        }}>
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
  selectedText: {
    borderColor: THEME_COLOR,
    borderWidth: 1,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
