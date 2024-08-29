import React, { useEffect, useState } from 'react';
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
  Gray,
  LightGrey,
  THEME_COLOR,
  White,
} from '../../../utils/Color';
import { PopingBold, PoppinsRegular } from '../../../utils/Fonts';
import { Formik } from 'formik';
import { LoginSchema } from '../../../Schema/Schemas';
import Loader from '../../../components/Loader/Loader';
import { PostApiWithOutToken } from '../../../api/helper';
import { BaseUrl } from '../../../api/BaseUrl';
import { useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { updateUser } from '../../../stores/actions/userAction';
import messaging from '@react-native-firebase/messaging';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Login = ({ navigation, route }) => {
  const [isLoading, setisLoading] = useState(false);
  const [fcmToken, setFcmToken] = useState('');
  const [userDetailsGoogle, setuserDetailsGoogle] = useState(null);
  const dispatch = useDispatch();

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
            <Text style={styles.testwelcome}>Login here</Text>
            <Text style={styles.WllcomeText}>
              Welcome back you’ve {'\n'}
              been missed!
            </Text>

            <Formik
              initialValues={{ password: '', email: '' }}
              validationSchema={LoginSchema}
              onSubmit={values => {
                console.log('values', values);
                const userEmail = values.email?.toLocaleLowerCase()?.trim();
                setisLoading(true);
                const formdata = new FormData();
                formdata.append('type', 'teacher');
                formdata.append('email', userEmail);
                formdata.append('password', values.password);

                PostApiWithOutToken(`${BaseUrl}/api/login`, formdata)
                  .then(res => {
                    console.log('login res==>', res.data);
                    if (res.data?.status) {
                      dispatch(updateUser(res?.data));
                      setisLoading(false);
                      showMessage({
                        message: 'Success',
                        description: 'Login successful',
                        type: 'success',
                        animated: true,
                        floating: true,
                      });
                    } else {
                      setisLoading(false);
                      showMessage({
                        message: 'Failed',
                        description: res?.data?.error,
                        type: 'danger',
                        animated: true,
                        floating: true,
                      });
                    }
                  })
                  .catch(error => {
                    console.log('err login===>', error);
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
                <>
                  <View style={styles.TextInputDiv}>
                    <Input
                      placeholder={'Email'}
                      placeholderTextColor={Gray}
                      style={styles.textInput}
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
                    <View style={styles.ForgerPassDiv}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Email')}>
                        <Text style={styles.Forgettext}>
                          Forgot your password?
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <Button
                      onPress={handleSubmit}
                      title={'Sign in'}
                      style={styles.SigninButton}
                    />

                    <TouchableOpacity
                      onPress={() => navigation.navigate('SignUp')}
                      style={styles.CrateDiv}>
                      <Text style={styles.CreatText}>Create new account</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.SocialDiv} onPress={signInWithGoogle}>
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
                </>
              )}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;
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
    marginVertical: 10,
    color: Black,
  },
  ForgerPassDiv: {
    width: '95%',
    alignItems: 'flex-end',
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
  validation: {
    color: 'red',
    paddingLeft: 10,
    textAlign: 'left',
    width: '100%',
    fontFamily: PoppinsRegular,
    marginTop: -14,
  },
});
