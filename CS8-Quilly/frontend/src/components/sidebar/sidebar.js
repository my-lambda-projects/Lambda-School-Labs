import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/Quilly Logo - White.svg';

import './sidebar.css';

const Sidebar = () => {
 
  const links = {
    introductions: '',
    jobs: '',
    meetups: '',
    contributions: '',
    resumes: '',
    billing: '',
    settings: '',
  }
  
  const activeLink = window.location.pathname.slice(1);
  links[`${activeLink}`] = "activeLink";

    return (
      <div className="Sidebar">
        <p className="menu">Menu</p>
        {/* <Link to="/">Home</Link> */}
        <Link to="/jobs">
          <img src={logo} id="sidebarLogo" alt="Home" />
        </Link>
        {/* Uncomment after Introductions is completed */}
        <Link to="/introductions" className={links.introductions}>Introductions</Link>
        <Link to="/jobs" className={links.jobs}>Jobs</Link>
        <Link to="/meetups" className={links.meetups}>Meetups</Link>
        <Link to="/contributions" className={links.contributions}>Contributions</Link>
        <Link to="/resumes" className={links.resumes}>Resumes</Link>
        <Link to="/billing" className={links.billing}>Billing</Link>
        <Link to="/settings" className={links.settings}>Settings</Link>
      </div>
    );
}

export default Sidebar;
