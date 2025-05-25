/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import BootSplash from 'react-native-bootsplash';
import Home from './src/screens/Home';
import {RootStackParams} from './src/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import SecondSignup from './src/screens/SecondSignup';
import Main from './src/screens/Main/Main';
import LinearGradient from 'react-native-linear-gradient';

const Stack = createNativeStackNavigator<RootStackParams>();
function App(): React.JSX.Element {
  useEffect(() => {
    BootSplash.hide({fade: true});
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="SecondSignUp" component={SecondSignup} />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
