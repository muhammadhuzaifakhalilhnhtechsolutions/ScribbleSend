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
    View
} from 'react-native';
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

const StudentEmail = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={White} translucent hidden={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ImageBackground
            style={styles.Backimg}
            source={require('../../../assets/images/background.png')}>
            <Text style={styles.testwelcome}>Forgot Password</Text>
            <Text style={styles.WllcomeText}>
              Don’t worry! it happens. Please enter email address associated
              with your account
            </Text>
            <View style={styles.TextInputDiv}>
              <Input
                placeholder={'Email'}
                placeholderTextColor={Grey}
                style={styles.textInput}
              />

              <Button
                onPress={() => navigation.navigate('StudentOtp')}
                title={'Confrim Email'}
                style={styles.SigninButton}
              />
            </View>
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StudentEmail;
const HEIGHT = Dimensions.get('screen');
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: White,
    justifyContent: 'center',
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
