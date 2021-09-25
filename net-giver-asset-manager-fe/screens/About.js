import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking
} from "react-native";

const About = ({ navigation }) => {
  return (
    <View>
      <Text style={{ alignSelf: "center" }}>OMG THIS IS ABOUT US</Text>
      <TouchableOpacity
        onPress={() => Linking.openURL("https://www.netgiver.com/")}
      >
        <Text style={{ color: "blue", fontSize: 16, alignSelf: "center" }}>
          Please visit us on the Web ==> NetGiver WebPage
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default About;
