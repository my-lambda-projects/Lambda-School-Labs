import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import './sidebar.css';

// updated side bar, may be used instead of side menu
// not sure if all pages are included but can be fixed
// or updated after group input
const SideBar = (props) => {

    return (
        <Nav vertical className="Menu">
            <NavItem>
                <ul className="ul">
                <NavLink href="/createrace">CREATE </NavLink>
                </ul>
            </NavItem>
            <NavItem>
                <ul className="ul">
                <NavLink href="/showrace">SHOW</NavLink>
                </ul>
            </NavItem>
            <NavItem>
                <ul className="ul">
                <NavLink href="/scoreboard">SCOREBOARD</NavLink>
                </ul>
            </NavItem>
            <NavItem>
                <ul className="ul">
                <NavLink href="/settings">SETTINGS</NavLink>
                </ul>
            </NavItem>
            
        </Nav>
    
    )
}

export default SideBar;