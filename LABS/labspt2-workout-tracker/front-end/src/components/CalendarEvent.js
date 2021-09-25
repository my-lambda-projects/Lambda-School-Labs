import React, { Component } from 'react';
import './styles/CalendarEvent.sass';
import Collapsible from 'react-collapsible';
import Checkbox from './Checkbox.jsx';
import EventGroup from './EventGroup.js';
import moment from 'moment';

class CalendarEvent extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  
  
    render() {
      

      return (
        <div className='form-container event-card'>

          <button scheduleday={this.props.scheduleday} onClick={() => this.props.closeEvent(this.props.fullOb, this.props.scheduleday)} className="closeButton">
            X
          </button>

        <h1 className="date-heading">{moment(`${this.props.scheduleday}`).format("ddd, MMM Do")}</h1>
          <form>
            <div>
            <Collapsible className='schedule-collapse'  trigger={'↓'}>
            <div>
              {this.props.eventGroup.map((item,index) => {
                return <EventGroup key={item+index} changeTime={this.props.changeTime} time={this.props.scheduleday} time={item["start"]}  category={this.props.category} exerciseProp={item["exercises"]} title={item["title"]} />
              })}
            </div>
            </Collapsible>
          </div>
        </form>
      </div>
    );
  }
}

export default CalendarEvent;
