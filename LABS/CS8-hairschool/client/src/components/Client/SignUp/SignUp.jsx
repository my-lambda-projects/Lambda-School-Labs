import React from "react";
import axios from "axios";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";


class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.signup = { username: "", email: "", password1: "", password2:"" };
        this.URL = "https://john-cs8-hairschool.herokuapp.com";
        this.state = {
            showNoEmailError: false,
            showNoPasswordError: false
        };
    }
    showNoPasswordError() {
        return (
            <div className="errorMessage">
                Sorry! Please enter a valid password!
            </div>
        );
    }
    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.signup[name] = value;
    };
    clearErrors() {
        setTimeout(() => this.setState({ showNoEmailError: false, showNoPasswordError: false }), 2500);
    }
    
    //error messages
    showNoEmailError() {
        this.clearErrors();
        return (
            <div className="errorMessage"> Sorry! Please enter a correct email! </div>
        );
    }
    showNoPasswordError() {
        this.clearErrors();
        return (
            <div className="errorMessage">
                {" "}
                Sorry! Please enter a valid password!{" "}
            </div>
        );
    }
    buttonHandler(signup, history) {
        const { username, email, password1, password2 } = signup;
        if (/^.+@.+\..+$/.test(username) === false) {
            this.setState({ showNoEmailError: true });
        }
        // if (password === "") this.setState({ showNoPasswordError: true });
        axios
            .post(`${this.URL}/hairschool/rest-auth/registration/`, {
                username,
                email,
                password1,
                password2
            })
            .then(res => {
                localStorage.setItem("auth_token", res.data.key);
                history.push("User/Schedule");
            })
            .catch(err => {
                console.log("error", err);
            });
    }

    render() {
        console.log(this.signup);
        return (
            <div className="SignUp">
                <div className="container">
                    <div className="SignUpTitle">Sign Up</div>
                    <Form className="SignUpForm">
                    <FormGroup>
                            <Label for="Username">Username: </Label>
                            <Input
                                type="text"
                                name="username"
                                onChange={this.handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Email">Email: </Label>
                            <Input
                                type="email"
                                name="email"
                                onChange={this.handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Password">Password: </Label>
                            <Input
                                type="password"
                                name="password1"
                                onChange={this.handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="ConfirmPassword">Confrim Password: </Label>
                            <Input
                                type="password"
                                name="password2"
                                onChange={this.handleInputChange}
                            />
                        </FormGroup>
                        {this.state.showNoEmailError ? this.showNoEmailError() : false}
                        {this.state.showNoPasswordError
                            ? this.showNoPasswordError()
                            : false}
                        <Button
                            onClick={() => this.buttonHandler(this.signup, this.props.history)}
                            className="button"
                            color="purple"
                            size="lg"
                        >
                            Sign Up
                        </Button>
                        <div>
                            Have an account?<Link
                                className="link account"
                                to="/SignIn"
                                style={{ textDecoration: "none" }}
                            >
                                {" "}
                                Sign In Here{" "}
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
export default SignUp;
