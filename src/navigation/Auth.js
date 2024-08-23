import React from 'react';
import Email from '../screens/TeacherSite/ForgetPassword/Email';
import Otp from '../screens/TeacherSite/ForgetPassword/Otp';
import ResetPassword from '../screens/TeacherSite/ForgetPassword/ResetPassword';
import Login from '../screens/TeacherSite/Login/Login';
import SignUp from '../screens/TeacherSite/SignUp/SignUp';
import Wellcome from '../screens/TeacherSite/Wellcome/wellcome';
import UserType from '../screens/UserType/UserType';
import StudentResetPassword from '../screens/StudentSite/StudentForgetPassword/StudentResetPassword';
import Studentwellcome from '../screens/StudentSite/StudentWellcome/StudentWellcome';
import StudentLogin from '../screens/StudentSite/StudentLogin/StudentLogin';
import StudentSignUp from '../screens/StudentSite/StudentSignUp/StudentSignUp';
import StudentEmail from '../screens/StudentSite/StudentForgetPassword/StudentEmail';
import StudentOtp from '../screens/StudentSite/StudentForgetPassword/StudentOtp';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="UserType"
        options={{ headerShown: false }}
        component={UserType}
      />
      <Stack.Screen
        name="Studentwellcome"
        options={{ headerShown: false }}
        component={Studentwellcome}
      />
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={Login}
      />
      <Stack.Screen
        name="SignUp"
        options={{ headerShown: false }}
        component={SignUp}
      />
      <Stack.Screen
        name="Email"
        options={{ headerShown: false }}
        component={Email}
      />
      <Stack.Screen
        name="Otp"
        options={{ headerShown: false }}
        component={Otp}
      />
      <Stack.Screen
        name="ResetPassword"
        options={{ headerShown: false }}
        component={ResetPassword}
      />

      {/* Student */}
      <Stack.Screen
        name="StudentLogin"
        options={{ headerShown: false }}
        component={StudentLogin}
      />
      <Stack.Screen
        name="StudentSignUp"
        options={{ headerShown: false }}
        component={StudentSignUp}
      />

      <Stack.Screen
        name="StudentEmail"
        options={{ headerShown: false }}
        component={StudentEmail}
      />
      <Stack.Screen
        name="StudentOtp"
        options={{ headerShown: false }}
        component={StudentOtp}
      />
      <Stack.Screen
        name="StudentResetPassword"
        options={{ headerShown: false }}
        component={StudentResetPassword}
      />
      <Stack.Screen
        name="Wellcome"
        options={{ headerShown: false }}
        component={Wellcome}
      />
    </Stack.Navigator>
  );
};

export default Auth;
