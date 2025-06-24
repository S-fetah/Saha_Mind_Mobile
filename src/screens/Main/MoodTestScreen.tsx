import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import {RootStackParams} from '../../types';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DateTime} from 'luxon';

const questions = [
  {prompt: 'How energetic do you feel?', mood: 'energy'},
  {prompt: 'How stressed are you right now?', mood: 'stress'},
  {prompt: 'How happy are you feeling?', mood: 'happiness'},
  {prompt: 'Do you feel anxious today?', mood: 'anxiety'},
  {prompt: 'How well are you sleeping?', mood: 'sleep'},
];

type MoodTestScreenProps = NativeStackScreenProps<
  RootStackParams,
  'MoodTestScreen'
>;

export default function MoodTestScreen({navigation}: MoodTestScreenProps) {
  const [responses, setResponses] = useState<number[]>(
    Array(questions.length).fill(75),
  );

  const updateResponse = (index: number, value: number) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const getMoodLabel = (avg: number) => {
    if (avg > 120) return 'happy';
    if (avg > 90) return 'neutral';
    if (avg > 60) return 'preservative';
    if (avg > 30) return 'shy';
    return 'sad';
  };

  const getLevelText = (score: number) => {
    if (score > 120) return 'High';
    if (score > 75) return 'Moderate';
    return 'Low';
  };

  const onSubmit = async () => {
    const total = responses.reduce((a, b) => a + b, 0);
    const avg = Math.round(total / responses.length);
    const mood = getMoodLabel(avg);
    const time = DateTime.now().toISO();

    const token = await AsyncStorage.getItem('token');

    if (!token) {
      Alert.alert('You are not logged in');
      navigation.navigate('Login', {});
      return;
    }

    const payload = {
      time,
      mood,
      score: avg,
      responses,
    };

    await AsyncStorage.setItem('todayMood', JSON.stringify(payload));
    console.log('Saved mood:', payload);
    navigation.navigate('Main');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>How are you feeling today?</Text>
        {questions.map((q, idx) => (
          <View key={idx} style={styles.questionContainer}>
            <Text style={styles.prompt}>{q.prompt}</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={150}
              step={1}
              value={responses[idx]}
              onValueChange={v => updateResponse(idx, v)}
              minimumTrackTintColor="#4cB3a5"
              maximumTrackTintColor="#ccc"
              thumbTintColor="#4cB3a5"
            />
            <View style={styles.valueRow}>
              <Text style={styles.scoreLabel}>Score: {responses[idx]}</Text>
              <Text style={styles.levelLabel}>
                {getLevelText(responses[idx])}
              </Text>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
    color: '#121714',
  },
  questionContainer: {
    marginBottom: 30,
  },
  prompt: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '500',
  },
  slider: {
    width: '100%',
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#4cB3a5',
  },
  levelLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#121714',
  },
  button: {
    backgroundColor: '#4cB3a5',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
