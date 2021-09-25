import React from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const NavigationHeader = (props) => {
  console.log(props)
  return (
    <View>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>Simple Asset Tracker</Text>
        <TouchableOpacity
          style={styles.menuIcon}
        >  
          <Icon
            name="menu"
            color="white"
            size={40}
            // onPress={() => props.navigation.toggleDrawer()}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.assetSection}>
        <TouchableOpacity
          style={styles.allAssets}
          // onPress={props.all}
        >
          <Text style={styles.allMyAssets}>ALL ASSETS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={props.mine}
        >
          <Text style={styles.allMyAssets}>MY ASSETS</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.assetSection}>
        <TouchableOpacity>
          <Text
            style={styles.allMyAssets}
            onPress={() => Alert.alert('text pressed')}
          >
            ALL ASSETS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text 
            style={styles.allMyAssets}
            onPress={() => Alert.alert('text pressed')}
          >
            MY ASSETS
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row",
    backgroundColor: "#3366FF",
    borderBottomColor: "black",
    height: 50
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    flex: 9,
    paddingLeft: 20,
    color: "white",
    paddingTop: 50
  },
  menuIcon: {
    flexDirection: "row",
    alignSelf: "center",
    flex: 1,
    paddingRight: 15
  },
  assetSection: {
    flexDirection: "row",
    color: "white",
    justifyContent: "space-around",
    backgroundColor: "#3366FF",
    height: 40,
  },
  allMyAssets: {
    color: "white",
    fontSize: 18
  },
});

export default NavigationHeader;
