import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import ROOT_URL from './config';
import { Button } from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog';

export default class Billing extends React.Component {
  onTokenSingleDecision = token => {
    let subscribe = false;
    axios
      .post(`${ROOT_URL}/billing`, { token, email: token.email, subscribe })
      .then(res => {
        return this.dialog.showAlert(res.data.msg);
      })
      .catch(err => {
        return this.dialog.showAlert(err);
      });
  };

  onTokenSubscribe = token => {
    let subscribe = true;
    axios
      .post(`${ROOT_URL}/billing`, { token, email: token.email, subscribe })
      .then(res => {
        return this.dialog.showAlert(res.data.msg);
      })
      .catch(err => {
        return this.dialog.showAlert(err);
      });
  };

  // ...

  render() {
    return (
      // ...
      <div className="BillingWrapper">
        <Dialog
          ref={el => {
            this.dialog = el;
          }}
        />
        <h1 className="display-4">Billing</h1>
        <div className="container">
          <Button className="btn btn-primary">
            <StripeCheckout
              name="Jobseekr" // the pop-in header title
              description="Single Decision" // the pop-in header subtitle
              ComponentClass="div"
              panelLabel="Single Decision" // prepended to the amount in the bottom pay button
              amount={199} // cents
              currency="USD"
              stripeKey="pk_test_CLch1llaqkMyrh2vohpoGmu7"
              locale="auto"
              // Note: Enabling either address option will give the user the ability to
              // fill out both. Addresses are sent as a second parameter in the token callback.
              // shippingAddress
              billingAddress={false}
              // Note: enabling both zipCode checks and billing or shipping address will
              // cause zipCheck to be pulled from billing address (set to hipping if none provided).
              zipCode={false}
              //alipay // accept Alipay (default false)
              //bitcoin // accept Bitcoins (default false)
              allowRememberMe // "Remember Me" option (default true)
              token={this.onTokenSingleDecision} // submit callback
              opened={this.onOpened} // called when the checkout popin is opened (no IE6/7)
              closed={this.onClosed} // called when the checkout popin is closed (no IE6/7)
              // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
              // you are using multiple stripe keys
              reconfigureOnUpdate={false}
              // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
              // useful if you're using React-Tap-Event-Plugin
              triggerEvent="onClick"
            >
              <div>
                <div>
                  <h2>Single Decision</h2>
                  <p>You can choose to pay for one decision for 2 dollars.</p>
                </div>
              </div>
            </StripeCheckout>{' '}
          </Button>
          <h1>or</h1>
          <Button className="btn btn-primary">
            <StripeCheckout
              name="Jobseekr" // the pop-in header title
              description="Making the job hunt enjoyable." // the pop-in header subtitle
              ComponentClass="div"
              panelLabel="Membership" // prepended to the amount in the bottom pay button
              amount={2000} // cents
              currency="USD"
              stripeKey="pk_test_CLch1llaqkMyrh2vohpoGmu7"
              locale="auto"
              // Note: Enabling either address option will give the user the ability to
              // fill out both. Addresses are sent as a second parameter in the token callback.
              // shippingAddress
              billingAddress={false}
              // Note: enabling both zipCode checks and billing or shipping address will
              // cause zipCheck to be pulled from billing address (set to shipping if none provided).
              zipCode={false}
              //alipay // accept Alipay (default false)
              //bitcoin // accept Bitcoins (default false)
              allowRememberMe // "Remember Me" option (default true)
              token={this.onTokenSubscribe} // submit callback
              opened={this.onOpened} // called when the checkout popin is opened (no IE6/7)
              closed={this.onClosed} // called when the checkout popin is closed (no IE6/7)
              // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
              // you are using multiple stripe keys
              reconfigureOnUpdate={false}
              // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
              // useful if you're using React-Tap-Event-Plugin
              triggerEvent="onClick"
            >
              <div>
                <h2>Membership</h2>
                <p>Get unlimited access for 20 bucks a month!</p>
              </div>
            </StripeCheckout>{' '}
          </Button>
        </div>
      </div>
    );
  }
}
