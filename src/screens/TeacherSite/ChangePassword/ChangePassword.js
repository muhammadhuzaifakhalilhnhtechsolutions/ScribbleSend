import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { BG_COLOR, Black, THEME_COLOR, White } from '../../../utils/Color';
import Header from '../../../components/Header/Header';
import Input from '../../../components/TextInput/Input';
import { PopingBold, PoppinsRegular } from '../../../utils/Fonts';
import { Formik } from 'formik';
import { ChangePasswordSchema } from '../../../Schema/Schemas';
import Button from '../../../components/Button/Button';
import { PostApi } from '../../../api/helper';
import { BaseUrl } from '../../../api/BaseUrl';
import { useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import Loader from '../../../components/Loader/Loader';

const ChangePassword = ({ navigation }) => {
  const [isLoading, setisLoading] = useState(false);
  const userData = useSelector(state => state.userReducer?.user?.data);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={THEME_COLOR} />
      {isLoading && <Loader />}
      <Header
        icon={true}
        onPress={() => navigation.goBack()}
        title={'Change Password'}
      />
      <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          }}
          validationSchema={ChangePasswordSchema}
          onSubmit={values => {
            console.log('values', values);
            setisLoading(true);
            const formdata = new FormData();
            formdata.append('current_password', values.currentPassword);
            formdata.append('new_password', values.confirmPassword);

            PostApi(
              `${BaseUrl}/api/teacher/change/password`,
              formdata,
              userData?.token,
            )
              .then(res => {
                console.log('res==>', res?.data);
                if (res.data?.status) {
                  setisLoading(false);
                  navigation.goBack();
                  showMessage({
                    message: 'Success',
                    description: 'Password updated successfully',
                    type: 'success',
                    animated: true,
                    floating: true,
                  });
                } else {
                  setisLoading(false);
                  showMessage({
                    message: 'Failed',
                    description:
                      'something went wrong! Please try again later.',
                    type: 'danger',
                    animated: true,
                    floating: true,
                  });
                }
              })
              .catch(error => {
                console.log('err===>', error?.response?.data);
                setisLoading(false);
                const errorKeys =
                  error && Object.keys(error?.response?.data?.errors);

                if (errorKeys?.length > 0) {
                  errorKeys?.forEach(key => {
                    if (key == 'current_password') {
                      showMessage({
                        message: 'Failed',
                        description: 'The current password is incorrect.',
                        type: 'danger',
                        animated: true,
                        floating: true,
                      });
                    } else {
                      error?.response?.data?.errors[key]?.forEach(errorMsg => {
                        showMessage({
                          message: 'Failed',
                          description: errorMsg,
                          type: 'danger',
                          animated: true,
                          floating: true,
                        });
                      });
                    }
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
              <Text
                style={{
                  ...styles.lebal,
                  textAlign: 'center',
                  marginVertical: 20,
                }}>
                Please enter the current password {'\n'} to create new password
              </Text>
              <View style={styles.inputDiv}>
                <Text style={styles.lebal}>Current Password:</Text>
                <Input
                  placeholder="Current Password"
                  value={values.currentPassword}
                  onChangeText={handleChange('currentPassword')}
                  onBlur={handleBlur('currentPassword')}
                />
                {touched.currentPassword && errors.currentPassword ? (
                  <Text style={styles.validation}>
                    {errors.currentPassword}
                  </Text>
                ) : null}
              </View>
              <View style={styles.inputDiv}>
                <Text style={styles.lebal}>New Password:</Text>
                <Input
                  placeholder="New Password"
                  value={values.newPassword}
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                />
                {touched.newPassword && errors.newPassword ? (
                  <Text style={styles.validation}>{errors.newPassword}</Text>
                ) : null}
              </View>
              <View style={styles.inputDiv}>
                <Text style={styles.lebal}>Confirm Password:</Text>
                <Input
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                />
                {touched.confirmPassword && errors.confirmPassword ? (
                  <Text style={styles.validation}>
                    {errors.confirmPassword}
                  </Text>
                ) : null}
              </View>
              <Button
                title={'Update Password'}
                onPress={handleSubmit}
                style={{ marginVertical: 20 }}
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    width: '100%',
  },
  main: {
    flex: 1,
    width: '96%',
    alignSelf: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  inputDiv: {
    backgroundColor: White,
    borderRadius: 10,
    width: '100%',
    padding: 6,
    marginVertical: 3,
  },
  lebal: {
    fontSize: 14,
    fontFamily: PopingBold,
    color: Black,
    left: 10,
  },
  validation: {
    color: 'red',
    paddingLeft: 10,
    textAlign: 'left',
    width: '100%',
    fontFamily: PoppinsRegular,
  },
});
