import React, { Component } from 'react';
import Pricing from '../LandingPage/Pricing'
import '../../assets/css/general.css';
// const url = process.env.register || 'http://localhost:9000/api/register';
const url = 'https://tenantly-back.herokuapp.com/api/register';

class RegisterTwo extends Component {

	render() {
		return (
        <div className="register-pricing">
            <Pricing />
        </div>

		);
	}
}

export default RegisterTwo;
