import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import sports from '../../assets/images/Profile/sports.png';
import meditation from '../../assets/images/Profile/Meditation.png';
type TipType = {
  title: string;
  paragraph: string;
  img: ImageSourcePropType;
};
function Tip({title, paragraph, img}: TipType) {
  return (
    <View style={styles.tipStyle}>
      <View style={{width: '60%'}}>
        <Text style={{fontSize: 14, fontWeight: '600', marginVertical: 10}}>
          {title}
        </Text>
        <Text style={{fontSize: 12, fontWeight: '400', lineHeight: 13}}>
          {paragraph}
        </Text>
      </View>
      <Image source={img} style={{height: 129, width: 130}} />
    </View>
  );
}

export default function Tips() {
  return (
    <View style={{flex: 1, paddingHorizontal: 16, paddingTop: 8}}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '700',
          color: '#121714',
          textDecorationLine: 'underline',
        }}>
        Tips For Wellness
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Tip
          title="Practise Mindfulness"
          paragraph="Take a few moments each day to focus on your breath and surroundings. Mindfulness can help reduce stress and improve your mood."
          img={meditation}
        />
        <Tip
          title="Stay Active"
          paragraph="Regular physical activity releases endorphins, which have mood-boosting effects. Aim for at least 30 minutes of exercise most days."
          img={sports}
        />
        <Tip
          title="Practise Mindfulness"
          paragraph="Take a few moments each day to focus on your breath and surroundings. Mindfulness can help reduce stress and improve your mood."
          img={meditation}
        />
        <Tip
          title="Stay Active"
          paragraph="Regular physical activity releases endorphins, which have mood-boosting effects. Aim for at least 30 minutes of exercise most days."
          img={sports}
        />
        <Tip
          title="Practise Mindfulness"
          paragraph="Take a few moments each day to focus on your breath and surroundings. Mindfulness can help reduce stress and improve your mood."
          img={meditation}
        />
        <Tip
          title="Stay Active"
          paragraph="Regular physical activity releases endorphins, which have mood-boosting effects. Aim for at least 30 minutes of exercise most days."
          img={sports}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: '2%',
  },
  tipStyle: {
    flexDirection: 'row',
    width: '90%',
    // justifyContent: 'space-between',
    columnGap: 25,
    marginVertical: '5%',
  },
});
