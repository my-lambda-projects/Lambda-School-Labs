import { connect } from "react-redux";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import "@fullcalendar/core/main.css";
import {clickedDate, updateEvent} from "../actions/actions.js"
import listWeek from "@fullcalendar/list"
import moment from "moment"

import "./styles/Calendar.scss";

class Calendar extends React.Component {
  calendarComponentRef = React.createRef();

  state = {
    calendarWeekends: true,
    calendarEvents: [
      // initial event data
      {
                  id: 1,
                  title: "Arms",
                  start: "2019-04-12T13:30:00",
                  end: "2019-04-12T14:30:00",
                  allDay: false
                },
                {
                  id: 2,
                  title: "Legs",
                  start: "2019-04-12T15:30:00",
                  end: "2019-04-12T16:30:00",
                  allDay: false
                },
                {
                  id: 3,
                  title: "Core",
                  start: "2019-04-12T20:30:00",
                  end: "2019-04-12T21:30:00",
                  allDay: false
                }
    ]
  };




  handleDragAndDrop = (obj) => {



    let singleEvent = this.props.events.filter( event => {return event.id.toString() === obj.event.id.toString()})[0]

    let exceptOne = this.props.events.filter( event => {return event.id.toString() !== obj.event.id.toString()})
    this.props.updateEvent(exceptOne)

    singleEvent.start = moment(obj.event.start).format().substring(0,19)
    singleEvent.end = moment(obj.event.end).format().substring(0,19)

    let updatedEvents = [singleEvent , ...exceptOne]

    this.props.updateEvent(updatedEvents)

  }

  render() {
    return (
      <div className="demo-app">
        {/* <div className="demo-app-top">
          <button onClick={this.toggleWeekends}>toggle weekends</button>&nbsp;
          <button onClick={this.gotoPast}>go to a date in the past</button>
          &nbsp; (also, click a date/time to add an event)
        </div> */}
        <div className="demo-app-calendar">
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: "prevYear, prev,next, nextYear today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={this.calendarComponentRef}
            getView={this.handleDragAndDrop}
            weekends={this.state.calendarWeekends}
            events={this.props.events}
            dateClick={this.props.handleDateClick}
            eventClick={this.props.handleEventClick}
            selectable={true}
            droppable={true}
            eventDrop={this.handleDragAndDrop}
            editable={true}
            eventLimit={true} // for all non-TimeGrid views
            eventLimit={2}
            aspectRatio={1}
            height={1100}
          />
        </div>
      </div>
    );
  }

  toggleWeekends = () => {
    this.setState({
      // update a property
      calendarWeekends: !this.state.calendarWeekends
    });
  };

  gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate("2000-01-01"); // call a method on the Calendar object
  };
}

const mapStateToProps = state => {
  return {
    users: state.users,
    events: state.events,
    dateClicked: state.dateClicked,
    byDate: state.byDate
  };
};

export default connect(
  mapStateToProps, {clickedDate, updateEvent}
)(Calendar);
