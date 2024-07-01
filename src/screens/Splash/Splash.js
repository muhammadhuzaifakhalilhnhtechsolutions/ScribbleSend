import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { Black, ThemoColor, White } from '../../utils/Color';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import { PopingBold, PoppinsRegular } from '../../utils/Fonts';
import Button from '../../components/Button/Button';

const Splash = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.Main}>
      <StatusBar backgroundColor={ThemoColor} hidden />

      <ImageBackground
        style={styles.Backimg}
        source={require('../../assets/images/background.png')}>
        <View style={styles.ImageDiv}>
          <FastImage
            style={{ height: '80%', width: '70%' }}
            source={require('../../assets/images/Logo.png')}
            resizeMode="contain"
          />
        </View>
        <View style={styles.TextView}>
          <Text style={styles.testwelcome}>Hello and {'\n'}welcome here!</Text>
          <View style={styles.bittondiv}>
            {/* <Button
              onPress={() => navigation.navigate('UserType')}
              title={'Let’s Start'}
              style={styles.button}
              textStyle={styles.text}
            /> */}
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    backgroundColor: ThemoColor,
  },
  Backimg: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageDiv: {
    height: 110,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextView: {
    top:70,
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
