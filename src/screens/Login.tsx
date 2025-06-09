import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../types';
import Header from '../components/Header';
import google from '../assets/images/google.png';
import facebook from '../assets/images/facebook.png';
export type loginProps = NativeStackScreenProps<RootStackParams, 'Login'>;

const Login = ({navigation}: loginProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header name="Log In" />
      <View style={styles.textContainer}>
        <Text style={styles.welcome}>Welcome Back!</Text>

        <Text style={styles.welcomeText}>
          Log in to check your health updates, manage your appointments, and
          stay in touch with your Doctor all from one spot. Your health’s
          important, and we’ve got your back every step of the way.
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.inputTitle}>Email </Text>
        <TextInput placeholder="doctor-123@t.doc.dz" style={styles.Input} />
        <Text style={styles.inputTitle}>Password </Text>
        <TextInput
          placeholder="******************"
          style={styles.Input}
          secureTextEntry={true}
        />
        <TouchableOpacity style={{alignSelf: 'flex-end'}}>
          <Text>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.login}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={{marginTop: '2%'}}>Or Sign up with</Text>
        <View style={{flexDirection: 'row', columnGap: 15}}>
          <TouchableOpacity style={styles.miniImgs}>
            <Image source={google} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.miniImgs}>
            <Image source={facebook} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginTop: '1%'}}>
          <Text>Don't have an account?</Text>
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text style={{color: '#4cB3a5'}}> Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10, rowGap: '5%', backgroundColor: 'white'},
  textContainer: {
    marginTop: '-6%',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
  },
  welcome: {
    // textAlign: 'center',
    fontFamily: 'League Spartan',
    fontSize: 20,
    fontWeight: '600',
    color: '#4cB3a5',
    width: '90%',
  },
  welcomeText: {
    fontSize: 12,
    width: '85%',
    fontFamily: 'League Spartan',
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  inputTitle: {
    fontSize: 18,
    fontFamily: 'League Spartan',
    fontWeight: 500,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginBottom: 5,
  },
  Input: {
    padding: 15,
    borderStyle: 'solid',
    borderColor: '#E9F7F6',
    backgroundColor: '#E9F7F6',
    borderWidth: 1,
    width: '100%',
    borderRadius: 30,
    marginBottom: 15,
  },
  login: {
    width: 207,
    height: 45,
    backgroundColor: '#4cB3a5',
    borderRadius: 30,
    marginTop: 25,
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
  miniImgs: {
    backgroundColor: '#E9F7F6',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
