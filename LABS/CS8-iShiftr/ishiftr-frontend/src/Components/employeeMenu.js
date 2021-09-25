import React, { Component } from 'react';
import '../css/employeesMenu.css';
import { Link, withRouter } from 'react-router-dom';

class EmployeeMenu extends Component {
    render() {
        return (
            <div className="menu">
                <ul>
                    <Link to="/Dashboard"><span className='text-dark'><li className="empSettings"><i className="far fa-list-alt mr-2 fa-2x"></i>Dashboard</li></span></Link>
                    <Link to="/Dashboard/Settings"><span className='text-dark'><li className="empSettings"><i className="fas fa-sliders-h mr-2 fa-2x"></i> Settings</li></span></Link>
                </ul>
            </div>
        );
    }
}

export default withRouter(EmployeeMenu);