import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Button from '../../../components/Button/Button';
import { Black, THEME_COLOR, White } from '../../../utils/Color';
import { PopingBold, PoppinsRegular } from '../../../utils/Fonts';
const Studentwellcome = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={White} barStyle={'dark-content'} />
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.ImageDiv}>
          <FastImage
            style={styles.image}
            resizeMode="cover"
            source={require('../../../assets/images/StudentBack.jpeg')}
          />
          <Text style={styles.FindText}>Find your favorite {'\n'}class</Text>
          <Text style={styles.LorenText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit enim,
            ac amet ultrices.
          </Text>
          <View style={styles.ButtonDiv}>
            <Button
              onPress={() =>
                navigation.navigate('StudentLogin', {
                  role: route.params?.role,
                })
              }
              title={'Login'}
              style={styles.LoginButton}
            />
            <Button
              onPress={() =>
                navigation.navigate('StudentSignUp', {
                  role: route.params?.role,
                })
              }
              style={styles.Register}
              title={'Register'}
              textStyle={styles.text}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Studentwellcome;
const HEIGHT = Dimensions.get('screen');
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: White,
  },
  ImageDiv: {
    height: HEIGHT.height / 1.9,
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  FindText: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 25,
    color: THEME_COLOR,
    fontFamily: PopingBold,
  },
  LorenText: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 5,
    textAlign: 'center',
    fontSize: 15,
    color: Black,
    fontFamily: PoppinsRegular,
  },
  Register: {
    backgroundColor: White,
    borderWidth: 1,
    width: '35%',
  },
  text: {
    color: Black,
    borderRadius: 20,
  },
  LoginButton: {
    marginRight: 30,
    width: '35%',
    shadowColor: THEME_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  ButtonDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 35,
  },
});
