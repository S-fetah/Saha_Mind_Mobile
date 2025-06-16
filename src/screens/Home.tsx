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
import logo from '../assets/images/logor.png';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../types';

type HomeScreenProps = Readonly<
  NativeStackScreenProps<RootStackParams, 'Home'>
>;
export default function Home({navigation}: HomeScreenProps) {
  return (
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
      <TouchableOpacity
        style={styles.login}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signup}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.guest}>
        <Text>Or</Text>
        <TouchableOpacity onPress={() => navigation.navigate('GuestMain')}>
          <Text style={styles.guestText}>Continue as a Guest </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',

    height: '100%',
    alignItems: 'center',
    padding: 30,
    paddingTop:
      Platform.OS === 'android' && StatusBar.currentHeight
        ? StatusBar.currentHeight + 20
        : 50,
  },
  welcome: {
    top: 250,
    width: '80%',
  },
  image: {
    top: '40%',
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
    top: '40%',
    alignSelf: 'center',
    textTransform: 'capitalize',
    marginBottom: -15,
  },
  login: {
    width: 207,
    height: 45,
    top: 270,
    backgroundColor: '#4cB3a5',
    marginBottom: 15,
    borderRadius: 30,
  },
  signup: {
    width: 207,
    height: 45,
    top: 265,
    backgroundColor: '#E7E7E7',
    marginBottom: 15,
    borderRadius: 30,
  },
  loginText: {
    fontFamily: 'League Spartan',
    padding: 5,
    textAlign: 'center',
    color: 'white',
    fontSize: 21,
    fontWeight: '500',
    textTransform: 'capitalize',
    height: '100%',
  },
  signupText: {
    padding: 5,
    textAlign: 'center',
    color: '#4cB3a5',
    fontSize: 21,
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
