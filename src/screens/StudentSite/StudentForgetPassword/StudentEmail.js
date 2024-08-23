import React, { useState } from 'react';
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
import { Black, Gray, THEME_COLOR, White } from '../../../utils/Color';
import { PopingBold, PoppinsRegular } from '../../../utils/Fonts';
import { PostApiWithOutToken } from '../../../api/helper';
import { BaseUrl } from '../../../api/BaseUrl';
import { Formik } from 'formik';
import { ForgotEmail } from '../../../Schema/Schemas';
import BackHeader from '../../../components/ShortHeader/ShortHeader';
import Loader from '../../../components/Loader/Loader';
import { showMessage } from 'react-native-flash-message';

const StudentEmail = ({ navigation }) => {
  const [isLoading, setisLoading] = useState(false);

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={White} barStyle={'dark-content'} />
      <BackHeader onPress={() => navigation.goBack()} />
      {isLoading && <Loader />}
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
            <Formik
              initialValues={{ email: '' }}
              validationSchema={ForgotEmail}
              onSubmit={values => {
                setisLoading(true);
                const userEmail = values.email?.toLocaleLowerCase()?.trim();

                const formdata = new FormData();
                formdata.append('email', userEmail);

                PostApiWithOutToken(`${BaseUrl}/api/student/forget`, formdata)
                  .then(res => {
                    console.log('res forgot===>', res?.data);
                    if (res?.data?.status) {
                      setisLoading(false);
                      navigation.navigate('StudentOtp', { email: userEmail });
                      showMessage({
                        message: 'Success',
                        description: res?.data?.response,
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
                        animated: true,
                        floating: true,
                      });
                    }
                  })
                  .catch(error => {
                    console.log('err forgot===>', error);
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
                    placeholder={'Email'}
                    placeholderTextColor={Gray}
                    style={styles.TextInput}
                    cursorColor={THEME_COLOR}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                  {touched.email && errors.email ? (
                    <Text style={styles.validation}>{errors.email}</Text>
                  ) : null}
                  <Button
                    onPress={handleSubmit}
                    title={'Confirm Email'}
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
  validation: {
    color: 'red',
    paddingLeft: 10,
    textAlign: 'left',
    width: '100%',
    fontFamily: PoppinsRegular,
    marginTop: -14,
  },
});
