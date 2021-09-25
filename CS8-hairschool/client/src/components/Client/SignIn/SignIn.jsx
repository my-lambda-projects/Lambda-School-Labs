import React from "react";
import axios from "axios";
import "./SignIn.css";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";



class SignIn extends React.Component {
	//holds data as user types it
	constructor(props) {
		super(props);
		this.login = { username: "", password: "" };
		this.URL = "https://john-cs8-hairschool.herokuapp.com";
		this.state = {
			showNoUsernameError: false,
			showNoPasswordError: false,
			serverError: false

		};
	}

	//updates "this.login" with text as user types it into input fields
	handleInputChange = event => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.login[name] = value;
	};

	clearAllErrors() {
		setTimeout(() => this.setState({ showNoEmailError: false, showNoPasswordError: false, serverError: false }), 2500);
	}

	//error messages
	showNoUsernameError() {
		this.clearAllErrors();
		return (
			<div className="errorMessage"> Sorry! Please enter your Username! </div>
		);
	}

	showNoPasswordError() {
		this.clearAllErrors();
		return (
			<div className="errorMessage">
				{" "}
				Sorry! Please enter a valid password!{" "}
			</div>
		);
	}

	serverError() {
		this.clearAllErrors();
		return (
			<div className="errorMessage">
				{" "}
				There was an error logging you in!{" "}
			</div>
		);
	}

	buttonHandler(login, history) {
		const { username, password } = login;
		if (username === "") this.setState({ showNoUsernameError: true });
		if (password === "") this.setState({ showNoPasswordError: true });

		axios
			.post(`${this.URL}/hairschool/rest-auth/login/`, { username, password })
			.then(res => {
				localStorage.setItem("auth_token", res.data.key);
				history.push("User/Schedule");
			})
			.catch(err => {
				console.log("error", err);
				this.setState({ serverError: true});
				
			});
	}

	render() {
		return (
			<div className="SignIn">
				<div className="SignInTitle">Sign In</div>

				<Form className="SignInForm">
					<FormGroup>
						<Label for="Username">Username: </Label>
						<Input
							type="text"
							name="username"
							onChange={this.handleInputChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="Password">Password: </Label>
						<Input
							type="password"
							name="password"
							onChange={this.handleInputChange}
						/>
					</FormGroup>
					{this.state.showNoUsernameError ? this.showNoUsernameError() : false}
					{this.state.showNoPasswordError ? this.showNoPasswordError() : false}
					{this.state.serverError ? this.serverError() : false}
					<Button
						onClick={() => this.buttonHandler(this.login, this.props.history)}
						type="button"
						className="button"
						color="purple"
						size="lg"
					>
						Sign In
					</Button>
					<div>
						No account?<Link
							className="link account"
							to="/SignUp"
							style={{ textDecoration: "none" }}
						>
							{" "}
							Sign Up Here{" "}
						</Link>
					</div>
				</Form>
			</div>
		);
	}
}

export default SignIn;
