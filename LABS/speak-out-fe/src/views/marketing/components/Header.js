import React, { useState } from 'react';
import { NavLink, Link } from "react-router-dom";
import LogoTree from "../../../assets/Garden_tree_only.png";
import Logo from "../../../assets/Garden.png";
import HamburgerMenu from "../../../assets/hamburger_menu_icon.png";

function Header() {

    const [menuDisplayStatus, setMenuDisplayStatus] = useState("hamburger-menu-hidden");

    const toggleMenu = () => {
        setMenuDisplayStatus(menuDisplayStatus === "hamburger-menu-hidden" ? "" : "hamburger-menu-hidden");
    }

    return (
        <>
            <header className="mobile">
            <Link to='/' >
                     <img src={LogoTree} alt="The Garden of Knowledge" /> 
            </Link>        
                <img src={HamburgerMenu} alt="Mobile Menu Icon" className="hamburger-menu-icon" onClick={toggleMenu} />
            </header>

            <header className="desktop">
            <Link to='/' >
                    <img src={Logo} alt="The Garden of Knowledge" />
             </Link>       
                <div className="desktop-header-links">     
                    <NavLink to='/courses' activeClassName ="activeNavButton" className="desktop-header-link" >Courses & Registration</NavLink>
                    <NavLink to='/schedules' activeClassName ="activeNavButton"className="desktop-header-link" >Schedules</NavLink>
                    <NavLink to='/about' activeClassName ="activeNavButton"className="desktop-header-link" >About & Contact</NavLink>
                    <NavLink to='/login' activeClassName ="activeNavButton" className="desktop-header-link">Sign In</NavLink>
                </div>
            </header>

            <div className={"hamburger-menu " + menuDisplayStatus}>
                <NavLink to='/courses' className="hamburger-link" onClick={toggleMenu} >Courses & Registration</NavLink>
                <NavLink to='/schedules' className="hamburger-link" onClick={toggleMenu} >Schedules</NavLink>
                <NavLink to='/about' className="hamburger-link" onClick={toggleMenu} >About & Contact</NavLink>
                <NavLink to='/login' className="hamburger-link"onClick={toggleMenu} >Sign In</NavLink>
            </div>
        </>
    )
}

export default Header;