import React from 'react';
import { 
  StyleSheet,
  Text, 
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class Form extends React.Component {
  render() {
    return (
      <View style={styles.formContainer}>
        <TextInput 
          placeholder="Username..."
          placeholderTextColor='#292929' 
          style={styles.textInput}/>

        <TextInput 
          placeholder="Password..." 
          placeholderTextColor='#292929'
          secureTextEntry={true} 
          style={styles.textInput}/>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnText}> Sign in here </Text>
        </TouchableOpacity> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    alignSelf: 'stretch',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 20,
    backgroundColor: 'rgba(128,128,128,0.3)',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  button: {
    alignSelf: 'stretch',
    marginTop: 30,
    backgroundColor: '#393993',
    alignItems:'center',
    padding: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 24,
  }
});



// underlineColorAndroid={'transparent'}