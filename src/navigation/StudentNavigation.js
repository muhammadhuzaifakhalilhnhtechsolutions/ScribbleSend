import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import StudentNotification from '../screens/StudentSite/Notification/StudentNotification';
import StudentHome from '../screens/StudentSite/StudentHome/StudentHome';
import WhiteBoard from '../screens/StudentSite/WhiteBoard/WhiteBoard';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ScribbleBottom from './ScribbleBottom';
import QuestionList from '../screens/StudentSite/QuestionList/QuestionList';
import StudentSettings from '../screens/StudentSite/StudentSettings/StudentSettings';
import StudentEditProfile from '../screens/StudentSite/StudentEditProfile/StudentEditProfile';
import StudentChangePassword from '../screens/StudentSite/StudentChangePass/StudentChangePassword';
import StudentTerms from '../screens/StudentSite/StudentTerms/StudentTerms';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator tabBar={props => <ScribbleBottom {...props} />}>
      <Tab.Screen
        name="StudentHome"
        component={StudentHome}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return <Icon name={'home'} size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="StudentSettings"
        component={StudentSettings}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return <Icon name={'settings'} size={25} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const StudentNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeBase"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HomeBase"
        options={{ headerShown: false }}
        component={MyTabs}
      />
      <Stack.Screen
        name="WhiteBoard"
        options={{ headerShown: false }}
        component={WhiteBoard}
      />
      <Stack.Screen
        name="StudentNotification"
        options={{ headerShown: false }}
        component={StudentNotification}
      />
      <Stack.Screen
        name="QuestionList"
        options={{ headerShown: false }}
        component={QuestionList}
      />
      <Stack.Screen
        name="StudentEditProfile"
        options={{ headerShown: false }}
        component={StudentEditProfile}
      />
      <Stack.Screen
        name="StudentChangePassword"
        options={{ headerShown: false }}
        component={StudentChangePassword}
      />
      <Stack.Screen
        name="StudentTerms"
        options={{ headerShown: false }}
        component={StudentTerms}
      />
    </Stack.Navigator>
  );
};

export default StudentNavigation;
