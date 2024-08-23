import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddQuestions from '../screens/TeacherSite/AddAssessment/AddQuestions';
import AddAssessment from '../screens/TeacherSite/AddAssessment/AddAssessment';
import TeacherNotification from '../screens/TeacherSite/Notification/TeacherNotification';
import ViewAssessment from '../screens/TeacherSite/ViewAssessment/ViewAssessment';
import Dashboard from '../screens/TeacherSite/Dasboard/Dasboard';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from '../screens/TeacherSite/Settings/Settings';
import TeacherBottom from './TeacherBottom';
import StudentList from '../screens/TeacherSite/StudentList/StudentList';

import EditProfile from '../screens/TeacherSite/EditProfile/EditProfile';
import ChangePassword from '../screens/TeacherSite/ChangePassword/ChangePassword';
import TermsAndConditions from '../screens/TeacherSite/TermsAndConditions/TermsAndConditions';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator tabBar={props => <TeacherBottom {...props} />}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return <Icon name={'home'} size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Settings}
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

const MainNavigation = () => {
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
        name="ViewAssessment"
        options={{ headerShown: false }}
        component={ViewAssessment}
      />
      <Stack.Screen
        name="TeacherNotification"
        options={{ headerShown: false }}
        component={TeacherNotification}
      />
      <Stack.Screen
        name="AddAssessment"
        options={{ headerShown: false }}
        component={AddAssessment}
      />
      <Stack.Screen
        name="AddQuestions"
        options={{ headerShown: false }}
        component={AddQuestions}
      />
      <Stack.Screen
        name="StudentList"
        options={{ headerShown: false }}
        component={StudentList}
      />
      <Stack.Screen
        name="EditProfile"
        options={{ headerShown: false }}
        component={EditProfile}
      />
      <Stack.Screen
        name="ChangePassword"
        options={{ headerShown: false }}
        component={ChangePassword}
      />
      <Stack.Screen
        name="TermsAndConditions"
        options={{ headerShown: false }}
        component={TermsAndConditions}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
