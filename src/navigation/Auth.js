import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import Splash from '../screens/Splash/Splash';
import Email from '../screens/TeacherSite/ForgetPassword/Email';
import Otp from '../screens/TeacherSite/ForgetPassword/Otp';
import ResetPassword from '../screens/TeacherSite/ForgetPassword/ResetPassword';
import Login from '../screens/TeacherSite/Login/Login';
import SignUp from '../screens/TeacherSite/SignUp/SignUp';
import Wellcome from '../screens/TeacherSite/Wellcome/wellcome';
import UserType from '../screens/UserType/UserType';
import ScribbleBottom from './ScribbleBottom';
import StudentNavigation from './StudentNavigation';
import AllScreens from './AllScreen';
import { useSelector } from 'react-redux';
import StudentResetPassword from '../screens/StudentSite/StudentForgetPassword/StudentResetPassword';
import Studentwellcome from '../screens/StudentSite/StudentWellcome/StudentWellcome';
import StudentLogin from '../screens/StudentSite/StudentLogin/StudentLogin';
import StudentSignUp from '../screens/StudentSite/StudentSignUp/StudentSignUp';
import StudentEmail from '../screens/StudentSite/StudentForgetPassword/StudentEmail';
import StudentOtp from '../screens/StudentSite/StudentForgetPassword/StudentOtp';
import WhiteBoard from '../screens/StudentSite/WhiteBoard/WhiteBoard';
import StudentHome from '../screens/StudentSite/StudentHome/StudentHome';
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
      <Stack.Screen
        name="WhiteBoard"
        options={{ headerShown: false }}
        component={WhiteBoard}
      />
      <Stack.Screen
        name="StudentHome"
        options={{ headerShown: false }}
        component={StudentHome}
      />

      {/* Teacher Auth */}
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
        name="ScribbleBottom"
        options={{ headerShown: false }}
        component={ScribbleBottom}
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
