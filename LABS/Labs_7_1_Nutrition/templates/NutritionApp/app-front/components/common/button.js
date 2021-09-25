
import React from 'react';
import { 
  StyleSheet,
  Text, 
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';

export default class Button extends React.Component {
    render() {
      return (
        <TouchableHighlight 
          style={styles.button} 
          underlayColor={'gray'}
          onPress={this.props.onPress}
          >
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </TouchableHighlight> 
        );
    }
}


const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    marginTop: 30,
    backgroundColor: '#393993',
    alignItems:'center',
    padding: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
});