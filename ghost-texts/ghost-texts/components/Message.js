import React from 'react';
import { StyleSheet, Text } from 'react-native';

class Message extends React.Component {
  render() {
    return <Text style={styles.message} >{this.props.body}</Text>;
  }
  
}
export default Message;

const styles = StyleSheet.create({
  message: {
    margin: 10,
    padding: 20,
    fontSize: 18,
    color: '#fff',
    flexDirection: 'row',
    backgroundColor: '#7892F6',
    justifyContent: 'center',
    textAlign: 'left',
    borderRadius: 5,
    overflow: 'hidden'
  }
});