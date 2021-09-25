import React, { Component } from "react";
import Form from "../components";
import connect from "react-redux/es/connect/connect";
import { updateProfileImg } from "../store/action";
import { getProfile, updateUser } from "../../auth/store/action";

class ExperienceContainer extends Component {
  state = {
    description: {
      id: "experience_description",
      value: ""
    },
    title: {
      value: "",
      disable: "disable"
    },
    company: {
      value: "",
      disable: "disable"
    },
    location: {
      value: "",
      disable: "disable"
    },
    headline: {
      value: "",
      disable: "disable"
    },
    date: {
      date: [new Date(), new Date()],
      id: "experience_data",
      disable: "disable"
    }
  };

  componentDidMount() {
    let updateState = JSON.parse(JSON.stringify(this.state));
    if (this.props.currentUser) {
      updateState.description.value = `${this.props.currentUser.experience}`;
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
    //adopt to seeker experience field on backend;
    e.preventDefault();
    let userType = "seeker";
    let userId = this.props.currentUser.id;
    let data = this.state;
    this.props.updateUser(userType, userId, {
      // date: data.date.date,
      // title: data.title.value,
      // company: data.company.value,
      // location: data.location.value,
      // headline: data.headline.value,
      experience: data.description.value
    });
  };

  render() {
    return (
      <Form
        title="Experience"
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
)(ExperienceContainer);
