import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { THEME_COLOR, White } from '../../utils/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PopingBold } from '../../utils/Fonts';

const Header = ({ icon, title, onPress }) => {
  return (
    <View style={styles.container}>
      {icon && (
        <TouchableOpacity style={styles.backBtnDiv} onPress={onPress}>
          <Ionicons name="chevron-back" size={24} color={White} />
        </TouchableOpacity>
      )}
      <View
        style={{
          ...styles.divTitle,
          width: icon ? '90%' : '100%',
          right: icon ? 10 : 0,
        }}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME_COLOR,
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  backBtnDiv: {
    width: '10%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divTitle: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: White,
    fontSize: 18,
    fontFamily: PopingBold,
    textAlign: 'center',
  },
});
