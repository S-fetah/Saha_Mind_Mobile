import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ChatScreen from '../Pages/ChatScreen';
import {Screen} from '../../components';
import DoctorScreen from '../Pages/DoctorScreen';

const Tab = createMaterialTopTabNavigator();

export default function Chats() {
  return (
    <Screen gradient={true}>
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: true,

          animationEnabled: true,

          tabBarStyle: {
            backgroundColor: '#c4eae4',
            elevation: 0,
            shadowColor: 'transparent',
            borderWidth: 1.1,
            borderRadius: 10,
            marginBottom: -55,
            marginTop: 15,
            // position: 'absolute',
          },

          tabBarIndicatorStyle: {
            backgroundColor: '#121714',
            height: 3,
            borderRadius: 2,
          },

          tabBarLabelStyle: {
            fontWeight: '600',
            fontSize: 14,
            textTransform: 'none',
          },
          tabBarActiveTintColor: '#121714',
          tabBarInactiveTintColor: '#333',
          tabBarPressColor: 'rgba(18, 23, 20, 0.05)', // subtle ripple feedback
        }}>
        <Tab.Screen name="Jarvis (AI Assistant)" component={ChatScreen} />
        <Tab.Screen name="Doctor" component={DoctorScreen} />
      </Tab.Navigator>
    </Screen>
  );
}
