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
type GuestScreenProps = NativeStackScreenProps<RootStackParams, 'Guest'>;
export default function GuestHomeScreen({navigation}: GuestScreenProps) {
  return (
    <Screen gradient={false}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.greetingText}>Hey, {randomName}! 👋</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={{paddingVertical: 5}}>
              <Text style={styles.todayStyle}>
                {DateTime.now().toFormat('ccc, dd LLL')} <Calendar1 size={18} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <WeekDays />

        <View style={styles.quoteBox}>
          <Text style={styles.quote}>
            "A small step toward a better you, starts today. 🌱"
          </Text>
        </View>

        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.ctaText}>
            Create an account to track progress ➜
          </Text>
        </TouchableOpacity>
        <Text style={{fontSize: 18, textAlign: 'center', marginTop: 12}}>
          OR{' '}
        </Text>
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaText}>
            Take A free And a Quick Mood Test For Tips ➜
          </Text>
        </TouchableOpacity>
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
    marginTop: StatusBar && StatusBar.currentHeight,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '400',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 20,
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
    borderColor: '#CCc',
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
    marginTop: 50,
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
  ctaButton: {
    marginTop: 20,
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
});
