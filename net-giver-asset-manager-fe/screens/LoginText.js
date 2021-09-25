import React, { useContext } from "react";
import { View, Image, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import LoginForm from "../components/LoginForm";
import NavLink from "../navigation/NavLink";
import { Context } from "../context/AuthContext";
import ExpoMixpanelAnalytics from "@benawad/expo-mixpanel-analytics";
const analytics = new ExpoMixpanelAnalytics(
  process.env.MIXPANEL_SECRET_API_KEY
); //planning on putting token it in an env file if it passes
analytics.track("Logged In", { "Referred By": "Friend" });

const LoginText = () => {
  const { state, signin, clearErrorMessage } = useContext(Context);
  // console.log("logTest:", state);

  return (
    <View style={styles.mainWrapper}>
      <View style={{ display: "flex" }}>
        <Image
          source={require("../assets/images/assetTracker.jpg")}
          style={styles.logo}
        />
      </View>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <LoginForm
        headerText="Sign In to Your Account"
        errorMessage={state.errorMessage}
        onSubmit={signin}
        submitButtonText="Log In"
      />
      <NavLink
        text="Dont have an account? Sign up instead!"
        routeName="Register"
        style={styles.toRegister}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1
  },
  logo: {
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 50,
    height: 109,
    width: 225
  },
  toRegister: {
    color: "red"
  }
});

export default LoginText;
