// MyStoreCheckout.js
import React from 'react';
import { Elements } from 'react-stripe-elements';

import BillingForm from './BilingForm';

class Billing extends React.Component {
  render() {
    return (
      <Elements>
        <BillingForm />
      </Elements>
    );
  }
}

export default Billing;
