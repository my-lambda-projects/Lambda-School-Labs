import React, { Component } from "react";
import { connect } from "react-redux";

import {
  updateAvailabilities,
  deleteAvailabilities,
} from "../../store/Availability/actions.js";
import {
  updateHoursOfOperation,
  deleteHoursOfOperation,
} from "../../store/hourOfOperation/actions.js";

import TimePicker from "./TimePicker.js";

import { Icon, Portal, Accordion, Segment, Label } from "semantic-ui-react";

// Function to convert 24hour time to 12hour time
const convertTime24to12 = time24h => {
  let [hours, minutes] = time24h.split(":");
  let modifier;

  if (hours > 11) modifier = "PM";
  else modifier = "AM";

  if (modifier === "PM" && hours > 12) hours = hours - 12;
  else if (hours === "00") hours = "12";

  if (hours[0] === "0") hours = hours[1];
  return `${hours}:${minutes} ${modifier}`;
};

class Availability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: this.props.day,
      start_time: convertTime24to12(this.props.start_time),
      start_time24: this.props.start_time,
      end_time: convertTime24to12(this.props.end_time),
      end_time24: this.props.end_time,
      open: 0,
      clickX: 0,
      clickY: 0,
    };
  }

  submitTimeChange = (time24, time12) => {
    if (this.state.open === 1) {
      this.setState({
        open: 2,
        start_time: time12,
        start_time24:
          time24.length === 5 ? time24 + ":00" : "0" + time24 + ":00",
        clickX: this.state.clickX + 100,
      });
    } else if (this.state.open === 2) {
      const new_end_time24 =
        time24.length === 5
          ? time24 + ":00"
          : time24.length === 8
            ? time24
            : "0" + time24 + ":00";
      this.setState({
        end_time: time12,
        end_time24: new_end_time24,
      });
      if (this.props.type === "availability")
        this.props.updateAvailabilities(
          this.props.id,
          this.props.profile,
          this.state.day,
          this.state.start_time24,
          new_end_time24
        );
      else if (this.props.type === "hoursOfOperation") {
        this.props.updateHoursOfOperation(
          this.props.id,
          this.state.day,
          this.state.start_time24,
          new_end_time24
        );
      }
    }
  };

  handleOpen = (e, itemProps) => {
    const { index } = itemProps;
    const { open } = this.state;

    const newOpen = open === index ? 0 : index;
    this.setState({ open: newOpen, clickX: e.pageX, clickY: e.pageY });
  };

  handleClose = () => {
    this.setState({ open: 0 });
  };

  handleDelete = () => {
    if (this.props.type === "availability")
      this.props.deleteAvailabilities(this.props.id);
    else if (this.props.type === "hoursOfOperation")
      this.props.deleteHoursOfOperation(this.props.id);
  };

  render() {
    this.submitTimeChange = this.submitTimeChange.bind(this);
    return (
      <Segment
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: "4px",
          margin: "4px",
        }}
      >
        <Accordion.Title index={1} onClick={this.handleOpen}>
          <Label as="a">{this.state.start_time}</Label>
        </Accordion.Title>
        <Portal open={this.state.open === 1} onClose={this.handleClose}>
          <div
            style={{
              position: "fixed",
              top: `${this.state.clickY - 200}px`,
              left: `${this.state.clickX}px`,
              zIndex: 1000,
              minWidth: "120px",
            }}
          >
            <TimePicker
              handleClose={this.handleClose}
              submitTimeChange={this.submitTimeChange}
              currentTime={this.state.start_time}
              currentTime24={this.state.start_time24}
            />
          </div>
        </Portal>
        <span> to </span>
        <Accordion.Title index={2} onClick={this.handleOpen}>
          <Label as="a">{this.state.end_time}</Label>
        </Accordion.Title>
        <Portal open={this.state.open === 2} onClose={this.handleClose}>
          <div
            style={{
              position: "fixed",
              top: `${this.state.clickY - 200}px`,
              left: `${this.state.clickX}px`,
              zIndex: 1000,
              minWidth: "120px",
            }}
          >
            <TimePicker
              handleClose={this.handleClose}
              submitTimeChange={this.submitTimeChange}
              currentTime={this.state.end_time}
              currentTime24={this.state.end_time24}
            />
          </div>
        </Portal>
        <Icon
          size="tiny"
          circular
          inverted
          fitted
          name="close"
          color="red"
          link
          onClick={this.handleDelete}
        />
      </Segment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateAvailabilities: (id, profile, day, open_time, close_time) => {
      return dispatch(
        updateAvailabilities(id, profile, day, open_time, close_time)
      );
    },
    deleteAvailabilities: id => {
      return dispatch(deleteAvailabilities(id));
    },
    updateHoursOfOperation: (id, day, open_time, close_time) => {
      return dispatch(updateHoursOfOperation(id, day, open_time, close_time));
    },
    deleteHoursOfOperation: id => {
      return dispatch(deleteHoursOfOperation(id));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Availability);
