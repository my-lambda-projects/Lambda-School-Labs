import React from 'react';
import { 
  StyleSheet,
  Text, 
  View,
  TextInput,
  Keyboard,
} from 'react-native';

import Button from '../common/button.js';
import Myrecipe from './myrecipe.js';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoggingIn: false,
      message: ''
    }
  }
  // componentDidMount() {
  //   this.loadInitialState.done();
  // }
  // _loadInitialState= async() => {
  //   var value = await AsyncStorage.getItem('user');
  //   if(value!== null) {
  //     this.props.navigation.navigation('Main')
  //   }
  // }
  render() {
    return (
      <View style={styles.formContainer}>
        <TextInput 
          placeholder="Username..."
          placeholderTextColor='#292929' 
          style={styles.textInput}
          value={this.state.username}
          onChangeText={(text) => this.setState({username: text})}/>

        <TextInput 
          placeholder="Password..." 
          placeholderTextColor='#292929'
          secureTextEntry={true} 
          style={styles.textInput}
          value={this.state.password}
          onChangeText={(text) => this.setState({password: text})}/>

        <Button text={'Sign In'} onPress={this.login} />
      </View>
    );
  }
  login = () => {
    //log the user in
    const { username,password } = this.state;
    console.log(username);
    //send data to server 
    fetch('http://127.0.0.1:8000/api/data', {
      method: 'POST',
      headers: {
      'Authorization': 'Token ' + '54354545345435dffgfvgf df', 
      //  random token 
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //passing data to server
            username: username,
            password: password,
           })
    })
    .then((res) => res.json())
    .then((resjson) => {
      if(resjson == "ok") {
        alert("Successfully logged in!")
        this.props.navigation("Profile", {username: username});
      } else {
        alert("Wrong Username / password combo")
      }
    })
    .catch((err) => {
      console.error(err);
    });
    Keyboard.dismiss();
  }
}

const styles = StyleSheet.create({
  formContainer: {
    alignSelf: 'stretch',
    paddingLeft: 20,
    paddingRight: 20,
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 20,
    backgroundColor: 'rgba(128,128,128,0.3)',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
});
