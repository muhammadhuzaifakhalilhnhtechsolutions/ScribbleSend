import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import UserType from '../screens/UserType/UserType';
import Studentwellcome from '../screens/StudentSite/StudentWellcome/StudentWellcome';
import StudentLogin from '../screens/StudentSite/StudentLogin/StudentLogin';
import StudentSignUp from '../screens/StudentSite/StudentSignUp/StudentSignUp';
import StudentEmail from '../screens/StudentSite/StudentForgetPassword/StudentEmail';
import StudentOtp from '../screens/StudentSite/StudentForgetPassword/StudentOtp';
import StudentResetPassword from '../screens/StudentSite/StudentForgetPassword/StudentResetPassword';
import StudentDasboard from '../screens/StudentSite/StudentDasboard/StudentDasboard';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ color }) => {
//             return <Icon name={'home-outline'} size={25} color={color} />;
//           },
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ color }) => {
//             return <Icon name={'finger-print-sharp'} size={25} color={color} />;
//           },
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

const StudentNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Studentwellcome"
      screenOptions={{ headerShown: false }}>
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
    </Stack.Navigator>
  );
};

export default StudentNavigation;
