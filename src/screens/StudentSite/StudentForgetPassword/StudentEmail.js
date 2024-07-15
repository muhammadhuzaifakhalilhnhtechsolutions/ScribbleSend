import React from 'react';
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from '../../../components/Button/Button';
import Input from '../../../components/TextInput/Input';
import {
  Black,
  DarkGrey,
  Gray,
  LightGrey,
  THEME_COLOR,
  White,
} from '../../../utils/Color';
import { PopingBold, PoppinsRegular } from '../../../utils/Fonts';

const StudentEmail = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={White} barStyle={'dark-content'} />
      <ImageBackground
        style={styles.Backimg}
        source={require('../../../assets/images/background.png')}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <Text style={styles.testwelcome}>Forgot Password</Text>
            <Text style={styles.WllcomeText}>
              Don’t worry! it happens. Please enter email address associated
              with your account
            </Text>
            <View style={styles.TextInputDiv}>
              <Input
                placeholder={'Email'}
                placeholderTextColor={Gray}
                style={styles.TextInput}
                cursorColor={THEME_COLOR}
              />

              <Button
                onPress={() => navigation.navigate('StudentOtp')}
                title={'Confrim Email'}
                style={styles.SigninButton}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default StudentEmail;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: White,
    width: '100%',
  },
  Backimg: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  testwelcome: {
    fontFamily: PopingBold,
    color: THEME_COLOR,
    fontSize: 25,
    textAlign: 'center',
  },
  WllcomeText: {
    fontFamily: PoppinsRegular,
    marginHorizontal: 10,
    color: Black,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  TextInputDiv: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  TextInput: {
    width: '100%',
    marginVertical: 15,
    color: Black,
  },
  SigninButton: {
    width: '95%',
    marginVertical: 15,
    shadowColor: THEME_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
