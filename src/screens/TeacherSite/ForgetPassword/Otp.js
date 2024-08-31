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
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Button from '../../../components/Button/Button';
import { Black, THEME_COLOR, White } from '../../../utils/Color';
import { PopingBold, PoppinsRegular } from '../../../utils/Fonts';
import { PostApiWithOutToken } from '../../../api/helper';
import { BaseUrl } from '../../../api/BaseUrl';
import { CommonActions } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import Loader from '../../../components/Loader/Loader';
const { height, width } = Dimensions.get('screen');

const Otp = ({ navigation, route }) => {
  const CELL_COUNT = 4;
  const [value, setValue] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [propsFiled, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleSubmit = () => {
    setisLoading(true);
    const formdata = new FormData();
    formdata.append('token', value);
    formdata.append('email', route.params?.email);

    PostApiWithOutToken(`${BaseUrl}/api/teacher/otp/verify`, formdata)
      .then(res => {
        console.log('res otp check==>', res.data);
        if (res.data.status) {
          setisLoading(false);
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: 'ResetPassword', params: value }],
            }),
          );
          // navigation.navigate('StudentResetPassword');
          showMessage({
            message: 'Success',
            description: 'OTP verified successfully',
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
        setisLoading(false);
        console.log('error otp check==>', error);
        showMessage({
          message: 'Failed',
          description: 'OTP mismatch!',
          type: 'danger',
          floating: true,
          animated: true,
        });
      });
  };

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={White} barStyle={'dark-content'} />
      {isLoading && <Loader />}
      <ImageBackground
        style={styles.Backimg}
        source={require('../../../assets/images/background.png')}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
          <ScrollView>
            <Text style={styles.testwelcome}>OTP Verification</Text>
            <Text style={styles.WllcomeText}>
              Enter the security code sent to your email
            </Text>

            <View style={styles.OtpView}>
              <CodeField
                ref={ref}
                {...propsFiled}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
            </View>
            <View style={styles.underlineStyleBase}>
              <Button
                onPress={handleSubmit}
                title={'Verification'}
                style={styles.SigninButton}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Otp;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: White,
    justifyContent: 'center',
  },
  Backimg: {
    flex: 1,
    width: '100%',
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
    color: Black,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  cell: {
    width: 45,
    height: 45,
    fontSize: 22,
    paddingTop: Platform.OS == 'ios' ? 10 : 0,
    color: Black,
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: '#d1e3ff',
    textAlignVertical: 'center',
    overflow: 'hidden',
  },
  focusCell: {
    borderWidth: 1,
    borderColor: THEME_COLOR,
  },
  underlineStyleBase: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  OtpView: {
    height: height / 8,
    marginHorizontal: 40,
  },
  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  SigninButton: {
    width: '80%',
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
