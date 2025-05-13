import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import logo from '../assets/images/logor.png';
export default function Home() {
  return (
    <SafeAreaProvider style={styles.area}>
      <SafeAreaView style={styles.container}>
        <View>
          <Image source={logo} style={styles.image} />
          <Text style={styles.logoText}> Saha</Text>
          <Text style={styles.logoText}> Mind</Text>
        </View>

        <View style={styles.welcome}>
          <Text style={styles.text}>
            Welcome. you Can Start By Signing up Or Login if You Already have An
            Account!
          </Text>
        </View>
        <TouchableOpacity style={styles.login}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signup}>
          <Text style={styles.signupText}>Signup</Text>
        </TouchableOpacity>

        <View style={styles.guest}>
          <Text>Or</Text>
          <TouchableOpacity>
            <Text style={styles.guestText}>Continue as a Guest </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  area: {
    backgroundColor: 'white',
  },
  container: {
    marginTop:
      Platform.OS === 'android' && StatusBar.currentHeight
        ? StatusBar.currentHeight + 20
        : 50,
    padding: 30,
    height: '100%',
    alignItems: 'center',
  },
  welcome: {
    top: 250,
    width: '80%',
  },
  image: {
    top: 125,
  },
  text: {
    fontSize: 12,
    color: '#070707',
    fontWeight: '400',
    textAlign: 'center',
  },
  logoText: {
    color: '#4cB3a5',
    textAlign: 'center',
    fontFamily: 'League Spartan',
    fontSize: 35,
    fontStyle: 'normal',
    fontWeight: 100,
    top: 125,
    alignSelf: 'center',
    textTransform: 'capitalize',
    marginBottom: -15,
  },
  login: {
    width: 207,
    height: 45,
    top: 280,
    backgroundColor: '#4cB3a5',
    marginBottom: 15,
    borderRadius: 30,
  },
  signup: {
    width: 207,
    height: 45,
    top: 273,
    backgroundColor: '#E7E7E7',
    marginBottom: 15,
    borderRadius: 30,
  },
  loginText: {
    fontFamily: 'League Spartan',
    padding: 5,
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
    textTransform: 'capitalize',
    height: '100%',
  },
  signupText: {
    padding: 5,
    textAlign: 'center',
    color: '#4cB3a5',
    fontSize: 24,
    fontWeight: '500',
    textTransform: 'capitalize',
    height: '100%',
    fontFamily: 'League Spartan',
  },
  guest: {
    top: 263,
    alignItems: 'center',
  },
  guestText: {
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
});
