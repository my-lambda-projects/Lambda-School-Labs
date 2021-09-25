import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserAsset = ({data}) => {
  return (
    <View style={styles.assetWrapper}>
      <Text>User Assets Will Go Here!</Text>
      <View style={styles.imageWrapper}>
        {/* Needs to be replaced with an image primitive component */}
        {/* <Text>Images goes here</Text> */}
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.assetName}>** Asset Name Here **</Text>
        <Text style={styles.assetID}>Serial # { data.asset_id }</Text>
        <Text>** Asset Description Here **</Text>
        <Text>Checked In: { data.time_in }</Text>
        <Text>Checked Out: { data.time_out }</Text>
        <Text>User: { data.user_id }</Text>
        <Text style={styles.assetLocation}>Location: ** Enter Location Here **</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  assetWrapper: {
    flexDirection: "row",
    marginTop: 25,
    marginLeft: 25
  },
  imageWrapper: {
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "grey",
    width: 100,
    height: 100
  },
  textWrapper: {
    flex: 3,
    marginLeft: 30,
    fontSize: 15
  },
  assetName: {
    fontWeight: "bold"
  },
  assetID: {
    color: "#7C7777",
    fontStyle: "italic"
  },
  assetLocation: {
    color: "#82A0FD"
  }
});

export default UserAsset;