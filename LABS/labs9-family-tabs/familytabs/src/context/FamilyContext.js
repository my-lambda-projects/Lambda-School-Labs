import React, { Component, createContext } from "react";
import Auth from "../auth/Auth";
import axios from "axios";
const FamilyContext = createContext();

export class FamilyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history),
      profile: null,
      familyID: null,
      familyEvents: [],
      family: []
    };
  }
  testFunc = () => console.log("hello world");
  setProfile = profile => {
    this.setState({ profile });
  };
  setFamilyID = familyID => {
    this.setState({ familyID });
  };
  setFamilyEvents = familyEvents => {
    this.setState({ familyEvents });
  };
  setFamily = family => {
    this.setState({ family });
  };

  componentDidMount() {
    if (localStorage.getItem("access_token")) {
      if (!this.state.profile) {
        this.loadAPIProfile();
      }
    }
  }

  loadState = async id => {
    if(!this.state.familyID){
      this.setFamilyID(id)
    }
    try {
      const familyMembers = await axios.get(
        `${process.env.REACT_APP_API_URL}/familymembers/${id}`
      );

      const familyEvents = await axios.get(
        `${process.env.REACT_APP_API_URL}/fulleventsbyfamily/${id}`
      );
      this.setFamily(familyMembers.data);
      this.setFamilyEvents(familyEvents.data);
    } catch (err) {
      console.log(err);
    }
  };

  authEmail = async() => {
    let email
    await this.state.auth.getProfile( (profile, error) => {
      email = profile.email.toLowerCase() ;
    });
    return email;
  };

  loadAPIProfile = async () => {
    let email
    this.state.auth.getProfile(async (profile, error) => {
      email = profile.email.toLowerCase() ;
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/profile/${email}`
      );
      if (response.data.err) {
        return;
      }
      this.setProfile(response.data);
      this.setFamilyID(response.data.familyID);
      this.loadState(this.state.familyID)
    } catch (err) {
      console.log(err);
    }
    
  })
};

  render() {
    console.log(this.state)
    const {
      state,
      testFunc,
      setProfile,
      setFamilyID,
      setFamilyEvents,
      loadAPIProfile,
      loadState,
      setFamily
    } = this;
    return (
      <FamilyContext.Provider
        value={{
          ...state,
          testFunc,
          setProfile,
          setFamilyID,
          loadAPIProfile,
          setFamilyEvents,
          setFamily,
          loadState
        }}
      >
        {this.props.children}
      </FamilyContext.Provider>
    );
  }
}

export const FamilyConsumer = FamilyContext.Consumer;
