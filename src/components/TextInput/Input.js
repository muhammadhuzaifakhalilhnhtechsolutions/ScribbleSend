import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Black,
  DarkGrey,
  Gray,
  LightGrey,
  THEME_COLOR,
} from '../../utils/Color';
import { PoppinsRegular } from '../../utils/Fonts';

const Input = ({
  placeholder,
  placeholderTextColor,
  onChangeText,
  value,
  style,
  cursorColor,
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
        cursorColor={THEME_COLOR}
        value={value}
        secureTextEntry={isPassword && !isPasswordVisible}
        style={[
          { ...styles.inputstyles, paddingRight: isPassword && 40 },
          style,
        ]}
      />
      {isPassword && (
        <TouchableOpacity
          style={styles.icon}
          onPress={togglePasswordVisibility}>
          <Ionicons
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            size={20}
            color={Gray}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  ViewDiv: {
    minWidth: '96%',
    maxWidth: '96%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  inputstyles: {
    backgroundColor: LightGrey,
    width: '100%',
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 14,
    color: Black,
    fontFamily: PoppinsRegular,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
});
