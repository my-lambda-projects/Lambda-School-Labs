import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Form, Input, Label } from 'reactstrap';
import axios from 'axios';
import EmployeeSignin from './employeeSignin';
import Notifications, {notify} from 'react-notify-toast';
import '../css/signin.css'

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            activeTab: '1',
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
        
        axios.post('https://ishiftr-db.herokuapp.com/api/employerLogin', this.state)
        .then(response => {
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('id', response.data.id);
                this.props.history.push('/admin-dashboard');
        })
        .catch(err => {
            console.log('sign in error', err);
            this.setState({
                isLoading: false
            })
            notify.show("Oops! Please Check Your Username and Password Credentials");            
        });
    };

    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
    }
    
    render() {
        return (
            <div className='centerContent py-5'>
            <Notifications />
                <Nav tabs className = 'justify-content-center col col-4 mx-0 px-0 nav-border' >
                    <NavItem className ='mx-0 tab-navs tabHeight '>
                        <NavLink
                            className ='no-border mx-0 px-0 ' 
                            onClick={() => { this.toggle('1'); }}
                            >
                            Employer Sign In
                        </NavLink>
                    </NavItem>
                    <NavItem className='mx-0 tab-navs bg-colored'>
                        <NavLink
                            className ='no-border mx-0 px-0 bg-colored'
                            onClick={() => { this.toggle('2'); }}
                            >
                            Employee Sign In
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab} className = 'col col-4 py-4 content-border shadow'>
                    <TabPane tabId="1">
                        <div className = 'centeredContend'>                    
                            <Form className="col-12" onChange={this.inputHandler} onSubmit={this.loginHandler}>
                                <Label for="username">Employer Username:</Label>
                                <Input type="text" name="username" id="#employerUsername" placeholder="enter username" required />
                                <Label for="password">Employer Password:</Label>
                                <Input type="password" name="password" id="#employerPassword" placeholder="enter password" required />
                                {this.state.isLoading ?
                                <Button className ='mb-3 py-2 signBtn' isLoading={this.state.isLoading} type="submit">Please Wait, Signing in <i className="fa fa-spinner fa-spin"></i></Button> : <Button className ='mb-3 py-2 signBtn' type="submit">Sign In</Button>} <br />
                                {/* <Link to="/"><Button className = 'mb-3 py-2 canclBtn'>Go Back</Button></Link> */}
                            </Form>
                        </div>
                    </TabPane>

                    <TabPane tabId="2">
                        <EmployeeSignin />
                    </TabPane>
                </TabContent>
          </div>    
        );
    }
}

export default Signin;


  