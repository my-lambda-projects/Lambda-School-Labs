import React, { Component } from "react";
import { connect } from "react-redux";
import Profile from "../components/Profile";
import Form from "../components";
import { getProfile, updateUser } from "../../auth/store/action";
import FormEducation from "./FormEducation";
import FormExperience from "./FormExperience";
import FormPassword from "./FormPassword";
import FormPersonal from "./FormPersonal";
import FormCompany from "./FormCompany";
import FormSkills from "./FormSkills";

import PropTypes from "prop-types";

class ProfileContainer extends Component {
  //ProfileContainer  will connect all form container and to profile component for rendering to screen.

  componentDidMount = () => {
    //TODO get current user info, to populate the form.
    this.props.getProfile();
  };

  render() {
    let tabs = this.props.currentUser
      ? {
          Personal: <FormPersonal />,
          Skill: <FormSkills />,
          Company: <FormCompany />,
          Education: <FormEducation />,
          Experience: <FormExperience />,
          Password: <FormPassword />
        }
      : {};
    return this.props.currentUser ? (
      <Profile is_seeker={this.props.currentUser.is_seeker} tabs={tabs} />
    ) : (
      <Form title="geting profile " state={{}} />
    );
  }
}
const MapStateToProps = state => ({
  currentUser: state.user.currentUser,
  is_seeker: state.user.is_seeker,
  authenticatoin_succeed: state.user.authenticatoin_succeed
});
export default connect(
  MapStateToProps,
  { getProfile, updateUser }
)(ProfileContainer);

ProfileContainer.propTypes = {
  currentUser: PropTypes.object,
  is_seeker: PropTypes.bool
};
