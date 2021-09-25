import React from 'react';
import { NavLink } from "react-router-dom";
import auth from '../utils/Auth';

class SideMenu extends React.Component {

    logout = () => {
        auth.logout();
        this.props.history.replace('/');
    }

    render() {

        return (
            <div className='side-menu'>
                <header>
                    <h1>House Cup Tracker</h1>
                </header>

                <NavLink to="/admin/schools" className='menu-button' activeClassName="activeMenu" style={{ textDecoration: "none", color: "inherit" }}>
                    <h2>Schools</h2>
                </NavLink>
                <NavLink to="/admin/billing" className='menu-button' activeClassName="activeMenu" style={{ textDecoration: "none", color: "inherit" }}>
                    <h2>Billings</h2>
                </NavLink>
                <NavLink to="/admin/analytics" className='menu-button' activeClassName="activeMenu" style={{ textDecoration: "none", color: "inherit" }}>
                    <h2>Analytics</h2>
                </NavLink>

                <NavLink to='/admin/settings' className='menu-button'  activeClassName="activeMenu"  style={{ textDecoration: "none", color: "inherit" }}>
                    <h2>Settings</h2>
                </NavLink>
                <div className='menu-button' onClick={() => { this.logout() }}>
                    <h2>Sign Out</h2>
                </div>
            </div>);
    }
}

export default SideMenu;