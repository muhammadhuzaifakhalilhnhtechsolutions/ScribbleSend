import { Dimensions, StyleSheet, View, ActivityIndicator } from 'react-native';
import React from 'react';
import { THEME_COLOR } from '../../utils/Color';

const { height, width } = Dimensions.get('screen');
const Loader = ({ color }) => {
  return (
    <View style={styles.Loaders}>
      <ActivityIndicator color={color ? color : THEME_COLOR} size={'large'} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  Loaders: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 999,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    height: height,
    width: width,
  },
});
