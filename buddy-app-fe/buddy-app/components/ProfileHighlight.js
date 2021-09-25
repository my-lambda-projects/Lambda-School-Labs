import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../styles/Colors";
import moment from "moment";

const ProfileHighlight = props => {
  const converter = date => moment(date, "MM-DD-YY").format("MMM Do");

  if (props.highlight.length >= 1) {
    var highlight1 = props.highlight[0];
    var highlight2 = props.highlight[1];
    var highlight3 = props.highlight[2];

    return (
      <View style={styles.highlightBox}>
        <View style={styles.highlightPrimary}>
          <Text style={[styles.textBold, { fontSize: 25, marginBottom: 10 }]}>
            {converter(highlight1.date)}
          </Text>
          <Text style={[styles.text, { fontSize: 20 }]}>
            {highlight1.name} at {highlight1.time}
          </Text>
        </View>
        {highlight2 && (
          <View style={styles.highlightSubBox}>
            <View style={styles.highlightSecondary}>
              <Text style={[styles.textBold, { fontSize: 18 }]}>
                {converter(highlight2.date)}
              </Text>
              <Text style={styles.text}>
                {highlight2.name} at {highlight2.time}
              </Text>
            </View>
            {highlight3 && (
              <View style={styles.highlightSecondary}>
                <Text style={[styles.textBold, { fontSize: 18 }]}>
                  {converter(highlight3.date)}
                </Text>
                <Text style={styles.text}>
                  {highlight3.name} at {highlight3.time}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    );
  } else {
    return (
      <View style={styles.highlightBox}>
        <Text style={styles.text}>You have no upcoming activities</Text>
      </View>
    );
  }
};

export default ProfileHighlight;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: "Nunito-Regular",
    color: Colors.darkGray
  },
  textBold: {
    fontSize: 16,
    fontFamily: "Nunito-Bold",
    color: Colors.darkGray
  },
  highlightBox: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10
  },
  highlightPrimary: {
    backgroundColor: "rgba(109, 109, 255, 0.3)",
    width: 175,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  highlightSubBox: {
    flexGrow: 2,
    paddingLeft: 15,
    width: "80%",
    flexDirection: "column",
    justifyContent: "space-around",
    flex: 1,
    flexWrap: "wrap"
  },
  highlightSecondary: {
    paddingVertical: 10
  }
});
