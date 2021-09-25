import React, { Component } from "react";

import { StripeProvider } from "react-stripe-elements";

import BillingStoreCheckout from "../Organisms/BillingStoreCheckout";

import {
  BillingContainer,
  StripeContainer,
  BillingHeader,
} from "../../styles/Billing.js";
import { Segment } from "semantic-ui-react";

// StripeProvider gives us access to the Stripe Object
// i.e Stripe.createToken, stripe.elements() etc
// App loads the stripe script asynchronously in CDM

class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = { stripe: "" };
  }
  componentDidMount() {
    if (window.Stripe) {
      this.setState({
        stripe: window.Stripe(process.env.REACT_APP_publishable),
      });
    } else {
      document.querySelector("#stripe-js").addEventListener("load", () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({
          stripe: window.Stripe(process.env.REACT_APP_publishable),
        });
      });
    }
  }

  render() {
    return (
      <BillingContainer>
        <BillingHeader>Billing</BillingHeader>
        <StripeContainer>
          <Segment>
            {this.state.stripe ? (
              <StripeProvider stripe={this.state.stripe}>
                <BillingStoreCheckout />
              </StripeProvider>
            ) : null}
          </Segment>
        </StripeContainer>
      </BillingContainer>
    );
  }
}

export default Billing;
