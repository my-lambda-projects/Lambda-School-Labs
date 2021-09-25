import React from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const HeaderBar = props => {
  return (
    <View>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>Simple Asset Tracker</Text>
        <TouchableOpacity
          style={styles.menuIcon}
          onPress={() => Alert.alert("You clicked the menu hamburger!")}>
          <Icon
            name="menu"
            color="white"
            size={40}
          />
        </TouchableOpacity>
      </View>

      {/* <View style={styles.assetSection}>
        <TouchableOpacity style={styles.allAssets}>
          <Text style={styles.allMyAssets}>ALL ASSETS</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.allMyAssets}>MY ASSETS</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row",
    backgroundColor: "#3366FF",
    borderBottomColor: "black",
    height: 95
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    flex: 9,
    paddingLeft: 20,
    color: "white"
  },
  menuIcon: {
    flexDirection: "row",
    alignSelf: "center",
    flex: 1,
    paddingRight: 15
  },
  assetSection: {
    flexDirection: "row",
    backgroundColor: "#3366FF",
    justifyContent: "space-around",
    height: 40
  },
  allMyAssets: {
    color: "white",
    fontSize: 18
  }
});

export default HeaderBar;
