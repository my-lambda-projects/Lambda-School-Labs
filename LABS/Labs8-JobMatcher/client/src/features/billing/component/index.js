import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "../container";

class Billing extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_cBTAEriVzEf6Qiniho2pKzuj">
        <div>
          {/* <h1>Billing Page</h1> */}
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default Billing;
