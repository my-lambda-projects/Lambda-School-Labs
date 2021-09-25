import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Platform
} from "react-native";
import { Button } from "react-native-elements";

const Landing = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <View style={styles.logo}>
          <Image
            style={styles.topImg}
            source={require("../assets/images/assetTracker.jpg")}
          />
        </View>

        <View style={styles.landingImage}>
          <Image
            style={styles.middleImg}
            source={require("../assets/images/landing.jpg")}
          />
        </View>
        <View>
          <View style={styles.purposeContainer}>
            <Text style={styles.purpose}>
              <Text style={styles.blueTitle}>Asset Tracker</Text> makes it easy
              to keep track of all items.
            </Text>
          </View>
        </View>

        <View style={styles.buttons}>
          <Button
            buttonStyle={styles.registerBtn}
            title="Free Sign Up"
            onPress={() => navigation.navigate("DashboardScreen")}
          />
          <Button
            buttonStyle={styles.loginBtn}
            titleStyle={{ color: "#3366FF" }}
            type="outline"
            title="Log In Here"
            onPress={() => navigation.navigate("SMS")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center"
  },
  topImg: {
    ...Platform.select({
      ios: {
        marginTop: 5
      },
      android: {
        marginTop: -20
      }
    })
  },
  logo: {
    marginTop: 0,
    marginLeft: 75,
    marginRight: 75,
    alignSelf: "center"
  },
  landingImage: {
    alignSelf: "center"
  },
  middleImg: {
    marginTop: 10,
    marginBottom: 5,
    ...Platform.select({
      ios: {
        width: 350,
        height: 355
      },
      android: {
        width: 325,
        height: 330
      }
    })
  },
  blueTitle: {
    color: "#3366FF"
  },
  purposeContainer: {
    alignItems: "center",
    marginTop: -45,
    marginBottom: 25
  },
  purpose: {
    fontSize: 23,
    width: "60%",
    textAlign: "center"
  },
  buttons: {
    marginLeft: 20,
    marginRight: 20
  },
  registerBtn: {
    backgroundColor: "#3366FF",
    borderRadius: 15,
    marginBottom: 20
  },
  loginBtn: {
    borderColor: "#3366FF",
    backgroundColor: "white",
    borderRadius: 15
  }
});

export default Landing;
