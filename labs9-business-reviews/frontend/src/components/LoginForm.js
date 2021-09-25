import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { backendLink } from '../assets/config';

const Login = styled.div`
	display: flex;
	max-width: 500px;
	box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
	height: 500px;

	.Login__text--link,
	.Login__text {
		font-weight: 100;
	}
`;

const AuthInput = styled.input`
	width: 90%;
	padding: 10px;
	border: 1px solid #e6e6e6;
	margin: 10px auto;
`;
const AuthHeader = styled.h1`
	padding-bottom: 25px;
	font-weight: 100;
	letter-spacing: 1.2px;
`;

const AuthForm = styled.form`
	background: white;
	width: 100%;
	padding: 2rem;

	input[type='submit'] {
		background-color: #eed974;
		font-size: 1.25rem;
		margin: 10px auto;
		padding: 10px;
		float: center;
		height: 70px;
		width: 95%;
		margin-bottom: 15px;
	}
`;

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleSubmit = async (e) => {
		e.preventDefault();
		const res = await axios.post(
			`${backendLink}/api/user/login`,
			{
				email: this.state.email,
				password: this.state.password
			},
			{ withCredentials: 'include' }
		);
		if (res.status === 500) {
			return alert('Login incorrect, please try again.');
		}
		this.props.history.push('/');
	};

	render() {
		return (
			<Login>
				<AuthForm onSubmit={this.handleSubmit}>
					<AuthHeader>Login to your account</AuthHeader>
					<h4 className="Login__text">
						Don't have an account?
						<Link to="/register" className="Login__text--link">
							Register here!
						</Link>
					</h4>
					<label htmlFor="email"> Email</label>
					<AuthInput type="email" name="email" onChange={this.handleChange} />
					<label htmlFor="password"> Password</label>
					<AuthInput type="password" name="password" onChange={this.handleChange} />
					<input type="submit" value="Login" />
				</AuthForm>
			</Login>
		);
	}
}

export default LoginForm;
