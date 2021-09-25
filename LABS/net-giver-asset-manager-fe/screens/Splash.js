import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";

const Splash = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [userId, setUserId] = useState(null)
  // Use useEffect or ComponentDidMount to check sign-in status of user
  // If the user isn't signed in, direct to auth.  If user is, direct to app.

  // If you want to work on a particular screen, type "Dev" into the navigate
  // prop on line 13.  This will take you to the HomeScreen screen after leaving
  // the splash screen.  When you're done, change back to "Auth".

  useEffect(() => {
    hasToken();
    if (userId !== null) {
      navigation.navigate("App")
    } else {
      navigation.navigate("Auth")
    }
  });

  const hasToken = () => {
    AsyncStorage.getItem("user_id")
    .then(response => {
      const user_id = JSON.parse(response);
      setIsLoading(false);
      console.log("User ID fetched!", user_id)
    })
    .catch(error => {
      console.log(error)
    });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>The Net Giver's Asset Tracker</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3366FF",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold"
  }
});

export default Splash;
