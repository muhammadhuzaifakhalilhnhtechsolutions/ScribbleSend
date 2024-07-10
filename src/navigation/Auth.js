import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import StudentEmail from '../screens/StudentSite/StudentForgetPassword/StudentEmail';
import StudentOtp from '../screens/StudentSite/StudentForgetPassword/StudentOtp';
import StudentResetPassword from '../screens/StudentSite/StudentForgetPassword/StudentResetPassword';
import StudentLogin from '../screens/StudentSite/StudentLogin/StudentLogin';
import StudentSignUp from '../screens/StudentSite/StudentSignUp/StudentSignUp';
import Studentwellcome from '../screens/StudentSite/StudentWellcome/StudentWellcome';
import Email from '../screens/TeacherSite/ForgetPassword/Email';
import Otp from '../screens/TeacherSite/ForgetPassword/Otp';
import ResetPassword from '../screens/TeacherSite/ForgetPassword/ResetPassword';
import Login from '../screens/TeacherSite/Login/Login';
import SignUp from '../screens/TeacherSite/SignUp/SignUp';
import Wellcome from '../screens/TeacherSite/Wellcome/wellcome';
import UserType from '../screens/UserType/UserType';
import StudentDasboard from '../screens/StudentSite/StudentDasboard/StudentDasboard';
import Dasboard from '../screens/TeacherSite/Dasboard/Dasboard';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return <Icon name={'home-outline'} size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return <Icon name={'finger-print-sharp'} size={25} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
} 

const Auth = () => {
  const Role = useSelector(state => state?.userReducer?.ConditionMAin);
  console.log('Role', Role);
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
        name="StudentDasboard"
        options={{ headerShown: false }}
        component={StudentDasboard}
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
      {/* Teacher Auth */}
      <Stack.Screen
        name="Wellcome"
        options={{ headerShown: false }}
        component={Wellcome}
      />
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={Login}
      />
      <Stack.Screen
        name="Dasboard"
        options={{ headerShown: false }}
        component={Dasboard}
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
    </Stack.Navigator>
  );
};

export default Auth;
