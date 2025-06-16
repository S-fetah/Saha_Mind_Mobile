import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Screen} from '../../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProfileStackParams} from '../../../types';
import {ArrowLeft} from 'lucide-react-native';

type privacyPropTypes = NativeStackScreenProps<ProfileStackParams, 'Privacy'>;
type policyProps = {
  title: string;
  policy: string;
};
const policies: policyProps[] = [
  {
    title: 'Last Updated: June 26, 2025',
    policy:
      'Welcome to Saha Mind, your mental wellness companion. We value your trust and are committed to protecting your privacy. This policy outlines how we collect, use, and protect your information. By using Saha Mind, you consent to the practices described here.',
  },
  {
    title: 'Information We Collect',
    policy:
      'To support your mental health journey, we collect data that you voluntarily provide, such as mood logs, journal entries, reflections, and responses to therapeutic tools. We also gather technical data such as app usage patterns, device type, and system version to enhance your experience.',
  },
  {
    title: 'How We Use Your Information',
    policy:
      'We use your data to deliver personalized mental health support, track your progress, and tailor content to your needs. Your data also helps us improve app performance and develop new wellness features. We may use aggregated, anonymized data for mental health research and app improvement.',
  },
  {
    title: 'Data Sharing and Disclosure',
    policy:
      'Your personal data is **never sold**. We do not share your identifiable data with third parties unless legally required or with your explicit consent. Only anonymized, non-identifiable insights may be used for internal research and reporting.',
  },
  {
    title: 'Your Rights',
    policy:
      'You are in control of your data. You can view, edit, or delete your information at any time via the app settings. You may also request data export or object to certain processing. For support, reach out to us at any time.',
  },
  {
    title: 'Data Security',
    policy:
      'We implement industry-standard encryption and security practices to keep your data safe and confidential. While we strive for full protection, no system is entirely immune to risk. Please use strong passwords and keep your device secure.',
  },
  {
    title: 'Changes to This Policy',
    policy:
      'We may revise this Privacy Policy to reflect updates in our practices or regulations. Significant changes will be communicated through the app with a visible notice and an updated "Last Updated" date above.',
  },
  {
    title: 'Contact Us',
    policy:
      'For questions, concerns, or requests regarding your privacy or this policy, feel free to reach out to us at **support@Saha Mind.com**. We’re here to help and ensure your information is respected.',
  },
];

function Policy({title, policy}: policyProps) {
  return (
    <View style={styles.policy}>
      <Text style={styles.policyTitle}>{title}</Text>
      <Text style={styles.policyText}>{policy}</Text>
    </View>
  );
}

export default function Privacy({navigation}: privacyPropTypes) {
  return (
    <Screen gradient={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <ArrowLeft strokeWidth={1.5} size={26} />
        </TouchableOpacity>

        <Text style={styles.headerText}> Privacy Policy</Text>
      </View>

      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        {policies.map(policy => {
          return (
            <Policy
              title={policy.title}
              policy={policy.policy}
              key={policy.title}
            />
          );
        })}
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
    fontWeight: 700,
    fontFamily: 'Manrope',
    textAlign: 'center',
    width: '80%',
    color: '#121714',
  },
  policy: {
    paddingHorizontal: 10,
    marginVertical: 15,
  },
  policyTitle: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 700,
    fontFamily: 'Manrope',
    marginBottom: 10,
    color: '#121714',
  },
  policyText: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 400,
    fontFamily: 'Manrope',
    paddingRight: 3.1,
    lineHeight: 22,
    color: '#121714',
  },
});
