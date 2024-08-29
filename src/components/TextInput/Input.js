import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
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
  placeholder = 'Placeholder',
  placeholderTextColor = '#64748B',
  onChangeText,
  value,
  style,
  numberOfLines = 1,
  multiline,
  onBlur,
  editable,
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
        placeholderTextColor={
          placeholderTextColor ? placeholderTextColor : 'gray'
        }
        onChangeText={onChangeText}
        cursorColor={THEME_COLOR}
        value={value}
        numberOfLines={numberOfLines}
        multiline={multiline}
        onBlur={onBlur}
        editable={editable}
        secureTextEntry={isPassword && !isPasswordVisible}
        style={[
          { ...styles.inputstyles, paddingRight: isPassword ? 40 : 0 },
          style,
        ]}
      />
      {isPassword && (
        <TouchableOpacity
          style={styles.icon}
          onPress={togglePasswordVisibility}>
          <Ionicons
            name={isPasswordVisible ? 'eye' : 'eye-off'}
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
    paddingVertical: Platform.OS === 'ios' ? 16 : 10,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
});
