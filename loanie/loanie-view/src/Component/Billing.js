import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import base from './base';
import Navbar from './Navbar';
import SidebarNav from './SideBarNav';
import '../CSS/Billing.css';

class Billing extends Component {
  // have to use camel case method proptypes not the one from import
  propTypes = {
    stripe: PropTypes.func,
    createToken: PropTypes.func,
  };
  constructor() {
    super();
    this.state = {
      stripeToken: '',
      name: '',
      loanPlan: 'Full Year Subscription',
      email: '',
    };
  }

  getBillingRoute = () => {
    if (sessionStorage.getItem('userType') === 'managerUser') {
      return '/open_loans';
    }
    return '/my_loans';
  };

  getUserId = () => {
    const info = { email: this.state.email };
    axios
      .post(`${base}/userbyemail`, info)
      .then((res) => {
        console.log('found ID', res.data.UID);
        this.elevateUser(res.data.UID);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  sendStripeToken() {
    const body = {
      loanPlan: this.state.loanPlan,
      stripeToken: this.state.stripeToken,
      email: sessionStorage.getItem('email'),
    };
    axios
      .post(`${base}/stripe`, body)
      .then((res) => {
        console.log('Response from server: ', res);
        this.getUserId();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  elevateUser = (id) => {
    let subDate = '';
    if (this.state.loanPlan === 'Full Year Subscription') {
      subDate = moment(Date.now())
        .add(1, 'years')
        .format('MMMM Do YYYY, h:mm:ss a');
    }

    // comment to test expiration
    if (this.state.loanPlan === 'Single Loan') {
      subDate = moment(Date.now())
        .add(30, 'days')
        .format('MMMM Do YYYY, h:mm:ss a');
    }

    // uncomment to test expiration
    // if (this.state.loanPlan === 'Single Loan') {
    //   subDate = moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a');
    // }

    console.log(subDate);
    let type;
    if (sessionStorage.getItem('email') === this.state.email) {
      type = 'managerUser';
    } else {
      type = sessionStorage.getItem('userType');
    }

    const userInfo = {
      token: id,
      userType: type,
      subExp: subDate,
    };

    console.log('sending to db:', userInfo);
    axios
      .post(`${base}/edituser`, userInfo)
      .then((res) => {
        console.log('Success response: ', res);
        console.log('email', sessionStorage.getItem('email'), 'elevate email', this.state.email);
        console.log('current user type', sessionStorage.getItem('userType'));
        if (sessionStorage.getItem('email') === this.state.email || sessionStorage.getItem('userType') === 'managerUser') {
          sessionStorage.setItem('userType', 'managerUser');
          window.location = '/open_loans';
        } else {
          window.location = '/my_loans';
        }
      })
      .catch((err) => {
        console.log('Failed to make changes to user!', err);
      });
  };

  handleOptionChange = (e) => {
    this.setState({ loanPlan: e.target.value });
  };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleSubmit = (e) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    e.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({ name: this.state.name }).then(({ token }) => {
      this.setState({ stripeToken: token });
      this.sendStripeToken();
    });
  };

  render() {
    return (
      <div className="Billing">
        <Navbar />
        <div className="BreadCrumb">
          <Breadcrumb>
            <BreadcrumbItem tag="a" href="/">
              Home
            </BreadcrumbItem>
            <BreadcrumbItem tag="a" href={this.getBillingRoute()}>
              Loans
            </BreadcrumbItem>
            <BreadcrumbItem active>Billing</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="Billing-title-containter">
          <div className="Billing-form-container">
            <form>
              <fieldset>
                <legend>Select a Plan:</legend>
                <input
                  type="radio"
                  value="Full Year Subscription"
                  checked={this.state.loanPlan === 'Full Year Subscription'}
                  onClick={this.handleOptionChange}
                />
                Full Year Subscription - $99.99
                <br />
                <input
                  type="radio"
                  value="Single Loan"
                  checked={this.state.loanPlan === 'Single Loan'}
                  onClick={this.handleOptionChange}
                />
                One Month - $9.99
                <br />
                <br />
                <legend>Credit/Debit Card Details: </legend>
                Name as it appears on card:{' '}
                <input type="text" name="name" onChange={this.handleNameChange} />
              </fieldset>
              <CardElement />
              <br />
              <legend>Email Address Of The User To Be Granted Loan Officer Privileges: </legend>
              Email Address: <input type="text" name="email" onChange={this.handleEmailChange} />
              <button onClick={this.handleSubmit}>Submit</button>
            </form>
          </div>
        </div>
        <SidebarNav />
      </div>
    );
  }
}

export default injectStripe(Billing);
