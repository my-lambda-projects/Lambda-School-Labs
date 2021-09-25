import React from "react";
import Notifications, {notify} from 'react-notify-toast';
import {
 injectStripe,
 CardNumberElement,
 CardExpiryElement,
 CardCVCElement
} from "react-stripe-elements";
import "../css/stripe.css";
import axios from "axios";

const authToken = localStorage.getItem("authToken");
const id = localStorage.getItem("id");
const config = {
  headers: {
    'Authorization': "Bearer " + authToken

  }
};

class CheckoutForm extends React.Component {

  handleToken = ev => {
    ev.preventDefault();
      this.props.stripe.createToken({ name: "Jenny Rosen" }).then(({ token }) => {
        console.log("Token: ", token);
        axios.post(`https://ishiftr-db.herokuapp.com/api/${id}/charge`, token, config)
        .then(res => {
          notify.show("Thank you for your payment!");
           
        })
        
      });
     
    };



  render() {
    return (
      <div>

              <div className='main mt-4'>
                  <Notifications />
              </div>
         

        <h4 className ='centered'>Enter Your Payment Info Below:</h4>
        <p className = 'centered'>You will only be charged once for lifetime access</p>
        <div className="cardNumber">
            <CardNumberElement className="cardInput" placeholder="CC#" />
            <CardExpiryElement className="cardInput" placeholder="EXP" />
            <CardCVCElement className="cardInput" placeholder="CVV" />
            
            <button className="buybutton" onClick={this.handleToken}>Pay $150</button>
        </div>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);