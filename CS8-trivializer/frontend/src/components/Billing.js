import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import axios from "axios";
import { signOut} from '../actions';


import {
  BillingWrapper,
  BillingLabel,
  BillingTitle,
  BillingButton,
  BillingRadio,
  LogOut
} from "./primitives/Billing";

const tier1Price = 999;
const tier2Price = 2999;

class Billing extends Component {
  state = {
    quantity: 1,
    description: "Test",
    tier: "No Tier Selected"
  };

  toggleRadioButton = ev => {
    console.log(ev.target.value);
    this.setState({ type: ev.target.value });
  };

  updateQuantity = ev => {
    this.setState({ quantity: ev.target.value });
  };

  logOut = async event => {
    await this.props.signOut();
    this.props.history.push("/")
  }

  render() {
    console.log(this.state.type);

    return (
      <BillingWrapper className="Billing">
      
      <LogOut><h1 onClick={(e)=> {this.logOut(e)}}> LOG OUT </h1></LogOut>


        <BillingTitle>Billing</BillingTitle>
        <BillingTitle>Upgrade your game below!</BillingTitle>
        <form>
          <BillingRadio className="radio">
            <BillingLabel className="billing-label">
              <input
                type="radio"
                value="tier1"
                checked={this.state.type === "tier1"}
                onChange={this.toggleRadioButton}
              />
              Basic Tier (create up to 10 games with 10 rounds of 10 questions)
            </BillingLabel>
          </BillingRadio>
          <BillingRadio className="radio">
            <BillingLabel className="billing-label">
              <input
                type="radio"
                value="tier2"
                checked={this.state.type === "tier2"}
                onChange={this.toggleRadioButton}
              />
              Premium Tier (Unlimited games, rounds, questions)
            </BillingLabel>
          </BillingRadio>
        </form>
        {this.checkoutButton()}
      </BillingWrapper>
    );
  }

  checkoutButton = () => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    const email = decoded.email;
    const orgName = decoded.orgName;
    const userId = decoded.sub;

    const { description } = this.state;
    let amount = null;
    if (this.state.type === "tier1") {
      amount = tier1Price;
    } else if (this.state.type === "tier2") {
      amount = tier2Price;
    }

    return (
      <StripeCheckout
        name={`Trivializer ${this.state.type} Purchase`}
        email={email}
        allowRememberMe={false}
        description={description}
        amount={amount}
        token={this.onToken(amount, description)}
        currency="USD"
        stripeKey={process.env.STRIPE_PK || "pk_test_6Il0D2PIhZrVUAjYbIW8ePpR"}
      >
      </StripeCheckout>
    );
  };

  onToken = (amount, description) => token => {
    const localToken = localStorage.getItem("token");
    const decoded = jwt_decode(localToken);
    const userId = decoded.sub;
    axios
      .post("http://localhost:5000/api/charge", {
        description,
        source: token.id,
        currency: "USD",
        amount,
        userId
      })
      .then(res => {
        alert("Payment successful");
        // this.props.updateUser(res.data.user);
        console.log(res);
      })
      .catch(data => {
        alert("Payment declined");
        console.log(data);
      });
  };
}
const mapStateToProps = state => {
  return {
    errorMessage: state.auth.errorMessage
  };
};

export default connect(
  mapStateToProps,
  {signOut}
)(withRouter(Billing));