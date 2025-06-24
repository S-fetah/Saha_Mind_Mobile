import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

export type MessageType = {
  name: 'Ai Assistant' | 'user';
  text: string;
};
export type ConversationType = {
  name: 'Doctor' | 'user';
  text: string;
};

const CHAT_STORAGE_KEY = 'chat_messages';
const COVNERSATION_KEY = 'conversations';
export default function useChatStorage() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [conversation, setConversation] = useState<ConversationType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(CHAT_STORAGE_KEY);
        const storedConversation = await AsyncStorage.getItem(COVNERSATION_KEY);
        if (stored) {
          setMessages(JSON.parse(stored));
        }
        if (storedConversation) {
          setConversation(JSON.parse(storedConversation));
        }
      } catch (error) {
        console.error('Failed to load messages:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const saveMessages = async (newMessages: MessageType[]) => {
    try {
      await AsyncStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(newMessages));
    } catch (error) {
      console.log(error);
    }
  };
  const saveConversation = async (newMessages: ConversationType[]) => {
    try {
      await AsyncStorage.setItem(COVNERSATION_KEY, JSON.stringify(newMessages));
    } catch (error) {
      console.log(error);
    }
  };

  const addMessage = (msg: MessageType) => {
    setMessages(prev => [...prev, msg]);
  };
  const addConvo = (message: ConversationType) => {
    const updated = [...conversation, message];
    setConversation(updated);
  };
  const clearMessages = async () => {
    try {
      await AsyncStorage.removeItem(CHAT_STORAGE_KEY);
      // await AsyncStorage.removeItem(COVNERSATION_KEY);

      // setConversation([]);
      setMessages([]);
    } catch (error) {
      console.error('Failed to clear messages:', error);
    }
  };

  return {
    messages,
    loading,
    addMessage,
    clearMessages,
    saveMessages,
    conversation,
    saveConversation,
    addConvo,
  };
}
