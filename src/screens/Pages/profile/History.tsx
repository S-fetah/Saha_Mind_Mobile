import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Screen} from '../../../components';
import {ArrowLeft} from 'lucide-react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParams} from '../../../types';
import {supabase} from '../../../../lib/supabaseclient';

import {useFocusEffect} from '@react-navigation/native';
import SummaryList from './summary/SummaryList';
type symType = {
  date: string;
  summary: string;
};
type HistoryScreenProps = NativeStackScreenProps<ProfileStackParams, 'History'>;
export default function History({navigation, route}: HistoryScreenProps) {
  const id = route.params?.id;

  const [summaries, setSumarries] = useState<symType[]>([]);

  useFocusEffect(
    useCallback(() => {
      const FetchReports = async () => {
        const {data: Summaries, error} = await supabase
          .from('Summaries')
          .select('*')
          .eq('patient_id', id);
        if (Summaries) {
          setSumarries(Summaries[0].Summaries);
        }
        if (error) {
          console.error('Error fetching reports:', error);
          return [];
        }
      };
      FetchReports();
    }, [id]),
  );
  return (
    <Screen gradient={true}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft strokeWidth={1.5} size={26} />
        </TouchableOpacity>
        <Text style={styles.headerText}>History</Text>
      </View>

      <SummaryList data={summaries} />
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
