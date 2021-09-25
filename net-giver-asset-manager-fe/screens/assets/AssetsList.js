import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, FlatList, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import axios from "axios";
import AssetsCard from "../assets/AssetsCard";
import CustomTabBar from "../../components/CustomTabBar";

const AssetsList = ({navigation}) => {
  const [assets, setAssets] = useState([]);
  const [assetHistory, setAssetHistory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch assets
  const getAssetsList = () => {
    axios
      .get("https://net-giver-asset-mngr.herokuapp.com/api/assets/")
      .then(response => {
        setAssets(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAssetsList();
  }, []);

  // Props titles for CustomTabBar component
  const leftBtnText = "Asset";
  const rightBtnText = "Asset History";

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loading} >
        <ActivityIndicator size="large" color="blue" />
      </SafeAreaView>
    )
  } else {
    return (
      <SafeAreaView>
        <CustomTabBar 
          leftBtn={leftBtnText}
          rightBtn={rightBtnText}
        />
        {/* <SafeAreaView>
          <StatusBar barStyle="dark-content" />
          <View style={styles.buttonWrapper}>
            <TouchableOpacity 
              style={styles.btn}
              onPress={() => {
                setAssetHistory(false)}
              }  
            >
              { !assetHistory
                ? <Text style={styles.activeText}>ASSET</Text>
                : <Text style={styles.inactiveText}>ASSET</Text>
              }
              { !assetHistory
                ? <View style={styles.activeTab} />
                : <View style={styles.inactiveTab} />
              }
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setAssetHistory(true)}
              }
            >
              { !assetHistory
                ? <Text style={styles.inactiveText}>ASSET HISTORY</Text>
                : <Text style={styles.activeText}>ASSET HISTORY</Text>
              }
              { !assetHistory
                ? <View style={styles.inactiveTab} />
                : <View style={styles.activeTab} />
              }
            </TouchableOpacity>
          </View> */}
    
          { !assetHistory
            ? <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={assets}
                renderItem={({ item }) => {
                  return <AssetsCard data={item} />;
                }}
              />
            : <AssetCard />
          }
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
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
  // Button section styling
  buttonWrapper: {
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
  // Active/inactive styling <Views> at the buttom of each button
  activeTab: {
    width: "100%",
    height: 1,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#3366FF",
  },
  inactiveTab: {
    width: "100%",
    height: 1,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#EFEFF4",
  },
  // Active/inactive styling for the text font inside the buttons
  activeText: {
    color: "#3366FF",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
  inactiveText: {
    color: "black",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default AssetsList;
