import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { Black, THEME_COLOR, White } from '../../utils/Color';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import { PopingBold, PoppinsRegular } from '../../utils/Fonts';

const { height } = Dimensions.get('screen');

const Splash = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.Main}>
      <StatusBar backgroundColor={THEME_COLOR} barStyle={'light-content'} />
      <ImageBackground
        style={styles.Backimg}
        source={require('../../assets/images/background.png')}>
        <View style={styles.ImageDiv}>
          <FastImage
            style={{ height: '80%', width: '70%' }}
            source={require('../../assets/images/logoBlack.png')}
            resizeMode="contain"
          />
        </View>
        <View style={styles.TextView}>
          <Text style={styles.testwelcome}>Hello and {'\n'}welcome here!</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    backgroundColor: THEME_COLOR,
  },
  Backimg: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageDiv: {
    height: height * 0.3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextView: {
    top: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  testwelcome: {
    fontFamily: PopingBold,
    color: White,
    fontSize: 20,
    textAlign: 'center',
  },
  bittondiv: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: White,
    marginVertical: 10,
  },
  text: {
    color: Black,
    fontFamily: PoppinsRegular,
  },
});
