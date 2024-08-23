import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BG_COLOR, THEME_COLOR } from '../../utils/Color';

const BackHeader = ({ style, onPress, color }) => {
  return (
    <TouchableOpacity style={{ ...styles.header, ...style }} onPress={onPress}>
      <Ionicons
        name="chevron-back"
        size={24}
        color={color ? color : THEME_COLOR}
      />
    </TouchableOpacity>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  header: {
    height: 40,
    width: 40,
    borderRadius: 10,
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 1,
    backgroundColor: BG_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
