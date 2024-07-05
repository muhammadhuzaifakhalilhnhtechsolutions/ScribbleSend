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
    TouchableOpacity,
    View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Button from '../../../components/Button/Button';
import Input from '../../../components/TextInput/Input';
import {
    Black,
    DarkGrey,
    Grey,
    LightGrey,
    ThemoColor,
    White,
} from '../../../utils/Color';
import { PopingBold, PoppinsRegular } from '../../../utils/Fonts';

const Login = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={White} translucent hidden={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ImageBackground
            style={styles.Backimg}
            source={require('../../../assets/images/background.png')}>
            <Text style={styles.testwelcome}>Login here</Text>
            <Text style={styles.WllcomeText}>
              Welcome back you’ve {'\n'}
              been missed!
            </Text>
            <View style={styles.TextInputDiv}>
              <Input
                placeholder={'Email'}
                placeholderTextColor={Grey}
                style={styles.textInput}
              />
              <Input
                placeholder={'Password'}
                cursorColor={ThemoColor}
                placeholderTextColor={Grey}
                style={styles.textInput}
              />
              <View style={styles.ForgerPassDiv}>
                <TouchableOpacity onPress={() => navigation.navigate('Email')}>
                  <Text style={styles.Forgettext}>Forgot your password?</Text>
                </TouchableOpacity>
              </View>

              <Button
                onPress={() => navigation.navigate('ScribbleBottom')}
                title={'Sign in'}
                style={styles.SigninButton}
              />

              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
                style={styles.CrateDiv}>
                <Text style={styles.CreatText}>Create new account</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.SocialDiv}>
              <Text style={styles.ContinueText}>Or continue with</Text>
              <TouchableOpacity style={styles.SocialCard}>
                <FastImage
                  resizeMode="center"
                  style={styles.Image}
                  source={require('../../../assets/images/G.png')}
                />
                <Text style={styles.TextGoogle}>Login With Google</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
const HEIGHT = Dimensions.get('screen');
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: White,
  },
  Backimg: {
    height: '100%',
    width: '100%',
  },

  testwelcome: {
    fontFamily: PopingBold,
    color: ThemoColor,
    fontSize: 25,
    textAlign: 'center',
    marginTop: 50,
  },
  WllcomeText: {
    fontFamily: PopingBold,
    color: Black,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  TextInputDiv: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: '100%',
    marginVertical: 15,
    color: Black,
  },
  ForgerPassDiv: {
    width: '95%',
    alignItems: 'flex-end',
  },
  Forgettext: {
    textAlign: 'right',
    width: '95%',
    color: ThemoColor,
    fontFamily: PopingBold,
    fontSize: 13,
    marginVertical: 15,
  },
  SigninButton: {
    width: '95%',
    marginVertical: 15,
    shadowColor: ThemoColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  CreatText: {
    color: DarkGrey,
    textAlign: 'center',
    fontFamily: PoppinsRegular,
    marginVertical: 15,
  },
  SocialDiv: {
    marginVertical: 15,
  },
  SocialMain: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  ContinueText: {
    textAlign: 'center',
    color: ThemoColor,
  },
  SocialCard: {
    marginVertical: 10,
    height: 50,
    width: '95%',
    borderRadius: 10,
    backgroundColor: LightGrey,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    flexDirection: 'row',
  },
  Image: {
    height: '55%',
    width: '15%',
  },
  TextGoogle: {
    color: Black,
    fontSize: 15,
  },
});
