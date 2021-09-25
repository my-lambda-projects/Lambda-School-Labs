import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import DatePicker from "react-native-datepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import moment from "moment";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  Platform
} from "react-native";
import InterestPicker from "./InterestPicker";

import axiosWithAuth from "../utils/axiosWithAuth";
import { getToken } from "../utils/authHelper";
//icons
import addButton from "../assets/icons/add_button.png";
import calendar from "../assets/icons/calendar.png";
import x from "../assets/icons/x.png";

//styles
import Global from "../styles/Global";
import Colors from "../styles/Colors";

function AddActivity(props) {
  const [interests, setInterests] = useState([...props.interests]);
  const [activityInterest, setActivityInterest] = useState(interests[0].name);
  const [activityDate, setActivityDate] = useState(today);
  const [activityTime, setActivityTime] = useState(now);
  const today = moment(Date.now()).format("MM/D/YY");
  const now = moment(Date.now()).format("h:mm A");

  useEffect(() => {
    setActivityDate(today);
    setActivityTime(now);
  }, [props.isVisible]);

  const [newActivity, setNewActivity] = useState({
    name: "",
    notes: "",
    location: "",
    guest_limit: null,
    organizer_id: props.user.id
  });

  const saveActivity = () => {
    console.log(newActivity);
    getToken()
      .then(token => {
        axiosWithAuth(token)
          .post("https://buddy-app-be.herokuapp.com/activities", newActivity)
          .then(res => {
            props.closeModal();
            console.log(res, "res");
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  const activityChangeHandler = (value, name) => {
    const interestId = interests.filter(
      interest => interest.name === activityInterest
    )[0].id;

    setNewActivity({
      ...newActivity,
      [name]: value,
      date: activityDate,
      time: activityTime,
      interest_id: interestId
    });
  };
  return (
    <Modal animationType="slide" transparent={false} visible={props.isVisible}>
      <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={130}>
        <View style={styles.viewContainer}>
          <View style={styles.addView}>
            <View style={{ alignSelf: "flex-end" }}>
              <TouchableOpacity onPress={props.closeModal}>
                <Image source={x} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.addHeader}>Add an Activity</Text>
            </View>
            <View style={styles.addInputContainer}>
              <Text style={styles.addText}>What Do You Want To Do?</Text>
              <TextInput
                style={[Global.input, styles.addInput]}
                placeholder="Activity"
                onChangeText={e => activityChangeHandler(e, "name")}
              ></TextInput>

              <View style={styles.categoryBox}>
                <View style={{ width: "60%" }}>
                  <Text style={styles.addText}>Category</Text>
                  <InterestPicker
                    activityInterest={activityInterest}
                    setActivityInterest={setActivityInterest}
                    interests={interests}
                  />
                </View>
                <View style={{ width: "35%" }}>
                  <Text style={styles.addText}>Guest Limit?</Text>
                  <TextInput
                    style={[Global.input, styles.addInput]}
                    placeholder="None"
                    onChangeText={e => activityChangeHandler(e, "guest_limit")}
                    keyboardType="number-pad"
                  ></TextInput>
                </View>
              </View>

              <Text style={styles.addText}>When Do You Want To Go?</Text>
              <View style={[styles.datePicker, styles.addInput]}>
                <Image source={calendar} />
                <DatePicker
                  placeholder="Select Date"
                  date={activityDate}
                  mode="date"
                  format="MM/DD/YY"
                  minDate={today}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  onDateChange={date => setActivityDate(`${date}`)}
                  style={styles.date}
                  customStyles={{ dateInput: { borderRadius: 5 } }}
                />

                <DatePicker
                  mode="time"
                  placeholder="Select Time"
                  date={activityTime}
                  showIcon={false}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  format={"h:mm A"}
                  is24Hour={false} // only works for Android view
                  onDateChange={date => setActivityTime(`${date}`)}
                  style={styles.time}
                  customStyles={{ dateInput: { borderRadius: 5 } }}
                />
              </View>

              <Text style={styles.addText}>Where?</Text>
              <TextInput
                style={[Global.input, styles.addInput]}
                placeholder="Add Location"
                onChangeText={e => activityChangeHandler(e, "location")}
              ></TextInput>

              <Text style={styles.addText}>Don't Forget A Note!</Text>
              {Platform.OS === "ios" ? (
                <TextInput
                  style={[Global.input, { height: 77 }, styles.addInput]}
                  multiline={true} // moves placeholder text to top for iOS
                  textAlignVertical={"top"} // for Android
                  placeholder="This lets people know what to look out for!"
                  onChangeText={e => activityChangeHandler(e, "notes")}
                ></TextInput>
              ) : (
                <TextInput
                  style={[Global.input, { height: 77 }, styles.addInput]}
                  textAlignVertical={"top"} // for Android
                  placeholder="This lets people know what to look out for!"
                  onChangeText={e => activityChangeHandler(e, "notes")}
                ></TextInput>
              )}
              <View style={styles.addBtn}>
                <TouchableOpacity onPress={saveActivity}>
                  <Image source={addButton} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    width: "100%",
    alignItems: "center"
  },
  addView: {
    width: "75%",
    marginTop: 55
  },
  addHeader: {
    fontSize: 25,
    fontFamily: "Nunito-Bold",
    marginBottom: 30
  },
  addText: {
    fontSize: 18,
    color: Colors.darkGray,
    fontFamily: "Nunito-Regular",
    marginBottom: -15
  },

  addInputContainer: {
    height: "80%"
  },

  addInput: {
    marginBottom: 20
  },

  addBtn: {
    alignSelf: "flex-end"
  },
  datePicker: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  categoryBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },

  date: {
    width: "45%"
  },

  time: {
    width: "35%"
  }
});

const mapStateToProps = state => {
  return {
    ...state,
    interests: state.interests,
    user: state.user
  };
};

export default connect(mapStateToProps, {})(AddActivity);
