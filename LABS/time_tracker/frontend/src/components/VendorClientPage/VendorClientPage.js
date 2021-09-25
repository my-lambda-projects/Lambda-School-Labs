import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Button } from 'reactstrap';
import axios from 'axios';
import PlayIcon from 'react-icons/lib/fa/play';
import StopIcon from 'react-icons/lib/fa/stop';
import styled from 'styled-components';
import moment from 'moment';
import {
  startNewTimer,
  stopActiveTimer
} from '../../store/action/timestampActions';
import { getUserInfo } from '../../store/action/userActions';

import TimestampList from '../TimestampList/TimestampList';

const backend =
  process.env.NODE_ENV === 'production'
    ? `https://ls-time-tracker.herokuapp.com`
    : `http://localhost:5000`;

class VendorClientPage extends Component {
  state = {
    name: '',
    user: '',
    hoursLogged: [],
    invoices: [],
    activeTimer: false,
    activeTimerId: '',
    timer: '',
    userType: '',
    startTime: '',
    now: ''
  };

  componentDidMount() {
    this.getClient();
  }

  componentWillUnmount() {
    clearInterval(this.tick);
    this.setState({
      activeTimerId: '',
      startTime: '',
      now: '',
      activeTimer: false
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && this.props.activeTimer) {
      this.setState({
        ...this.state,
        activeTimerId: this.props.activeTimerId
      });
    }
    if (prevProps.activeTimer && !this.props.activeTimer) {
      this.props.getUserInfo(this.props.user, this.props.userType);
    }
  }

  getClient = () => {
    const id = this.props.match.params.id;
    if (this.props.userType === 'client') {
      axios
        .get(`${backend}/client/ts/${this.props.user}/vendor/${id}`, {
          headers: {
            token: window.localStorage.getItem('Authorization'),
            userType: window.localStorage.getItem('UserType')
          }
        })
        .then(({ data }) => {
          this.setState({
            name: data.name,
            hoursLogged: data.hoursLogged,
            invoices: data.invoices
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      axios
        .get(`${backend}/vendor/ts/${this.props.user}/client/${id}`, {
          headers: {
            token: window.localStorage.getItem('Authorization'),
            userType: window.localStorage.getItem('UserType')
          }
        })
        .then(({ data }) => {
          const sortedTStamps = data.hoursLogged.sort((a, b) => {
            return new Date(b.startTime) - new Date(a.startTime);
          });
          const active = sortedTStamps.filter(timestamp => {
            return timestamp.active === true;
          });
          if (active.length) {
            this.setState({
              ...this.state,
              activeTimer: true,
              activeTimerId: active[0]._id,
              startTime: active[0].startTime
            });
            this.tick = setInterval(this.setNow, 1000);
          }
          this.setState({
            name: data.name,
            hoursLogged: sortedTStamps,
            invoices: data.invoices
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  startTimer = () => {
    this.props.startNewTimer(this.props.user, this.props.match.params.id);
    this.setState({
      ...this.state,
      activeTimer: true,
      startTime: Date.now()
    });
    this.tick = setInterval(this.setNow, 1000);
  };

  stopTimer = () => {
    clearInterval(this.tick);
    this.props.stopActiveTimer(this.state.activeTimerId);
    this.setState({
      ...this.state,
      activeTimer: false,
      startTime: ''
    });
    setTimeout(() => this.getClient(), 1000);
  };

  setNow = () => {
    this.setState({
      ...this.state,
      now: Date.now()
    });
  };

  render() {
    const formattedStart = moment(this.state.startTime);
    const formattedNow = moment(Date.now());
    const duration = moment.duration(formattedNow.diff(formattedStart));
    return (
      <div>
        <Row>
          <Col>
            <h1>{this.state.name}</h1>
          </Col>
          <Col>
            <StyledButton
              onClick={() =>
                this.props.history.push('/dashboard/clients/invoices/new')
              }
            >
              New Invoice
            </StyledButton>
          </Col>
        </Row>
        <Row>
          <Col md="4" />
          <Col md="4">
            {this.state.activeTimer ? (
              <h3>{moment(duration._data).format('HH:mm:ss')} </h3>
            ) : null}
            {this.state.activeTimer ? (
              <StyledStop onClick={this.stopTimer}>
                <StopIcon />
                <div>Stop</div>
              </StyledStop>
            ) : (
              <StyledStart onClick={this.startTimer}>
                <PlayIcon />
                <div>Start</div>
              </StyledStart>
            )}
          </Col>
          <Col md="4" />
        </Row>
        {this.state.hoursLogged.map((hour, i) => {
          return <TimestampList key={hour._id} hour={hour} id={i} />;
        })}
      </div>
    );
  }
}

const StyledStart = styled.div`
  font-size: 3em;
  color: #315ca4;

  :hover {
    cursor: pointer;
  }
`;

const StyledStop = styled.div`
  font-size: 3em;
  color: red;

  :hover {
    cursor: pointer;
  }
`;

const StyledButton = styled(Button)`
  background-color: #4c4b63 !important;
`;

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    activeTimer: state.timestampReducer.activeTimer,
    activeTimerId: state.timestampReducer.activeTimerId,
    startTime: state.timestampReducer.startTime,
    hoursLogged: state.userReducer.hoursLogged,
    userType: state.userReducer.userType
  };
};

export default connect(mapStateToProps, {
  startNewTimer,
  stopActiveTimer,
  getUserInfo
})(VendorClientPage);
