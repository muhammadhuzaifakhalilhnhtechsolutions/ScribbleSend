import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { PopingBold, PoppinsExtraBold } from '../../utils/Fonts';
import { White } from '../../utils/Color';

const Button = ({ onPress, title, style, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: White,
    fontSize: 16,
    fontFamily:PopingBold
  },
});

export default Button;
