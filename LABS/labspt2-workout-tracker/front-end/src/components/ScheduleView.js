import auth from '../Auth';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Calendar from './Calendar.js';
import CalendarEvents from './CalendarEvents.js';
import ScheduleForm from './ScheduleForm';
import { checkPremium, clickedDate } from '../actions/actions';

import './styles/Calendar.scss';

class ScheduleView extends Component {


  state={
  }

  componentDidMount() {
    this.props.checkPremium();
  }

  handleEventClick = info => {
    this.setState({ eventClicked: true });
    const date = info.event.start.toISOString();
    this.props.clickedDate(date);
  };

  handleDateClick = ({ date }) => {
    this.props.clickedDate(date.toISOString());

  };

  render() {
    let ScheduledEvents = '';
    if (this.props.dateClicked) {
      ScheduledEvents = <ScheduleForm className='component-container events-form'/>;
    }
    return (
      <div className="main scheduleView">
        {/* <button onClick={this.props.auth.logout}>Logout</button> */}
        <Calendar handleEventClick={this.handleEventClick} handleDateClick={this.handleDateClick} />
        <div className="schedule-items">
          {ScheduledEvents}
          <CalendarEvents eventClicked={this.state.eventClicked} className="events" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    events: state.events,
    dateClicked: state.dateClicked,
    byDate: state.byDate
  };
};

// export default connect(mapStateToProps)(ScheduleView);

export default connect(
  mapStateToProps,
  { checkPremium, clickedDate }
)(ScheduleView);
