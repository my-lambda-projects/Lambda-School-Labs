import React, { Component } from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import '../css/stripe.css';
import CheckoutForm from './Stripe';

class Billing extends Component {
    render() {
        return (
                <div className ='row justify-content-center'>
                        <h1 className = 'col col-12 centered'>Billing</h1>
                        <StripeProvider apiKey="pk_test_6CbxWkRuf3AOplwNMZEd6OPk">
                            <div className = 'col col-5 py-2'>
                                    <Elements>
                                        <CheckoutForm {...this.props} />
                                    </Elements>
                            </div>
                        </StripeProvider>              
                </div>                                
        );
    }
}



export default Billing;