import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppContainer from "./navigation/AppNavigator";
import ExpoMixpanelAnalytics from "@benawad/expo-mixpanel-analytics";
import { REACT_APP_MIXPANEL_SECRET_API_KEY } from "react-native-dotenv";
const analytics = new ExpoMixpanelAnalytics(REACT_APP_MIXPANEL_SECRET_API_KEY); //planning on putting token it in an env file if it passes
export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <AppContainer />
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require("./assets/images/robot-dev.png"),
      require("./assets/images/robot-prod.png")
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
    })
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});


analytics.track("Splash Page Loaded");

analytics.track("Splash Page Loaded");

// analytics.track("Event name");
analytics.track("Signed Up", { "Referred By": "Friend" });
//Set People properties (warning: if no mixpanel profile has been assigned to the current user when this method is called, it will automatically create a new mixpanel profile and the user will no longer be anonymous in Mixpanel)
// analytics.set("Email", { "$email": "elvis@email.com" });

// //Set People Properties Once (warning: if no mixpanel profile has been assigned to the current user when this method is called, it will automatically create a new mixpanel profile and the user will no longer be anonymous in Mixpanel)
// analytics.setOnce({ "$email": "elvis@email.com", "Created": new Date().toISOString() });

// // Timing Events
// // Sets the start time for an action, for example uploading an image
// analytics.timeEvent("Image Upload");
// // to be followed by a tracking event to define the end time
analytics.track("Image Upload");
analytics.identify("12345");
analytics.register({
  email: "ebi@aol.com"
});
// analytics.set("Email", { "$email": "elvis@email.com" });

// // Register super properties
// analytics.registerSuperProperties({ "Account type": "Free", "User Type": "Vendor" });

// // Register super properties Once
// analytics.registerSuperPropertiesOnce({ "Gender": "Female" });

// // track Revenue
// analytics.trackCharge(399);

// // track with properties
// analytics.trackChargeWithProperties(399, { "name": "Laptop" });

// // increment property
// analytics.increment("Login Count", 1);

// // send push notifications token to Mixpanel
// // Android
// analytics.setPushRegistrationId("GCM/FCM push token");

// //tell Mixpanel which user record in People Analytics should receive the messages when they are sent from the Mixpanel app,
// //make sure you call this right after you call `identify`
// analytics.initPushHandling(YOUR_12_DIGIT_GOOGLE_SENDER_ID);

// //unregister a device for push notifications
// analytics.clearPushRegistrationId();

// // iOS
// analytics.addPushDeviceToken("APNS push token")

// // Mixpanel reset method (warning: it will also generate a new unique id and call the identify method with it. Thus, the user will not be anonymous in Mixpanel.)
// analytics.reset();

// // get the last distinct id set with identify or, if identify hasn't been
// // called, the default mixpanel id for this device.
// analytics.getDistinctId(function (id) { })
