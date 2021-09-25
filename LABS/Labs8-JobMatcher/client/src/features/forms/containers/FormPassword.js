import React, { Component } from "react";
import Form from "../components/";
import connect from "react-redux/es/connect/connect";
import { getProfile, updateUser } from "../../auth/store/action";

class PasswordContainer extends Component {
  state = {
    old_password: {
      type: "password",
      placeholder: "old password",
      label: "old password",
      value: ""
    },
    new_password: {
      type: "password",
      placeholder: "new password",
      label: "new password",
      value: ""
    },
    new_password2: {
      id: "password2",
      type: "password",
      placeholder: "confirm password",
      label: "confirm password",
      value: ""
    }
  };

  onChange = e => {
    let updateState = { ...this.state };
    updateState[e.target.name].value = e.target.value;
    this.setState({ ...updateState });
  };
  onSubmit = e => {
    console.log("form password on submit func");
    e.preventDefault();
    console.log(this.state);
    let userType = this.props.currentUser.is_seeker ? "seeker" : "employer";
    let userId = this.props.currentUser.id;
    let data = this.state;
    this.props.updateUser(userType, userId, {
      old_password: data.old_password.value,
      password: data.new_password.value
    });
  };

  render() {
    return (
      <Form
        title="Password"
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        state={this.state}
      />
    );
  }
}
const MapStateToProps = state => ({
  currentUser: state.user.currentUser,
  is_seeker: state.user.is_seeker,
  authenticatoin_succeed: state.authenticatoin_succeed
});
export default connect(
  MapStateToProps,
  { getProfile, updateUser }
)(PasswordContainer);
