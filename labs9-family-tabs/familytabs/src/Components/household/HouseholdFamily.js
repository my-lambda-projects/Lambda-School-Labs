import React from "react";
import styled from "styled-components";
import axios from "axios";
import HouseholdModal from "./HouseholdModal";

const Card = styled.div`
  border: 2px solid lightgrey;
  width: 380px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 2;
  background: #68659E;
  margin: 28px; 

  @media (min-width: 320px) and (max-width: 768px) {
    margin-left: 7px;
  }

`;

const Header = styled.div`
  color: #ffffff;
  font-size: 30px;
  font-weight: 500;
  width: 100%;
  height: 60px;
  justify-content: center;
  padding-top: 10px;
  display: flex;
`;

const Info = styled.div`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 10px;
  color: #ffffff;
`;

const StyledButton = styled.button `
    margin: 10px 0px 20px 10px;
    color: white;
    background: #68659E;
    border: 2px solid #ffffff; 
    width: 100px; 
    height: 25px;
    margin-left: 20px;
    
    :hover {
      border-color: #3985ac;
      color: #3985ac;
      cursor: pointer;
    }
`;

class HouseholdFamily extends React.Component {
  state = {
    family_name: "",
    userName: "",
    phone: "",
    email: "",
    isAdmin: false,
    showForm: false,
    notification:false
  };
  componentDidMount() {
    this.setState({ ...this.props.familydata, notification : this.props.familydata.textCheckbox });
  }

  handleNotificationChange=(notification) =>{
    this.setState({ notification });
  }

  handleAdminChange=(isAdmin) =>{
    this.setState({ isAdmin });
  }

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onInputChange = (inputValue, { action }) => {
    this.setState({ isAdmin: inputValue });
  };

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  memberEdit = async e => {
    e.preventDefault();
    const { userName, phone, email, isAdmin , notification} = this.state;
    const { familyID, id } = this.props.familydata;
    const newProfile = {
      userName,
      phone,
      email,
      isAdmin,
      textCheckbox: notification
    };

    try {
      console.log(newProfile);
      let res = await axios.put(
        `${process.env.REACT_APP_API_URL}/profile/edit/${id}`,
        newProfile
      );
      console.log(res);
      this.props.loadState(familyID);
      this.setState({ showForm: false });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    let { family_name, userName, phone, email } = this.state;
    return (
      <div className="ParentHomepage">
        <Card>
          <Header>{family_name}</Header>
          <Info>
            <p>USERNAME: {userName}</p>
            <p>PHONE: {phone}</p>
            <p>EMAIL: {email}</p>
            <p>ADMIN: {this.props.familydata.isAdmin ? 'yes':'no'}</p>
            <p>NOTIFICATIONS: {this.props.familydata.textCheckbox ? 'on':'off'}</p>
          </Info>
          {this.props.profile.isAdmin ? (
            <StyledButton onClick={this.toggleForm}>EDIT</StyledButton>
          ) : (
            ""
          )}
         
        </Card>

        {this.state.showForm ? (
          <HouseholdModal
            edit
            toggleForm={this.toggleForm}
            inputHandler={this.inputHandler}
            onInputChange={this.onInputChange}
            {...this.state}
            {...this.props}
            addOrEdit={this.memberEdit}
            handleNotificationChange={this.handleNotificationChange}
            handleAdminChange={this.handleAdminChange}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default HouseholdFamily;
