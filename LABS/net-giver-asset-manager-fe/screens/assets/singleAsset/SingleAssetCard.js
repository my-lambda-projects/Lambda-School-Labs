import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  Button,
  AsyncStorage,
  TouchableOpacity,
  Alert
} from "react-native";
import axios from "axios";
import OneAsset from "./OneAsset";
import { withNavigation, NavigationEvents } from "react-navigation";

const SingleAssetCard = (props) => {
  const [userId, setUserId] = useState(0);
  const [isAssetHistory, setIsAssetHistory] = useState(false);

  useEffect(() => {
    console.log("useeffect run");
    AsyncStorage.getItem("user_id")
      .then(response => {
        var userId = JSON.parse(response);
        setUserId(userId);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  if (props.navigation.state.params) {
    var currentAssetId = props.navigation.state.params.id;
  }


  const [singleAsset, setSingleAsset] = useState({
    id: currentAssetId,
    check_in_status: false
  });

  useEffect(() => {
    setSingleAsset({ check_in_status: false });
  }, []);


  const assetHistory = { asset_id: currentAssetId, user_id: userId };
  const [assetStatus, setAssetStatus] = useState({});


  const checkInStatus = () => {
    var statusAsset = singleAsset.map(function (e) {
      if (e.check_in_status == true) {
        return (e.check_in_status = { check_in_status: false });
      } else {
        return (e.check_in_status = { check_in_status: true });
      }
    });

    var AssetID = singleAsset.map(function (ids) {
      return ids.id;
    });

    var newObj = Object.assign({}, ...statusAsset);

    axios
      .put(
        `https://net-giver-asset-mngr.herokuapp.com/api/assets/${AssetID}`,
        newObj
      )
      .then(response => {
        console.log("Updated Check In Status", newObj);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .post(
        "https://net-giver-asset-mngr.herokuapp.com/api/history/",
        assetHistory
      )
      .then(response => {
        console.log("New Asset History Added!");
        // setIsAssetHistory(response.data)
      })
      .catch(error => {
        console.log(error);
      });

    Alert.alert(
      "",
      "Success!",
      [
        {
          text: "Ok",
          onPress: () =>
            props.navigation.navigate("DashboardScreen")
        }
      ],
      { cancelable: false }
    );
  };

  // Fetch assets
  const getAssetsList = () => {
    console.log('the id in Axios function', currentAssetId)
    axios
      .get(
        `https://net-giver-asset-mngr.herokuapp.com/api/assets/${currentAssetId}`
      )
      .then(response => {
        setSingleAsset(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAssetsList();
  }, [currentAssetId]);

  console.log("isAssetHistory", isAssetHistory.asset_id);

  return (
    <SafeAreaView>
      <View style={styles.assetSection}>
        <TouchableOpacity
          style={styles.allAssets}
          onPress={() => {
            setIsAssetHistory(false);
          }}
        >
          {!isAssetHistory
            ? <Text style={styles.activeText}>ASSET</Text>
            : <Text style={styles.inactiveText}>ASSET</Text>
          }
          {!isAssetHistory
            ? <View style={styles.activeTab} />
            : <View style={styles.inactiveTab} />
          }
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.allAssets}
          onPress={() => {
            setIsAssetHistory(true);
          }}
        >
          {!isAssetHistory
            ? <Text style={styles.inactiveText}>ASSET HISTORY</Text>
            : <Text style={styles.activeText}>ASSET HISTORY</Text>
          }
          {!isAssetHistory
            ? <View style={styles.inactiveTab} />
            : <View style={styles.activeTab} />
          }
        </TouchableOpacity>
      </View>
      <View>
        {!isAssetHistory
          ? <FlatList
            keyExtractor={(item, index) => item.id}
            data={singleAsset}
            renderItem={({ item }) => {
              return <OneAsset data={item} />;
            }}
          />
          : <Text style={{ fontWeight: "500", textAlign: "center", marginTop: 50 }}>There is no history for this asset yet.</Text>
        }
      </View>

      <FlatList
        style={styles.buttonSection}
        keyExtractor={(item, index) => item.id}
        data={singleAsset}
        renderItem={({ item }) => {
          {
            return item.check_in_status == false ? (
              <View>
                <Button title="RETURN" onPress={checkInStatus} buttonStyle={styles.button} />
              </View>
            ) : (
                <View>
                  <Button title="CHECK-OUT" onPress={checkInStatus} buttonStyle={styles.button} />
                </View>
              );
          }
        }}
      />
      <View>
        <NavigationEvents
          onDidFocus={() => getAssetsList()}
        />
      </View>
    </SafeAreaView>
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
  assetSection: {
    flexDirection: "row",
    color: "white",
    backgroundColor: "#EFEFF4",
    height: 50,
    width: "100%",
  },
  allAssets: {
    flexDirection: "column",
    justifyContent: "center",
    width: "50%",
  },
  buttonSection: {
    flexDirection: "column",
    width: "60%",
    alignSelf: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  button: {
    width: "60%",
    alignSelf: "center",
    marginTop: 32,
    borderRadius: 20
  }
});

export default withNavigation(SingleAssetCard);
