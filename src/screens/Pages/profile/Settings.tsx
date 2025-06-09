import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Screen} from '../../../components';

export default function Settings() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const handleSave = () => {
    Alert.alert(
      '✅ Saved Successfully',
      `Email: ${email}\nUsername: ${username}`,
    );
  };

  return (
    <Screen gradient={true}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Account Settings</Text>
        <Text style={styles.subtext}>
          Update your account details below. Your changes will be reflected
          immediately.
        </Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Your preferred username"
            placeholderTextColor="#777"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="example@yourmail.com"
            placeholderTextColor="#777"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}> Save Changes</Text>
        </Pressable>

        <Text style={styles.footerText}>
          Make sure to use a valid email so we can reach you for important
          updates. Your username helps others recognize you across the app.
        </Text>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
    color: '#121714',
  },
  subtext: {
    fontSize: 16,
    color: '#555',
    marginBottom: 25,
    lineHeight: 22,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    color: '#333',
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    height: 48,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    fontSize: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: '#14a38b', // soft teal-green
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 6,
    elevation: 4,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    marginTop: 30,
    lineHeight: 20,
  },
});
