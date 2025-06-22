import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

export type MessageType = {
  name: 'Ai Assistant' | 'user';
  text: string;
};

const CHAT_STORAGE_KEY = 'chat_messages';
export default function useChatStorage() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(CHAT_STORAGE_KEY);
        if (stored) {
          setMessages(JSON.parse(stored));
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

  const addMessage = (message: MessageType) => {
    const updated = [...messages, message];
    setMessages(updated);
  };
  const clearMessages = async () => {
    try {
      await AsyncStorage.removeItem(CHAT_STORAGE_KEY);
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
  };
}
