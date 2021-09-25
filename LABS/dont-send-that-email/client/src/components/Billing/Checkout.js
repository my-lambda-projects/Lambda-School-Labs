import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { UncontrolledAlert } from "reactstrap";
const PAYMENT_SERVER_URL = process.env.REACT_APP_BACKEND_URL + "/billing";
const STRIPE_PUBLISHABLE = process.env.REACT_APP_STRIPE_API_PUBLISH_KEY;

const CURRENCY = "USD";

// All API requests expect amounts to be provided in a currency’s smallest unit.
// For example, to charge $10 USD, provide an amount value of 1000 (i.e, 1000 cents).
class CheckoutComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentState: 0
    };
  }
  fromUSDToCent = amount => amount * 100;
  successPayment = data => {
    window.location.reload();
  };

  errorPayment = data => {
    this.setState({ componentState: 1 });
  };
  subscriptionAlert = () => {
    if (this.state.componentState === 1) {
      return (
        <UncontrolledAlert
          color={"danger"}
          onClick={() => this.resetComponentState()}
          className="mt-2"
        >
          "Something went wrong while trying to process payment."
        </UncontrolledAlert>
      );
    }
    return null;
  };
  resetComponentState = () => {
    this.setState({ componentState: 0 });
  };
  onToken = (amount, description) => token =>
    axios
      .post(
        PAYMENT_SERVER_URL,
        {
          description,
          source: token.id,
          currency: CURRENCY,
          amount: this.fromUSDToCent(amount)
        },
        { withCredentials: true }
      )
      .then(this.successPayment)
      .catch(this.errorPayment);

  Checkout = () => (
    <StripeCheckout
      name={this.props.name}
      description={this.props.description}
      amount={this.fromUSDToCent(this.props.amount)}
      token={this.onToken(this.props.amount, this.props.description)}
      currency={CURRENCY}
      stripeKey={STRIPE_PUBLISHABLE}
    >
      <button className="btn btn-danger btn-round ml-3">
        Subscribe 30 Days
      </button>
    </StripeCheckout>
  );
  render() {
    return (
      <div>
        {this.subscriptionAlert()}
        {this.Checkout()}
      </div>
    );
  }
}
export default CheckoutComponent;
