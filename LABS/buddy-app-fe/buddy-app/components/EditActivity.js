import React, { useState } from "react";
import { connect } from "react-redux";
import DatePicker from "react-native-datepicker";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
import Buttons from "../styles/Buttons";

function EditActivity(props) {
  const today = moment(Date.now()).format("MM/D/YY"); // set today
  const {
    id,
    name,
    notes,
    date,
    time,
    guest_limit,
    organizer_id,
    interest_id,
    location
  } = props.activity;

  const [newActivity, setNewActivity] = useState({
    id: id,
    name: name,
    notes: notes,
    date: date,
    time: time,
    interest_id: interest_id,
    location: location,
    guest_limit: guest_limit,
    organizer_id: organizer_id // technically also props.user.id
  }); // set initial state as the activity to be edited

  const [interests, setInterests] = useState([...props.interests]); // GET all interests, mapped to props from redux store
  const [activityInterest, setActivityInterest] = useState(
    interests[interest_id - 1].name
  ); // set activityInterest (name string) in the InterestPicker component based on the ID number

  const saveActivity = () => {
    const interestId = interests.filter(
      interest => interest.name === activityInterest
    )[0].id; // match picker string to the list of interests and return ID
    const submitted = {
      ...newActivity,
      interest_id: interestId,
      guest_limit: newActivity.guest_limit ? newActivity.guest_limit : null
    }; // final update of non-input form components? */
    console.log("submitted", submitted);
    console.log(newActivity);
    getToken()
      .then(token => {
        axiosWithAuth(token)
          .put(`https://buddy-app-be.herokuapp.com/activities/${id}`, submitted)
          .then(res => {
            props.toggleModal();
            props.toggleState();
            console.log(res.data, "res");
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteActivity = () => {
    getToken()
      .then(token => {
        axiosWithAuth(token)
          .delete(`https://buddy-app-be.herokuapp.com/activities/${id}`)
          .then(res => {
            props.toggleModal();
            props.toggleState();

            console.log(res.data, "res");
            // delete notification
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const activityChangeHandler = (value, name) => {
    const interestId = interests.filter(
      interest => interest.name === activityInterest
    )[0].id; // match picker string to the list of interests and return ID

    setNewActivity({
      ...newActivity,
      [name]: value,
      /* date: activityDate,
      time: activityTime, */
      interest_id: interestId
    });
    // this reliably handles changes in text inputs ONLY.
    // it doesn't update properly if the pickers are the last object touched before submitting form.
  };

  const cancelHandler = () => {
    setNewActivity({
      id,
      name,
      notes,
      date,
      time,
      guest_limit,
      organizer_id,
      interest_id,
      location
    });
    props.toggleModal();
    props.toggleState();
    // resets values to the initial activity, closes the modal using toggle function passed through ActivityCard
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.isModalVisible}
    >
      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={130}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.viewContainer}>
          <View style={styles.addView}>
            <View style={{ alignSelf: "flex-end" }}>
              <TouchableOpacity onPress={cancelHandler}>
                <Image source={x} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.addHeader}>Edit an Activity</Text>
            </View>
            <View style={styles.addInputContainer}>
              <Text style={styles.addText}>What Do You Want To Do?</Text>
              <TextInput
                style={[Global.input, styles.addInput]}
                placeholder="Activity"
                onChangeText={e => activityChangeHandler(e, "name")}
                value={newActivity.name}
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
                    value={
                      newActivity.guest_limit !== null
                        ? String(newActivity.guest_limit)
                        : ""
                    }
                  ></TextInput>
                </View>
              </View>

              <Text style={styles.addText}>When Do You Want To Go?</Text>
              <View style={[styles.datePicker, styles.addInput]}>
                <Image source={calendar} />
                <DatePicker
                  placeholder="Select Date"
                  date={newActivity.date}
                  mode="date"
                  format="MM/DD/YY"
                  minDate={today}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  onDateChange={date => {
                    setNewActivity({
                      ...newActivity,
                      date: date
                    });
                  }}
                  style={styles.date}
                  customStyles={{ dateInput: { borderRadius: 5 } }}
                />

                <DatePicker
                  mode="time"
                  placeholder="Select Time"
                  date={newActivity.time}
                  showIcon={false}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  format={"h:mm A"}
                  is24Hour={false} // only works for Android view
                  onDateChange={date => {
                    setNewActivity({
                      ...newActivity,
                      time: date
                    });
                  }}
                  style={styles.time}
                  customStyles={{ dateInput: { borderRadius: 5 } }}
                />
              </View>
              <Text style={styles.addText}>Where?</Text>
              <TextInput
                style={[Global.input, styles.addInput]}
                placeholder="Add Location"
                onChangeText={e => activityChangeHandler(e, "location")}
                value={newActivity.location}
              ></TextInput>

              <Text style={styles.addText}>Don't Forget A Note!</Text>
              {Platform.OS === "ios" ? (
                <TextInput
                  style={[Global.input, { height: 77 }, styles.addInput]}
                  multiline={true} // moves placeholder text to top for iOS
                  placeholder="This lets people know what to look out for!"
                  value={newActivity.notes}
                  onChangeText={e => activityChangeHandler(e, "notes")}
                ></TextInput>
              ) : (
                <TextInput
                  style={[Global.input, { height: 77 }, styles.addInput]}
                  textAlignVertical={"top"} // for Android
                  placeholder="This lets people know what to look out for!"
                  value={newActivity.notes}
                  onChangeText={e => activityChangeHandler(e, "notes")}
                ></TextInput>
              )}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={deleteActivity}
                  style={[Buttons.btn, Buttons.secondary]}
                >
                  <Text style={[Buttons.textAuth]}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={saveActivity}
                  style={[Buttons.btn, Buttons.primary]}
                >
                  <Text style={[Buttons.textAuth, Buttons.textPrimary]}>
                    Save
                  </Text>
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

  date: {
    width: "45%"
  },
  time: {
    width: "35%"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  categoryBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  }
});

const mapStateToProps = state => {
  return {
    ...state,
    interests: state.interests,
    user: state.user
  };
};

export default connect(mapStateToProps, {})(EditActivity);
