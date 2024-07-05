import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { White,ThemoColor, LightGrey, Black, BottomGrey } from '../utils/Color';
import Home from '../screens/TeacherSite/Dasboard/Dasboard';
import Clander from '../screens/TeacherSite/Clander/Clander';
import Chat from '../screens/TeacherSite/Chat/Chat';
import Profile from '../screens/Profile/Profile';
import Dasboard from '../screens/TeacherSite/Dasboard/Dasboard';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ScribbleBottom = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 50,
          backgroundColor:White,
        },
        tabBarLabelStyle: {
          color: Black, // Set text color to black
        },
      }}
    >
        <Tab.Screen
            name='Dasboard'
        component={Dasboard}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                height: 35,
                width: 35,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
              }}
            >
              <Icon color={ focused ? ThemoColor : BottomGrey} size={25} name="grid"  />
            </View>
          ),
        }}
      />
           <Tab.Screen
           name='Clander'
        component={Clander}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                height: 35,
                width: 35,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
              }}
            >
              <Icon color={ focused ? ThemoColor : BottomGrey} size={25}name="calendar"/>
            </View>
          ),
        }}
      />
      <Tab.Screen
             name='Chat'
        component={Chat}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                height: 35,
                width: 35,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
              }}
            >
           
              <Icon color={ focused ? ThemoColor : BottomGrey} size={25} name="chatbubble-ellipses"/>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='Profle'
        component={Profile}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                height: 35,
                width: 35,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
              }}
            >
              <Icon color={ focused ? ThemoColor : BottomGrey} size={25} name="person" />
            </View>
          ),
        }}
      />
    
    
    
    </Tab.Navigator>
  );
};

export default ScribbleBottom;

const styles = StyleSheet.create({});
