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
const scores: number[] = [120, 40, 100, 140, 90];
const Times: string[] = ['10:02', '12:10', '15:25', '18:30', '20:45'];

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

const Charts = () => {
  const _anime = useSharedValue(0);
  return (
    <View style={styles.chartsStyle}>
      {fellings.map((ele, index) => {
        if (index < 5) {
          return (
            <Place
              key={index + 1}
              mood={{
                img: ele,
                score: scores[index],
                time: Times[index],
                index,
                anim: _anime,
                color: colors[index],
              }}
              onfinish={() => {
                _anime.value = 1;
                // console.log('has finished', index);
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
