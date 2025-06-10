import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Screen} from '../../../components';
import {ArrowLeft, ChevronRight} from 'lucide-react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParams} from '../../../types';

type helpType = NativeStackScreenProps<ProfileStackParams, 'Help'>;

export default function Help({navigation}: helpType) {
  return (
    <Screen gradient={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft strokeWidth={1.5} size={26} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Help</Text>
      </View>

      <TextInput placeholder="Search" style={styles.searchInput} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {[
          'How do I track my mood?',
          'What are the different mood categories?',
          'How can I view my mood history?',
          'Can I export my mood data?',
          'How do I set reminders?',
        ].map((item, index) => (
          <Row key={index} label={item} />
        ))}
        <View style={{marginTop: 10}} />
        <Text style={styles.sectionTitle}>Troubleshooting</Text>
        {[
          'App crashes frequently',
          'Mood data not syncing',
          'Unable to add new mood entries',
        ].map((item, index) => (
          <Row key={index} label={item} />
        ))}

        <View style={{marginTop: 10}} />
        <Text style={styles.sectionTitle}>Contact Support</Text>
        {['Email us', 'Call us'].map((item, index) => (
          <Row key={index} label={item} />
        ))}
      </ScrollView>
    </Screen>
  );
}

const Row = ({label}: {label: string}) => (
  <TouchableOpacity style={styles.row}>
    <Text style={styles.rowText}>{label}</Text>
    <ChevronRight size={18} color="#6B7280" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Manrope',
    textAlign: 'center',
    width: '80%',
    color: '#121714',
  },
  searchInput: {
    backgroundColor: '#EEF3EF',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontFamily: 'Manrope',
    fontSize: 14,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Manrope',
    color: '#121714',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  rowText: {
    fontSize: 15,
    fontFamily: 'Manrope',
    color: '#111827',
  },
});
