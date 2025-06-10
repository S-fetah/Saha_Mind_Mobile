import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Screen} from '../../../components';
import {ArrowLeft} from 'lucide-react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParams} from '../../../types';

import encryption from '../../../assets/images/Profile/Vector1.png';
import storage from '../../../assets/images/Profile/Vector2.png';
import auth from '../../../assets/images/Profile/Vector3.png';
import priv from '../../../assets/images/Profile/Vector4.png';

const {height} = Dimensions.get('window');
type securityPropType = NativeStackScreenProps<ProfileStackParams, 'Security'>;
type miniSectionPropTypes = {
  title: string;
  paragraph: string;
  icon: ImageSourcePropType;
};

const securitySettings: miniSectionPropTypes[] = [
  {
    title: 'Encyption',
    paragraph:
      'Your data is encrypted both in transit and at rest, ensuring it remains confidential.',
    icon: encryption,
  },
  {
    title: 'Secure Storage',
    paragraph:
      'We use secure servers and databases to store your data, minimizing the risk of unauthorized access.',
    icon: storage,
  },
  {
    title: 'Authentication',
    paragraph:
      'We employ strong authentication methods, such as passwords and biometrics, to verify your identity.',
    icon: auth,
  },
  {
    title: 'Privacy Compliance',
    paragraph:
      'We adhere to strict privacy policies and regulations to safeguard your personal information.',
    icon: priv,
  },
];

function MiniSection({title, paragraph, icon}: miniSectionPropTypes) {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 10,
        columnGap: 15,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={styles.iconView}>
        <Image source={icon} />
      </View>
      <View style={styles.textView}>
        <Text style={styles.sectionText}>{title}</Text>
        <Text style={styles.sectionParag}>{paragraph}</Text>
      </View>
    </View>
  );
}
export default function Security({navigation}: securityPropType) {
  return (
    <Screen gradient={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <ArrowLeft strokeWidth={1.5} size={26} />
        </TouchableOpacity>

        <Text style={styles.headerText}>Security</Text>
      </View>
      <View style={styles.Container}>
        <Text style={styles.data}>Your Data is safe</Text>
        <Text style={styles.dataText}>
          We take your privacy seriously. Here's how we protect your
          information:
        </Text>

        {securitySettings.map(setting => {
          return (
            <MiniSection
              title={setting.title}
              paragraph={setting.paragraph}
              icon={setting.icon}
              key={setting.title}
            />
          );
        })}

        <TouchableOpacity
          style={{
            backgroundColor: '#1AE594',
            padding: 10,
            borderRadius: 24,
            alignSelf: 'stretch',
            position: 'absolute',
            top: height - 220,
            width: '100%',
            left: '3%',
          }}
          onPress={() => navigation.navigate('ProfileScreen')}>
          <Text
            style={{
              color: '#121714',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: '600',
              lineHeight: 24,
            }}>
            Got it
          </Text>
        </TouchableOpacity>
      </View>
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
    fontWeight: 700,
    fontFamily: 'Manrope',
    textAlign: 'center',
    width: '80%',
    color: '#121714',
  },
  Container: {
    flex: 1,
    paddingHorizontal: 10,
    // backgroundColor: 'white',
  },
  data: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 700,
    fontFamily: 'Manrope',
    marginBottom: 10,
    color: '#121714',
    lineHeight: 28,
  },
  dataText: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 500,
    fontFamily: 'Manrope',
    paddingRight: 3,
    lineHeight: 22,
    color: '#121714',
    marginBottom: 5,
  },
  iconView: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F5f2',
    overflow: 'visible',
  },
  textView: {
    flex: 1,
  },
  sectionText: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 500,
    fontFamily: 'sans-serif-medium',
    color: '#121714',
    lineHeight: 24,
  },
  sectionParag: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: 400,
    fontFamily: 'Manrope',
    marginBottom: 10,
    color: '#121714',
    lineHeight: 21,
  },
});
