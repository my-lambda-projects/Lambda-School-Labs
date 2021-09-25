import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import Checkout from './Checkout';
import NavBar from '../NavBar';
import TopHeader from '../TopHeader';

import Auth from '../Authenication/Auth';

import './Billing.css';

class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Billing">
        <TopHeader breadcrumb={['billing']} username={this.props.username} />
        <NavBar />
        <div className="Billing-details">
          <StripeProvider apiKey="pk_test_tYvByOjo3u4ZLzcoJYTe4NHT">
            <Elements>
              <Checkout />
            </Elements>
          </StripeProvider>
        </div>
      </div>
    );
  }
}

export default Auth(Billing);
