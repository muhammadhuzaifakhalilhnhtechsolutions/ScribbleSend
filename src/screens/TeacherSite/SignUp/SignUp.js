import {
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
import React, { useEffect, useState } from 'react';
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
import { Formik } from 'formik';
import { SignupSchema } from '../../../Schema/Schemas';
import { PostApiWithOutTokenSignUp } from '../../../api/helper';
import { BaseUrl } from '../../../api/BaseUrl';
import Loader from '../../../components/Loader/Loader';
import { showMessage } from 'react-native-flash-message';
import messaging from '@react-native-firebase/messaging';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const SignUp = ({ navigation }) => {
  const [isLoading, setisLoading] = useState(false);
  const [fcmToken, setFcmToken] = useState('');
  const [userDetailsGoogle, setuserDetailsGoogle] = useState(null);

  useEffect(() => {
    requestFCM();
  }, []);

  const requestFCM = async () => {
    messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
        } else {
          messaging()
            .requestPermission()
            .then(e => {
              console.log('permission', e);
            })
            .catch(error => {
              console.log('fcm error', error);
            });
        }
      })
      .catch(err => console.log('fcm catch err', err));

    messaging()
      .getToken()
      .then(token => {
        setFcmToken(token);
      });
  };

  console.log('fcm token==>', fcmToken);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setuserDetailsGoogle({ userInfo });
      console.log('res google signin==>', userInfo);
    } catch (error) {
      console.log('error google signin==>', error);
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={White} barStyle={'dark-content'} />
      {isLoading && <Loader />}
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
            <Formik
              initialValues={{
                email: '',
                password: '',
                confrimPassword: '',
                FullName: '',
              }}
              validationSchema={SignupSchema}
              onSubmit={values => {
                setisLoading(true);
                console.log('values', values);
                const userEmail = values.email?.toLocaleLowerCase()?.trim();

                const formdata = new FormData();
                formdata.append('name', values.FullName);
                formdata.append('email', userEmail);
                formdata.append('password', values.confrimPassword);

                PostApiWithOutTokenSignUp(
                  `${BaseUrl}/api/teacher/store`,
                  formdata,
                )
                  .then(res => {
                    console.log('res signup==>', res.data);
                    if (res.data?.status) {
                      navigation.navigate('Login');
                      // dispatch(updateUser(res.data));
                      setisLoading(false);
                      showMessage({
                        message: 'Success',
                        description: res.data?.response,
                        type: 'success',
                        floating: true,
                        animated: true,
                      });
                    } else {
                      setisLoading(false);
                    }
                  })
                  .catch(error => {
                    console.log('error signup==>', error);
                    setisLoading(false);
                    const errorKeys =
                      error && Object.keys(error?.response?.data?.errors);
                    if (errorKeys?.length > 0) {
                      errorKeys.forEach(key => {
                        error?.response?.data?.errors[key]?.forEach(
                          errorMsg => {
                            showMessage({
                              message: 'Failed',
                              description: errorMsg,
                              type: 'danger',
                              animated: true,
                              floating: true,
                            });
                          },
                        );
                      });
                    }
                  });
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.TextInputDiv}>
                  <Input
                    placeholder={'Full Name'}
                    placeholderTextColor={Gray}
                    style={styles.textInput}
                    cursorColor={THEME_COLOR}
                    value={values.FullName}
                    onChangeText={handleChange('FullName')}
                    onBlur={handleBlur('FullName')}
                  />
                  {touched.FullName && errors.FullName ? (
                    <Text style={styles.validation}>{errors.FullName}</Text>
                  ) : null}
                  <Input
                    placeholder={'Email'}
                    placeholderTextColor={Gray}
                    style={styles.textInput}
                    cursorColor={THEME_COLOR}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                  {touched.email && errors.email ? (
                    <Text style={styles.validation}>{errors.email}</Text>
                  ) : null}
                  <Input
                    placeholder={'Password'}
                    cursorColor={THEME_COLOR}
                    placeholderTextColor={Gray}
                    style={styles.textInput}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                  />
                  {touched.password && errors.password ? (
                    <Text style={styles.validation}>{errors.password}</Text>
                  ) : null}
                  <Input
                    placeholder={'Confirm Password'}
                    cursorColor={THEME_COLOR}
                    placeholderTextColor={Gray}
                    style={styles.textInput}
                    value={values.confrimPassword}
                    onChangeText={handleChange('confrimPassword')}
                    onBlur={handleBlur('confrimPassword')}
                  />
                  {touched.confrimPassword && errors.confrimPassword ? (
                    <Text style={styles.validation}>
                      {errors.confrimPassword}
                    </Text>
                  ) : null}
                  <Button
                    title={'Sign Up'}
                    style={styles.SigninButton}
                    onPress={handleSubmit}
                  />
                </View>
              )}
            </Formik>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styles.CrateDiv}>
              <Text style={styles.CreatText}>
                Already have an account?{' '}
                <Text
                  style={{
                    ...styles.ContinueText,
                    fontFamily: PopingBold,
                  }}>
                  Login
                </Text>
              </Text>
            </TouchableOpacity>
            <View style={styles.SocialDiv}>
              <Text style={styles.ContinueText}>Or continue with</Text>
              <TouchableOpacity
                style={styles.SocialCard}
                onPress={signInWithGoogle}>
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

export default SignUp;

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
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: '100%',
    marginVertical: 10,
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
    fontFamily: PoppinsRegular,
  },
  validation: {
    color: 'red',
    paddingLeft: 10,
    textAlign: 'left',
    width: '100%',
    fontFamily: PoppinsRegular,
    marginTop: -14,
  },
});
