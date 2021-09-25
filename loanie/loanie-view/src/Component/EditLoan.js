import React, { Component } from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import base from './base';
// import { connect } from 'react-redux';
import Navbar from './Navbar';
import SidebarNav from './SideBarNav';
import '../CSS/EditLoan.css';

class EditLoan extends Component {
  constructor() {
    super();
    this.state = {
      tokenId: sessionStorage.getItem('tokenId'),
      clientEmail: '',
      amount: '',
      loanType: '',
      currentStatus: '',
      openLoan: '',
      loanId: '',
      label: '',
    };
  }

  componentWillMount() {
    const getLoanId = window.location.href;
    const id = getLoanId.split('/').pop();
    axios
      .get(`${base}/loan/${id}`)
      .then((res) => {
        this.setState({
          clientEmail: res.data.clientEmail,
          amount: res.data.amount,
          loanType: res.data.loanType,
          currentStatus: res.data.currentStatus,
          openLoan: res.data.openLoan,
          loanId: id,
          label: res.data.label,
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

  handleDropDownType = (e) => {
    this.setState({ loanType: e.target.value });
  };

  handleDropDownOpen = (e) => {
    this.setState({ openLoan: e.target.value });
  };

  handleDropDownPhase = (e) => {
    this.setState({ currentStatus: e.target.value });
  };

  handleLabel = (e) => {
    this.setState({ label: e.target.value });
  };

  phaseDropDown() {
    const type = this.state.loanType;
    if (type === 'new') {
      return (
        <select value={this.state.currentStatus} onChange={this.handleDropDownPhase}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      );
    } else if (type === 'construction') {
      return (
        <select value={this.state.currentStatus} onChange={this.handleDropDownPhase}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
      );
    } else if (type === 'refinance') {
      return (
        <select value={this.state.currentStatus} onChange={this.handleDropDownPhase}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      );
    }
    return (
      <select value={this.state.currentStatus} onChange={this.handleDropDownPhase}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    );
  }

  submitEditedLoan = () => {
    const id = this.state.loanId;
    const body = {
      currentStatus: this.state.currentStatus,
      openLoan: this.state.openLoan,
      clientEmail: this.state.clientEmail,
      loanType: this.state.loanType,
      amount: this.state.amount,
      label: this.state.label,
    };
    axios
      .post(`${base}/loan/${id}`, body)
      .then(() => {
        window.location = '/open_loans';
      })
      .catch((err) => {
        throw err;
      });
  };

  render() {
    // getter
    const token = this.state.tokenId;
    if (token === null || token === undefined || token === '') {
      window.location = '/login_user';
      return (
        <div>
          <h1> Please Login</h1>
        </div>
      );
    }

    return (
      <div className="EditLoan">
        <SidebarNav />
        <Navbar />
        <div className="BreadCrumb">
          <Breadcrumb>
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem tag="a" href="/open_loans">
              Loans
            </BreadcrumbItem>
            <BreadcrumbItem active>Edit Loan</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="EditLoan-title-container">
          <h1>Edit Loan</h1>
        </div>
        <div className="EditLoan-form-container">
          <form>
            <fieldset>
              <legend>Confirm Client Email Before Editing: {this.state.clientEmail} </legend>
              Edit Loan Type:
              <select value={this.state.loanType} onChange={this.handleDropDownType}>
                <option value="new">New Purchase</option>
                <option value="refinance">Refinance</option>
                <option value="construction">Construction</option>
              </select>
              <br />
              <br />
              Edit Phase:
              {this.phaseDropDown()}
              <br />
              <br />
              Edit Loan Open Status:
              <select value={this.state.openLoan} onChange={this.handleDropDownOpen}>
                <option value="true">Open</option>
                <option value="false">Closed</option>
              </select>
              <br />
              <br />
              Edit Loan Amount:{' '}
              <input
                type="text"
                name="amount"
                value={this.state.amount || ''}
                onChange={this.handleAmountChange}
              />
              <br />
              <br />
              Custom Label:{' '}
              <input
                type="text"
                name="text"
                value={this.state.label || ''}
                onChange={this.handleLabel}
              />
              <br />
            </fieldset>
          </form>
          <button onClick={this.submitEditedLoan}>Submit</button>
        </div>
      </div>
    );
  }
}

export default EditLoan;
