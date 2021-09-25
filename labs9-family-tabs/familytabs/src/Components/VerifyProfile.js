import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { StyledFamilyForm } from "./styled/components";
import styled from 'styled-components'
import Header from "./Header";

const IntroWrapper = styled.div`
  margin:35px 0 0 175px;
  display:flex;
  @media (max-width:1140px){
    margin-left:35px;
  }
  @media (max-width:960px){
    flex-direction:column;
    align-items:center;
  }
  @media (max-width:635px){
    margin-left:0;
  }
  .intro{
    width:40%;
    margin:30px 0;
    color:white;
    @media (max-width:960px){
      width:400px;
  }
  @media (max-width:460px){
      width:300px;
    }
    h3{
      font-size:35px;
      margin-bottom:10px;
    }
    p{
      margin-left:10px;
      line-height:1.75;
    font-size:18px;
    }
  }
`

const Loading = styled.h2 `
  color: #ffffff;
`;

class VerifyProfile extends Component {
  state = {
    error: "",
    userEmail: "",
    userName: "",
    family_name: "",
    phone: "",
    loaded: false
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  familySubmitHandle = async e => {
    e.preventDefault();
    let userResponse;
    if (!this.state.family_name) {
      return;
    }
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}/family/create`,
        {
          family_name: this.state.family_name
        }
      );
      let familyID = response.data[0].id;
      userResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/newlogin`,
        {
          userName: this.state.userName,
          email: this.state.userEmail,
          familyID,
          isAdmin: 1,
          phone: this.state.phone
        }
      );
      console.log(familyID);
      this.props.loadState(familyID);
      this.props.setProfile(userResponse.data);
      return;
    } catch (err) {
      console.log(userResponse.data);
    }
  };

  componentDidMount() {
    this.loadAPIProfile();
  }

  loadAPIProfile() {
    this.props.auth.getProfile(async (profile, error) => {
      let { email = profile.email.toLowerCase() } = profile;
      this.setState({ userEmail: email});
      try {
        let response = await axios.get(
          `${process.env.REACT_APP_API_URL}/profile/${this.state.userEmail}`
        );
        this.setState({ loaded: true });
        if (response.data.message) {
          return;
        }
        this.props.loadState(response.data.familyID);
        this.props.setProfile(response.data);
      } catch (err) {
        console.log(err);
      }
    });
  }

  render() {
    const { loaded } = this.state;
    console.log(this.state)
    return (
      <>
        {!loaded ? (
          <Loading>Loading...</Loading>
        ) : (
          <>
            {this.props.profile ? (
              <Redirect to="/home/tabs" />
            ) : (<><Header title="Welcome"
            subTitle="You must be new here"></Header>
              <IntroWrapper>
                <div className='intro'>
                <h3>Welcome to Family Tabs</h3>
                <p>If you would like to register a new family, fill out the form. If you wanted to join an existing family, please log out and log in with the email address designated by your parent.</p>
                </div>
              
              <StyledFamilyForm onSubmit={this.familySubmitHandle}>
                <h2>Register Family</h2>
                <input
                  type="text"
                  name="family_name"
                  placeholder="family name"
                  value={this.state.family_name}
                  onChange={this.handleChange}
                />
                <input
                  type="text"
                  name="userName"
                  placeholder="name"
                  value={this.state.userName}
                  onChange={this.handleChange}
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
                <div className="button-box">
                  <button type="submit">Submit</button>
                  <button onClick={this.props.auth.logout}>Log out</button>
                </div>
              </StyledFamilyForm></IntroWrapper></>
            )}
          </>
        )}
      </>
    );
  }
}

export default VerifyProfile;
