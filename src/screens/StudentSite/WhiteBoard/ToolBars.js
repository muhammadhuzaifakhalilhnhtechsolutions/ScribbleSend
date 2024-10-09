import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { THEME_COLOR, White } from '../../../utils/Color';

const ToolBars = ({
  onErasePress,
  onClearPress,
  onPenPress,
  onRecordingPress,
  onTextPress,
  onSharePress,
  onPageAddPress,
  isRecording,
  eraseMode,
}) => {
  return (
    <View style={styles.conatiner}>
      <TouchableOpacity style={styles.btn} onPress={onErasePress}>
        <MaterialCommunityIcons
          name="eraser"
          size={20}
          color={eraseMode ? 'red' : 'white'}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={onPageAddPress}>
        <MaterialCommunityIcons name="plus" size={20} color={'white'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={onClearPress}>
        <MaterialCommunityIcons name="delete" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={onPenPress}>
        <MaterialCommunityIcons name="pen" size={20} color={'white'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={onRecordingPress}>
        <Fontisto
          name={isRecording ? 'stop' : 'record'}
          size={18}
          color={'red'}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={onTextPress}>
        <MaterialCommunityIcons name="format-text" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={onSharePress}>
        <MaterialCommunityIcons name="share" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ToolBars;

const styles = StyleSheet.create({
  conatiner: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: White,
  },
  btn: {
    backgroundColor: THEME_COLOR,
    borderRadius: 5,
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
