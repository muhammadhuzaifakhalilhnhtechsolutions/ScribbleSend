import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Black, DarkGrey, Grey, LightGrey, ThemoColor } from '../../utils/Color';

const Input = ({
  placeholder,
  placeholderTextColor,
  onChangeText,
  value,
  style,
  cursorColor
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = placeholder.toLowerCase().includes('password');

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.ViewDiv}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChangeText}
        cursorColor={cursorColor}
        value={value}
        secureTextEntry={isPassword && !isPasswordVisible}
        style={[styles.inputstyles, style]}
      />
      {isPassword && (
        <TouchableOpacity style={styles.icon} onPress={togglePasswordVisibility}>
          <Ionicons
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            size={20}
            color={Grey}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  ViewDiv: {
    width: '95%',
    position: 'relative'
  },
  inputstyles: {
    backgroundColor: LightGrey,
    width: '100%',
    borderRadius: 10,
    paddingLeft: 10,
    paddingVertical: 12,
    paddingRight: 40 // Add padding to the right to make space for the icon
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }]
  }
});
