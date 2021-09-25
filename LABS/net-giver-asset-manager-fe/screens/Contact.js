import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";

const Contact = () => {
  return (
    <View>
      <Text>Another Form coming to you soon.</Text>
      <Input placeholder="Name" />
      <Input placeholder="Email" />
      <Input placeholder="Describe Your Issue" />
      <Button title="Submit" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Contact;
