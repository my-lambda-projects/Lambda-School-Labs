import React, { Component } from 'react';
import './UserAccounts.css';
import { signingUp } from '../../Actions/LogIn';
import { connect } from 'react-redux';
import{ Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Link } from'react-router-dom';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password1: '',
            password2: '',
            // accountType:'', Not needed for mvp design
            
        };

        this.onChange =this.onChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.validateForm =this.validateForm.bind(this);
        
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.signingUp(this.state);
        
    }

    validateForm(email, username, password1, password2) {
        return 
        this.state.email.length > 0 &&
        this.state.username.length > 0 &&
        this.state.password1.length > 0 &&
        this.state.password2.length > 0 ?
        false : true
    }
    
    render() {
        return(
            <div className="container">
            <Form>
                <h2 className="header"> Create a Space Race Account</h2>
                <FormGroup>
                    <Input 
                    value={this.state.email}
                    onChange={this.onChange} 
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                     invalid={!this.state.email.match(/.+@.+/) && this.state.email.length > 0}/>
                     <FormFeedback>Please enter a valid email address</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Input 
                    value={this.state.username}
                    onChange={this.onChange} 
                    type="username" 
                    name="username" 
                    placeholder="Pick a Username"
                    invalid={this.state.username.length>32}/>
                    <FormFeedback>Username must be less than 33 characters</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Input 
                    value={this.state.password1}
                    onChange={this.onChange} 
                    type="password" 
                    name="password1" 
                    placeholder="Password"
                    invalid={this.state.password1.length < 8 && this.state.password1.length > 0}
                    valid={this.state.password1.length >= 8 && this.state.password1.length > 0}/>
                    <FormFeedback valid>Password is a valid length</FormFeedback>
                    <FormFeedback>Password must be at least 8 characters</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Input 
                    value={this.state.password2}
                    onChange={this.onChange} 
                    type="password" 
                    name="password2" 
                    placeholder="Verify Password"
                    invalid={this.state.password2 != this.state.password1 && this.state.password1.length > 0 && this.state.password2.length > 0}
                    valid={this.state.password2 === this.state.password1&& this.state.password1.length > 0 }
                    />
                    <FormFeedback valid>Passwords Match!</FormFeedback>
                    <FormFeedback>Passwords MUST Match</FormFeedback>
                </FormGroup>
                {/* <FormGroup tag="fieldset">
                    <legend>Account Type</legend>
                    <FormGroup check>
                    <Label check>
                        <Input 
                        onChange={this.onChange}
                        type="radio" 
                        name="accountType" 
                        value= {this.state.accountType} />{' '}
                        Teacher 
                    </Label>
                </FormGroup>
                <FormGroup check>
                <Label check>
                  <Input 
                  onChange= {this.onChange}
                  type="radio" 
                  name="accountType" 
                  value= {this.state.accountType} />{' '}
                         Student 
                </Label>
                </FormGroup>
                </FormGroup> */}
                    <Button disable={this.validateForm()} onClick={this.handleSubmit}>Sign Up </Button>
                    <h6> Already have an Account?</h6>
                    <Link to="/SignIn"> Sign In </Link>
            </Form>
            </div>
    
        );
    }
}

const mapStateToProps = state => {
    return {
        state
    }
}
export default connect(mapStateToProps, {signingUp})(SignUp);