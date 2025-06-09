import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import profileImage from '../../assets/images/Profile/pp.png';
import assistant from '../../assets/images/Profile/assisstant.png';
import {Send} from 'lucide-react-native';
import {Screen} from '../../components';

export default function DoctorScreen() {
  const [message, setMessage] = useState<string>('');

  const handlePress = () => {
    console.log('message is : ', message);
  };
  const handleChange = (text: string) => {
    setMessage(text);
  };
  return (
    <Screen gradient={true}>
      <ScrollView contentContainerStyle={styles.chatContainer}>
        <View style={styles.messageRow}>
          <Image source={assistant} style={styles.avatar} />
          <View style={styles.aiBubble}>
            <Text style={styles.aiName}>Doctor Ali</Text>
            <Text style={styles.messageText}>
              Hello there mohamed! How are we feeling today?.
            </Text>
          </View>
        </View>

        <View style={[styles.messageRow, styles.messageRowUser]}>
          <View style={styles.userBubble}>
            <Text style={styles.userText}>
              hello doctor am actually felling a bit better today!.
            </Text>
          </View>
          <Image source={profileImage} style={styles.avatar} />
        </View>
        <View style={styles.messageRow}>
          <Image source={assistant} style={styles.avatar} />
          <View style={styles.aiBubble}>
            <Text style={styles.aiName}>Doctor Ali</Text>
            <Text style={styles.messageText}>
              That's good to here , make sure to report back if u experience
              anything unsual
            </Text>
          </View>
        </View>

        <View style={[styles.messageRow, styles.messageRowUser]}>
          <View style={styles.userBubble}>
            <Text style={styles.userText}>okay Doctor Thanks</Text>
          </View>
          <Image source={profileImage} style={styles.avatar} />
        </View>
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Message"
          placeholderTextColor="#7A9E9F"
          style={styles.textInput}
          onChangeText={handleChange}
          value={message}
        />

        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.imageIcon}>
            <Send size={25} />
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9f0ed',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 20,
    color: '#333',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  chatContainer: {
    padding: 16,
    paddingBottom: 100,
    marginTop: '10%',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  messageRowUser: {
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  aiBubble: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    maxWidth: '75%',
  },
  aiName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  userBubble: {
    backgroundColor: '#30C78D',
    padding: 12,
    borderRadius: 12,
    maxWidth: '75%',
    marginRight: 8,
  },
  userText: {
    color: 'white',
    fontSize: 15,
  },
  messageText: {
    fontSize: 15,
    color: '#333',
  },
  inputContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#e3ece9',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    height: 50,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  imageIcon: {
    fontSize: 20,
    marginLeft: 18,
    width: 30,

    paddingLeft: 8,
  },
});
