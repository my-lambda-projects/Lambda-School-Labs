import LinkedinSDK from "./LinkedIn/Linkedin";
import React from "react";
import Api from "../../../api";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
const StyledDiv = styled.div`
  display: ${props => (props.login ? "none" : "block")};
`;
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    //
    this.state = {
      linked_success: false,
      is_seeker: false
    };
  }
  handleInput = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };
  responseLinkedin = response => {
    let user = {
      first_name: response.firstName,
      last_name: response.lastName,
      is_seeker: this.state.is_seeker,
      email: response.emailAddress,
      password: "9712225622"
    };
    let userType = this.state.is_seeker ? "seeker" : "employer";
    this.props.dispatch({ type: "LINKEDIN_REQUEST" });

    Api.endpoints
      .signUp(userType, user)
      .then(result => {
        this.props.dispatch({
          type: "LINKEDIN_SIGNUP",
          data: result.data
        });
      })
      .catch(error => {
        let testText = "This email has been taken by someone else";
        //check error message from signup handler, if email already exist, sign them in.
        if (
          error.response &&
          error.response.data &&
          error.response.data.email &&
          error.response.data.email[0].includes(testText)
        ) {
          Api.endpoints
            .signIn({ username: user.email, password: user.password })
            .then(result => {
              this.props.dispatch({
                type: "LINKEDIN_LOGIN",
                data: result.data
              });
            })
            .catch(error => {
              this.props.dispatch({
                type: "LINKEDIN_FAILED",
                data: error.response ? error.response.data : error.message
              });
            });
        } else {
          this.props.dispatch({
            type: "LINKEDIN_FAILED",
            data: "linkedin failed to verify your account "
          });
        }
      });
  };

  render() {
    return !this.props.LINKEDIN_SUCCESS ? (
      <div>
        <StyledDiv login={this.props.login}>
          <label htmlFor="is_seeker"> Are you seeker? </label>
          <input
            type="checkbox"
            onChange={this.handleInput}
            name="is_seeker"
            id="is_seeker"
            value={this.state.is_seeker}
          />
        </StyledDiv>
        <LinkedinSDK
          clientId="86k7v2sks14nul"
          callBack={this.responseLinkedin}
          fields=":(id,firstName,lastName,email-address,num-connections,picture-urls::(original))"
          className={"btn"}
          loginButtonText={`${this.props.actionType} with Linkedin`}
          buttonType={"button"}
          getOAuthToken={true}
        />
      </div>
    ) : (
      <Redirect to="/seek" />
    );
  }
}
const MapStateToProps = state => ({
  LINKEDIN_SUCCESS: state.user.LINKEDIN_SUCCESS
});
const MapDispatchToProps = dispatch => ({
  dispatch
});
export default connect(
  MapStateToProps,
  MapDispatchToProps
)(MyComponent);
