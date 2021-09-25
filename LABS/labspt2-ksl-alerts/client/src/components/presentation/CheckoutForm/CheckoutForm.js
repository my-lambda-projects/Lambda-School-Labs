import React from 'react';
import axios from 'axios';
import { CardElement, injectStripe, } from 'react-stripe-elements';
import Axios from 'axios';

import { appUrl } from '../../../constants.js';

const CheckoutForm = props => {

  const submit = e => {
    e.preventDefault();

    const { username, email, } = props.user;
    const authType = props.authorization.type;

    props.stripe.createToken({ name: 'Jenny Rosen', })
      .then(({ token, }) => {
    
        axios({
          method: 'post',
          url: appUrl + '/api/users/payment',
          headers: {
            'Authorization': props.authorization.token
          },
          data: {
            authType,
            username,
            email,
            tokenId: token.id,
          },
        }).then(res => {

          console.log(res.data);

        }).catch(console.log);

      }).catch(console.log);
    
  }

  return (
    <div className='checkout'>
      <p>Would you like to complete the purchase?</p>
      <CardElement />
      <button onClick={ submit }>Send</button>
    </div>
  );
}

export default injectStripe(CheckoutForm);