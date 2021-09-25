import React, { Component } from "react";
import CheckoutForm from "./CheckoutForm";
import { Elements, StripeProvider } from "react-stripe-elements";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { processPayment } from "../actions";
import { TweenLite } from "gsap";

class Billing extends Component {
  constructor(props) {
    super(props);

    this.myTween = null;
    this.animateBilling = null;
  }

  componentDidMount() {
    this.myTween = TweenLite.from(this.animateBilling, 1, { y: 100, opacity: 0});
  }

  render() {
    return (
      <div className="billing-outer" ref={div => this.animateBilling = div}>
        <div className="billing-container">
          <div className="billing-inner">
            {/* Note: The client and server Stripe api keys are two separate keys. This api key is a publishable key which is why I'm comfortable committing it for now, it is also a test key and will also need to be replaced in production */}
            <StripeProvider apiKey="pk_test_cHtCbIjlhDr11p9OdysyIN9P">
              <Elements>
                <CheckoutForm
                  id={this.props.userInfo.user._id}
                  // !! Experimental patch !!
                  premiumUser={
                    this.props.premiumUser ||
                    this.props.userInfo.user.premiumUser
                  }
                  processPayment={this.props.processPayment}
                />
              </Elements>
            </StripeProvider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.auth.currentUser,
    premiumUser: state.user.premiumUser
  };
};

Billing.propTypes = {
  userInfo: PropTypes.shape({
    token: PropTypes.string,
    user: PropTypes.object
  }),
  premiumUser: PropTypes.bool,
  processPayment: PropTypes.func
};

export default connect(
  mapStateToProps,
  { processPayment }
)(Billing);
