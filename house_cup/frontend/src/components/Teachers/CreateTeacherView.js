import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserRoles } from '../../actions';
import CreateTeacher from './components/CreateTeacher/CreateTeacher';
import DashboardNotification from '../DashboardNotification/DashboardNotification';
import './CreateTeacherView.css';

class CreateTeacherView extends Component {

  constructor(props) {
    super(props);
    const locationState = this.props.history.location.state;
    const message = (locationState) ? locationState.message : null;
    this.state = {
      message,
    };
  }

  async componentWillMount() {
    await this.props.getUserRoles(this.props.history);
  }

  componentWillReceiveProps(props) {
    const { isSuperAdmin, isSchoolAdmin, isTeacher } = props.auth;
    if (isSchoolAdmin === false) {
      if (isTeacher) {
        this.props.history.push('/scoreboard');
      } else if (isSuperAdmin) {
        // Implement SUPERADMIN redirection
      }
    }
  }

  render() {
    return (
      <div className="CreateTeacherView">
        {
          (this.state.message !== null)
            ? <DashboardNotification type="info">{ this.state.message }</DashboardNotification>
            : null
        }
        <CreateTeacher />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return state;
};

export default withRouter(connect(mapStateToProps, { getUserRoles })(CreateTeacherView));
