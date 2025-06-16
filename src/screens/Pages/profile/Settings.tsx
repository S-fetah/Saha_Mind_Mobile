import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Screen} from '../../../components';
import {ArrowLeft, ChevronDown, ChevronUp} from 'lucide-react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParams} from '../../../types';
import Animated, {
  Easing,
  interpolate,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
type settingType = NativeStackScreenProps<ProfileStackParams, 'Settings'>;
type editSectionType = {
  name: string;
};
function EditSection({name}: editSectionType) {
  const [show, setShow] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const translateY = useSharedValue(0);
  const toggleShow = () => {
    setShow(!show);
    if (show) {
      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.inOut(Easing.quad),
        reduceMotion: ReduceMotion.System,
      });
      setTimeout(() => {
        setShow(!show);
      }, 150);
    } else {
      setShow(!show);
      translateY.value = withTiming(1, {
        duration: 300,
        easing: Easing.inOut(Easing.quad),
        reduceMotion: ReduceMotion.System,
      });
    }
  };
  const handleChange = (text: string) => {
    setInputValue(text);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: translateY.value,
      transform: [
        {
          translateY: interpolate(translateY.value, [0, 1], [-6, 0]),
        },
      ],
      marginBottom: 5,
      zIndex: 10,
    };
  });
  return (
    <View style={{marginBottom: show ? 15 : 25}}>
      <View>
        <TouchableOpacity
          onPress={toggleShow}
          style={{
            paddingHorizontal: 16,
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Manrope',
              lineHeight: 24,
              fontWeight: 500,
            }}>
            {name}
          </Text>
          {show ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </TouchableOpacity>
      </View>
      {show && (
        <Animated.View style={animatedStyle}>
          <TextInput
            placeholder={name}
            value={inputValue}
            onChangeText={handleChange}
            style={{
              width: '100%',
              height: 50,
              borderRadius: 24,
              backgroundColor: '#F2F5F2',
              marginTop: 15,
              paddingHorizontal: 16,
            }}
          />
        </Animated.View>
      )}
    </View>
  );
}

export default function Settings({navigation}: settingType) {
  function handlePress() {
    Alert.alert('Changes Has Been Successfully Unsaved Laddie ');
  }
  return (
    <Screen gradient={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft strokeWidth={1.5} size={26} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Profile</Text>
      </View>
      <EditSection name="Username" />
      <EditSection name="Email" />
      <EditSection name="Phone Number" />
      <EditSection name="Password" />

      <TouchableOpacity
        onPress={handlePress}
        style={{
          backgroundColor: '#B2E5D1',
          paddingHorizontal: 16,
          paddingVertical: 10,
          alignSelf: 'flex-end',
          borderRadius: 20,
        }}>
        <Text
          style={{
            fontSize: 14,
            lineHeight: 21,
            fontFamily: 'Manrope',
            fontWeight: 700,
          }}>
          Save Changes
        </Text>
      </TouchableOpacity>
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
