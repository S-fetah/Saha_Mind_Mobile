import {View, Text, Image, StyleSheet, ImageSourcePropType} from 'react-native';
import React, {useEffect} from 'react';
import {fellings} from '../../utils/constants';
import Animated, {
  FadeInRight,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {moodlistType} from '../../screens/Pages/HomeScreen';

type moodType = {
  mood: {
    img: ImageSourcePropType;
    score: number;
    time: string;
    index: number;
    anim: SharedValue<number>;
    color: string;
  };
  onfinish: () => void | null;
};
const colors: string[] = [
  '#43eb7f',
  '#ec6763',
  '#63e7ec',
  '#ffe82b',
  '#eb43af',
];
// const scores: number[] = [121, 40, 100, 140, 90];
// const Times: string[] = ['10:02', '12:10', '15:25', '18:30', '20:45'];

function Place({mood, onfinish}: moodType) {
  const containerProgress = useSharedValue(0);
  const barProgress = useSharedValue(0);

  useEffect(() => {
    containerProgress.value = withDelay(
      75 * mood.index,
      withSpring(
        1,
        {
          damping: 80,
          stiffness: 200,
        },
        isFinished => {
          if (isFinished) {
            barProgress.value = withTiming(1, {
              duration: 300,
            });
          }
        },
      ),
    );
  }, [containerProgress, barProgress, mood.index]);

  const containerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(containerProgress.value, [0, 1], [0, 170]),
    };
  });

  const barStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(barProgress.value, [0, 1], [0, mood.score]),
    };
  });

  return (
    <Animated.View
      entering={FadeInRight.delay(100 * mood.index)
        .springify()
        .damping(80)
        .stiffness(200)
        .withCallback(finished => {
          if (finished && onfinish) {
            runOnJS(onfinish)();
          }
        })}>
      <View>
        <Image resizeMode="contain" source={mood.img} style={styles.emojiPic} />
      </View>

      <Animated.View
        style={[
          {
            backgroundColor: 'white',
            width: 20,
            borderRadius: 45,
            alignSelf: 'center',
            marginVertical: 5,
            transform: [{rotate: '180deg'}],
          },
          containerStyle,
        ]}>
        <Animated.View
          style={[
            {
              backgroundColor: mood.color,
              width: 20,
              alignSelf: 'center',
              borderRadius: 45,
            },
            barStyle,
          ]}
        />
      </Animated.View>

      <Text> {mood.time} </Text>
    </Animated.View>
  );
}
type ChartsProps = {
  overall_mood: moodlistType[];
  selectedDay: string;
};
const Charts = ({overall_mood, selectedDay}: ChartsProps) => {
  console.log('Overall Mood from chart:', overall_mood);
  console.log('selectedDay ', selectedDay);
  const selectedMood = overall_mood.filter(ele => {
    const splitted = ele.day.split('-')[2];
    return splitted === selectedDay;
  });
  console.log(selectedMood);

  const detectMood = (mood: string) => {
    switch (mood.toLowerCase()) {
      case 'shy':
        return fellings[0];

      case 'preservative':
        return fellings[1];
      case 'happy':
        return fellings[2];
      case 'angry':
        return fellings[3];
      case 'neutral':
        return fellings[4];
      case 'confused':
        return fellings[5];
      case 'sad':
        return fellings[6];

      default:
        return null;
    }
  };

  const _anime = useSharedValue(0);

  return (
    <View style={styles.chartsStyle}>
      {overall_mood.length > 0 &&
        selectedMood[0].times.map((ele, index) => {
          if (index < 5) {
            return (
              <Place
                key={index + 1}
                mood={{
                  img: detectMood(ele.mood),
                  score: ele.score && ele.score > 150 ? 150 : ele.score,
                  time: ele.time === '' ? '00:00' : ele.time,
                  index,
                  anim: _anime,
                  color: colors[index],
                }}
                onfinish={() => {
                  _anime.value = 1;
                }}
              />
            );
          } else {
            return;
          }
        })}
    </View>
  );
};
const styles = StyleSheet.create({
  emojiPic: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    zIndex: 10,
  },
  chartsStyle: {
    marginTop: '2%',
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
    columnGap: 25,
    alignItems: 'flex-end',
    height: 250,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#bee8e1',
    // elevation: 4,
    backgroundColor: '#bee8e1',
  },
});
export default Charts;
