import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
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

type signUpProps = Readonly<NativeStackScreenProps<RootStackParams, 'Signup'>>;
type dataType = {
  fullName: string;
  email: string;
};
export default function Signup({navigation}: signUpProps) {
  const [date, setDate] = useState(new Date('2000-01-01'));
  const [data, setData] = useState<dataType>({
    fullName: '',
    email: '',
  });

  const handlePress = () => {
    if (data.fullName.length < 5) {
      return Alert.alert('Pleasee Provide A valid Name ');
    }

    if (date === new Date('1950-01-01') || date === new Date(2007, 1, 1)) {
      return Alert.alert('Please Provide A valid Date of Birth ');
    }
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      return Alert.alert(' Email is Invalid ');
    }
    navigation.navigate('SecondSignUp', {
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      birthDate:
        date.getDay().toString() +
        date.getMonth().toString() +
        date.getFullYear().toString(),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header name="Sign Up" />

      <View style={styles.formContainer}>
        <Text style={styles.inputTitle}>Full Name </Text>
        <TextInput
          placeholder="John Doe"
          style={styles.Input}
          value={data.fullName}
          onChangeText={text => setData({fullName: text, email: data.email})}
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.inputTitle}>Email </Text>
        <TextInput
          placeholder="Ali@example.com"
          style={styles.Input}
          value={data.email}
          onChangeText={text => setData({fullName: data.fullName, email: text})}
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.inputTitle}>Date Of Birth </Text>

        <DatePicker
          date={date}
          mode="date"
          maximumDate={new Date(2007, 1, 1)}
          minimumDate={new Date('1950-01-01')}
          onDateChange={v => setDate(v)}
          style={styles.dateContainer}
        />
      </View>

      <TouchableOpacity style={styles.signup} onPress={handlePress}>
        <Text style={styles.signupText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.alternateText}>Or Sign up with</Text>
        <View style={styles.imgsContainer}>
          <TouchableOpacity style={styles.miniImgs}>
            <Image source={google} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.miniImgs}>
            <Image source={facebook} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{flexDirection: 'row', marginTop: '1%', alignSelf: 'center'}}>
        <Text>Already Have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login', {})}>
          <Text style={{color: '#4cB3a5'}}> Sign in </Text>
        </TouchableOpacity>
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
    height: 150,
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
  imgsContainer: {flexDirection: 'row', columnGap: 15},
  alternateText: {marginTop: '2%', fontFamily: 'League Spartan'},
});
