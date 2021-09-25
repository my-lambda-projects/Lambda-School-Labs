import React from 'react';
import './ClientNav.css';
import { NavLink } from 'react-router-dom';
import {Navbar, Nav, NavItem, Col, Panel, NavbarBrand} from 'react-bootstrap';


class ClientNav extends React.Component {

    render () {
        return (
            <div className="ClientNav">               
                <Navbar>
                    
                    <Nav>                   
                   <NavItem eventKey={1} href='/'> Home</NavItem>
                   <NavItem eventKey={2} href='/User/Schedule' activeStyle={ {background: 'lightBlue'} }>  Scheduling </NavItem> 
                   <NavItem eventKey={3} href='/User/Feedback' activeStyle={ {background: 'lightBlue'} }> Feedback</NavItem>
                   <NavItem eventKey={4} href='/User/Billing' activeStyle={ {background: 'lightBlue'} }> Billing</NavItem>
                   <NavItem eventKey={5} href='/User/Settings' activeStyle={ {background: 'lightBlue'} }> Settings</NavItem>
                   </Nav>
                
                </Navbar>
                
                   
            </div>
        )
    }
}

export default ClientNav;