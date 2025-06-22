import React, {useCallback, useState} from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {fellings} from '../../utils/constants';
import {DateTime} from 'luxon';
import {Screen} from '../../components';
import {Calendar1, ChevronDown, ChevronUp, Stars} from 'lucide-react-native';
import Charts from '../../components/homeComponents/Charts';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Tips from '../../components/homeComponents/Tips';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appLogo from '../../assets/images/Profile/appointment.jpeg';

const currentWeekDays = Array(7)
  .fill(0)
  .map((_, i) => {
    return DateTime.now().minus({days: i - 3});
  })
  .reverse();
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
type appointmentDetailsType = {
  id?: number;
  doctor_id?: number;
  patient_id: number;
  date: string;
  hour: string;
};
export default function HomeScreen() {
  const [arrow, setArrow] = useState<'up' | 'down'>('down');
  const progress = useSharedValue(0);
  const [name, setName] = useState<string>('');
  const [app, setApp] = useState(DateTime.now().toFormat('ccc, dd LLL '));
  const [appDetails, setAppDetails] = useState<appointmentDetailsType | null>(
    null,
  );
  const [showAppointment, setShowAppointment] = useState<boolean>(false);
  const GetName = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const storedName = await AsyncStorage.getItem('user');
      const parsedName = storedName ? JSON.parse(storedName) : null;
      const appointment = await fetch(
        'https://psychology-hazel.vercel.app/api/appointments',
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        },
      );
      if (appointment.ok) {
        const appointmentDay = await appointment.json();

        const date = DateTime.fromISO(appointmentDay.appointments[0].date);
        const formatted = date.toFormat('ccc, dd LLL');
        setAppDetails(appointmentDay.appointments[0]);
        setApp(formatted);
      }
      if (parsedName.fullName) {
        setName(parsedName.fullName);
      } else {
        setName('Guest');
      }
    } catch (error) {
      console.error('Error retrieving name from AsyncStorage:', error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      GetName();
    }, []),
  );

  const toggleCheckins = () => {
    if (arrow === 'up') {
      progress.value = withTiming(0, {
        duration: 400,
        easing: Easing.inOut(Easing.quad),
      });
      setTimeout(() => {
        setArrow('down');
      }, 150);
    } else {
      setArrow('up');
      progress.value = withTiming(1, {
        duration: 400,
        easing: Easing.inOut(Easing.quad),
      });
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [
        {
          translateY: interpolate(progress.value, [0, 1], [-5, 0]),
        },
      ],
      marginBottom: 5,
      zIndex: 10,
    };
  });
  return (
    <Screen gradient={false}>
      {showAppointment && (
        <Modal transparent={true} animationType="fade">
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Image source={appLogo} style={styles.modalImage} />
                <Text style={styles.modalTitle}>Appointment</Text>
              </View>
              <Text style={styles.modalText}>🗓 {app}</Text>
              <Text style={styles.modalText}>⏰ {appDetails?.hour}</Text>
              <TouchableOpacity onPress={() => setShowAppointment(false)}>
                <Text style={styles.modalClose}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <View
          style={{
            height: '7%',
            paddingHorizontal: 16,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginBottom: 15,
            marginTop: -15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '400'}}>Hey,{name} 👋</Text>
          <View style={{flexDirection: 'row', gap: 20}}>
            <TouchableOpacity
              onPress={() => {
                setShowAppointment(!showAppointment);
              }}>
              <Text style={styles.todayStyle}>
                {app + ' '} <Calendar1 size={18} />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.notifStyle}>🔥5</Text>
            </TouchableOpacity>
          </View>
        </View>
        <WeekDays />
        <View
          style={[styles.todayContainer, {marginTop: 40, marginBottom: 15}]}>
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
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 15,
              }}>
              <Text>5/5</Text>
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
      </ScrollView>
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
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalText: {
    fontSize: 16,
    marginTop: 5,
  },
  modalClose: {
    marginTop: 15,
    fontSize: 14,
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
