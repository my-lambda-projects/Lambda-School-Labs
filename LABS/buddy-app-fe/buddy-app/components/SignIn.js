import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { addToken, addUser, isLoadingPage } from "../actions/buddyActions";
import Spinner from "react-native-loading-spinner-overlay";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { storeToken } from "../utils/authHelper";
import ValidationComponent from "react-native-form-validator";
import axiosWithAuth from "../utils/axiosWithAuth";
//styles
import Buttons from "../styles/Buttons";
import Global from "../styles/Global";

class SignIn extends ValidationComponent {
  state = {
    email: "",
    password: "",
    invalid: false
  };

  changeHandler = (value, name) => {
    this.setState({ ...this.state, [name]: value });
  };

  cancelSignInHandler = () => {
    this.props.navigation.navigate("Landing");
  };

  signInHandler = () => {
    this.props.isLoadingPage(true);
    if (this.onComplete()) {
      axios
        .post("https://buddy-app-be.herokuapp.com/auth/signin", this.state)
        .then(res => {
          storeToken(res.data.token);
          this.setState({ ...this.state, invalid: false });
          this.props.addUser({
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            id: res.data.id
          });
          console.log(res.data.id);
          AsyncStorage.setItem("id", `${res.data.id}`)
            .then(res => {
              this.props.navigation.navigate("AuthStack");
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          this.props.isLoadingPage(false);
          this.setState({ ...this.state, invalid: true });
        });
    } else {
      this.props.isLoadingPage(false);
    }
  };

  onComplete = () => {
    return this.validate({
      email: {
        email: true,
        required: true
      },
      password: {
        required: true
      }
    });
  };

  render() {
    if (!this.props.isLoading && this.props.user.id === "") {
      return (
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={Global.container}>
            <View style={Global.logoContainer}>
              <Text style={Global.logo}>BUDDY</Text>
            </View>
            <Text style={Global.title}>Sign In</Text>
            <View style={Global.formContainer}>
              {this.state.invalid && (
                <Text style={{ color: "red" }}>Invalid Credentials</Text>
              )}
              <TextInput
                style={[Global.input, { marginTop: 0 }]}
                placeholder="Email"
                onChangeText={e => this.changeHandler(e, "email")}
                value={this.state.email}
                autoCapitalize="none"
              />
              {this.isFieldInError("email") &&
                this.getErrorsInField("email").map(errorMessage => (
                  <Text style={Global.error} key={errorMessage}>
                    {errorMessage}
                  </Text>
                ))}

              <TextInput
                style={Global.input}
                placeholder="Password"
                onChangeText={e => this.changeHandler(e, "password")}
                value={this.state.password}
                autoCapitalize="none"
                secureTextEntry
              />
              {this.isFieldInError("password") &&
                this.getErrorsInField("password").map(errorMessage => (
                  <Text style={Global.error} key={errorMessage}>
                    {errorMessage}
                  </Text>
                ))}

              <View style={styles.fakeLinkContainer}>
                <Text
                  style={styles.fakeLink}
                  onPress={() => {
                    this.props.navigation.navigate("SignUp");
                  }}
                >
                  Don't have an account yet? Sign Up
                </Text>
              </View>
              <View style={Buttons.container}>
                <TouchableOpacity onPress={this.cancelSignInHandler}>
                  <Text style={[Buttons.textAuth]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.signInHandler}
                  style={[Buttons.btn, Buttons.secondary]}
                >
                  <Text style={[Buttons.textAuth]}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.bottomNav}></View>
          </View>
        </KeyboardAwareScrollView>
      );
    } else {
      return (
        <Spinner visible={this.props.isLoading} textContent={"Loading...."} />
      );
    }
  }
}

const styles = StyleSheet.create({
  bottomNav: {
    backgroundColor: "#6d6dff",
    height: 96,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  fakeLink: {
    color: "#6D6DFF",
    textDecorationLine: "underline",
    fontSize: 15,
    fontFamily: "Nunito-Light"
  },
  fakeLinkContainer: {
    alignSelf: "center",
    marginTop: 20
  }
});

const mapStateToProps = state => {
  return {
    ...state,
    token: state.token,
    isLoading: state.isLoading
  };
};

export default connect(
  mapStateToProps,
  { addToken, addUser, isLoadingPage }
)(SignIn);
