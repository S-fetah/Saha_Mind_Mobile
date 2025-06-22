import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import profileImage from '../../assets/images/Profile/pp.png';
import assistant from '../../assets/images/Profile/assisstant.png';
import {Send} from 'lucide-react-native';
import {Screen} from '../../components';
import useChatStorage from '../../Context/useChatStorage';

const ChatScreen = () => {
  // const [messages, setMessages] = useState<messageType[]>([
  //   {
  //     name: 'user',
  //     text: 'I’m feeling a bit anxious today.',
  //   },
  //   {
  //     name: 'Ai Assistant',
  //     text: 'It’s okay to feel anxious acknowledging it is a brave first step.You’re not alone, and I’m here for you. If you’d like to talk more or need support, I’m ready to listen.',
  //   },
  //   {
  //     name: 'user',
  //     text: 'What Can i do ?',
  //   },
  //   {
  //     name: 'Ai Assistant',
  //     text: '...',
  //   },
  // ]);

  const {messages, addMessage, loading, saveMessages} = useChatStorage();
  const [message, setMessage] = useState<string>('');
  const scrollToEnd = useRef<ScrollView>(null);

  const handleChange = (text: string) => {
    setMessage(text);
  };
  const handlePress = () => {
    if (message.trim() === ' ') return;
    addMessage({name: 'user', text: message});
    saveMessages([...messages, {name: 'user', text: message}]);

    setMessage('');
    Keyboard.dismiss();

    setTimeout(() => {
      scrollToEnd.current?.scrollToEnd({animated: true});
    }, 100);
  };
  if (loading) {
    return (
      <Screen gradient={true}>
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{flex: 1, justifyContent: 'center'}}
        />
      </Screen>
    );
  }
  return (
    <Screen gradient={true}>
      <ScrollView
        contentContainerStyle={styles.chatContainer}
        ref={scrollToEnd}
        onContentSizeChange={() =>
          scrollToEnd.current?.scrollToEnd({animated: true})
        }>
        <View style={styles.messageRow}>
          <Image source={assistant} style={styles.avatar} />
          <View style={styles.aiBubble}>
            <Text style={styles.aiName}>AI Assistant</Text>
            <Text style={styles.messageText}>
              Hi there!How are you feeling today?
            </Text>
          </View>
        </View>

        {messages.map(ele => {
          if (ele.name === 'Ai Assistant') {
            return (
              <View style={styles.messageRow} key={ele.text}>
                <Image source={assistant} style={styles.avatar} />
                <View style={styles.aiBubble}>
                  <Text style={styles.aiName}>AI Assistant</Text>
                  <Text style={styles.messageText}>{ele.text}</Text>
                </View>
              </View>
            );
          }
          return (
            <View
              style={[styles.messageRow, styles.messageRowUser]}
              key={ele.text}>
              <View style={styles.userBubble}>
                <Text style={styles.userText}>{ele.text}</Text>
              </View>
              <Image source={profileImage} style={styles.avatar} />
            </View>
          );
        })}
      </ScrollView>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 50}
        style={styles.inputContainer}>
        <TextInput
          placeholder="Message"
          placeholderTextColor="#7A9E9F"
          style={styles.textInput}
          onChangeText={handleChange}
          value={message}
        />

        <TouchableOpacity onPress={handlePress} style={styles.imageIcon}>
          <Send size={25} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default ChatScreen;
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
    flexGrow: 1,
    paddingBottom: 100,
    marginTop: '10%',
    zIndex: 10,
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
    flexDirection: 'row',
  },
  textInput: {
    fontSize: 15,
    color: '#333',
    backgroundColor: '#e3ece9',
    flex: 1,
    height: 45,
    borderRadius: 20,
    borderWidth: 1,
    textAlign: 'left',
    paddingLeft: 20,
  },
  imageIcon: {
    fontSize: 20,
    paddingLeft: 8,
    position: 'absolute',
    top: 10,
    left: Dimensions.get('window').width - 110,
    alignSelf: 'center',
  },
});
