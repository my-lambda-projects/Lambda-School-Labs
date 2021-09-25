import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";
import NavLink from "../navigation/NavLink";

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);
  console.log("STATE:", state);

  return (
    <View style={styles.container}>
      <Text style={styles.step1}>Step 1 of 2</Text>
      <Text style={styles.slogan}>
        <Text style={styles.logoColor}>Asset Tracker</Text> is free and easy to use!{"\n"}
        Simply fill out this form and you're on your way.
      </Text>

      <NavigationEvents onWillBlur={clearErrorMessage} />
      <LoginForm
        headerText="Sign Up for Net Giver Tracker"
        errorMessage={clearErrorMessage}
        submitButtonText="Create Account"
        onSubmit={signup}
      />
      <NavLink
        routeName="Login"
        text="Already have an account? Sign in instead!"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFEFE"
  },
  logoColor: {
    color: "#3366FF"
  },
  step1: {
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 35,
    fontSize: 13,
    fontWeight: "500"
  },
  slogan: {
    fontSize: 17,
    color: "#BFBFBF",
    marginBottom: 40,
    marginLeft: 20
  }
});

export default SignupScreen;
