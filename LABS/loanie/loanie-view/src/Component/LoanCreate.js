import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import axios from 'axios';
import base from './base';
import Navbar from './Navbar';
import SidebarNav from './SideBarNav';
import { assignmentDefaults } from './AssignmentDefaults';
import { phaseDefaults } from './PhaseDefaults';
import '../CSS/LoanCreate.css';

export default class LoanCreate extends Component {
  constructor() {
    super();
    this.state = {
      tokenId: sessionStorage.getItem('tokenId'),
      managerName: '',
      managerEmail: '',
      phoneNumber: '',
      managerPhone: '',
      loanManagerId: '',
      clientEmail: '',
      loanType: 'new',
      amount: '',
      label: '',
      invalidAmount: false,
      invalidEmail: false,
      invalidPhoneNumber: false,
    };
  }

  componentWillMount() {
    const body = {
      token: this.state.tokenId,
    };
    axios
      .post(`${base}/user`, body)
      .then((res) => {
        this.setState({
          managerName: res.data.name,
          managerEmail: res.data.email,
          managerPhone: res.data.mobilePhone,
          loanManagerId: res.data._id,
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  handleAmountChange = (event) => {
    this.setState({ amount: event.target.value });
  };

  handleEmailChange = (event) => {
    this.setState({ clientEmail: event.target.value });
  };

  handleSmsChange = (event) => {
    const contactNo = event.target.value.substring(0, 10);
    this.setState({ phoneNumber: contactNo });
  };

  handleLabel = (e) => {
    this.setState({ label: e.target.value });
  };

  validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  sendNewLoanNotification = () => {
    // axios request to get client name
    const link = 'https://loanie.herokuapp.com/';
    const message = `Hello! Your loan officer, ${
      this.state.managerName
    }, would like to cordially invite you to use a new cutting edge mortgage communication tool called Loanie! Your loan information is waiting for you, all you have to do is sign up at ${link} . If you have any trouble or questions you can contact ${
      this.state.managerName
    } by phone at ${this.state.managerPhone} or by email at ${this.state.managerEmail} .`;

    // axios request to send text notification.
    const textRequest = {
      phoneNumber: this.state.phoneNumber,
      text: message,
    };
    axios
      .post(`${base}/sendsms`, textRequest)
      .then((resp) => {
        console.log('SMS Success! Response from server: ', resp);
      })
      .catch((err) => {
        console.log('Loan creation failed.', err);
      });

    // axios request to send email notification.
    const emailRequest = {
      email: this.state.clientEmail,
      text: message,
    };
    axios
      .post(`${base}/sendemail`, emailRequest)
      .then(() => {
        window.location = '/open_loans';
      })
      .catch((err) => {
        console.log('Loan creation failed.', err);
      });
  };

  sendNewLoanDB = (event) => {
    event.preventDefault();

    // Validate user input.
    if (isNaN(this.state.amount)) {
      this.setState({ invalidAmount: true });
      return;
    }
    this.setState({ invalidAmount: false });

    if (this.validateEmail(this.state.clientEmail) === false) {
      this.setState({ invalidEmail: true });
      return;
    }
    this.setState({ invalidEmail: false });

    if(this.state.phoneNumber !== '') {
      if (isNaN(this.state.phoneNumber) || this.state.phoneNumber.length < 10) {
        this.setState({ invalidPhoneNumber: true });
        return;
      }
    }
    this.setState({ invalidPhoneNumber: false });

    const defaults = assignmentDefaults(this.state.loanType);
    const pdefaults = phaseDefaults(this.state.loanType);
    const body = {
      loanManagerId: this.state.loanManagerId,
      clientEmail: this.state.clientEmail,
      loanType: this.state.loanType,
      amount: this.state.amount,
      phases: pdefaults,
      assignments: defaults,
      label: this.state.label,
    };
    axios
      .post(`${base}/newloan`, body)
      .then(() => {
        this.sendNewLoanNotification();
      })
      .catch((err) => {
        throw err;
      });
  }

  // submitNewLoan = (event) => {
  //   this.sendNewLoanDB();
  // };

  handleDropDown = (e) => {
    this.setState({ loanType: e.target.value });
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

    let invalidAmountDiv = null;
    if (this.state.invalidAmount) {
      invalidAmountDiv = <div className="invalid-user-input">*Invalid amount.</div>;
    }

    let invalidEmailDiv = null;
    if (this.state.invalidEmail) {
      invalidEmailDiv = <div className="invalid-user-input">*Invalid email.</div>;
    }

    let invalidPhoneNumberDiv = null;
    if (this.state.invalidPhoneNumber) {
      invalidPhoneNumberDiv = <div className="invalid-user-input">*Invalid Phone Number. Please enter a 10-digit number or keep it blank.</div>;
    }

    return (
      <div className="LoanCreate">
        <Navbar />
        <SidebarNav />
        <div className="BreadCrumb">
          <Breadcrumb>
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem tag="a" href="/open_loans">
              Loans
            </BreadcrumbItem>
            <BreadcrumbItem active>Loan Creation</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="LoanCreate-title-container">
          <h1>Create new Loan</h1>
        </div>
        <div className="LoanCreate-form-container">
          <form>
            <fieldset>
              <legend>Borrower information:</legend>
              Loan Type:
              <select onChange={this.handleDropDown}>
                <option value="new">New Loan</option>
                <option value="refinance">Refinance</option>
                <option value="construction">Construction</option>
              </select>
              <br />
              <br />
              Loan Amount:{' '}
              <input
                type="text"
                name="amount"
                placeholder="$0.00"
                onChange={this.handleAmountChange}
              />
              {invalidAmountDiv}
              <br />
              <br />
              Borrower Email:{' '}
              <input
                type="text"
                placeholder="abc@example.com"
                name="email"
                onChange={this.handleEmailChange}
              />
              {invalidEmailDiv}
              <br />
              <br />
              Borrower Contact No.:{' '}
              <input
                type="text"
                value={this.state.phoneNumber}
                name="contactNo"
                onChange={this.handleSmsChange}
              />
              {invalidPhoneNumberDiv}
              <br />
              <br />
              Custom Label: <input type="text" name="text" onChange={this.handleLabel} />
              <br />
            </fieldset>
          </form>
          <button onClick={this.sendNewLoanDB}>Submit</button>
        </div>
      </div>
    );
  }
}
