import React from "react";
import { ScrollView, SafeAreaView, View, StyleSheet, Image, Platform } from "react-native";
import { DrawerItems } from "react-navigation";

const CustomDrawer = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.drawerLogo}>
        <Image
          source={require("../assets/images/assetTracker.jpg")}
          style={styles.logo}
        />
      </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  drawerLogo: {
    height: 150,
    backgroundColor: "white"
  },
  logo: {
    alignSelf: "center",
    ...Platform.select({
      ios: {
        marginTop: 25
      },
      android: {
        marginTop: 25
      },
    }),
  }
});

export default CustomDrawer;
