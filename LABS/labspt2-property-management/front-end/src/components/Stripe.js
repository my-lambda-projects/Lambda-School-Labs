import React, { Component } from 'react';
import 'whatwg-fetch';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
// const url = process.env.stripe || 'http://localhost:9000/stripe/charge';
const url = 'https://tenantly-back.herokuapp.com/stripe/charge';

class Stripe extends Component {
	constructor(props) {
		super(props);
		this.onToken = this.onToken.bind(this);
	}

	successPayment = () => {
		alert('Payment Successful');
	};

	errorPayment = (data) => {
		alert('Payment Error');
		console.log(data);
	};

	onToken = (token) =>
		axios
			.post(url, {
				description: 'Pay rent now',
				source: token.id,
				currency: 'USD',
				amount: 120000
			})
			.then(this.successPayment)
			.catch(this.errorPayment);

	render() {
		return (
			<div>
				<StripeCheckout
					token={this.onToken}
					stripeKey="pk_test_uGZWgKZiorkYlZ8MsxYEIrA2"
					label="Pay with 💳"
					name="Tenantly, LLC"
					description="Pay rent."
					panelLabel="Pay Rent"
					image="https://i.ibb.co/L1sx35T/sd.jpg"
					amount={120000}
				/>
			</div>
		);
	}
}

export default Stripe;
