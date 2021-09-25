import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import EditActivity from "./EditActivity";
import { connect } from "react-redux";
import axiosWithAuth from "../utils/axiosWithAuth";

// styles
import Buttons from "../styles/Buttons";
import Colors from "../styles/Colors";
import { getToken } from "../utils/authHelper";

function ActivityCard(props) {
  const [activity] = useState(props.activity);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    // console.log(props);
    setIsModalVisible(!isModalVisible);
  };

  // post the activity to user's activities table
  handleJoin = joinedActivity => {
    getToken().then(token => {
      axiosWithAuth(token)
        .post(
          "https://buddy-app-be.herokuapp.com/useractivities",
          joinedActivity
        )
        .then(res => {
          console.log("posted", res);
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  return (
    <View style={styles.activityCard}>
      <View style={styles.activityView}>
        <Text style={styles.activityText}>
          <Text style={{ fontFamily: "Nunito-Bold" }}>{activity.name}</Text> on{" "}
          <Text style={{ fontFamily: "Nunito-Bold" }}>{activity.date}</Text> at{" "}
          <Text style={{ fontFamily: "Nunito-Bold" }}>{activity.time}</Text>{" "}
          with {activity.organizer_name}
        </Text>
      </View>

      {props.user.id === props.activity.organizer_id ? (
        <View style={[Buttons.activityBtn, Buttons.primary, Buttons.editBtn]}>
          <TouchableOpacity
            onPress={toggleModal}
            style={{
              width: "100%",
              height: 40,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={Buttons.textWhite}>Edit</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[Buttons.activityBtn]}>
          <TouchableOpacity
            onPress={() => {
              handleJoin({
                user_id: props.user.id,
                activity_id: props.activity.id
              });
              props.setRerender();
            }}
          >
            <Text style={Buttons.text}>Ask to Join</Text>
          </TouchableOpacity>
        </View>
      )}
      <EditActivity
        activity={activity}
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        toggleState={props.setRerender}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  activityCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    width: "95%",
    marginTop: 20,
    paddingBottom: 20,
    height: "auto"
  },

  activityView: {
    width: "60%"
  },

  activityText: {
    fontSize: 16,
    color: Colors.darkGray,
    fontFamily: "Nunito-Regular"
  }
});

const mapStateToProps = state => {
  return {
    ...state,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  {}
)(ActivityCard);
