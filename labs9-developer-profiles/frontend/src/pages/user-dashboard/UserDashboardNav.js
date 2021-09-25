import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { link, centerFlex } from '../../global-styles/Mixins';

function UserDashboardNav(props) {
  return (
    <NavContainer>
      <NavLink exact to={`/dashboard`} activeClassName="selected">
        <span className="nav-large"><i className="fa fa-home"></i> Home</span>
        <span className="nav-small"><i className="fa fa-home"></i></span>
      </NavLink>
      
      <NavLink to={`${props.match.url}/personal-info`} activeClassName="selected">
        <span className="nav-large"><i className="fa fa-address-card"></i> Personal Info</span>
        <span className="nav-small"><i className="fa fa-address-card"></i></span>
      </NavLink>

      <NavLink to={`${props.match.url}/where-to-find-you`} activeClassName="selected">
        <span className="nav-large"><i className="fa fa-map-signs"></i> Where to Find You</span>
        <span className="nav-small"><i className="fa fa-map-signs"></i></span>
      </NavLink>

      <NavLink to={`${props.match.url}/about-you`} activeClassName="selected">
        <span className="nav-large"><i className="fa fa-user"></i> About You</span>
        <span className="nav-small"><i className="fa fa-user"></i></span>
      </NavLink>

      <NavLink to={`${props.match.url}/projects`} activeClassName="selected">
        <span className="nav-large"><i className="fa fa-cogs"></i> Projects</span>
        <span className="nav-small"><i className="fa fa-cogs"></i></span>
      </NavLink>

      <NavLink to={`${props.match.url}/experience`} activeClassName="selected">
        <span className="nav-large"><i className="fa fa-briefcase"></i> Experience</span>
        <span className="nav-small"><i className="fa fa-briefcase"></i></span>
      </NavLink>

      <NavLink to={`${props.match.url}/education`} activeClassName="selected">
        <span className="nav-large"><i className="fa fa-graduation-cap"></i> Education</span>
        <span className="nav-small"><i className="fa fa-graduation-cap"></i></span>
      </NavLink>
      
      <NavLink to={`${props.match.url}/billing`} activeClassName="selected">
        <span className="nav-large"><i className="fa fa-credit-card"></i> Billing</span>
        <span className="nav-small"><i className="fa fa-credit-card"></i></span>
      </NavLink>
    </NavContainer>
  )
}

const NavContainer = styled.nav`
  width: 300px;
  height: 100vh;
  background: white;
  padding: 130px 0 0;
  border-right: solid 1px rgba(238, 108, 77, .3);
  position: fixed;
  z-index: 5;
  display: flex;
  flex-direction: column;
  @media (max-width: 1400px) {
    width: 80px;
  }
  @media (max-width: 650px) {
    width: 100%;
    height: auto;
    padding-top: 65px;
    top: 0;
    left: 0;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    border-right: none;
    border-bottom: solid .5px #dbdee2;
  }
  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
  a {
    @media (max-width: 650px) {
      height: 100%;
    }
    ${link("1.8rem", "rgb(42,42,42)")};
    padding: 20px;
    @media (max-width: 1400px) {
      ${centerFlex()};
      padding: 25px 20px;
    }
    @media (max-width: 650px) {
      padding: 20px 20px;
    }
    @media (max-width: 600px) {
      padding: 25px 30px;
    }
    @media (max-width: 400px) {
      padding: 25px 40px;
    }
    @media (max-width: 360px) {
      padding: 25px 30px;
    }
  }
  i {
    width: 30px;
  }
  .selected {
    color: white;
    background-color: rgba(0, 25, 64, .9);
    border-right: solid 4px rgb(238, 108, 77);
    @media (max-width: 650px) {
      border-right: none;
      border-bottom: solid 4px rgb(238, 108, 77);
    }
  }
  .nav-large {
    @media (max-width: 1400px) {
      display: none;
    }
  }
  .nav-small {
    display: none;
    @media (max-width: 1400px) {
      display: inline;
    }
  }
`;


export default UserDashboardNav;
