import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./checkoutForm";
import { connect } from "react-redux";
import { subscribe } from "../../actions";
import HPnav from "../nav/company/HPnav";

class Billing extends Component {
  render() {
    return (
      <div>
        <HPnav />
        <StripeProvider apiKey="pk_test_1p5B423kMIc50yASX6BjZtio">
          <div className="billing">
            <Elements>
              <CheckoutForm />
            </Elements>
          </div>
        </StripeProvider>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { subscribe }
)(Billing);
