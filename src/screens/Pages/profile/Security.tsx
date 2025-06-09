import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Screen} from '../../../components';

export default function Security() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('❌ Passwords do not match');
    } else {
      Alert.alert('✅ Password Updated');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <Screen gradient={true}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Security</Text>

        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingLabel}>Two-Factor Authentication</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingLabel}>Face ID / Biometrics</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Change Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Current Password"
            secureTextEntry
            placeholderTextColor="#777"
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />

          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry
            placeholderTextColor="#777"
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            secureTextEntry
            placeholderTextColor="#777"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <Pressable style={styles.saveButton} onPress={handlePasswordChange}>
            <Text style={styles.saveButtonText}>🔐 Update Password</Text>
          </Pressable>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            You can also enable biometric authentication for faster access and
            enhanced privacy. Session expires after 30 minutes of inactivity for
            your protection.
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    color: '#121714',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#222',
  },
  input: {
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: '#14a38b',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoBox: {
    marginTop: 30,
    backgroundColor: '#f0f8f6',
    padding: 14,
    borderRadius: 10,
  },
  infoText: {
    color: '#444',
    fontSize: 14,
    lineHeight: 20,
  },
});
