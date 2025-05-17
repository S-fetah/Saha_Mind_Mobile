import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import back from '../assets/images/back.png';
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
type headerProps = {name: string};
const Header = ({name}: headerProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() =>
          name === 'Set Password'
            ? navigation.navigate('Signup')
            : navigation.navigate('Home')
        }>
        <Image source={back} style={styles.img} />
      </TouchableOpacity>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    // top: '-7%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '10%',
    width: '90%',
    marginLeft: 25,
    marginRight: 25,
  },
  img: {
    height: 30,
    width: 30,
  },
  text: {
    textAlign: 'center',
    // flex: 1,
    fontFamily: 'League Spartan',
    fontSize: 24,
    fontWeight: '600',
    color: '#4cB3a5',
    width: '75%',
  },
});
