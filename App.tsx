/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import BootSplash from 'react-native-bootsplash';
import Home from './src/screens/Home';
import {RootStackParams} from './src/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import SecondSignup from './src/screens/SecondSignup';

import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Main from './src/screens/Main/Main';
import GuestMain from './src/screens/Main/GuestMain';

const Stack = createNativeStackNavigator<RootStackParams>();

function App(): React.JSX.Element {
  const [initialRoute, setInitialRoute] = useState<'Home' | 'Main' | null>(
    null,
  );

  useEffect(() => {
    const init = async () => {
      const token = await AsyncStorage.getItem('token');
      setInitialRoute(token ? 'Main' : 'Home');
    };
    init();
  }, []);
  useEffect(() => {
    if (initialRoute) {
      BootSplash.hide({fade: true}); // only hide when we're ready
    }
  }, [initialRoute]);

  if (!initialRoute) return <></>;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{headerShown: false, animation: 'fade'}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="SecondSignUp" component={SecondSignup} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="GuestMain" component={GuestMain} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
