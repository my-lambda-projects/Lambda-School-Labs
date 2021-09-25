import React, { Component } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import Auth0 from "react-native-auth0";
import { AuthSession } from "expo";

const auth0 = new Auth0({
  domain: "dev-dumq2xvs.auth0.com",
  clientId: "cn4Sw78ByHA6bBqVVEihdH3JesIp16o9"
});

class TextMsg extends Component {
  constructor(props) {
    super(props);
    this.state = { accessToken: null };
  }

  onLogin = async () => {
    let result = await AuthSession.startAsync(
      auth0.webAuth
        .authorize({
          scope: "openid profile email"
        })
        .then(credentials => {
          Alert.alert("AccessToken: " + credentials.accessToken);
          this.setState({ accessToken: credentials.accessToken });
        })
        .catch(error => console.log(error))
    );
  };

  onLogout = () => {
    auth0.webAuth
      .clearSession({})
      .then(success => {
        Alert.alert("Logged out!");
        this.setState({ accessToken: null });
      })
      .catch(error => {
        console.log("Log out cancelled");
      });
  };

  render() {
    let loggedIn = this.state.accessToken === null ? false : true;
    return (
      <View style={styles.container}>
        <Text style={styles.header}> NetGiver Auth0Sample - Login </Text>
        <Text>You are{loggedIn ? " " : " not "}logged in . </Text>
        <Button
          onPress={loggedIn ? this.onLogout : this.onLogin}
          title={loggedIn ? "Log Out" : "Log In"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});

export default TextMsg;

// import { AuthSession } from ‘expo’;
// const auth0Domain = ‘https://yourdomain.auth0.com 12’;
// const auth0ClientId = ‘yourid’;

// class TextMsg extends React
