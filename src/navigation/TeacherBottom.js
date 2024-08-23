import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  BG_COLOR,
  Black,
  THEME_COLOR,
  THEME_COLOR_LIGHT,
  White,
} from '../utils/Color';
import { PopingBold } from '../utils/Fonts';

const TeacherBottom = ({
  descriptors,
  customStyles,
  state,
  navigation,
  ...props
}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions?.tabBarStyle?.display == 'none') {
    return null;
  }
  return (
    <View style={styles.conatiner}>
      <TouchableOpacity
        style={{
          ...styles.tabsDiv,
          backgroundColor: state.index == 0 ? THEME_COLOR_LIGHT : White,
        }}
        onPress={() => {
          navigation.navigate('Dashboard');
        }}>
        <Icon
          name="home"
          size={24}
          color={state.index === 0 ? THEME_COLOR : Black}
        />
        <Text
          style={{
            ...styles.text,
            color: state.index === 0 ? THEME_COLOR : Black,
          }}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...styles.tabsDiv,
          backgroundColor: state.index == 1 ? THEME_COLOR_LIGHT : White,
        }}
        onPress={() => {
          navigation.navigate('Setting');
        }}>
        <Icon
          name="settings"
          size={24}
          color={state.index === 1 ? THEME_COLOR : Black}
        />
        <Text
          style={{
            ...styles.text,
            color: state.index === 1 ? THEME_COLOR : Black,
          }}>
          Settins
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TeacherBottom;

const styles = StyleSheet.create({
  conatiner: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: BG_COLOR,
    width: '100%',
    shadowColor: Black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  tabsDiv: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  text: {
    fontSize: 12,
    color: THEME_COLOR,
    fontFamily: PopingBold,
  },
});
