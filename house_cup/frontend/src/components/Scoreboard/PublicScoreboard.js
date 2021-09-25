/* eslint-disable */
import React, { Component } from 'react';
import Socket from 'socket.io-client';
import { connect } from 'react-redux';
import { searchSchools } from '../../actions';
import './Scoreboard.css';
import ScoreCard from './ScoreCard';
import DashboardNotification from '../DashboardNotification/DashboardNotification';

class PublicScoreboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      schoolId: props.match.params.schoolId,
      schoolName: '',
      schoolLocation: '',
      houses: [],
    };
    this.initializeSocket();
  }

  componentWillMount() {
    this.getHouses();
  }

  async componentWillReceiveProps(props) {
    const school = props.schools[0];
    await this.setState({
      schoolName: school.name,
      schoolLocation: school.location,
      houses: [...school.houses],
    });
  }

  getHouses = async () => {
    await this.props.searchSchools({ _id: this.state.schoolId }, this.props.history);
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
      // this.props.history.push('/signin');
    });
  }

  render() {
    return (
      <div className="Scoreboard">
        <div className="Scoreboard__heading">
          <h2>Current Score</h2>
          <div className="Scoreboard__subtitle">{this.state.schoolName} ({this.state.schoolLocation})</div>
        </div>
        <div className="Scoreboard__cards">
          {
            (this.state.houses.length > 0) ?
              this.state.houses.map((house, index) => {
                return <ScoreCard key={house._id} house={house} socket={this.socket} public={true} />;
              })
            : <DashboardNotification type="warn">Scores are not available at the moment</DashboardNotification>
          }
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { searchSchools })(PublicScoreboard);
