import "./billing.css";
import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./checkoutForm";
import { connect } from "react-redux";
import { getClasses } from "./../../actions";
const {PUBLISH_KEY} = require('./config');


class Billing extends Component {
  componentDidMount() {
    this.props.getClasses()
  }
  render() {
    return (
      <div className="billing">
      <StripeProvider apiKey={PUBLISH_KEY}>
        <div className="example">
          <div className="billing_title">Payment Info</div>
          <Elements className="elements">
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
  };
};

export default 
  connect(
    mapStateToProps,
    { getClasses }
  )(Billing)
;


