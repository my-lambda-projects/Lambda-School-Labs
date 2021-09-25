import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import '../../assets/css/general.css';
//const url = 'http://localhost:9000/api/register';
const url = 'https://tenantly-back.herokuapp.com/api/register';

class Register extends Component {
	state = {
		firstName: '',
		lastName: '',
		password: '',
		password2: '',
		isLandlord: true,
		email: '',
		phone: ''
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	isAdmin = () => {
		this.setState({ isLandlord: true  });
	};

	isNotAdmin = () => {
		this.setState({ isLandlord: false  });
	};

	onSubmit = (e) => {
		e.preventDefault();
		if (this.state.email.indexOf('@') < 0 || this.state.email.indexOf('@') > this.state.email.indexOf('.com')) {
			alert('Please enter a proper e-mail');
		} else {
			if (this.state.password !== this.state.password2) {
				alert('Please double check that your passwords match');
			} else {
				const reg = {
					firstName: this.state.firstName,
					lastName: this.state.lastName,
					password: this.state.password,
					email: this.state.email,
					phone: this.state.phone,
					isLandlord: this.state.isLandlord
				};

				axios
					.post(url, reg)
					.then(() => {
						this.props.history.push('/login');
					})
					.catch((err) => {
						console.log(err);
						alert('That e-mail or phone number already exists in our system');
					});
			}
		}
	};

	render() {
		return (
			<div className="form-container">
				<form onSubmit={this.onSubmit}>
					<Link to={'/'}>
						<img className="logo-register" src={logo} alt="Logo" />
					</Link>
					<div className="register-radio-container">
						<input type="radio" onClick={this.isAdmin} value="LANDLORD" name="account" />{' '}
						<p className="radio-p">Landlord</p>
						<input type="radio" onClick={this.isNotAdmin} value="TENANT" name="account" />{' '}
						<p className="radio-p">Tenant</p>
					</div>

					<div className="input-form">
						<input
							placeholder="First Name"
							name="firstName"
							value={this.state.firstName}
							onChange={this.onChange}
							type="text"
							required
						/>
					</div>
					<div>
						<input
							placeholder="Last Name"
							name="lastName"
							value={this.state.lastName}
							onChange={this.onChange}
							type="text"
							required
						/>
					</div>
					<div>
						<input
							placeholder="Password"
							name="password"
							value={this.state.password}
							onChange={this.onChange}
							type="password"
							required
						/>
					</div>
					<div>
						<input
							placeholder="Confirm password"
							name="password2"
							value={this.state.password2}
							onChange={this.onChange}
							type="password"
							required
						/>
					</div>
					<div>
						<input
							placeholder="E-mail"
							name="email"
							type="email"
							size="30"
							value={this.state.email}
							onChange={this.onChange}
							required
						/>
					</div>
					<div>
						<input
							placeholder="Phone Number"
							name="phone"
							value={this.state.phone}
							onChange={this.onChange}
							type="text"
							required
						/>
					</div>
					<div>
						<button className="form__button">Register</button>
					</div>
					<div className="no-account">
						<p className="login-p">Already have an account?</p>
						<Link to={'/login'}>
							<button className="register-button">Login here</button>
						</Link>
					</div>
				</form>
			</div>
		);
	}
}

export default Register;
