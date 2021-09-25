import React from 'react';
import { StripeProvider } from 'react-stripe-elements';
import MyStoreCheckout from './MyStoreCheckout';
import './Stripe.css';

export default function StripeWrapper() {
  return (
    <StripeProvider apiKey="pk_test_THjqroLR8k7aGkq38ZhAiLC9">
      <MyStoreCheckout />
    </StripeProvider>
  );
}
