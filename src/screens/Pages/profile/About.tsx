import hna from '../../../assets/images/Profile/dev2.png';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Screen} from '../../../components';
import {ArrowLeft} from 'lucide-react-native';
import {ProfileStackParams} from '../../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type AboutType = NativeStackScreenProps<ProfileStackParams, 'About'>;

export default function About({navigation}: AboutType) {
  return (
    <Screen gradient={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft strokeWidth={1.5} size={26} />
          </TouchableOpacity>
          <Text style={styles.headerText}>About</Text>
        </View>

        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.paragraph}>
          At Saha Mind, our mission is to empower individuals on their journey
          to mental wellness. We believe that everyone deserves access to tools
          and resources that support their emotional well-being, and we’re
          committed to providing a safe, supportive, and evidence-based platform
          for self-discovery and growth.
        </Text>

        <Text style={styles.sectionTitle}>Our Team</Text>
        <Text style={styles.paragraph}>
          Saha Mind is developed with the assistance of a team of mental health
          professionals, software engineers, and designers who are passionate
          about making a positive impact on people's lives. Our team includes
          licensed therapists, researchers, and experts in the field of
          psychology, ensuring that our app is grounded in scientific principles
          and best practices.
        </Text>

        <View style={styles.profileContainer}>
          <Image style={styles.avatar} source={hna} />
          <View>
            <Text style={styles.name}>Safiddine Abdelfetah </Text>
            <Text style={styles.role}>Software Engineer</Text>
          </View>
        </View>

        <View style={styles.profileContainer}>
          <Image style={styles.avatar} source={hna} />
          <View>
            <Text style={styles.name}>Said Seghir Akram</Text>
            <Text style={styles.role}>Software Engineer</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Credentials</Text>
        <Text style={styles.paragraph}>
          Saha Mind is developed in accordance with guidelines from the American
          Psychological Association (APA) and the National Institute of Mental
          Health (NIMH). Our content is reviewed by licensed therapists to
          ensure accuracy and appropriateness.
        </Text>
      </ScrollView>
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
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#121714',
    marginTop: 10,
    marginBottom: 4,
    lineHeight: 24,
    paddingHorizontal: 5,
  },
  paragraph: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    fontFamily: 'sans-serif',
    fontWeight: 500,
    lineHeight: 24,
    paddingHorizontal: 5,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: '#ddd', // Placeholder background
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#121714',
    fontFamily: 'Manrope',
  },
  role: {
    fontSize: 12,
    color: '#7D7D7D',
    fontFamily: 'Manrope',
  },
});
