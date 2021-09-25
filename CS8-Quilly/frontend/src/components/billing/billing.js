import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';
import CheckoutForm from './checkoutform';
import BillingLogo from '../../img/Billing.svg';

import './billing.css';

class Billing extends Component {
  render() {
    return (
      <div className="billingBody">
        <div className="billingContainer">
          <div className="paymentInfo">
            <h4>Payment Info</h4>
            <Elements>
              <CheckoutForm />
            </Elements>
          </div>
          <div className="planDetails">
            <img src={BillingLogo} className="billingImg" alt="billingImg"/>
            <h4 id="basicTitle">Basic Plan</h4>
            <p>Support the developers!</p>
            <p>We recommend getting started with Basic plan for $4.99 per month!</p>
            <div className="pricing">
              <h3>$4.99</h3><h5>/ mo</h5>
            </div>
            <p>This plan gives you access to all features that Quilly.io has to offer.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Billing;
