import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const CURRENCY = "USD";



class Checkout extends React.Component {

dollarToCent = amount => amount * 100;

successPayment = data => {
  alert("Payment Successful");
};

errorPayment = data => {
  alert("Payment Error" + data);
};

onToken = (amount, description, familyID) => async token => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/stripe`, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: this.dollarToCent(amount)
    });
    await axios.put(
      `${process.env.REACT_APP_API_URL}/family/edit/${familyID}`,
      { isSubscribed: true }
    );
    await this.props.loadAPIProfile()
    this.successPayment();
  } catch (err) {
    this.errorPayment();
  }
};

  render() {
    const { name, description, amount, familyID } = this.props;
    return (
      <StripeCheckout
        name={name}
        description={description}
        amount={this.dollarToCent(amount)}
        token={this.onToken(amount, description, familyID)}
        currency={CURRENCY}
        stripeKey={process.env.REACT_APP_SPK}
      >
        <button>Upgrade Account</button>
      </StripeCheckout>
    );
  }
}
export default Checkout;
