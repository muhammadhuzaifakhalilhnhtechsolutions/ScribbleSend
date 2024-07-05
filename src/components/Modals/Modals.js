import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Slider from '@react-native-community/slider';

const colors = ['black', 'red', 'blue', 'green', 'yellow'];

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
          <Text style={styles.modalTitle}>Text Settings</Text>
          <Text style={{ color: 'black', textAlign: 'center' }}>
            Text Size: {textDataList[activeTextIndex]?.color}
          </Text>
          <View style={styles.colorContainer}>
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
          </View>
          <View style={styles.sliderContainer}>
            <Text style={{ color: 'black', textAlign: 'center' }}>
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
            ref={textInputRef}
            style={styles.textInput}
            value={textDataList[activeTextIndex]?.text}
            onChangeText={text => updateTextData(activeTextIndex, { text })}
            autoFocus
            multiline
          />
          <TouchableOpacity
            onPress={() => setModalVisibleText(false)}
            style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
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
          <Text style={styles.modalTitle}>Pen Settings</Text>
          <View style={styles.colorContainer}>
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
          </View>
          <View style={styles.sliderContainer}>
            <Text>Pen Width: {penWidth?.toFixed(0)}</Text>
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
            <Text style={styles.closeButtonText}>Close</Text>
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
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
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
    borderColor: '#000',
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
    color: '#FFF',
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
    color: 'black',
  },
  textContainer: {
    padding: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'gray',
  },
});
