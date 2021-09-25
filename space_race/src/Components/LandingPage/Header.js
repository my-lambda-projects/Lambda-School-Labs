import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler,
  NavItem, NavLink } from 'reactstrap';
import { Textfit } from 'react-textfit';
import BuyNowModal from '../Modal/BuyNowModal';
 
class Header extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  toggleSignUpModal(){
    this.props.signUpToggle(this.props.modal);
  }

// if the user has paid for the product, the menu will allow him to go to Home or Default Page (these routes are authenticated routes), if the user has just 
//signed up, then the billing modal will come up along with the sign up button. also clicking the sign up button will first bring up the payment plan.  
  getLinks() {
    if (this.props.authenticated) {
      /* Signed In */
      const _l = [
        <NavItem key={1}>
          <NavLink /*tag={Link}*/ to="/"  >Home</NavLink>
        </NavItem>,
        <NavItem key={2}>
          <NavLink /*tag={Link}*/ to="/Dashboard" >Dashboard</NavLink>
        </NavItem>
      ];
      if(this.props.registered){
        _l.push(
          <NavItem key={3}>
            <NavLink /*tag={Link}*/ to="/Billing"  >Billing</NavLink>
          </NavItem>);
      } else {
        _l.push(
          <NavItem key={3}>
            <a className="nav-link" onClick={this.toggleSignUpModal.bind(this)} style={{cursor:'pointer'}}>Sign-Up</a>
          </NavItem>);
      }
      return _l;
    }
    return [
      /* Signed out.. */
      <NavItem key={1}>
        <NavLink /*tag={Link}*/ to="/" className="" >Home</NavLink>
      </NavItem>,
      <NavItem key={2}>
        {/*<InstaLogin /> */} 
      </NavItem>
    ];
  }

  render() {
    return (
      <div className="Header">
        <Navbar color="inverse" inverse toggleable fixed="top">
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">
            <div className="SpaceRace">
              <p className="name">SpaceRace</p>
              <div className="title">
              <Textfit  mode="single">
              optional text
              </Textfit>
              </div>
            </div>
          </NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
                {this.getLinks()}
              <NavItem>
                <NavLink href="#SignIn">SignIn</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#About">About</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <BuyNowModal />
      </div>
    );
  }
}

export default Header;