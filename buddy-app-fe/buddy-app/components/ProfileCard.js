import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../styles/Colors";
import moment from "moment";

const ProfileCard = props => {
  const { activity } = props;
  const convertedDay = moment(activity.date, "MM-DD-YY").format("MMM Do");

  console.log("profile card is being rendered");
  return (
    <View style={styles.card}>
      <Text style={styles.textBold}>{convertedDay}</Text>
      <View style={styles.textBox}>
        <Text style={styles.text}>
          {activity.name} at {activity.time}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    width: "100%",
    height: "auto",
    paddingVertical: 10
  },
  text: {
    fontSize: 16,
    fontFamily: "Nunito-Regular",
    color: Colors.darkGray,
    width: "100%"
  },
  textBold: {
    fontSize: 16,
    fontFamily: "Nunito-Bold",
    color: Colors.darkGray
  },
  textBox: {
    width: "75%",
    alignItems: "flex-end"
  }
});

export default ProfileCard;
