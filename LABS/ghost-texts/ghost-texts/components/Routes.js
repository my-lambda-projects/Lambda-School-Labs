import React from 'react';
import { View, StyleSheet } from 'react-native';

import Messages from './Messages';
import MessageForm from './MessageForm';

export const MessageFeed = () => (
  <View style={styles.container}>
      <Messages />
  </View>
);
export const SendMessage = () => (
  <View style={styles.container}>
      <MessageForm />
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
});
