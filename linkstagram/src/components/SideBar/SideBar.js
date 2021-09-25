
// import React, { Component } from 'react';
// import StickyBox from 'react-sticky-box'; 

// export default class SideBar extends Component {
//     render(){
//       return(
//         <div >
//             <StickyBox style={{ 'display': 'flex', 'alignItems': 'flex-start', 'padding': '30px 20px' }}>
//                 <ul>
//                     <li><a href="#Pictures">Pictures</a></li>
//                     <li><a href="#Billing">Billing</a></li>
//                     <li><a href="#Settings">Settings</a></li>
//                 </ul>
//             </StickyBox>
//         </div>
//       );
//     }
// }



import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";

class SideBar extends Component {
  render() {
    return (
      <div>
        <p>List Based</p>
        <Nav vertical>
          <NavItem>
            <NavLink href="/PhotoPage">Pictures</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/Billing">Billing</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/Settings">Settings</NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default SideBar;

