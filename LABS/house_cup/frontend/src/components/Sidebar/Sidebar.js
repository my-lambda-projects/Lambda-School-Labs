import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserRoles } from '../../actions';
import './Sidebar.css';

class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: {},
    };
  }

  async componentWillMount() {
    await this.props.getUserRoles(this.props.history);
  }

  async componentWillReceiveProps(props) {
    await this.setState({
      auth: { ...props.auth },
    });
  }

  render() {
    const { pathname } = this.props.history.location;
    const { isSchoolAdmin, isTeacher, isSuperAdmin } = this.state.auth;
    return (
      <div className="Sidebar">
        <div className="Sidebar__sidebar">
          <nav className="Sidebar__navigation">
            <ul>
              {
                (isSchoolAdmin) ? (
                  <Link to="/dashboard">
                    <li data-selected={ new RegExp(/^\/dashboard/gi).test(pathname) }>Summary</li>
                  </Link>
                ) : null
              }{
                (!isSchoolAdmin && !isSuperAdmin) ? (
                  <Link to="/schools">
                    <li data-selected={ pathname === '/schools' }>Create School</li>
                  </Link>
                ) : null
              }{
                (isSchoolAdmin) ? (
                  <Link to="/houses">
                    <li data-selected={ new RegExp(/^\/houses/gi).test(pathname) }>Manage Houses</li>
                  </Link>
                ) : null
              }{
                (isSchoolAdmin) ? (
                  <Link to="/teachers">
                    <li data-selected={ new RegExp(/^\/teachers/gi).test(pathname) }>Manage Teachers</li>
                  </Link>
                ) : null
              }{
                (isSuperAdmin) ? (
                  <Link to="/schools/list">
                    <li data-selected={ pathname === '/schools/list' }>Manage Schools</li>
                  </Link>
                ) : null
              }{
                (isTeacher) ? (
                  <Link to="/scoreboard">
                    <li data-selected={ pathname === '/scoreboard' }>Score Board</li>
                  </Link>
                ) : null
              }
              <Link to="/settings">
                <li data-selected={ pathname === '/settings' }>User Settings</li>
              </Link>
             
            </ul>
          </nav>
        </div>
        <div className="Sidebar__content">
          {this.props.children}
        </div>
      </div>
    );
  }

}

const mapStateToProp = (state) => {
  return state;
};

export default withRouter(connect(mapStateToProp, { getUserRoles })(Sidebar));
