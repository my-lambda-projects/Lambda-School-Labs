import React from 'react';
import { Elements } from 'react-stripe-elements';
import InjectedCheckoutForm from '../Billing';

export default function MyStoreCheckout() {
  return (
    <Elements>
      <InjectedCheckoutForm />
    </Elements>
  );
}
