import React from 'react';
// import { NavLink } from 'react-router-dom';

import { Nav, NavItem, NavLink, Button, ButtonGroup } from 'reactstrap';
import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';


export default class SideBar extends React.Component {

render(){
        return (
            <div className="SideDiv">
                <Nav vertical>
                    <NavItem>
                        <NavLink href="/classes" active>Classes</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/billing">Billing</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/settings">Settings</NavLink>
                    </NavItem>
                    {/* <NavItem>
                        <NavLink href="/AddClass">Add Class</NavLink>
                    </NavItem> */}
                </Nav>
            </div>

        )
    }
}

// export default NavBar;
