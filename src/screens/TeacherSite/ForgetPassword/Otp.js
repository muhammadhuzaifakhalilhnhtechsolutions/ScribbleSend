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
const { height, width } = Dimensions.get('screen');
const Otp = ({ navigation, props }) => {
  const CELL_COUNT = 4;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [propsFiled, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={White} barStyle={'dark-content'} />
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
                onPress={() => navigation.navigate('ResetPassword')}
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
