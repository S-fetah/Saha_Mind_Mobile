import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ArrowLeft} from 'lucide-react-native';
import {ProfileStackParams} from '../../../../types';

type Props = NativeStackScreenProps<ProfileStackParams, 'SummaryDetail'>;

export default function SummaryDetail({route, navigation}: Props) {
  const {summary, date} = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft strokeWidth={1.5} size={26} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Report from {date}</Text>
      </View>

      <Text style={styles.content}>{summary}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Manrope',
  },
  content: {
    fontSize: 15,
    lineHeight: 24,
    fontFamily: 'Manrope',
    color: '#121714',
  },
});
