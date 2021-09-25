import React, { Component } from 'react';
import { StripeProvider } from 'react-stripe-elements';
import Checkout from './Checkout';

class Billing extends Component {
  
  

  render() {
    return (
      <div>
        <StripeProvider apiKey="pk_test_aXBCDOHhiuIQVztrMnGgmMCW">
          <Checkout eventId={this.props.eventId} />
        </StripeProvider>
      </div>
    );
  }
}

export default Billing;
