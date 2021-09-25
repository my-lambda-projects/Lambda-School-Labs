import React, { Component } from 'react';
import { PremiumForm, } from '../../presentation/presentation.js';
import { Elements, StripeProvider, } from 'react-stripe-elements';
import './style/css/Billing.css';

class Billing extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

  }

  render() {
    return (
      <div className='billing-container'>
        <StripeProvider className='billing-container' apiKey='pk_test_5S7b3sU9cayM2p0lyZCGZR5e00mmeHbCML'>

          <Elements>
          <PremiumForm />
          </Elements>
        </StripeProvider>
      </div>
    );
  }

}

export default Billing;
