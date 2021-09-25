// CheckoutForm.js
import React from 'react';
import {
	injectStripe,
	CardElement,
	// CardNumberElement,
	// CardExpiryElement,
	// CardCVCElement,
	// PostalCodeElement,
} from 'react-stripe-elements';
import { connect } from 'react-redux';
import { sendPayment } from '../../actions';
import { Button } from 'reactstrap';

const handleBlur = () => {
	// console.log('[blur]');
};
const handleChange = change => {
	// console.log('[change]', change);
};
// const handleClick = () => {
// console.log('[click]');
// };
const handleFocus = () => {
	// console.log('[focus]');
};
const handleReady = () => {
	// console.log('[ready]');
};

const createOptions = fontSize => {
	return {
		style: {
			base: {
				fontSize,
				color: '#424770',
				letterSpacing: '0.025em',
				fontFamily: 'Source Code Pro, monospace',
				'::placeholder': {
					color: '#aab7c4',
				},
			},
			invalid: {
				color: '#9e2146',
			},
		},
	};
};

class CheckoutForm extends React.Component {
	handleSubmit = ev => {
		// We don't want to let default form submission happen here, which would refresh the page.
		ev.preventDefault();

		// Within the context of `Elements`, this call to createToken knows which Element to
		// tokenize, since there's only one in this group.
		this.props.stripe
			.createToken({ name: `${this.props.user}` })
			.then(({ token }) => {
				console.log('Received Stripe token:', token);
				this.props.sendPayment(token.id, this.props.pkg, this.props.history);
			});

		// However, this line of code will do the same thing:
		// this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
	};

	render() {
		return (
			<form
				onSubmit={this.handleSubmit}
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<label>
					Card details
					<CardElement
						onBlur={handleBlur}
						onChange={handleChange}
						onFocus={handleFocus}
						onReady={handleReady}
						{...createOptions(this.props.fontSize)}
					/>
				</label>
				{/* <CardElement /> */}
				{/* <CardNumberElement /> */}
				{/* <CardExpiryElement /> */}
				{/* <CardCVCElement /> */}
				{/* <PostalCodeElement /> */}
				<Button
					color="primary"
					style={{
						margin: '10px 0',
						// 	alignSelf: 'center',
						// 	width: '100px',
					}}
				>
					{`Pay $${this.props.charge}`}
				</Button>
			</form>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.auth.user,
	};
};

export default connect(mapStateToProps, { sendPayment })(
	injectStripe(CheckoutForm),
);
