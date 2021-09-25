// MyStoreCheckout.js
import React from 'react';
import { Elements } from 'react-stripe-elements';

import InjectedCheckoutForm from './CheckoutForm';

class MyStoreCheckout extends React.Component {
	render() {
		return (
			<Elements>
				<InjectedCheckoutForm
					fontSize={this.props.fontSize}
					charge={this.props.charge}
					pkg={this.props.pkg}
					history={this.props.history}
				/>
			</Elements>
		);
	}
}

export default MyStoreCheckout;
