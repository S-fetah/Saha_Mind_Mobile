import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fellings} from '../../utils/constants';
import {DateTime, Duration} from 'luxon';
import {Screen} from '../../components';
import {
  ArrowBigDown,
  ArrowBigUp,
  Calendar1,
  ChevronDown,
  ChevronUp,
  FlameIcon,
  Stars,
} from 'lucide-react-native';
import Charts from '../../components/homeComponents/Charts';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Tips from '../../components/homeComponents/Tips';

const currentWeekDays = Array(7)
  .fill(0)
  .map((_, i) => {
    return DateTime.now().plus({days: i});
  });
const WeekDays = () => {
  const [selectedDay, setSelectedDay] = React.useState<string>(
    DateTime.now().day.toString(),
  );

  return (
    <View style={styles.weekContainer}>
      {currentWeekDays.map((day, index) => (
        <TouchableOpacity
          disabled={index >= 4}
          key={day.toString()}
          style={[
            styles.dayStyle,
            selectedDay === day.day.toString() && styles.dayStyleAvtive,
          ]}
          onPress={() => {
            setSelectedDay(day.day.toString());
          }}>
          <Text
            style={
              (styles.dayText,
              selectedDay === day.day.toString() && {color: '#fff'})
            }>
            {day.toFormat('ccc')}
          </Text>
          <Text
            style={
              (styles.dayNum,
              selectedDay === day.day.toString() && {color: '#fff'})
            }>
            {day.toFormat('dd')}
          </Text>
          {index < 4 && (
            <View
              style={[
                styles.emojiStyle,
                selectedDay === day.day.toString() && {
                  backgroundColor: '#4cB3a5',
                },
              ]}>
              <Image
                key={day.toString()}
                resizeMode="contain"
                source={fellings[index]}
                style={styles.emojiPic}
              />
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function HomeScreen() {
  const [arrow, setArrow] = useState<'up' | 'down'>('down');
  const progress = useSharedValue(0);

  const toggleCheckins = () => {
    if (arrow === 'up') {
      progress.value = withTiming(0, {duration: 100});
      setArrow('down');
    } else {
      progress.value = withTiming(1, {duration: 700});
      setArrow('up');
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [
        {
          translateY: interpolate(progress.value, [0, 1], [-10, 0]),
        },
      ],
      marginBottom: 5,
      zIndex: 10,
    };
  });
  return (
    <Screen>
      <View
        style={{
          height: '7%',
          paddingHorizontal: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginBottom: 15,
        }}>
        <Text style={{fontSize: 18, fontWeight: '300'}}>Hey,Ali! 👋</Text>
        <View style={{flexDirection: 'row', gap: 20}}>
          <TouchableOpacity>
            <Text style={styles.todayStyle}>
              {DateTime.now().toFormat('ccc, dd LLL ')} <Calendar1 size={18} />{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.notifStyle}>🔥5</Text>
          </TouchableOpacity>
        </View>
      </View>
      <WeekDays />
      <View style={[styles.todayContainer, {marginTop: 40, marginBottom: 15}]}>
        <Text style={{fontSize: 16, fontWeight: 500}}>Today's Check-in </Text>
        <TouchableOpacity onPress={toggleCheckins}>
          <Text>
            {arrow === 'up' ? (
              <View
                style={{
                  borderWidth: 1.5,
                  borderColor: '#121714',
                  borderRadius: 50,
                }}>
                <ChevronUp size={20} />
              </View>
            ) : (
              <View
                style={{
                  borderWidth: 1.5,
                  borderColor: '#121714',
                  borderRadius: 50,
                }}>
                <ChevronDown size={20} />
              </View>
            )}
          </Text>
        </TouchableOpacity>
      </View>
      {arrow === 'up' && (
        <Animated.View
          style={[
            styles.todayContainer,
            {
              backgroundColor: '#bee8e1',
              paddingVertical: 8,
              borderRadius: 30,
            },
            animatedStyle,
          ]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                padding: 5,
                backgroundColor: 'white',
                borderRadius: 50,
                borderWidth: 1,
                borderColor: '#fefefe',
              }}>
              <Stars color={'gold'} fill={'gold'} />
            </View>
            <Text style={{fontSize: 14, fontWeight: 500}}> Check-in</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', columnGap: 15}}>
            <Text>3/3</Text>
            <View
              style={{
                padding: 5,
                backgroundColor: '#c4eae4',
                borderRadius: 50,
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: 'white',
              }}>
              <Text
                style={{
                  padding: 3,
                  backgroundColor: '#fbdfe9',
                  borderRadius: 50,
                }}>
                🔥
              </Text>
            </View>
          </View>
        </Animated.View>
      )}
      <Charts />
      <Tips />
    </Screen>
  );
}

const styles = StyleSheet.create({
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
    position: 'relative',
  },
  emojiStyle: {
    position: 'absolute',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#CCc',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '-80%',
    width: 30,
    height: 30,
  },
  dayText: {
    fontSize: 12,
    fontWeight: 500,
  },
  dayNum: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  dayStyleAvtive: {
    backgroundColor: '#4CB3A5',
  },
  dayTextActive: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  emojiPic: {
    width: 20,
    height: 20,
  },
  todayStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
    fontWeight: '500',
    elevation: 11,
    borderWidth: 1,
    borderColor: '#fefefe',
  },
  notifStyle: {
    backgroundColor: '#fff',
    paddingHorizontal: 11,
    paddingVertical: 6.5,
    borderRadius: 50,
    fontWeight: '500',
    elevation: 11,
    borderWidth: 1,
    borderColor: '#fefefe',
  },
  todayContainer: {
    width: '100%',
    justifyContent: 'space-between',
    zIndex: 10,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
});
