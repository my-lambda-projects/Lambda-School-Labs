import React from "react";
import ValidationComponent from "react-native-form-validator";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { addUser } from "../actions/buddyActions";
import { storeToken, getToken } from "../utils/authHelper";
//styles
import Buttons from "../styles/Buttons";
import Global from "../styles/Global";
import Colors from "../styles/Colors";

class SignUp extends ValidationComponent {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    location: ""
  };

  handleChange = (text, eventName) => {
    this.setState({ ...this.state, [eventName]: text });
    // console.log({ [eventName]: text });
  };

  handleSubmit = newUser => {
    axios
      .post("https://buddy-app-be.herokuapp.com/auth/signup", newUser)
      .then(response => {
        console.log("sign up response", response.data);
        const storedUser = {
          first_name: response.data.newUser.first_name,
          last_name: response.data.newUser.last_name,
          id: response.data.newUser.id
        };
        this.props.addUser(storedUser);
        storeToken(response.data.token);
        AsyncStorage.setItem("id", `${response.data.newUser.id}`)
          .then(id => {
            this.props.navigation.navigate("InterestOnboard");
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(error => {
        if (error.response.status == 400) {
          Alert.alert("Warning", error.response.data.message, [{ text: "OK" }]);
        } else {
          console.log("sign up error", error.response);
        }
      });
  };

  onComplete = () => {
    this.validate({
      first_name: {
        required: true
      },
      last_name: {
        required: true
      },
      email: {
        email: true,
        required: true
      },
      password: {
        required: true
      },
      location: {
        required: true
      }
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={130}>
          <View style={Global.container}>
            <View style={Global.logoContainer}>
              <Text style={Global.logo}>BUDDY</Text>
            </View>

            <Text
              style={
                this.isFormValid()
                  ? Global.title
                  : {
                      fontSize: 30,
                      color: Colors.darkGray,
                      fontFamily: "Nunito-Regular",
                      marginTop: 20
                    }
              }
            >
              Sign Up
            </Text>
            <View
              style={
                this.isFormValid()
                  ? Global.formContainer
                  : { width: "100%", marginTop: 10 }
              }
            >
              <View style={su_styles.name}>
                <TextInput
                  placeholder="First Name"
                  onChangeText={text => this.handleChange(text, "first_name")}
                  style={[Global.input, { width: "47%", marginTop: 0 }]}
                  value={this.state.first_name}
                />
                <TextInput
                  placeholder="Last Name"
                  onChangeText={text => this.handleChange(text, "last_name")}
                  style={[Global.input, { width: "47%", marginTop: 0 }]}
                  value={this.state.last_name}
                />
              </View>
              {this.isFieldInError("first_name") &&
                this.getErrorsInField("first_name").map(errorMessage => (
                  <Text style={Global.error} key={errorMessage}>
                    {errorMessage}
                  </Text>
                ))}
              {this.isFieldInError("last_name") &&
                this.getErrorsInField("last_name").map(errorMessage => (
                  <Text style={Global.error} key={errorMessage}>
                    {errorMessage}
                  </Text>
                ))}

              <TextInput
                placeholder="Email"
                onChangeText={text => this.handleChange(text, "email")}
                style={Global.input}
                autoCapitalize="none"
                value={this.state.email}
              />
              {this.isFieldInError("email") &&
                this.getErrorsInField("email").map(errorMessage => (
                  <Text style={Global.error} key={errorMessage}>
                    {errorMessage}
                  </Text>
                ))}

              <TextInput
                placeholder="Password"
                onChangeText={text => this.handleChange(text, "password")}
                style={Global.input}
                autoCapitalize="none"
                secureTextEntry
                value={this.state.password}
              />
              {this.isFieldInError("password") &&
                this.getErrorsInField("password").map(errorMessage => (
                  <Text style={Global.error} key={errorMessage}>
                    {errorMessage}
                  </Text>
                ))}

              <TextInput
                placeholder="Location"
                onChangeText={text => this.handleChange(text, "location")}
                style={Global.input}
                value={this.state.location}
              />
              {this.isFieldInError("location") &&
                this.getErrorsInField("location").map(errorMessage => (
                  <Text style={Global.error} key={errorMessage}>
                    {errorMessage}
                  </Text>
                ))}
            </View>

            <View style={Buttons.container}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Landing")}
              >
                <Text style={[Buttons.textAuth]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[Buttons.btn, Buttons.primary]}
                onPress={() => {
                  // run validation tests
                  this.onComplete();

                  const newUser = {
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    email: this.state.email,
                    password: this.state.password,
                    location: this.state.location
                  };

                  // if the form is valid, make the post request. else, errors will display
                  this.isFormValid()
                    ? this.handleSubmit(newUser)
                    : console.log("Form has errors");
                }}
              >
                <Text style={[Buttons.textAuth, Buttons.textPrimary]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={su_styles.bottomNav}></View>
      </View>
    );
  }
}

const su_styles = StyleSheet.create({
  name: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bottomNav: {
    backgroundColor: "#6d6dff",
    height: 96,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  }
});

const mapStateToProps = state => {
  return {
    ...state,
    user: state.user
  };
};
export default connect(
  mapStateToProps,
  { addUser }
)(SignUp);
