import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addUser } from "../actions/buddyActions";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from "react-native";
import axiosWithAuth from "../utils/axiosWithAuth";
import { getToken } from "../utils/authHelper";
import { timeConvertor, chronoSorter } from "../utils/dateHelper";

// Components
import ProfileModal from "./ProfileModal";
import ProfileHighlight from "./ProfileHighlight";
import ProfileCard from "./ProfileCard";
import NavBar from "./NavBar";

// Styles
import { Feather } from "@expo/vector-icons";
import Global from "../styles/Global";
import Colors from "../styles/Colors";

const Profile = props => {
  // ---------- MODAL ----------- //
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => setIsModalVisible(!isModalVisible);
  const sendToLanding = () => props.navigation.navigate("Landing"); // pass nav props since React Navigation Modal doesn't play nicely with React Navigation :-\

  // ---------- activities ---------- //

  const [profileList, setProfileList] = useState([]);
  const [highlight, setHighlight] = useState([]); // 3 activities displayed as highlights
  const [rest, setRest] = useState([]); // rest of the activities
  const [past, setPast] = useState([]);
  const [rerender, setRerender] = useState(true);

  // get activities where user is organizer
  useEffect(() => {
    getToken()
      .then(token => {
        axiosWithAuth(token)
          .get(
            `https://buddy-app-be.herokuapp.com/useractivities/activities/${props.user.id}`
          )
          .then(res => {
            console.log(res.data);
            let dateSorted = [...res.data].sort(function(a, b) {
              const aTime = timeConvertor(a.time);
              const bTime = timeConvertor(b.time);
              return (
                new Date(`${a.date} ${aTime}`) - new Date(`${b.date} ${bTime}`)
              );
            });

            const oldActivities = dateSorted.filter(activity => {
              const time = timeConvertor(activity.time);
              return Date.now() > Date.parse(`${activity.date} ${time}`);
            });

            setPast(oldActivities);

            const filtered = dateSorted.filter(activity => {
              const time = timeConvertor(activity.time);
              return Date.now() <= Date.parse(`${activity.date} ${time}`);
            });

            for (let i = 0; i < filtered.length; i++) {
              timeConvertor(filtered[i].time);
            }
            setHighlight(filtered.slice(0, 3));
            setRest(filtered.slice(3));
            setProfileList(filtered);
          })
          .catch(err => {
            console.log("axiosWithAuth error", err);
          });
      })
      .catch(err => {
        console.log("getToken error", err);
      });
  }, [props.forceRender]);

  // possibly sort by date
  // separate top 3 activities for ProfileHighlight box
  // remaining activities are made into ProfileCard components
  const forceRerender = () => {
    console.log("rerender");
    setRerender(!rerender);
  };
  console.log("Highlight", highlight);
  console.log("Rest", rest);

  return (
    <View style={Global.container}>
      <View style={styles.profileHeader}>
        <View style={Global.logoContainer}>
          <Text style={Global.logo}>BUDDY</Text>
        </View>
        <TouchableOpacity onPress={toggleModal}>
          <Feather name="user" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={{ height: "90%" }}>
        <ScrollView>
          <Text style={styles.title}>Hi, {props.user.first_name}</Text>
          <View style={styles.hr} />
          <View>
            <Text style={styles.subtitle}>Upcoming Activities</Text>
            <ProfileHighlight highlight={highlight} />

            <View style={styles.activityCardList}>
              {rest.map(activity => (
                <ProfileCard activity={activity} key={activity.id} />
              ))}
            </View>
            <View style={styles.profileCounter}>
              <Text style={styles.subtitle}>What I've Been Up To</Text>
              <Text style={styles.text}>Total Activities:</Text>
              <Text style={styles.textBold}>
                {past.length} Activities Attended
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <NavBar navigation={props.navigation} />
      <ProfileModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        sendToLanding={sendToLanding}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  hr: {
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    marginVertical: 20,
    width: "100%"
  },
  title: {
    fontSize: 25,
    marginTop: 30,
    fontFamily: "Nunito-Regular",
    color: Colors.darkGray
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Nunito-Bold",
    color: Colors.darkGray,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    fontFamily: "Nunito-Regular",
    color: Colors.darkGray
  },
  textBold: {
    fontSize: 16,
    fontFamily: "Nunito-Bold",
    color: Colors.darkGray
  },
  activityCardList: {
    height: "auto",
    width: "100%",
    marginTop: 20
  },
  profileCounter: {
    paddingVertical: 20,
    height: "auto",
    marginBottom: 50,
    flexGrow: 1
  }
});

const mapStateToProps = state => {
  return {
    ...state,
    user: state.user,
    forceRender: state.forceRender
  };
};
export default connect(mapStateToProps, { addUser })(Profile);
