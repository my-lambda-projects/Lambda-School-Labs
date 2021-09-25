import React, { Component } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import {
  CardElement,
  injectStripe,
} from 'react-stripe-elements';
import axios from 'axios';

import './stripeform.css'

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3030';

const errorPayment = data => {
  alert('Payment Error');
};

class _StripeForm extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      userPledge: null,
      customerID: null,
      subscriptionID: null,
      voted: null,
    }
    this.nextPage = this.nextPage.bind(this);
  }

  // the following function sets the user's pledge amount to the incoming prop from the pledge component

  componentDidMount(newProps){
    this.setState(() => ({ userPledge: this.props.userPledge }));
  }

  // the following code generates a stripe token when the form is submitted

  handleSubmit = ev => {
    ev.preventDefault();
    this.props.onSubmit();
    this.props.stripe.createToken().then(payload => {
      if (payload.token) {
        this.onToken(payload.token);
      }
    });
  };

  // the following code creates a new customer in the stripe database and updates the state with the returned data

  onToken = (token) => {
    axios.post(`${SERVER_URL}/create-stripe-customer`,
      {
        description: 'numberlesssetup',
        source: token.id,
        email: document.getElementById('email').value,
      })
      .then(createdCustomer => {
        this.setState(() => ({ 
          email: createdCustomer.data.email,
          customerID: createdCustomer.data.id,
          password: document.getElementById('pass').value,
        }));
        this.addSubscription();
      })
      .catch(errorPayment);
  };

  //the following code adds a subscription to the user's stripe billing

  addSubscription = () => {
    let product = null;
    if (this.state.userPledge === 50) {
      product = process.env.REACT_APP_STRIPE_PLAN_50;
    } 
    if (this.state.userPledge === 25) {
      product = process.env.REACT_APP_STRIPE_PLAN_25;
    } 
    if (this.state.userPledge === 10) {
      product = process.env.REACT_APP_STRIPE_PLAN_10;
    } 
    axios.post(`${SERVER_URL}/create-stripe-subscription`,
      {
        customer: this.state.customerID,
        items: [
          {
            plan: product,
          }
        ]
      })
      .then(createdSubscription => {
        this.setState(() => ({
          subscriptionID: createdSubscription.data.id,
        }));
        this.createUser();
      })
  }

  // the following code creates a new user in the numberless database, then upon creation moves the user to the 
  // voting page, setting sessionStorage and a cookie, it also sets a timeout for the push to the next page
  // for the loading animation

  timer;

  start() {
    this.timer = setTimeout(this.nextPage, 2000);
  }

  nextPage() {
    this.props.history.push('voting');
  }

  createUser = () => {
    const {
      email,
      password,
      customerID,
      userPledge,
      subscriptionID,
      voted
    } = this.state;
    axios.post(`${SERVER_URL}/create-user`,
    {
      email: email,
      password: password,
      customerID: customerID,
      userPledge: userPledge,
      subscriptionID: subscriptionID,
      voted: voted
    })
    .then(createdUser => {
      if (createdUser.data._id) {
        console.log(this.props.loadFinish);
        sessionStorage.setItem('user', createdUser.data._id);
        sessionStorage.setItem('loggedIn', 'true');
        this.start();
      }
    })
  }

  render() {
    const style = this.props.windowSize < 500 ? { 
      base: {
        fontFamily: '"Open Sans", sans-serif',
        fontSize: '.9rem',
      } 
    } : {
      base: {
        fontFamily: '"Open Sans", sans-serif',
        fontSize: '1.1rem',
      }
    }
    return (
      <div className="formBox">
        <Form>
            <FormGroup>
              <Input className="input" type="email" name="email" id="email" placeholder="Email"/>
            </FormGroup>
            <FormGroup>
              <Input className="input" type="password" name="password" id="pass" placeholder="Password"/>
            </FormGroup>
            <CardElement className='stripeInput' style={ style }/>
          <Button className="stripeButton" onClick={this.handleSubmit}>
            Submit
          </Button>
        </Form>
        <a href="https://stripe.com/" target="_blank" rel="noopener noreferrer">
          <img className="stripeLogo" src={require('../static/powered_by_stripe.png')} alt="Stripe" />
        </a>
      </div>
    );
  }
}
const StripeForm = injectStripe(_StripeForm);

export default StripeForm;