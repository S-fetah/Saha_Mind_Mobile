import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import DatePicker from 'react-native-date-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../types';

import google from '../assets/images/google.png';
import facebook from '../assets/images/facebook.png';

type signUpProps = NativeStackScreenProps<RootStackParams, 'Signup'>;

export default function Signup({navigation}: signUpProps) {
  const [date, setDate] = useState(new Date('2000-01-01'));

  return (
    <SafeAreaView style={styles.container}>
      <Header name="Sign Up" />

      <View style={styles.formContainer}>
        <Text style={styles.inputTitle}>Full Name </Text>
        <TextInput placeholder="John Doe" style={styles.Input} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.inputTitle}>Email </Text>
        <TextInput placeholder="Ali@example.com" style={styles.Input} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.inputTitle}>Date Of Birth </Text>

        <DatePicker
          date={date}
          mode="date"
          maximumDate={new Date(2007, 1, 1)}
          minimumDate={new Date('1950-01-01')}
          onDateChange={date => setDate(date)}
          style={{height: 160}}
        />
      </View>

      <TouchableOpacity
        style={styles.signup}
        onPress={() =>
          navigation.navigate('SecondSignUp', {
            fullName: 'kda',
            email: 'kda',
            birthDate: 'kda',
          })
        }>
        <Text style={styles.signupText}>Continue</Text>
      </TouchableOpacity>

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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10, rowGap: '3%', backgroundColor: 'white'},
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
    marginBottom: 10,
    height: 14,
    lineHeight: 14,
  },
  Input: {
    padding: 15,
    borderStyle: 'solid',
    borderColor: '#E9F7F6',
    backgroundColor: '#E9F7F6',
    borderWidth: 1,
    width: '100%',
    borderRadius: 30,
  },
  dateContainer: {
    height: 50,
  },
  signupText: {
    padding: 5,
    textAlign: 'center',
    color: 'white',
    fontSize: 22,
    fontWeight: '500',
    textTransform: 'capitalize',
    height: '100%',
    fontFamily: 'League Spartan',
  },
  signup: {
    width: '50%',
    height: 45,
    backgroundColor: '#4cB3a5',
    marginBottom: 15,
    borderRadius: 30,
    marginLeft: '25%',
  },
  text: {
    fontSize: 16,
    fontFamily: 'League Spartan',
    fontWeight: 500,
  },
  miniImgs: {
    backgroundColor: '#E9F7F6',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  textContainer: {
    marginTop: '-6%',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
  },
});
