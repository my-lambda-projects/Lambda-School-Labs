import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Image,
  Platform,
  SafeAreaView
} from "react-native";
import { Button } from "react-native-elements";
import Spacer from "../components/Spacer";

import CustomTabBar from "../components/CustomTabBar";

const SignOut = ({ navigation }) => {
  const logOut = async () => {
    await AsyncStorage.clear();
    navigation.navigate("Landing");
  };

  const leftBtnTxt = "Log Out";
  return (
    <SafeAreaView>
      <CustomTabBar leftBtn={leftBtnTxt} />

      <View>
        <Text
          style={{
            fontSize: 33,
            textAlign: "center",
            marginTop: "20%"
          }}
        >
          See You Later
        </Text>

        <Text
          style={{
            fontSize: 20,
            color: "#C0C0C0",
            textAlign: "center"
          }}
        >
          Are you sure you want to log out?
        </Text>
        <Spacer />
        <Image
          style={[
            styles.topImg,
            {
              alignSelf: "center",
              height: "42%",
              width: "85%"
              // borderWidth: 1,
              // borderRadius: 75
            }
          ]}
          source={require("../assets/images/logoutpals.jpg")}
        />
        <Spacer />

        <Button
          buttonStyle={[{ marginTop: -30, alignSelf: "center" }, styles.btn]}
          containerStyle={styles.btnContainer}
          title="Logout"
          onPress={logOut}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  touchMe: {
    alignSelf: "center",
    // marginTop: 225,
    fontSize: 33
  },
  btn: {
    width: 343,
    height: 40,
    borderRadius: 15,
    backgroundColor: "#3366FF",
    paddingBottom: 8
  },
  topImg: {
    marginTop: "10%",
    ...Platform.select({
      ios: {
        // marginTop: 5
      },
      android: {
        // marginTop: -20
      }
    })
  }
});

export default SignOut;
