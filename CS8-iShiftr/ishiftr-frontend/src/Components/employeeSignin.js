import React, { Component } from 'react';
import { Button, Form, Label, Input} from 'reactstrap';
import {withRouter } from 'react-router-dom'
import axios from 'axios';
import Notifications, {notify} from 'react-notify-toast';

class EmployeeSignin extends Component {
    constructor(props) {
        super();
        this.state = {
            username: '',
            password: '',
            isLoading: false
        }
        this.loginHandler = this.loginHandler.bind(this);

    }
    
    inputHandler = (event) => {
        event.preventDefault();
        let new_state = this.state;
        new_state[event.target.name] = event.target.value;
        this.setState({ new_state })
    }

    loginHandler(e) {
        e.preventDefault();
        this.setState({
            isLoading: true
        })

        axios.post('https://ishiftr-db.herokuapp.com/api/employeeLogin', this.state)
        .then(response => {
            console.log('response, response.data', response);
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('id', response.data.id);
                this.props.history.push('/Dashboard');
        })
        .catch(err => {
            console.log('sign in error', err);
            this.setState({
                isLoading: false
            })
            notify.show("Oops! Please Check Your Username and Password Credentials");
        });
    };
    
    render() {
        return (
            <div className = 'centeredContend'>                    
            <Form className="col-12" onChange={this.inputHandler} onSubmit={this.loginHandler}>
                <Label for="username">Employee Username:</Label>
                <Input type="text" name="username" id="employeeUsername" placeholder="enter username" required />
                <Label for="password">Employee Password:</Label>
                <Input type="password" name="password" id="employeePassword" placeholder="enter password" required />
                {this.state.isLoading ?
                <Button className = 'mb-3 py-2 signBtn' isLoading={this.state.isLoading} type="submit">Please Wait, Signing in <i className="fa fa-spinner fa-spin"></i></Button> : <Button className ='mb-3 py-2 signBtn' type="submit">Sign In</Button>} <br />                
            </Form>
        </div>
        );
    }
}

export default withRouter(EmployeeSignin);
