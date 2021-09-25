import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { BrowserRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getEvents } from '../actions';

import EventCard from './EventCard';
import NewEventCard from './NewEventCard';
import SubscribeBox from './SubscribeBox';

import './css/events.css';
// import { EPROTO } from 'constants';
/* eslint-disable no-console */

const mapStateToProps = state => ({
  events: state.events,
  invitedEvents: state.invitedEvents,

  // addInvited: (event) => {
  //   state.setState({ invitedEvents: [event, ...state.invitedEvents] });
  // },
});

class Events extends Component {
  static propTypes = {
    getEvents: PropTypes.func.isRequired,
    events: PropTypes.arrayOf(PropTypes.object).isRequired,
    invitedEvents: PropTypes.arrayOf(PropTypes.object).isRequired,
    reload: PropTypes.func.isRequired,
  }


  componentDidMount() {
    // const events =p
    this.props.getEvents();
    // this.props.getInvitedEvents();

    // this.setState({
    //   events,
    //   // invitedEvents,
    // });
    // console.log(`events length ${this.props.events.length}`);
    // console.log(`invited events length ${this.props.invitedEvents.length}`);
  }

  render() {
    // console.log(`render events length ${this.props.events.length}`);
    // const userId = Number(sessionStorage.getItem('id'));
    const EventCards = this.props.events.map((event /* , i */) => {
      console.log(`owned event: ${event.title}`);
      return (
        <EventCard
          title={event.title}
          eventDate={event.eventDate}
          activated={event.activated}
          inviteCode={event.inviteCode}
          key={event.id}
          id={event.id}
          owner={event.owner}
          reload={this.props.reload}
        />);
    });
    const InvitedEventCards = this.props.invitedEvents.map((event /* , i */) => {
      console.log(`invited event: ${event.title}`);
      return (
        <EventCard
          title={event.title}
          eventDate={event.eventDate}
          activated={event.activated}
          key={event.id}
          id={event.id}
          owner={event.owner}
          reload={this.props.reload}
        />);
    });
    return (
      <div className="wrapper">
        <div className="page-body">
          <SubscribeBox />
          <NewEventCard />
          {EventCards}
          {InvitedEventCards}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { getEvents })(Events);
