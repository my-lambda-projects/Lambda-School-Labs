import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../css/AddEmployee.css';
import { Link } from 'react-router-dom';
import axios from 'axios';



const authToken = localStorage.getItem('authToken');
const config = {
        headers: {
            'Authorization': "Bearer " + authToken            
        },
};

class EditEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeIn: false,
            email: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            availability: '',
            availableHours: '',
            workHours: '',
            username: '',
            password: '',
            msg: ''
        };
        this.handleAddEmployee = this.handleAddEmployee.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }


    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    handleAddEmployee(e) {
        e.preventDefault();
        this.setState({
          fadeIn: !this.state.fadeIn
            }        
        )
        
        console.log(this.state)
    }    

    editEmployee = (e) => {
        const {id} = this.props.match.params;
        e.preventDefault();
        console.log(this.state);
        const authToken = localStorage.getItem('authToken');
        const config = {
            headers: {
                'Authorization': "Bearer " + authToken            
            },
        };
        axios.put(`https://ishiftr-db.herokuapp.com/api/employee/${id}/editEmployee`, {
           email: this.state.email,
           firstName: this.state.firstName,
           lastName: this.state.lastName,
           phoneNumber: this.state.phoneNumber,
           availability: this.state.availability,
           availableHours: this.state.availableHours,
           workHours: this.state.workHours,
           username: this.state.username,
           password: this.state.password
        }, config)
        .then((res) => {
            console.log(res.data);
            this.setState({
                      msg: res.data.Message
            })
            this.props.history.push('/admin-dashboard/Employees');
        })
        .catch(function (error) {
            console.log('there is an error', error);
        });
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        axios.get(`https://ishiftr-db.herokuapp.com/api/employee/${id}`, config)
        .then(res => {
            console.log(res.data)
            const employee = res.data

            this.setState({
                email: employee.email,
                firstName: employee.firstName,
                lastName: employee.lastName ,
                phoneNumber: employee.phoneNumber,
                availability: employee.availability,
                availableHours: employee.availableHours,
                username: employee.username,
                password: employee.password,
            })
        })



    }

    render() {
        console.log(this.props.match.params.id)
        return (            
            <div className = 'row justify-content-center'>
                <Form className ='col col-6 py-4 border rounded' onChange={this.handleChange} onSubmit={this.editEmployee}>
                <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input onChange={this.handleChange} value={this.state.firstName} type="text" name="firstName" id="firstName" placeholder="enter first name" required />
                </FormGroup>
                <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input onChange={this.handleChange} value={this.state.lastName} type="text" name="lastName" id="lastName" placeholder="enter last name" required />
                </FormGroup>
                <FormGroup>
                <Label for="email">Email</Label>
                <Input onChange={this.handleChange} value={this.state.email} type="email" name="email" id="email" placeholder="enter email" required />
                </FormGroup>
                <FormGroup>
                <Label for="phoneNumber">Phone Number</Label>
                <Input onChange={this.handleChange} value={this.state.phoneNumber} type="text" name="phoneNumber" id="phoneNumber" placeholder="enter phone number" required />
                </FormGroup>
                <FormGroup>
                <Label for="availability">Availability</Label>
                <Input onChange={this.handleChange} value={this.state.availability} type="text" name="availability" id="availability" placeholder="enter day of availablity for employee (e.g, Monday)" required />
                </FormGroup>
                <FormGroup>
                <Label for="availableHours">Available Hours</Label>
                <Input onChange={this.handleChange} value={this.state.availableHours} type="text" name="availableHours" id="availableHours" placeholder="enter hours (e.g 9-5)" required />
                </FormGroup>
                <FormGroup>
                <Label for="username">Username</Label>
                <Input onChange={this.handleChange} value={this.state.username} type="text" name="username" id="username" placeholder="choose a username for your employee" required />
                </FormGroup>
                <FormGroup>
                <Label for="password">Password</Label>
                <Input onChange={this.handleChange} value={this.state.password} type="password" name="password" id="password" placeholder="choose a password" required />
                </FormGroup>
                <FormGroup>
                    <div className = 'col col-12'>                      
                        <Button type="submit" className="backButton mr-5 ml-1 col col-5">Save Changes</Button>                                        
                        <Link to="/admin-dashboard/Employees">
                            <Button className="backButton col col-5 ml-4">Cancel</Button>
                        </Link>
                        
                    </div>
                </FormGroup>                            
                </Form>
            
               
            </div>      
        );
    }
}

export default EditEmployee;




