import React, { useState } from 'react';
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
import Button from '../../components/Button/Button';
import { Black, ThemoColor, White } from '../../utils/Color';
import { PopingBold, PoppinsRegular } from '../../utils/Fonts';
import { HandleMainScreen } from '../../stores/actions/user.action';
import { useDispatch, useSelector } from 'react-redux';

const UserType = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar translucent hidden/>
      <ScrollView contentContainerStyle={{ height: HEIGHT.height / 1 }}>
        <View style={styles.ImageDiv}>
          <FastImage
            style={styles.image}
            resizeMode="cover"
            source={require('../../assets/images/BackgroundChild.png')}
          />
          <Text style={styles.FindText}>Select Your Role</Text>
          <Text style={styles.LorenText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit enim,
            ac amet ultrices.
          </Text>
          <View style={styles.ButtonDiv}>
            <Button
              onPress={() => navigation.navigate('Studentwellcome')}
              title={'Student'}
              style={styles.LoginButton}
            />
            <Button
              onPress={() => navigation.navigate('Wellcome')}
              style={styles.Register}
              title={'Teacher'}
              textStyle={styles.text}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserType;
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
    color: ThemoColor,
    fontFamily: PopingBold,
  },
  LorenText: {
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
  },
  ButtonDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 35,
  },
});
