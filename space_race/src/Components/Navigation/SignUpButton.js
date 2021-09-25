import React, { Component } from 'react';
import { NavItem, Nav, NavLink} from 'reactstrap';
import './navigation.css';

class SignUpButton extends Component {
    render() {
        return(
            <Nav>
            <NavItem>
                <NavLink href="/signup"> Sign up </NavLink> 
            </NavItem>
            </Nav>
        );
    }
}
export default SignUpButton;