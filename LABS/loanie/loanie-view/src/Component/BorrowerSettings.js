import React, { Component } from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import base from './base';
import firebase from './Firebase';
import Navbar from './Navbar';
import ClientSideNav from './ClientSideNav';

import '../CSS/Settings.css';

export default class BorrowerSettings extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      originalEmail: '',
      email: '',
      phoneNumber: '',
      acceptTexts: true,
      acceptEmails: true,
      tokenId: sessionStorage.getItem('tokenId'),
      password: '',
      invalidName: false,
      invalidPhoneNumber: false,
      invalidCheckBoxSelection: false,
    };
  }

  componentDidMount() {
    console.log(this.state.tokenId);
    const body = {
      token: this.state.tokenId,
    };
    axios
      .post(`${base}/user`, body)
      .then((res) => {
        this.setState({
          name: res.data.name,
          originalEmail: res.data.email,
          email: res.data.email,
          phoneNumber: res.data.mobilePhone,
          acceptTexts: res.data.acceptTexts,
          acceptEmails: res.data.acceptEmails,
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  handleTextAlerts = () => {
    this.setState({ acceptText: !this.state.acceptText });
  };

  handleEmailAlerts = () => {
    this.setState({ acceptEmails: !this.state.acceptEmails });
  };

  sendToDB = (event) => {
    event.preventDefault();

    // check to see if email changed
    if (this.state.email !== this.state.originalEmail) {
      firebase
        .signInAndRetrieveDataWithEmailAndPassword(this.state.originalEmail, this.state.password)
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            throw errorCode;
          } else {
            throw errorMessage;
          }
        });

      firebase
        .auth()
        .updateEmail(this.state.email)
        .then(() => {
          this.send();
        })
        .catch((error) => {
          throw error;
        });
    } else {
      this.send();
    }
  };

  send = () => {
    // Validate user input.
    if (this.state.name.length === 0) {
      this.setState({ invalidName: true });
      return;
    }
    this.setState({ invalidName: false });

    if (isNaN(this.state.phoneNumber) || this.state.phoneNumber.length < 10) {
      this.setState({ invalidPhoneNumber: true });
      return;
    }
    this.setState({ invalidPhoneNumber: false });

    if (this.state.acceptTexts === false && this.state.acceptEmails === false) {
      console.log(typeof this.state.acceptTexts);
      this.setState({ invalidCheckBoxSelection: true });
      return;
    }
    this.setState({ invalidCheckBoxSelection: false });

    const userInfo = {
      name: this.state.name,
      email: this.state.email,
      mobilePhone: this.state.phoneNumber,
      acceptTexts: this.state.acceptTexts,
      acceptEmails: this.state.acceptEmails,
      token: this.state.tokenId,
    };
    console.log('sending to db:', userInfo);
    axios
      .post(`${base}/edituser`, userInfo)
      .then((res) => {
        console.log('Success response: ', res);
        window.location = '/my_loans';
      })
      .catch((err) => {
        throw err;
      });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handlePhoneChange = (event) => {
    const contactNo = event.target.value.substring(0, 10);
    this.setState({ phoneNumber: contactNo });
  };

  render() {
    // render getter
    const token = this.state.tokenId;
    if (token === null || token === undefined || token === '') {
      window.location = '/login_user';
      return (
        <div>
          <h1> Please Login</h1>
        </div>
      );
    }
    let invalidNameDiv = null;
    if (this.state.invalidName) {
      invalidNameDiv = <div className="invalid-user-input">*Invalid Name</div>;
    }

    let invalidPhoneNumberDiv = null;
    if (this.state.invalidPhoneNumber) {
      invalidPhoneNumberDiv = <div className="invalid-user-input">*Invalid Phone Number. Please enter 10-digit number.</div>;
    }

    let invalidCheckBoxesDiv = null;
    if (this.state.invalidCheckBoxSelection) {
      invalidCheckBoxesDiv = (
        <div className="invalid-user-input">*Please select at least one form of notification.</div>
      );
    }
    return (
      <div className="Settings">
        <div className="BreadCrumb">
          <Breadcrumb>
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem tag="a" href="/my_loans">
              Loans
            </BreadcrumbItem>
            <BreadcrumbItem active>Settings</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <Button
          color="info"
          onClick={() => {
            window.location = '/billing';
          }}
        >
          {' '}
          Loan Officers{' '}
        </Button>
        <div className="Settings-title-containter">
          <h1>Settings</h1>
        </div>
        <div className="Settings-form-container">
          <form>
            <fieldset>
              <legend>Personal information:</legend>
              <div>
                <p>Name:</p>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleNameChange}
                />
                {invalidNameDiv}
              </div>
              <br />
              <br />
              <div>
                <p>Phone Number:</p>{' '}
                <input
                  type="text"
                  value={this.state.phoneNumber}
                  onChange={this.handlePhoneChange}
                />
                {invalidPhoneNumberDiv}
              </div>
              <br />
              <br />
              <div>
                <input
                  type="checkbox"
                  name="acceptText"
                  checked={this.state.acceptTexts}
                  onChange={this.handleTextAlerts}
                />{' '}
                I would like to recieve TEXT notifications about my loan
              </div>
              <br />
              <div>
                <input
                  type="checkbox"
                  name="acceptEmails"
                  checked={this.state.acceptEmails}
                  onChange={this.handleEmailAlerts}
                />{' '}
                I would like to recieve EMAIL notifications about my loan
              </div>
              {invalidCheckBoxesDiv}
              <button onClick={this.sendToDB}>Submit</button>
            </fieldset>
          </form>
        </div>
        <Navbar />
        <ClientSideNav />
      </div>
    );
  }
}
