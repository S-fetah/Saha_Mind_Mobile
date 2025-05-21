import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function MainHeader() {
  const [userName, setUserName] = React.useState<string | null>('Ali');
  return (
    <View style={styles.header}>
      <Text>
        Hey, <Text style={{fontWeight: '600'}}> {userName}!👋</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
});
