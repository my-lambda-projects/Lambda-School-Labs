import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ForgotPasswordForm } from '../../presentation/presentation.js';

class ForgotPassword extends Component{
	constructor(props){
		super(props)
			this.state = { 
				// Add important things here later
			};
		
	}
	
	render() {
		return (
			< ForgotPasswordForm />
		)
	}

}

export default ForgotPassword;
