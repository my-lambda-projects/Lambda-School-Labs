import React, { Component } from "react";
import "./CalendarDatePicker.css";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import { SingleDatePicker } from "react-dates";

class CalendarDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      focused: null
    };
  }

  render() {
    return (
      <div>
        <SingleDatePicker
          date={this.state.date}
          onDateChange={date => this.setState({ date })}
          focused={this.state.focused}
          onFocusChange={({ focused }) => this.setState({ focused })}
        />
      </div>
    );
  }
}

export default CalendarDatePicker;
