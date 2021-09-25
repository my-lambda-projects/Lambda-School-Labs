import React from 'react';
import './styles/SettingsView.sass';
import SettingsViewForm from './SettingsViewForm.js';
import StripeBtn from './StripeBtn';

const SettingsView = () => (
  <div className="main settingsView">
    <SettingsViewForm />
    <div className="stripe-checkout-container">
      <h1>Stripe Checkout</h1>
      <StripeBtn />
    </div>
  </div>
);

export default SettingsView;
