import React from "react";
import axios from "axios";
import "./Sig.css";
import { Link } from "react-router-dom";




class SignIn extends React.Component {
	//holds data as user types it
	constructor(props) {
		super(props);
		this.login = { email: "", password: "" };
		this.URL = "https://john-cs8-hairschool.herokuapp.com";
		this.state = {
			showNoEmailError: false,
			showNoPasswordError: false
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
		this.setState({ showNoEmailError: false, showNoPasswordError: false });
	}

	//error messages
	showNoEmailError() {
		return (
			<div className="errorMessage"> Sorry! Please enter your email! </div>
		);
	}

	showNoPasswordError() {
		return (
			<div className="errorMessage">
				{" "}
				Sorry! Please enter a valid password!{" "}
			</div>
		);
	}

	buttonHandler(login, history) {
		const { username, password } = login;
		if (username === "") this.setState({ showNoEmailError: true });
		if (password === "") this.setState({ showNoPasswordError: true });
		axios
			.post(`${this.URL}/hairschool/rest-auth/login/`, { username, password })
			.then(res => {
				localStorage.setItem("auth_token", res.data.key);
				history.push("User/Schedule");
			})
			.catch(err => {
				console.log("error", err);
			});
	}

	render() {
		return (
			<div className="SignIn">
				<div className="SignInTitle">Sign In</div>

				<Form className="SignInForm">
					<FormGroup>
						<Label for="Username">Email: </Label>
						<Input
							type="text"
							name="username"
							onChange={this.handleInputChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="Password">Password: </Label>
						<Input
							type="text"
							name="password"
							onChange={this.handleInputChange}
						/>
					</FormGroup>
					{this.state.showNoEmailError ? this.showNoEmailError() : false}
					{this.state.showNoPasswordError ? this.showNoPasswordError() : false}
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