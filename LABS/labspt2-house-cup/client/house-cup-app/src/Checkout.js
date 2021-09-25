// import STRIPE_PUBLISHABLE from './constants/stripe';
// import PAYMENT_SERVER_URL from './constants/server';

import React, { Component } from 'react';
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import cup from './images/images.jpg';
import auth from './utils/Auth.js';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
       isPaidMember: false,
       key: "pk_test_WyufeHp9FTBavFWAOUqK0icx00EoXVThGt"
      }
   }

  changeMember = () => {
     this.props.member();
  } 
  onToken = (token) => {
      
    const { getAccessToken } = auth;
    const headers = { Authorization: `Bearer ${getAccessToken()}` };
    const body = { amount: 1999,  token: token };
    axios.post("http://localhost:5000/payment", body)
         .then(response => {
          console.log(response);
          console.log(response.data.success.id)
          alert("Payment Success");
          // Updating payment details in user db
                  if(response.data.success.id) {
                        axios.patch(`http://localhost:5000/users/updatebill`, {isAdmin:true}, {headers})
                              .then( user => {
                                  console.log(`Line 31 checkout:`, user)
                                  this.setState({
                                     isPaidMember:true
                                  });
                                  this.changeMember();
                              })
                              .catch(err => {
                                  console.log(`Line 43 checkout:`, err)
                              })
                  } else {
                      console.log(`Checkout line 37: You need to make payment`)
                  }
        })
        .catch(error => {
          console.log("Payment Error: ", error);
          alert("Payment Error");
        });
  };
  
  render() {
    return (
       <StripeCheckout  label="Go Premium" //Component button text
                        name="House-Cup" //Modal Header
                        description="Upgrade to a premium account today."
                        panelLabel="Go Premium" //Submit button in modal
                        amount={1999} //Amount in cents $9.99
                        token={this.onToken}
                        image={cup}
                        stripeKey={this.state.key}      
                        billingAddress={false}
        />
    );
  }
}

export default Checkout;