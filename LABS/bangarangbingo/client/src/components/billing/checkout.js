import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';
import Form from './form';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }
  render() {
    return (
      <div className="checkoutForm">
        <Elements>
          <Form />
        </Elements>
      </div>
    );
  }
}

export default Checkout;
