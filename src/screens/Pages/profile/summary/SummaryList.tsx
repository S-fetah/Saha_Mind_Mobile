import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ProfileStackParams} from '../../../../types';

type SummaryType = {
  date: string;
  summary: string;
};

type SummaryListProps = {
  data: SummaryType[];
};

export default function SummaryList({data}: SummaryListProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileStackParams>>();
  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={{padding: 16}}
      renderItem={({item}) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('SummaryDetail', {
              summary: item.summary,
              date: item.date,
            })
          }>
          <Text style={styles.date}>{item.date}</Text>
          <Text numberOfLines={4} style={styles.preview}>
            {item.summary}
          </Text>
          <Text style={styles.more}>Read more →</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E9F7F6',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  date: {
    fontSize: 12,
    color: '#4cB3a5',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  preview: {
    fontSize: 14,
    fontFamily: 'Manrope',
    color: '#333',
  },
  more: {
    marginTop: 10,
    fontSize: 13,
    color: '#4cB3a5',
    fontWeight: '600',
  },
});
