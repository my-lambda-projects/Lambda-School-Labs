import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import axios from 'axios';
import base from './base';
import firebase from './Firebase';
import Navbar from './Navbar';
import '../CSS/AccountCreate.css';

const uiConfig = {
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccess: () => {
      firebase.auth().onAuthStateChanged((user) => {
        console.log('got the ID!!', user.uid);

        // persist signup data so additional info can be added and sent to backend
        sessionStorage.setItem('tokenId', user.uid);
        sessionStorage.setItem('email', user.email);
        sessionStorage.setItem('name', user.displayName);
      });
      window.location = '/new_account';
    },
  },
  // credentialHelper: firebase.auth.CredentialHelper.NONE,
  // Terms of service url.
  // tosUrl: '<your-tos-url>',
};

class AccountCreation extends Component {
  constructor() {
    super();
    this.state = {
      userType: 'standardUser',
      phoneNumber: '',
      email: sessionStorage.getItem('email'),
      name: sessionStorage.getItem('name'),
      acceptTexts: false,
      acceptEmails: false,
      tokenId: sessionStorage.getItem('tokenId'),
      invalidPhoneNumber: false,
    };
  }

  handlePhoneNumber = (event) => {
    const contactNo = event.target.value.substring(0, 10);
    this.setState({ phoneNumber: contactNo });
  };

  handleTextAlerts = () => {
    this.setState({ acceptTexts: !this.state.acceptTexts });
  };

  handleEmailAlerts = () => {
    this.setState({ acceptEmails: !this.state.acceptEmails });
  };

  sendToDB = (event) => {
    event.preventDefault();

    // Validate user input.
    if (this.state.phoneNumber !== '') {
      if (isNaN(this.state.phoneNumber) || this.state.phoneNumber.length < 10) {
        this.setState({ invalidPhoneNumber: true });
        return;
      }
      this.setState({ invalidPhoneNumber: false });
    }

    const userInfo = {
      name: this.state.name,
      userType: this.state.userType,
      email: this.state.email,
      token: this.state.tokenId,
      mobilePhone: this.state.phoneNumber,
      acceptTexts: this.state.acceptTexts,
      acceptEmails: this.state.acceptEmails,
    };
    sessionStorage.setItem('userType', this.state.userType);
    console.log('sending to db:', userInfo);
    axios
      .post(`${base}/newuser`, userInfo)
      .then((res) => {
        console.log('Response from server: ', res);
        window.location = '/my_loans';
      })
      .catch((err) => {
        throw err;
      });
    // window.location = '/my_loans';
  };

  render() {
    let invalidPhoneNumberDiv = null;
    if (this.state.invalidPhoneNumber) {
      invalidPhoneNumberDiv = (
        <div className="invalid-user-input">
          *Invalid phone number. Please enter a 10-digit number or keep it blank.
        </div>
      );
    }

    const token = sessionStorage.getItem('tokenId');
    if (token === null || token === undefined || token === '') {
      return (
        <div>
          <Navbar />
          <div className="Account-title-containter">
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
          </div>
        </div>
      );
    }
    if (sessionStorage.getItem('userType') === 'managerUser') {
      window.location = '/loan_list';
      return (
        <div>
          <h1> Logged In </h1>
        </div>
      );
    }
    if (sessionStorage.getItem('userType') === 'standardUser') {
      console.log('standardUser redirect!');
      window.location = '/my_loans';
      return (
        <div>
          <h1> Logged In </h1>
        </div>
      );
    }
    if (this.state.userType) {
      return (
        <div className="Create">
          <Navbar />
          <div className="Create-title-containter">
            <h1> Client Account Creation</h1>
          </div>
          <div>
            <form className="Create-form-container">
              <fieldset>
                <legend>Additional information:</legend>
                Mobile Phone:
                <input
                  type="text"
                  value={this.state.phoneNumber}
                  onChange={this.handlePhoneNumber}
                />
                {invalidPhoneNumberDiv}
                <br />
                <br />
                <input
                  type="checkbox"
                  name="acceptTexts"
                  checked={this.state.acceptTexts}
                  onChange={this.handleTextAlerts}
                />
                I would like to recieve TEXT notifications about my loan
                <br />
                <input
                  type="checkbox"
                  name="acceptEmails"
                  checked={this.state.acceptEmails}
                  onChange={this.handleEmailAlerts}
                />{' '}
                I would like to recieve EMAIL notifications about my loan<br />
                <br />
                <button onClick={this.sendToDB}>Submit</button>
              </fieldset>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default AccountCreation;
