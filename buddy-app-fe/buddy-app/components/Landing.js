import React, { useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  Image,
  AsyncStorage
} from "react-native";

import { connect } from "react-redux";
import { getToken } from "../utils/authHelper";
import Buttons from "../styles/Buttons";
import Global from "../styles/Global";
import { addUser } from "../actions/buddyActions";
// analytics
import * as Segment from 'expo-analytics-segment';
import Constants from 'expo-constants';

const iosWriteKey = Constants.manifest.extra.iOSKey;
const androidWriteKey = Constants.manifest.extra.AndroidKey;
function Landing(props) {
  useEffect(() => {
    getToken().then(token => {
      AsyncStorage.getItem("id").then(id => {
        if ((token !== null) & (id !== null)) {
          props.navigation.navigate("AuthStack");
        } else {
          AsyncStorage.removeItem("id");
          props.addUser({
            first_name: "",
            last_name: "",
            id: ""
          });
        }
      });
    });
  }, []);

 
  useEffect(() => {
	  Segment.initialize({ androidWriteKey, iosWriteKey });
	  Segment.track('App Loaded', {
		  event: 'Loaded Application'
	  });
	  console.log('Segment.initalize Fired');
  }, []);

  trackEventSignIn = () => {
	  Segment.track('Sign In Clicked', {
		  event: 'Click on Sign In'
	  });
	  props.navigation.navigate('SignIn');
	  console.log('Sign In Button Clicked');
  };
  trackEventSignUp = () => {
	  Segment.track('Sign Up Clicked', {
		  event: 'Click on Sign Up'
	  });
	  props.navigation.navigate('SignUp');
	  console.log('Sign Up Button Clicked');
  };



  return (
    <ImageBackground
      style={landing.background}
      source={require("../assets/landing-background.png")}
    >
      <View style={landing.container}>
        <View style={Global.logoContainer}>
          <Text style={Global.logo}>BUDDY</Text>
        </View>
        <View>
          <Text style={landing.subtitle}>
            A friendly network to help you discover the world around.
          </Text>
        </View>
        <View style={landing.buttonContainer}>
          <TouchableOpacity
            onPress={trackEventSignIn.bind(this)}
            style={[Buttons.btn, Buttons.secondary]}
          >
            <Text style={[Buttons.textAuth]}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={trackEventSignUp.bind(this)}
            style={[Buttons.btn, Buttons.primary]}
          >
            <Text style={[Buttons.textAuth, Buttons.textPrimary]}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={landing.mapContainer}>
          <Image
            style={landing.map}
            source={require("../assets/landing-map.png")}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const landing = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%",
    flex: 1
  },
  container: {
    flex: 1,
    paddingHorizontal: "15%",
    paddingTop: "15%",
    paddingBottom: "10%",
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  subtitle: {
    fontSize: 20,
    color: "#2E2F38",
    fontFamily: "Nunito-Regular"
  },
  mapContainer: {
    width: "100%"
  },
  map: {
    resizeMode: "cover",
    width: "100%",
    height: 300
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
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
)(Landing);
