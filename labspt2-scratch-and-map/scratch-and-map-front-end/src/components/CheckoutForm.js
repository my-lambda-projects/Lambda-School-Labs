import React, { Component } from "react";
import axios from "axios";
import { CardElement, injectStripe } from "react-stripe-elements";
import "../styles/CheckoutForm.css";
import { Container, Button,  } from "semantic-ui-react";
import {Route, Link} from 'react-router-dom'
require("dotenv").config();

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
      options: [],
      stateOptions: [],
      completed: false
    };
  }



async submit(ev) {
  try {
  this.props.stripe.redirectToCheckout({
          items: [{sku: 'sku_EzIHRsK0Gl5QOc', quantity: 1}],
          successUrl: 'https://scratchandmap.club',
          cancelUrl: 'https://scratchandmap.club',
        })
}
  catch(error) {
    console.log("PAYMENT ERROR", error);
  }
}

  render() {
    return (

      <Container>
            <h1>Premium Benefits</h1>
              <ul>
                <li>Track an unlimited amount of country visits</li>
                <li>Create notes of travels</li>
                <li>See Friends visited locations</li>
                <li>App becomes Ad free</li>
                <li>Newest features available to Premium users first</li>
              </ul>
            <Button className="stripe-buttons">Back</Button>
            <Button onClick={this.submit}>Sign up</Button>
      </Container>
       
        
       
     
    );
  }
}

export default injectStripe(CheckoutForm);