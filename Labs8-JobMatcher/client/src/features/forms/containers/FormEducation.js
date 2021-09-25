import React, { Component } from "react";
import Form from "../components";
import connect from "react-redux/es/connect/connect";
import { updateProfileImg } from "../store/action";
import { getProfile, updateUser } from "../../auth/store/action";

class EducationContainer extends Component {
  state = {
    description: {
      id: "education_description",
      value: ""
    },
    school: {
      value: "",
      disable: "disable"
    },
    study: {
      value: "",
      disable: "disable"
    },
    Degree: {
      value: "",
      disable: "disable"
    },
    date: {
      id: "education_data",
      date: [new Date(), new Date()],
      disable: "disable"
    }
  };

  componentDidMount() {
    let updateState = JSON.parse(JSON.stringify(this.state));
    if (this.props.currentUser) {
      updateState.description.value = `${this.props.currentUser.education}`;
      this.setState({
        ...updateState
      });
    }
  }

  onChange = e => {
    let updateState = { ...this.state };
    if (e.target) {
      updateState[e.target.name].value = e.target.value;
    } else {
      updateState.date.date = e;
    }
    this.setState({ ...updateState });
  };
  onSubmit = e => {
    //adopt to seeker education field on backend;
    e.preventDefault();
    let userType = "seeker";
    let userId = this.props.currentUser.id;
    let data = this.state;
    this.props.updateUser(userType, userId, {
      // data: data.date.date,
      // school: data.school.value,
      // study: data.school.value,
      // degree: data.school.value,
      education: data.description.value
    });
  };

  render() {
    return (
      <Form
        title="Education"
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
  { updateProfileImg, getProfile, updateUser }
)(EducationContainer);
