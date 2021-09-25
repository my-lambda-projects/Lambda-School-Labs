import React from 'react';

import { injectStripe, CardElement } from 'react-stripe-elements';
import axios from 'axios';
import './Checkout.css';
import Auth from '../Authenication/Auth';
import { Capitalize } from '../../utils/helper/helperFuncions'

const dev = process.env.REACT_APP_DEV;
const URL = process.env.REACT_APP_URL;
let headers;

class Checkout extends React.Component {
  state = {
    resp_message: '',
    card_errors: '',
    amount: '',
  };

  handleCardErrors = (card_dets) => {
    console.log('Card Section dets', card_dets);
    if (card_dets.error) {
      this.setState({ card_errors: card_dets.error.message });
    } else {
      this.setState({ card_errors: '' });
    }
  };

  handleChange = (event) => {
    this.setState({
      amount: event.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.amount === '') {
      alert('Please make selection');
      return;
    }
    this.setState({ card_errors: '', resp_message: '' });
    /*
    Within the context of Elements, this call to createToken knows which
    Element to tokenize, since there's only one in this group.
    */
    return (
      this.props.stripe
        // Name needs to be dynamic as well depending on user
        .createToken({ type: 'card', name: this.props.username })
        .then((result) => {
          if (result.error) {
            dev ? console.log('THERE IS AN ERROR IN YOUR FORM', result.error) : console.log();
            return this.setState({ card_errors: result.error.message });
          }
          dev ? console.log('Received Stripe token ---> SENDING TO SERVER: ', result.token) : console.log();
          const formData = new FormData();
          formData.append('description', "Best Flight Logger Ever");
          formData.append('currency', 'usd');
          formData.append('amount', this.state.amount);
          formData.append('source', result.token.id);
          // need to create endpoint on django
          return fetch(`${URL}api/create-charge/`, {
            method: 'POST',
            headers: {
              accept: 'application/json',
            },
            body: formData,
          })
            .then(resp => resp.json())
            .then(json => this.setState({ resp_message: `${Capitalize(this.props.username)}: ${json.message}` }))
            .then(
              axios({
                method: 'POST',
                url: `${URL}api/billing/`,
                data: {
                  premium: true,
                },
                headers,
              }),
            )
            .then(localStorage.setItem('premium', true));
        })
    );
  };

  render() {
    headers = {
      Authorization: `JWT ${localStorage.getItem('token')}`,
    };
    return (
      <div className="Checkout">
        <div className="Checkout-card">
          <div className="Checkout-CardText">{this.state.resp_message}</div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <div className="Payment-info">Card Details</div>
              <CardElement onChange={this.handleCardErrors} />
              <div role="alert">
                <div className="danger">{this.state.card_errors}</div>
              </div>
            </label>

            <div className="radio" onClick={this.handleMonthly}>
              <label className="Subscription">
                <input
                  type="radio"
                  className="radio-selection form-control"
                  value="499"
                  checked={this.state.amount === '499'}
                  onChange={this.handleChange}
                />
                <span className="Subscription-text">1-Time Payment: $4.99</span>
              </label>
            </div>
       
            <button className="form-btn">Confirm order</button>
          </form>
        </div>
      </div>
    );
  }
}

// The injectStripe HOC provides the this.props.stripe property
// You can call this.props.stripe.createToken within a component that has been
// injected in order to submit payment data to Stripe.
export default Auth(injectStripe(Checkout));
