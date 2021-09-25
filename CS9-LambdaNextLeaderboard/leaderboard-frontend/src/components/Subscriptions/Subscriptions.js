import React from 'react';
import {StripeProvider} from 'react-stripe-elements';
import MyStoreCheckout from './MyStoreCheckout';
import STRIPE_PUBLISHABLE from './Stripe';

const Subscriptions = () => {
    return (
        <StripeProvider apiKey={STRIPE_PUBLISHABLE}>
          <MyStoreCheckout />
        </StripeProvider>
    );
};

export default Subscriptions;
