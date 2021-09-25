import React, { Component } from "react";
import PropTypes from "prop-types";
import { CardElement, injectStripe } from "react-stripe-elements";
import { Button } from "reactstrap";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false
    };
  }

  submit = async ev => {
    let { token } = await this.props.stripe.createToken();
    if (token) {
      this.props.processPayment({
        token: token.id,
        id: this.props.id
      });

      this.setState({
        complete: true
      });
    } else {
      return;
    }
  };

  render() {
    if (this.state.complete || this.props.premiumUser) {
      return (
        <div className="billing-status">
          <h3>Premium status obtained.</h3>
        </div>
      );
    }
    return (
      <div className="checkout">
        <p className="checkout-text">Purchase Premium status for only $8.99</p>
        <CardElement className="card-element" />
        <Button className="submit-btn" size="sm" onClick={this.submit}>
          Process Payment
        </Button>
      </div>
    );
  }
}

CheckoutForm.propTypes = {
  stripe: PropTypes.object
};

export default injectStripe(CheckoutForm);
