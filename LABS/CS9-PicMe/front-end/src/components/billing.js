import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import { connect } from 'react-redux';
import { Alert } from "react-bootstrap";

import BillingForm from "./billingform";
import { buyCredits } from '../actions';
import "./css/billing.css";

class Settings extends Component {

  state = {
    isLoading: false,
    showSuccessMessage: false
  };

  handleOnDismiss = () => {
    this.setState({ showSuccessMessage: false });
  }

  handleFormSubmit = (credits, { token, error }) => {
    if (error) {
      alert(error);
      return;
    }

    this.setState({ isLoading: true });

    try {
      this.props.buyCredits({
        currentUserEmail: localStorage.getItem('email'), 
        credits,
        stripeTokenId: token.id
      });
    } catch (e) {
      alert(e);
    }
    this.setState({ isLoading: false, showSuccessMessage: true });

    setTimeout(() => {
      this.setState({showSuccessMessage: false})
    }, 2500) //Clears green success message after 2.6 seconds
  }

  render() {
    return (
      <div className="Settings">
        { this.state.showSuccessMessage ?
        <Alert bsStyle="success" onDismiss={this.handleOnDismiss}> 
          Your purchase was successful
        </Alert> : null }
        <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
          <Elements>
            <BillingForm
              loading={this.state.isLoading}
              onSubmit={this.handleFormSubmit}
            />
          </Elements>
        </StripeProvider>
      </div>
    );
  }
}

export default connect(null, { buyCredits })(Settings);
