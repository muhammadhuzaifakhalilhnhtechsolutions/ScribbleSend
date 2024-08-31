import React, { useState } from 'react';
import {
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
import { Black, Gray, THEME_COLOR, White } from '../../../utils/Color';
import { PopingBold, PoppinsRegular } from '../../../utils/Fonts';
import { Formik } from 'formik';
import { ResetPasswordSchema } from '../../../Schema/Schemas';
import Loader from '../../../components/Loader/Loader';
import { PostApiWithOutToken } from '../../../api/helper';
import { BaseUrl } from '../../../api/BaseUrl';
import { CommonActions } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

const ResetPassword = ({ navigation, route }) => {
  const [isLoading, setisLoading] = useState(false);

  return (
    <SafeAreaView style={styles.main}>
      {isLoading && <Loader />}
      <StatusBar backgroundColor={White} barStyle={'dark-content'} />
      <ImageBackground
        style={styles.Backimg}
        source={require('../../../assets/images/background.png')}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView>
            <Text style={styles.testwelcome}>Forgot Password?</Text>
            <Text style={styles.WllcomeText}>
              Enter a new password to reset the password on your account. We'll
              ask for this password whenever you log in.
            </Text>
            <Formik
              initialValues={{ new_password: '', confrimPassword: '' }}
              validationSchema={ResetPasswordSchema}
              onSubmit={values => {
                setisLoading(true);
                // console.log('values', values);
                const formdata = new FormData();
                formdata.append('token', route?.params);
                formdata.append('password', values.new_password);
                formdata.append(
                  'password_confirmation',
                  values.confrimPassword,
                );

                PostApiWithOutToken(
                  `${BaseUrl}/api/teacher/reset_password`,
                  formdata,
                )
                  .then(res => {
                    console.log('res reset==>', res.data);
                    if (res.data?.status) {
                      setisLoading(false);
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 1,
                          routes: [{ name: 'Login' }],
                        }),
                      );
                      showMessage({
                        message: 'Success',
                        description: 'Password reset successfully',
                        type: 'success',
                        floating: true,
                        animated: true,
                      });
                    } else {
                      setisLoading(false);
                      showMessage({
                        message: 'Failed',
                        description: res.data?.error,
                        type: 'danger',
                        floating: true,
                        animated: true,
                      });
                    }
                  })
                  .catch(error => {
                    console.log('error reset==>', error?.response?.data);
                    setisLoading(false);
                    showMessage({
                      message: 'Failed',
                      description: 'Something went wrong!',
                      type: 'danger',
                      floating: true,
                      animated: true,
                    });
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
                    placeholder={'Password'}
                    cursorColor={THEME_COLOR}
                    placeholderTextColor={Gray}
                    style={styles.textInput}
                    value={values.new_password}
                    onChangeText={handleChange('new_password')}
                    onBlur={handleBlur('new_password')}
                  />
                  {touched.new_password && errors.new_password ? (
                    <Text style={styles.validation}>{errors.new_password}</Text>
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
                    onPress={handleSubmit}
                    title={'Update Password'}
                    style={styles.SigninButton}
                  />
                </View>
              )}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: White,
    justifyContent: 'center',
  },
  Backimg: {
    flex: 1,
    width: '96%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  testwelcome: {
    fontFamily: PopingBold,
    color: THEME_COLOR,
    fontSize: 25,
    textAlign: 'center',
  },
  WllcomeText: {
    fontFamily: PoppinsRegular,
    paddingHorizontal: 10,
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
  validation: {
    color: 'red',
    paddingLeft: 10,
    textAlign: 'left',
    width: '100%',
    fontFamily: PoppinsRegular,
    marginTop: -14,
  },
});
