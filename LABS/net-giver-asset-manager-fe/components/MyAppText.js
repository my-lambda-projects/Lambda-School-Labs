import React from "react";
import { Text, StyleSheet } from "react-native";

const MyAppText = props => {
  console.log(props.children);

  return (
    <Text style={styles.font}>{ props.children }</Text>
  );
};

const styles = StyleSheet.create({
  font: {
    fontFamily: "IBM Plex Sans",
  },
});

export default MyAppText;