import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserRoles } from '../../actions';
import CreateHouse from './components/CreateHouse/CreateHouse';
import DashboardNotification from '../DashboardNotification/DashboardNotification';
import './CreateHouseView.css';

class CreateHouseView extends Component {

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
      <div className="CreateHouseView">
        {
          (this.state.message !== null)
            ? <DashboardNotification type="info">{ this.state.message }</DashboardNotification>
            : null
        }
        <CreateHouse />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default withRouter(connect(mapStateToProps, { getUserRoles })(CreateHouseView));
