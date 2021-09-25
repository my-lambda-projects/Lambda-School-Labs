import React from "react";
import { StatusBar, StyleSheet, View, Text, TouchableOpacity } from "react-native"

const CustomTabBar = props => {
  return (
    <View>
      <StatusBar barStyle="dark-content" />
      <View style={styles.btnWrapper} >
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.activeBtn}>{props.leftBtn}</Text>
          <View style={styles.active} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.inactiveBtn}>{props.rightBtn}</Text>
          <View style={styles.inactive} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnWrapper: {
    flexDirection: "row",
    color: "white",
    backgroundColor: "#EFEFF4",
    height: 50,
    width: "100%",
  },
  btn: {
    flexDirection: "column",
    justifyContent: "center",
    width: "50%",
  },
  active: {
    width: "100%",
    height: 1,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#3366FF",
  },
  inactive: {
    width: "100%",
    height: 1,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#EFEFF4",
  },
  activeBtn: {
    color: "#3366FF",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
  inactiveBtn: {
    color: "black",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
})

export default CustomTabBar;