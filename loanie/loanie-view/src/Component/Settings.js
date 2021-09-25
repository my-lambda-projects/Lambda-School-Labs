import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import axios from 'axios';
import base from './base';
import Navbar from './Navbar';
import SideBarNav from './SideBarNav';

import '../CSS/Settings.css';

export default class Settings extends Component {
  constructor() {
    super();
    this.state = {
      email: sessionStorage.getItem('email'),
      subExp: '',
      phoneNumber: '',
      name: '',
      tokenId: sessionStorage.getItem('tokenId'),
      invalidName: false,
      invalidPhoneNumber: false,
    };
  }

  componentDidMount() {
    const body = { token: sessionStorage.getItem('tokenId') };

    axios
      .post(`${base}/user`, body)
      .then((res) => {
        console.log('get user', res);
        const contactNum = res.data.mobilePhone;
        this.setState({
          name: res.data.name,
          email: res.data.email,
          phoneNumber: contactNum,
          subExp: res.data.subExp,
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  sendToDB = (event) => {
    event.preventDefault();
  };

  send = () => {
    // Validate user input.
    // if (this.state.name.length === 0) {
    //   this.setState({ invalidName: true });
    //   return;
    // }
    // this.setState({ invalidName: false });

    // if (isNaN(this.state.phoneNumber) || this.state.phoneNumber.length < 10) {
    //   this.setState({ invalidPhoneNumber: true });
    //   return;
    // }
    // this.setState({ invalidPhoneNumber: false });

    const userInfo = {
      name: this.state.name,
      email: this.state.email,
      mobilePhone: this.state.phoneNumber,
      token: this.state.tokenId,
    };
    axios
      .post(`${base}/edituser`, userInfo)
      .then((res) => {
        console.log('Success response: ', res);
        window.location = '/open_loans';
      })
      .catch((err) => {
        throw err;
      });
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
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
      invalidPhoneNumberDiv = <div className="invalid-user-input">*Invalid Phone Number</div>;
    }

    return (
      <div className="Settings">
        <Navbar />
        <SideBarNav />
        <div className="BreadCrumb">
          <Breadcrumb>
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem tag="a" href="/open_loans">
              Loans
            </BreadcrumbItem>
            <BreadcrumbItem active>Settings</BreadcrumbItem>
          </Breadcrumb>
        </div>
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
              <p>Subscription expiration date: {this.state.subExp}</p>
              <button onClick={this.send}>Submit</button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}
