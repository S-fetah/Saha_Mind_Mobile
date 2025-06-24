import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DateTime} from 'luxon';
import {Calendar1} from 'lucide-react-native';
import {Screen} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../types';

const guestNames = ['Guest', 'Explorer', 'Friend', 'Visitor'];
const randomName = guestNames[Math.floor(Math.random() * guestNames.length)];

const currentWeekDays = Array(7)
  .fill(0)
  .map((_, i) => DateTime.now().minus({days: i - 3}))
  .reverse();

const WeekDays = () => {
  const [selectedDay, setSelectedDay] = useState<string>(
    DateTime.now().day.toString(),
  );

  return (
    <View style={styles.weekContainer}>
      {currentWeekDays.map(day => (
        <TouchableOpacity
          key={day.toString()}
          style={[
            styles.dayStyle,
            selectedDay === day.day.toString() && styles.dayStyleActive,
          ]}
          onPress={() => setSelectedDay(day.day.toString())}>
          <Text
            style={[
              styles.dayText,
              selectedDay === day.day.toString() && {color: '#fff'},
            ]}>
            {day.toFormat('ccc')}
          </Text>
          <Text
            style={[
              styles.dayNum,
              selectedDay === day.day.toString() && {color: '#fff'},
            ]}>
            {day.toFormat('dd')}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

type GuestScreenProps = NativeStackScreenProps<RootStackParams, 'GuestMain'>;

export default function GuestHomeScreen({navigation}: GuestScreenProps) {
  return (
    <Screen gradient={false}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.greetingText}>Hey, {randomName}! 👋</Text>
          <TouchableOpacity style={styles.todayButton}>
            <Text style={styles.todayStyle}>
              {DateTime.now().toFormat('ccc, dd LLL')} <Calendar1 size={18} />
            </Text>
          </TouchableOpacity>
        </View>

        <WeekDays />

        <View style={styles.quoteBox}>
          <Text style={styles.quote}>
            "A small step toward a better you starts today. 🌱"
          </Text>
        </View>

        {/* Dummy Data Section */}
        <View style={styles.guestInfoBox}>
          <Text style={styles.subHeading}>✨ Today's Tip</Text>
          <Text style={styles.tipText}>
            Try a 3-minute deep breathing exercise before bed.
          </Text>
        </View>

        <View style={styles.guestInfoBox}>
          <Text style={styles.subHeading}>📊 Guest Progress Preview</Text>
          <Text style={styles.tipText}>• Mood Test Taken: 0</Text>
          <Text style={styles.tipText}>• Journals Logged: 0</Text>
          <Text style={styles.tipText}>• Mindfulness Score: Not Available</Text>
        </View>

        {/* Actions */}
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate('MoodTestScreen')}>
          <Text style={styles.ctaText}>Take a Free Quick Mood Test ➜</Text>
        </TouchableOpacity>

        <View style={styles.authButtons}>
          <TouchableOpacity
            style={[styles.authButton, {backgroundColor: '#4CB3A5'}]}
            onPress={() => navigation.navigate('Login', {})}>
            <Text style={styles.authText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.authButton, {backgroundColor: '#333'}]}
            onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.authText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    height: '7%',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 15,
    marginTop: StatusBar?.currentHeight,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '400',
  },
  todayButton: {
    paddingVertical: 5,
  },
  todayStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 50,
    fontWeight: '500',
    elevation: 11,
    borderWidth: 1,
    borderColor: '#fefefe',
    height: 30,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  dayStyle: {
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 15,
    borderRadius: 18,
    rowGap: 4,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  dayStyleActive: {
    backgroundColor: '#4CB3A5',
  },
  dayText: {
    fontSize: 12,
    fontWeight: '500',
  },
  dayNum: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  quoteBox: {
    marginTop: 40,
    marginBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#333',
  },
  guestInfoBox: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  ctaButton: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#4CB3A5',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 25,
    elevation: 3,
  },
  ctaText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  authButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginVertical: 24,
  },
  authButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  authText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
