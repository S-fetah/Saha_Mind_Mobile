import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {Screen} from '../../../components';

export default function Help() {
  return (
    <Screen gradient={true} style={styles}>
      <Text>Help</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({});
