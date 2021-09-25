import React, { Component } from "react";
import Form from "../components/";
import connect from "react-redux/es/connect/connect";
import { updateProfileImg } from "../store/action";
import { getProfile, updateUser } from "../../auth/store/action";

class CompanyContainer extends Component {
  state = {
    company_name: {
      name: "company name",
      value: ""
    }
  };
  componentDidMount() {
    let updateState = JSON.parse(JSON.stringify(this.state));
    if (this.props.currentUser) {
      updateState.company_name.value = `${this.props.currentUser.company_name}`;
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
    let userType = "employer";
    let userId = this.props.currentUser.id;
    let data = this.state;
    this.props.updateUser(userType, userId, {
      company_name: data.company_name.value
    });
  };

  render() {
    return (
      <Form
        title="Company"
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
)(CompanyContainer);
