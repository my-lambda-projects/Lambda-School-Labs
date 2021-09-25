/* eslint-disable */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Socket from 'socket.io-client';
import { connect } from 'react-redux';
import { getUserRoles, getHousesBySchool } from '../../actions';
import './Scoreboard.css';
import ScoreCard from './ScoreCard';
import DashboardNotification from '../DashboardNotification/DashboardNotification';

class Scoreboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: [],
      auth: {},
    };
    this.initializeSocket();
  }

  async componentWillMount() {
    await this.props.getUserRoles(this.props.history);
    await this.getHouses();
  }

  async componentWillReceiveProps(props) {
    await this.setState({
      houses: [...props.houses],
      auth: {...props.auth},
    });
  }

  getHouses = async () => {
    await this.props.getHousesBySchool(this.props.history);
  }

  initializeSocket = () => {
    // Initialize Socket
    this.socket = Socket('http://127.0.0.1:5000');
    // Receives Response after the update
    this.socket.on('updateScoreResponse', (response) => {
      this.getHouses();
    });
    // Error Handling
    this.socket.on('error', (data) => {
      this.props.history.push('/signin');
    });
  }

  renderNoHouseNotification = () => {
    const { isSuperAdmin, isSchoolAdmin, isTeacher } = this.state.auth;
    let notification = null;
    if (isTeacher === true) {
      notification = (
        <DashboardNotification type="info">
          Scores are not available at the moment.<br />
          Please contact your school admin.
        </DashboardNotification>
      );
    } else if (isSchoolAdmin === true) {
      notification = (
        <DashboardNotification type="info">
          Please create houses first, before accessing scoreboard.
        </DashboardNotification>
      );
    }
    return (this.state.houses.length === 0) ? notification : <h3 className="dashboard__title" style={{textAlign: 'center'}}>Current Scores</h3>;
  }

  render() {
    return (
      <div className="Scoreboard">
        {this.renderNoHouseNotification()}
        <div className="Scoreboard__cards">
          {
            this.state.houses.map((house, index) => {
              return <ScoreCard key={house._id} house={house} socket={this.socket} />;
            })
          }
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return state;
};

export default withRouter(connect(mapStateToProps, { getUserRoles, getHousesBySchool })(Scoreboard));
