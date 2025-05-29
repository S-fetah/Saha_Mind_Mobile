import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import profileImage from '../../assets/images/Profile/pp.png';
import {ChevronRight} from '../../components/chatComponents/LucidIcons';
import {Screen} from '../../components';

interface ProfileListItemProps {
  title: string;
  value?: string; //
  onPress?: () => void;
  isSwitch?: boolean;
  switchValue?: boolean;
  onSwitchToggle?: (value: boolean) => void;
}

const ProfileListItem = ({
  title,
  value,
  onPress,
  isSwitch = false, // Default value makes it optional
  switchValue,
  onSwitchToggle,
}: ProfileListItemProps) => {
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={onPress}
      disabled={isSwitch} // Disable press for switch rows
    >
      <View style={styles.listItemContent}>
        <Text style={styles.listItemTitle}>{title}</Text>
      </View>
      <View style={styles.listItemRight}>
        {isSwitch ? (
          <Switch
            trackColor={{false: '#767577', true: '#4CB3A5'}}
            thumbColor={'#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={onSwitchToggle}
            value={switchValue}
          />
        ) : (
          <>
            {value && <Text style={styles.listItemValue}>{value}</Text>}
            <ChevronRight size={20} color="#A0A0A0" />
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

// --- Main Profile Screen Component ---
const ProfileScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const handleEditProfile = () => {
    console.log('Edit Profile pressed!');
  };

  const handleLogout = () => {
    console.log('Log Out pressed!');
  };

  return (
    <Screen gradient={true}>
      <View style={styles.profileInfoContainer}>
        <View style={styles.profileImageContainer}>
          <Image source={profileImage} style={styles.profileImage} />
        </View>
        <Text style={styles.userName}>Sophia Carter</Text>
        <Text style={styles.joinedText}>Joined 2023</Text>
        <TouchableOpacity onPress={handleEditProfile}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.settingsTitle}>Settings</Text>

        <ProfileListItem
          title="Notifications"
          isSwitch={true}
          switchValue={notificationsEnabled}
          onSwitchToggle={setNotificationsEnabled}
        />
        <ProfileListItem
          title="Privacy"
          onPress={() => console.log('Privacy')}
        />
        <ProfileListItem
          title="Security"
          onPress={() => console.log('Security')}
        />

        <ProfileListItem title="Help" onPress={() => console.log('Help')} />
        <ProfileListItem title="About" onPress={() => console.log('About')} />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </Screen>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 15 : 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholderRight: {
    width: 24,
  },
  profileInfoContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    // backgroundColor: '#F8F8F8',
  },
  profileImageContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FCE7D2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 45,
    resizeMode: 'cover',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  joinedText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  editProfileText: {
    fontSize: 16,
    color: '#4CB3A5',
    fontWeight: '500',
  },
  settingsSection: {
    marginTop: -15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#121714',
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EFEFEF',
    marginBottom: 5,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EFEFEF',
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  listItemTitle: {
    fontSize: 16,
    color: '#121714',
    fontWeight: '400',
  },
  listItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemValue: {
    fontSize: 16,
    color: '#A0A0A0',
    marginRight: 8,
  },
  logoutButton: {
    backgroundColor: '#e0f2fe',
    borderRadius: 10,
    paddingVertical: 15,
    marginHorizontal: 15,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#e0f2fe',
    elevation: 5,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#121714',
  },
});

export default ProfileScreen;
