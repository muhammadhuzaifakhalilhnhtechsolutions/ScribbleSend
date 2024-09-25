import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Slider from '@react-native-community/slider';
import { Black, Gray, THEME_COLOR, White } from '../../utils/Color';

// const colors = [Black, 'red', 'blue', 'green', 'yellow'];
// strokeColors:
const colors = [
  '#000000',
  '#FF0000',
  '#00FFFF',
  '#0000FF',
  '#0000A0',
  '#ADD8E6',
  '#800080',
  '#FFFF00',
  '#00FF00',
  '#FF00FF',
  '#FFFFFF',
  '#C0C0C0',
  '#808080',
  '#FFA500',
  '#A52A2A',
  '#800000',
  '#008000',
  '#808000',
];

const TextModal = ({
  modalVisibleText,
  setModalVisibleText,
  updateTextData,
  textDataList,
  activeTextIndex,
  textInputRef,
}) => {
  return (
    <Modal visible={modalVisibleText} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeBtnDiv}
            onPress={() => setModalVisibleText(false)}>
            <Text style={{ color: White }}>X</Text>
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Text Settings</Text>
          <Text style={styles.textStyle}>
            Text Colour: {textDataList[activeTextIndex]?.color}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.colorContainer}>
            {colors?.map((color, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => updateTextData(activeTextIndex, { color })}
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  textDataList[activeTextIndex]?.color === color &&
                    styles.selectedColorOption,
                ]}
              />
            ))}
          </ScrollView>
          <View style={styles.sliderContainer}>
            <Text style={styles.textStyle}>
              Text Size: {textDataList[activeTextIndex]?.size?.toFixed(0)}
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={12}
              maximumValue={32}
              value={textDataList[activeTextIndex]?.size}
              onValueChange={value =>
                updateTextData(activeTextIndex, { size: value })
              }
            />
          </View>
          <TextInput
            placeholder="write text here..."
            placeholderTextColor={Gray}
            ref={textInputRef}
            style={styles.textInput}
            value={textDataList[activeTextIndex]?.text}
            onChangeText={text => updateTextData(activeTextIndex, { text })}
            autoFocus={true}
            multiline={true}
            cursorColor={THEME_COLOR}
            selectionColor={THEME_COLOR}
          />
          <TouchableOpacity
            onPress={() => setModalVisibleText(false)}
            style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Add Text</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const PenModal = ({
  modalVisible,
  setPenColor,
  penWidth,
  setPenWidth,
  setModalVisible,
  penColor,
}) => {
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeBtnDiv}
            onPress={() => setModalVisible(false)}>
            <Text style={{ color: White }}>X</Text>
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Pen Settings</Text>
          <Text style={styles.textStyle}>Pen Colour: {penColor}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.colorContainer}>
            {colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setPenColor(color)}
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  penColor === color && styles.selectedColorOption,
                ]}
              />
            ))}
          </ScrollView>
          <View style={styles.sliderContainer}>
            <Text style={styles.textStyle}>
              Pen Width: {penWidth?.toFixed(0)}
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={10}
              value={penWidth}
              onValueChange={value => setPenWidth(value)}
            />
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export { PenModal, TextModal };

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: White,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Black,
  },
  colorContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  selectedColorOption: {
    borderWidth: 2,
    borderColor: Black,
  },
  sliderContainer: {
    width: '100%',
    marginBottom: 20,
  },
  slider: {
    width: '100%',
  },
  closeButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: White,
    fontWeight: 'bold',
  },
  textInput: {
    width: '100%',
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: Black,
  },
  textContainer: {
    padding: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Gray,
  },
  textStyle: { color: Black, textAlign: 'center', marginBottom: 10 },
  closeBtnDiv: {
    backgroundColor: 'red',
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 360,
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
