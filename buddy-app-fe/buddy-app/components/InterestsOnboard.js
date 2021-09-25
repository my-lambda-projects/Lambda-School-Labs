import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from "react-native";
import axiosWithAuth from "../utils/axiosWithAuth";
import { onSignOut } from "../utils/authHelper";
import { addUser } from "../actions/buddyActions";
import { connect } from "react-redux";
import Global from "../styles/Global";
import Buttons from "../styles/Buttons";

const InterestsOnboard = props => {
  const [interests, setInterests] = useState([]);
  const [userInterest, setUserInterest] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("@token")
      .then(token => {
        axiosWithAuth(token)
          .get("https://buddy-app-be.herokuapp.com/interests")
          .then(res => {
            console.log(res, token);
            setInterests(res.data);
          })
          .catch(err => {
            console.log("Error Message", err.response);
            props.navigation.navigate("SignIn");
          });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const toggleInterest = interest => {
    if (userInterest.includes(interest)) {
      setUserInterest(
        userInterest.filter(item => {
          return item != interest;
        })
      );
      //console.log("filter", userInterest);
    } else {
      setUserInterest([...userInterest, interest]);
      //console.log("adding", userInterest);
    }
    console.log(userInterest, "ui");
  };

  const backButton = () => {
    props.addUser({ first_name: "", last_name: "", id: "" });
    onSignOut()
      .then(res => {
        props.navigation.navigate("Landing");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleFinish = () => {
    // sending interests!
    if (userInterest.length == 0) {
      Alert.alert("Alert Title", "Please select at least one interest");
    } else {
      AsyncStorage.getItem("@token")
        .then(token => {
          userInterest.map(interest => {
            axiosWithAuth(token)
              .post("https://buddy-app-be.herokuapp.com/interests/user", {
                user_id: props.user.id,
                interests_id: interest
              })
              .then(res => {
                console.log(res.data);
                props.navigation.navigate("Dashboard");
              })
              .catch(err => {
                console.log(err);
              });
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <View style={Global.container}>
      <View style={Global.logoContainer}>
        <Text style={Global.logo}>BUDDY</Text>
      </View>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => backButton()}>
          <Text style={Buttons.backButton}>&larr; Back</Text>
        </TouchableOpacity>
      </View>
      <Text style={[Global.textNormal, { fontSize: 25 }]}>
        Tell us more about {"\n"}yourself!
      </Text>

      <Text style={[Global.textNormal, { fontSize: 18, marginVertical: 20 }]}>
        What are some of your interests or activities you like to do?
      </Text>

      <View style={styles.interests}>
        {interests.map(item => (
          <TouchableOpacity
            key={item.id}
            style={
              userInterest.includes(item.id)
                ? styles.selectedBtn
                : styles.interestBtn
            }
            onPress={() => {
              toggleInterest(item.id);
            }}
          >
            <Text style={userInterest.includes(item.id) && { color: "white" }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={Buttons.container}>
        <TouchableOpacity
          style={[Buttons.btn, Buttons.secondary]}
          onPress={() => backButton()}
        >
          <Text style={[Buttons.text]}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[Buttons.btn, Buttons.primary]}
          onPress={() => handleFinish()}
        >
          <Text style={[Buttons.text, Buttons.textPrimary]}>Finish</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomNav}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {
    marginVertical: 20
  },
  bottomNav: {
    backgroundColor: "#6d6dff",
    height: 96,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  interestBtn: {
    marginVertical: 10,
    marginRight: 10,
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5
  },
  selectedBtn: {
    marginVertical: 10,
    marginRight: 10,
    backgroundColor: "#6D6DFF",
    borderColor: "#6D6DFF",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5
  },
  interests: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap"
  }
});

const mapStateToProps = state => {
  return {
    ...state,
    user: state.user
  };
};
export default connect(mapStateToProps, { addUser })(InterestsOnboard);
