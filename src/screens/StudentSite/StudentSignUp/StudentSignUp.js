import {
  Dimensions,
  ImageBackground,
  StatusBar,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import {
  Black,
  DarkGrey,
  Gray,
  LightGrey,
  THEME_COLOR,
  White,
} from '../../../utils/Color';
import { PopingBold, PoppinsRegular } from '../../../utils/Fonts';
import Input from '../../../components/TextInput/Input';
import Button from '../../../components/Button/Button';
import FastImage from 'react-native-fast-image';

const StudentSignUp = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={White} barStyle={'dark-content'} />
      <ImageBackground
        style={styles.Backimg}
        source={require('../../../assets/images/background.png')}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Text style={styles.testwelcome}>Create Account</Text>
            <Text style={styles.WllcomeText}>
              Create an account so you can explore all the {'\n'}existing jobs
            </Text>
            <View style={styles.TextInputDiv}>
              <Input
                placeholder={'Email'}
                placeholderTextColor={Gray}
                style={styles.textInput}
                cursorColor={THEME_COLOR}
              />
              <Input
                placeholder={'Password'}
                cursorColor={THEME_COLOR}
                placeholderTextColor={Gray}
                style={styles.textInput}
              />
              <Input
                placeholder={'Confrim Password'}
                cursorColor={THEME_COLOR}
                placeholderTextColor={Gray}
                style={styles.textInput}
              />
              <Button title={'Sign Up'} style={styles.SigninButton} />
              <TouchableOpacity
                onPress={() => navigation.navigate('StudentLogin')}
                style={styles.CrateDiv}>
                <Text style={styles.CreatText}>Already have an account</Text>
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
                <Text style={styles.TextGoogle}>SignUp With Google</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default StudentSignUp;
const HEIGHT = Dimensions.get('screen');
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: White,
    width: '100%',
  },
  Backimg: {
    flex: 1,
    width: '100%',
  },
  testwelcome: {
    fontFamily: PopingBold,
    color: THEME_COLOR,
    fontSize: 25,
    textAlign: 'center',
    marginTop: 50,
  },
  WllcomeText: {
    fontFamily: PoppinsRegular,
    color: Black,
    fontSize: 12,
    textAlign: 'center',
    width: '100%',
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
  Forgettext: {
    textAlign: 'right',
    width: '95%',
    color: THEME_COLOR,
    fontFamily: PopingBold,
    fontSize: 13,
    marginVertical: 15,
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
    color: THEME_COLOR,
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
