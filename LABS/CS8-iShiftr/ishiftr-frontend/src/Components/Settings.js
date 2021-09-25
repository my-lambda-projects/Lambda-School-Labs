import React, { Component } from 'react';
import axios from 'axios';
import '../css/ShiftSchedule.css';
import '../css/settings.css'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const id = localStorage.getItem('id');

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employer: [],
            currentPassword:'',
            newPassword:''
        };
        this.passChanger = this.passChanger.bind(this);
    }

    validateForm() {
        return this.state.currentPassword.length > 0 && this.state.newPassword.length > 0;
    }

    inputHandler = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    }

    componentDidMount() {
        const authToken = localStorage.getItem('authToken');
        const config = {
            headers: {
                'Authorization': "Bearer " + authToken            
            },
        };
        axios
            .get(`https://ishiftr-db.herokuapp.com/api/employer/${id}`, config)
            .then(response => {
                this.setState({ employer: response.data });
            })
            .catch(error => {
                console.log("There was an error fetching the employer's data", error);
            });
            
    }

    passChanger = (event) => {
        event.preventDefault();
        const authToken = localStorage.getItem('authToken');
        
        const config = {
            headers: {
                'Authorization': "Bearer " + authToken            
            },
        };
        axios
            .put(`https://ishiftr-db.herokuapp.com/api/${id}/editPassword`, this.state, config)
            .then( response => {
                console.log(response.data);
            })
            .catch( error => {
                alert("There was an error changing the password");
            })
    }

    render() {
        return (

                <div className = 'row justify-content-center'>

                    <div className = 'col col-6 pt-4 border rounded'>
                    <div className = 'col col-12'>
                            <p><strong>Account information:</strong></p>        

                            <div>
                                Email: {this.state.employer.email}
                            </div>
                            <div className = 'mb-5'>
                                Phone: {this.state.employer.phoneNumber}
                            </div>

                    <Form className = 'mt-5'onSubmit={this.passChanger} onChange={this.inputHandler}>
                                <p><strong>Change your password:</strong></p>
                                <FormGroup>
                                    <Label for="currentPassword">Current Password</Label>
                                    <Input required type="password" name="currentPassword" value={this.state.currentPassword} placeholder="Enter your current password" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="newPassword">New Password</Label>
                                    <Input required type="password" name="newPassword" value={this.state.newPassword} placeholder="Enter your new password" />
                                </FormGroup>
                                <button className = 'mb-4 submitBtn py-3'type='submit' disabled={!this.validateForm()}>Save</button>
                            </Form>
                        </div>
                    </div>
                </div>
        );
    }
}
export default Settings;