import React, { Component } from "react";
import Form from "../components/";
import connect from "react-redux/es/connect/connect";
import { getProfile, updateUser } from "../../auth/store/action";

class FormSkills extends Component {
  state = {
    desired_title: {
      name: "desired title",
      value: ""
    },
    summary: {
      value: ""
    },
    top_skills: {
      name: "top skills",
      value: ""
    },
    extra_skills: {
      name: "additional skills",
      value: ""
    },
    other_skills: {
      name: "familiar with",
      value: ""
    }
  };
  componentDidMount() {
    let updateState = JSON.parse(JSON.stringify(this.state));
    if (this.props.currentUser) {
      updateState.desired_title.value = `${
        this.props.currentUser.desired_title
      }`;
      updateState.summary.value = `${this.props.currentUser.summary}`;
      updateState.top_skills.value = `${this.props.currentUser.top_skills}`;
      updateState.extra_skills.value = `${this.props.currentUser.extra_skills}`;
      updateState.other_skills.value = `${this.props.currentUser.other_skills}`;

      this.setState({
        ...updateState
      });
    }
  }

  onChange = e => {
    let updateState = { ...this.state };
    updateState[e.target.name].value = e.target.value;
    this.setState({ ...updateState });
  };
  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    let userType = this.props.currentUser.is_seeker ? "seeker" : "employer";
    let userId = this.props.currentUser.id;
    let {
      top_skills,
      desired_title,
      extra_skills,
      other_skills,
      summary
    } = this.state;

    this.props.updateUser(userType, userId, {
      summary: summary.value,
      desired_title: desired_title.value,
      top_skills:
        top_skills.value.length > 1 ? top_skills.value.split(" ") : "",
      extra_skills:
        extra_skills.value.length > 1 ? extra_skills.value.split(" ") : "",
      other_skills:
        other_skills.value.length > 1 ? other_skills.value.split(" ") : ""
    });
  };

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        title="Top Skills"
        onChange={this.onChange}
        state={this.state}
      />
    );
  }
}

const MapStateToProps = state => ({
  currentUser: state.user.currentUser,
  authenticatoin_succeed: state.user.authenticatoin_succeed
});
export default connect(
  MapStateToProps,
  { getProfile, updateUser }
)(FormSkills);
