import React from 'react';
import { Elements } from 'react-stripe-elements';

import CardForm from './CardForm';

const Checkout = (props) => {
  return (
    <Elements>
      <CardForm state={props} />
    </Elements>
  );
};
export default Checkout;
