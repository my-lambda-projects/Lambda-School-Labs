import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  AsyncStorage,
  TouchableOpacity,
  ScrollView,
  BackHandler
} from "react-native";
import moment from "moment";
import { connect } from "react-redux";
import { addUser } from "../actions/buddyActions";
import ActivityCard from "./ActivityCard";
import AddActivity from "./AddActivity";
import NavBar from "./NavBar";
import axiosWithAuth from "../utils/axiosWithAuth";

//icons
import addActivity from "../assets/icons/add_activity_button.png";

//styles
import Global from "../styles/Global";
import { getToken, onSignOut } from "../utils/authHelper";

export const Dashboard = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activities, setActivities] = useState([]);
  const [editRerender, setEditRerender] = useState(true);

  BackHandler.addEventListener("hardwareBackPress", () => {
    onSignOut().then(res => {
      props.addUser({ first_name: "", last_name: "", id: "" });
      AsyncStorage.removeItem("id");
      props.navigation.navigate("Landing");
    });
  }); //this is a function for android specific back button, if you hit the back button on dashboard it will log you out

  function timeConvertor(time) {
    var PM = time.match("PM") ? true : false;

    time = time.split(":");

    if (PM) {
      if (time[0] == 12) {
        var hour = 12;
        var min = time[1].replace("PM", "");
      } else {
        var hour = 12 + parseInt(time[0], 10);
        var min = time[1].replace("PM", "");
      }
    } else {
      var hour = time[0];
      var min = time[1].replace("AM", "");
    }

    return `${hour}:${min}`;
  } //this is a helper function to convert 12:00 PM to 24hr time for comparison

  useEffect(() => {
    const now = moment(Date.now()).format("MM/D/YY");
    const time = moment(Date.now()).format("HH:mm");
    getToken()
      .then(token => {
        axiosWithAuth(token)
          .get(
            `https://buddy-app-be.herokuapp.com/useractivities/activities/notattending/${props.user.id}` //gets a list of events the user is not already joined up for
          )
          .then(allActivities => {
            axiosWithAuth(token)
              .get(
                `https://buddy-app-be.herokuapp.com/interests/user/${props.user.id}` //gets the user interests to filter the list of events by
              )
              .then(user_interests => {
                let filteredActivities = [];
                if (user_interests.data.length >= 1) {
                  for (let i = 0; i < allActivities.data.length; i++) {
                    let activityTime = timeConvertor(
                      allActivities.data[i].time
                    ); //this converts the time to 24 hour format for date time comparison
                    if (
                      Date.parse(now) <= Date.parse(allActivities.data[i].date)
                    ) {
                      if (
                        Date.parse(now) ==
                          Date.parse(allActivities.data[i].date) &&
                        Date.parse(
                          `${allActivities.data[i].date} ${activityTime}`
                        ) < Date.parse(`${allActivities.data[i].date} ${time}`)
                      ) {
                      } else {
                        for (let j = 0; j < user_interests.data.length; j++) {
                          if (
                            user_interests.data[j].interests_id ==
                            allActivities.data[i].interest_id
                          ) {
                            filteredActivities.push(allActivities.data[i]);
                          }
                        }
                      }
                    }
                  } //this is filtering out events that have already passed so that you can not join an old event

                  setActivities(
                    [...filteredActivities].sort(function(a, b) {
                      const aTime = timeConvertor(a.time);
                      const bTime = timeConvertor(b.time);
                      return (
                        new Date(`${a.date} ${aTime}`) -
                        new Date(`${b.date} ${bTime}`) //this is sorting the activities by date and time so that the events happening soon show up first in the list
                      );
                    })
                  ); //setting the filtered and date/time sorted events to state
                } else {
                  props.navigation.navigate("InterestOnboard");
                }
              })
              .catch(err => {
                console.log(err.message);
              });
            //setActivities(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      }); // Renders activities
  }, [modalVisible, editRerender]);

  const setRerender = () => {
    setEditRerender(!editRerender);
  };
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={Global.container}>
      <View style={styles.dashBoardHeader}>
        <View style={Global.logoContainer}>
          <Text style={Global.logo}>BUDDY</Text>
        </View>
        <TouchableOpacity onPress={openModal}>
          <Image source={addActivity} style={styles.activityButton} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={Global.title}>
          Welcome, {props.user.first_name} {props.user.last_name}
        </Text>
      </View>
      <View style={{ height: "70%" }}>
        <ScrollView>
          <View style={styles.activityView}>
            {activities.map(activity => {
              return (
                <ActivityCard
                  activity={activity}
                  key={activity.id}
                  setRerender={setRerender}
                />
              );
            })}

            <AddActivity isVisible={modalVisible} closeModal={closeModal} />
          </View>
        </ScrollView>
      </View>
      <NavBar navigation={props.navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  fakeLink: {
    color: "#6D6DFF",
    textDecorationLine: "underline",
    fontSize: 15,
    fontFamily: "Nunito-Light"
  },
  fakeLinkContainer: {
    alignSelf: "center"
  },
  activityView: {
    alignItems: "center",
    width: "100%"
  },
  dashBoardHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  activityButton: {
    width: 100,
    height: 40
  }
});

const mapStateToProps = state => {
  return {
    ...state,
    user: state.user
  };
};

export default connect(mapStateToProps, { addUser })(Dashboard);
