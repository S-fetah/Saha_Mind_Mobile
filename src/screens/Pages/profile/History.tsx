import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Screen} from '../../../components';
import {ArrowLeft} from 'lucide-react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParams} from '../../../types';
type HistoryScreenProps = NativeStackScreenProps<ProfileStackParams, 'History'>;
export default function History({navigation}: HistoryScreenProps) {
  return (
    <Screen gradient={true}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft strokeWidth={1.5} size={26} />
        </TouchableOpacity>
        <Text style={styles.headerText}>History</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: '5%',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Manrope',
    textAlign: 'center',
    width: '80%',
    color: '#121714',
  },
});
