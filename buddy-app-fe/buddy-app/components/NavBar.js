import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { forceRender } from "../actions/buddyActions";
//icons
import bell from "../assets/icons/bell.png";
// import home from "../assets/icons/home.png";
// import profile from "../assets/icons/profile.png";

import { Feather } from "@expo/vector-icons";

//styles
import Global from "../styles/Global";

const NavBar = props => {
  return (
    <View style={Global.bottomNav}>
      <TouchableOpacity onPress={() => props.navigation.navigate("Dashboard")}>
        <Feather name="home" size={30} color="#FFF" />
      </TouchableOpacity>

      {/*       Will reinstate once functionality is ready
      <TouchableOpacity>
      <Image source={bell} />
      </TouchableOpacity> */}

      <TouchableOpacity
        onPress={() => {
          props.forceRender();
          props.navigation.navigate("Profile");
        }}
      >
        <Feather name="user" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    ...state
  };
};

export default connect(mapStateToProps, { forceRender })(NavBar);
