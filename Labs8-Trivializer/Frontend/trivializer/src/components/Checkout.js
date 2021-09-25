import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import URL from "../URLs";

import STRIPE_PUBLISHABLE from "../constants/stripe";
import PAYMENT_SERVER_URL from "../constants/server";

const CURRENCY = "USD";

const fromEuroToCent = amount => amount * 100;

// let savedUser = JSON.parse(sessionStorage.getItem("userId"));
let savedUser = sessionStorage.getItem("userId");

const successPayment = data => {
  const url = URL.current_URL;
  const paid = { paid: 1 };
  axios
    .put(`${url}/edituser/${savedUser}`, paid, {
      headers: {
        Authorization: `${sessionStorage.getItem("jwt")}`
      }
    })
    .then(res => {
      sessionStorage.setItem("googlepaid", "yes");
      // return if null properties
      return JSON.res;
    })
    .catch(err => {
      console.log("err.response: ", err.response);
    });
  alert("Payment Successful");
  sessionStorage.setItem("status", 1);
};

const errorPayment = data => {
  alert("Payment Error");
};

const onToken = (amount, description) => token => {
  console.log(description, token.id, CURRENCY, fromEuroToCent(amount));
  axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromEuroToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment);
};
const Checkout = ({ name, description, amount }) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromEuroToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />
);

export default Checkout;
