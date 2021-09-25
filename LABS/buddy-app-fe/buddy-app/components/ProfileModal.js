import React, { useState } from "react";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  AsyncStorage,
  Text,
  Dimensions,
  Image
} from "react-native";
import { onSignOut } from "../utils/authHelper";
import { addUser } from "../actions/buddyActions";

import Global from "../styles/Global";
import x from "../assets/icons/x.png";

const ProfileModal = props => {
  const signOut = () => {
    onSignOut()
      .then(res => {
        props.addUser({ first_name: "", last_name: "", id: "" });
        AsyncStorage.removeItem("id");
        props.sendToLanding();
      })
      .catch(err => {
        console.log("Error logging out", err);
      });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.isModalVisible}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalStyler}>
          <View style={{ alignSelf: "flex-end" }}>
            <TouchableOpacity onPress={() => props.toggleModal()}>
              <Image source={x} />
            </TouchableOpacity>
          </View>
          <Text
            style={[
              Global.textNormal,
              { marginTop: 30, fontSize: 35, fontFamily: "Nunito-Bold" }
            ]}
          >
            {props.user.first_name}
          </Text>
          <View style={styles.hr} />
          <TouchableHighlight onPress={() => signOut()}>
            <Text style={[Global.textNormal, { fontSize: 18 }]}>Sign Out</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    backgroundColor: "rgba(46,47,56, .65)"
  },
  modalStyler: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.65,
    backgroundColor: "#fff",
    padding: 35
  },
  hr: {
    borderBottomColor: "#2E2F38",
    borderBottomWidth: 1,
    marginVertical: 30,
    width: "85%"
  }
});

const mapStateToProps = state => {
  return {
    ...state,
    user: state.user
  };
};

export default connect(mapStateToProps, { addUser })(ProfileModal);
