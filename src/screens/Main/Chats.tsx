import React, {useCallback, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ChatScreen from '../Pages/ChatScreen';
import DoctorScreen from '../Pages/DoctorScreen';
import {Screen} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

export default function Chats() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setAuthed(token !== null);
    } catch (error) {
      console.error('Failed to get token:', error);
      setAuthed(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkAuth();
    }, []),
  );

  // Don't render until auth state is determined
  if (authed === null) return null;

  const tabScreens = [
    {name: 'Jarvis (AI Assistant)', component: ChatScreen},
    ...(authed ? [{name: 'Doctor', component: DoctorScreen}] : []),
  ];

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
          tabBarPressColor: 'rgba(18, 23, 20, 0.05)',
        }}>
        {tabScreens.map(tab => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
          />
        ))}
      </Tab.Navigator>
    </Screen>
  );
}
