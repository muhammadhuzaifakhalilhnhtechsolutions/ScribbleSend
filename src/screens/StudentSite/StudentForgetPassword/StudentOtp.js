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
    View
} from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Button from '../../../components/Button/Button';
import {
    Black,
    ThemoColor,
    White
} from '../../../utils/Color';
import { PopingBold, PoppinsRegular } from '../../../utils/Fonts';
const { height, width } = Dimensions.get('screen');
const StudentOtp = ({ navigation, props }) => {
  const CELL_COUNT = 4;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [propsFiled, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor={White} translucent hidden={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
        <ScrollView>
          <ImageBackground
            style={styles.Backimg}
            source={require('../../../assets/images/background.png')}>
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
                onPress={() => navigation.navigate('StudentResetPassword')}
                title={'Verification'}
                style={styles.SigninButton}
              />
            </View>
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StudentOtp;
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
    justifyContent: 'center',
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
    color: Black,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  WllcomeTexts: {},
  cell: {
    width: 45,
    height: 45,
    fontSize: 22,
    paddingTop: Platform.OS == 'ios' ? 10 : 0,
    color: White,
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: '#5e9dff',
    textAlignVertical: 'center',
    overflow: 'hidden',
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
    shadowColor: ThemoColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
