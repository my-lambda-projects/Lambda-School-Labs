import React, { Component } from 'react';
import { Nav, NavLink, NavItem } from 'reactstrap';
import "../css/Footer.css";
import GithubLogo from "../img/github-logo.png";

const Footer = (props) => {
  return (
    <div className='footer'>
      <Nav className='footer-nav'>
        <NavItem>
          <NavLink href="https://github.com/Lambda-School-Labs/labs10-taco-log"><img className="github-logo" src={GithubLogo} alt="Github"/></NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default Footer;