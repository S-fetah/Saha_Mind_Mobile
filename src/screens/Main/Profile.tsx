import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProfileStackParams} from '../../types';
import ProfileScreen from '../Pages/ProfileScreen';
import Settings from '../Pages/profile/Settings';
import Security from '../Pages/profile/Security';
import Privacy from '../Pages/profile/Privacy';
import Help from '../Pages/profile/Help';
import About from '../Pages/profile/About';

const Stack = createNativeStackNavigator<ProfileStackParams>();
export default function Profile() {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="Privacy" component={Privacy} />
      <Stack.Screen name="Security" component={Security} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
