import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import Dasboard from '../screens/TeacherSite/Dasboard/Dasboard';
import Email from '../screens/TeacherSite/ForgetPassword/Email';
import Otp from '../screens/TeacherSite/ForgetPassword/Otp';
import ResetPassword from '../screens/TeacherSite/ForgetPassword/ResetPassword';
import Login from '../screens/TeacherSite/Login/Login';
import SignUp from '../screens/TeacherSite/SignUp/SignUp';
import Wellcome from '../screens/TeacherSite/Wellcome/wellcome';

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

const MainNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen
          name="HomeBase"
          options={{ headerShown: false }}
          component={MyTabs}
        /> */}
      {/* add your another screen here using -> Stack.Screen */}
      {/* <Stack.Screen
          name="HomeBase"
          options={{ headerShown: false }}
          component={Home}
        /> */}

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
        name="SignUp"
        options={{ headerShown: false }}
        component={SignUp}
      />
      <Stack.Screen
        name="Dasboard"
        options={{ headerShown: false }}
        component={Dasboard}
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

export default MainNavigation;
