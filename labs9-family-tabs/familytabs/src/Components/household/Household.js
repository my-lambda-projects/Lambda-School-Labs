import React, { Component } from "react";
import HouseholdFamily from "./HouseholdFamily";
import Header from "../Header";
import styled from "styled-components";
import axios from "axios";
import HouseholdModal from "./HouseholdModal";

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTop = styled.div`
  color: white;
  font-family: "Merriweather", sans-serif;
`;

const StyledBottom = styled.div`
  padding: 25px 150px 0 150px;
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) and (max-width: 1281px) {
    padding: 0;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 0;
  }

  @media (min-width: 320px) and (max-width: 768px) {
    padding: 0;
  }
`;

const StyledButton = styled.button`
  color: white;
  background: #242943;
  border: 2px solid #ffffff;
  padding: 15px 50px 15px 50px;
  margin: 0 0 50px 0;
  width: 300px;
  height: 50px;
  margin-left: 5px;

  :hover {
    border-color: #3985ac;
    color: #3985ac;
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 0;
`;

export default class Household extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      phone: "",
      email: "",
      notification: false,
      isAdmin: false,
      showForm: false
    };
  }

  handleAdminChange = isAdmin => {
    this.setState({ isAdmin });
  };

  handleNotificationChange = notification => {
    this.setState({ notification });
  };

  onInputChange = (inputValue, { action }) => {
    this.setState({ isAdmin: inputValue });
  };

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  memberAdder = async e => {
    e.preventDefault();
    const { userName, phone, email, isAdmin, notification } = this.state;
    const { familyID } = this.props;
    const newProfile = {
      userName,
      phone,
      email,
      isAdmin,
      familyID,
      textCheckbox: notification
    };

    try {
      console.log(newProfile);
      let res = await axios.post(
        `${process.env.REACT_APP_API_URL}/profile/create`,
        newProfile
      );
      console.log(res);
      this.props.loadState(familyID);
      this.setState({
        userName: "",
        phone: "",
        email: "",
        showForm: false,
        notification: false
      });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    if (!this.props.profile) {
      return <div>Loading...</div>;
    }
    return (
      <StyledMain>
        <StyledTop>
          <Header
            title="Household"
            subTitle="View and add family members with"
            isSubscribed={
              this.props.profile ? this.props.profile.isSubscribed : 0
            }
          />
        </StyledTop>

        <StyledBottom>
          <ButtonContainer>
            {this.props.profile.isAdmin ? (
              <StyledButton onClick={this.toggleForm}>
                ADD FAMILY MEMBER
              </StyledButton>
            ) : (
              ""
            )}
          </ButtonContainer>
          <CardList>
            {this.props.family.map(familydata => (
              <HouseholdFamily
                key={familydata.id}
                familydata={familydata}
                profile={this.props.profile}
                loadState={this.props.loadState}
              />
            ))}
          </CardList>

          {this.state.showForm ? (
            <HouseholdModal
              toggleForm={this.toggleForm}
              inputHandler={this.inputHandler}
              onInputChange={this.onInputChange}
              {...this.state}
              {...this.props}
              addOrEdit={this.memberAdder}
              handleNotificationChange={this.handleNotificationChange}
              notification={this.state.notification}
              handleAdminChange={this.handleAdminChange}
            />
          ) : (
            ""
          )}
        </StyledBottom>
      </StyledMain>
    );
  }
}
