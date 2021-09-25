import React, { Component } from 'react';
import { NavItem, Nav, NavLink} from 'reactstrap';
import './navigation.css';

//TODO: Actually sign User out
// update state to reflect a non-logged in status
// return to landing page 

class SignOutButton extends Component {
    render() {
        return(
            <div className="SignOut">
            <Nav navbar>
            <NavItem>
                <NavLink href="/"> Sign Out </NavLink> 
            </NavItem>
            </Nav>
            </div>
        );
    }
}
export default SignOutButton;