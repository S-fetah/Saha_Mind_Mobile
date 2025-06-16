import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import Header from '../components/Header';

import {RadioGroup} from 'react-native-radio-buttons-group';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../types';
type SecondSignupProps = NativeStackScreenProps<
  RootStackParams,
  'SecondSignUp'
>;
export default function SecondSignup({navigation, route}: SecondSignupProps) {
  const {fullName, email, birthDate} = route.params;
  console.log(fullName, email, birthDate);
  const [gender, setGender] = useState<string | undefined>('1');
  const [role, setRole] = useState<string | undefined>('2');
  const radioButton = useMemo(
    () => [
      {
        id: '1',
        label: 'Man',
        value: 'Man',
      },
      {
        id: '2',
        label: 'Woman',
        value: 'Woman',
      },
    ],
    [],
  );
  const roleButtons = useMemo(
    () => [
      {
        id: '1',
        label: 'Parent',
        value: 'Parent',
      },
      {
        id: '2',
        label: 'Individual',
        value: 'Individual',
      },
    ],
    [],
  );
  return (
    <SafeAreaView style={styles.container}>
      <Header name="Set Password" />

      <View style={styles.formContainer}>
        <Text style={styles.inputTitle}>Password </Text>
        <TextInput
          placeholder="****************"
          style={styles.Input}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.inputTitle}>Confirm Password </Text>
        <TextInput
          placeholder="****************"
          style={styles.Input}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.text}>Gender :</Text>
        <RadioGroup
          radioButtons={radioButton}
          containerStyle={{flexDirection: 'row'}}
          selectedId={gender}
          onPress={setGender}
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.text}>Role :</Text>
        <RadioGroup
          radioButtons={roleButtons}
          containerStyle={{flexDirection: 'row'}}
          selectedId={role}
          onPress={setRole}
        />
      </View>
      <View style={styles.terms}>
        <Text style={styles.welcomeText}>
          By continuing, you agree to
          <Text style={{color: '#4cB3a5'}}>Terms of Use</Text> and
          <Text style={{color: '#4cB3a5'}}> Privacy Policy</Text>.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.signup}
        onPress={() => console.log('Signup pressed')}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>
      <View
        style={{flexDirection: 'row', marginTop: '1%', alignSelf: 'center'}}>
        <Text>Already Have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{color: '#4cB3a5'}}> Sign in </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10, rowGap: '2%', backgroundColor: 'white'},
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    rowGap: 15,
  },
  inputTitle: {
    fontSize: 18,
    fontFamily: 'League Spartan',
    fontWeight: 500,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginBottom: 15,
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
  welcomeText: {
    fontSize: 12,
    width: '40%',
    fontFamily: 'League Spartan',
    justifyContent: 'center',
    alignItems: 'center',
  },
  terms: {
    width: '100%',
    height: 28,
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
