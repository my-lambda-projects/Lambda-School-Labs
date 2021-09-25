import React, { Component } from "react";
import { connect } from "react-redux";

import { postAvailabilities } from "../../store/Availability/actions.js";
import { postHoursOfOperation } from "../../store/hourOfOperation/actions.js";

import TimePicker from "./TimePicker.js";

import { Portal, Accordion, Icon, Label, Segment } from "semantic-ui-react";

class PostAvailability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: this.props.day,
      start_time: "",
      end_time: "",
      start_time24: "",
      end_time24: "",
      open: 0,
      clickX: 0,
      clickY: 0,
      revealed: false,
    };
  }

  submitTimeChange = (time, newTime) => {
    if (this.state.open === 1) {
      this.setState({
        open: 2,
        start_time: newTime,
        start_time24: time,
        clickX: this.state.clickX + 100,
      });
    } else if (this.state.open === 2) {
      this.setState({
        end_time: newTime,
        end_time24: time,
      });
    }
  };

  handleOpen = (e, itemProps) => {
    const { index } = itemProps;
    const { open } = this.state;

    const newOpen = open === index ? 0 : index;
    this.setState({ open: newOpen, clickX: e.pageX, clickY: e.pageY });
  };

  handleReveal = () => {
    this.setState({ revealed: !this.state.revealed });
  };

  handleClose = () => {
    this.setState({ open: 0 });
  };

  handleSubmit = () => {
    this.setState({ open: 0, revealed: false });

    // TODO: handle validation better
    if (
      this.state.start_time24 < this.state.end_time24 &&
      this.state.start_time24 &&
      this.state.end_time24
    ) {
      if (this.props.type === "availability") {
        this.props.postAvailabilities(
          this.props.profile,
          this.state.day,
          this.state.start_time24 + ":00",
          this.state.end_time24 + ":00"
        );
      } else if (this.props.type === "hoursOfOperation")
        this.props.postHoursOfOperation(
          this.state.day,
          this.state.start_time24,
          this.state.end_time24 + ":00"
        );

      this.setState({
        day: this.props.day,
        start_time: "",
        end_time: "",
        open: 0,
        clickX: 0,
        clickY: 0,
        revealed: false,
      });
    }
  };

  render() {
    this.submitTimeChange = this.submitTimeChange.bind(this);
    return (
      // TODO: refactor with styled components
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "baseline",
          justifyContent: this.state.revealed ? "center" : "flex-start",
          paddingLeft: this.state.revealed ? "calc(50% - 66px)" : "0",
          gridRowStart: this.props.row,
          gridRowEnd: this.props.row,
          gridColumn: "1 / span 2",
          minHeight: "26px",
          borderBottom: "1px solid #eee",
        }}
      >
        <Icon
          style={{
            visibility: this.state.revealed ? "hidden" : "visible",
          }}
          name="plus"
          link
          onClick={this.handleReveal}
        />

        {!this.state.revealed ? null : (
          <Segment
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              margin: 0,
              padding: "3px",
            }}
          >
            <Accordion.Title index={1} onClick={this.handleOpen}>
              {this.state.start_time ? (
                <Label as="a">{this.state.start_time}</Label>
              ) : (
                <Label as="a" style={{ minWidth: "64px" }} size="huge" />
              )}
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
                />
              </div>
            </Portal>
            <span>to</span>
            <Accordion.Title index={2} onClick={this.handleOpen}>
              {this.state.end_time ? (
                <Label as="a">{this.state.end_time}</Label>
              ) : (
                <Label as="a" style={{ minWidth: "64px" }} size="huge" />
              )}
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
                />
              </div>
            </Portal>
            <Icon link name="check" color="green" onClick={this.handleSubmit} />
          </Segment>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postAvailabilities: (profile, day, open_time, close_time) => {
      return dispatch(postAvailabilities(profile, day, open_time, close_time));
    },
    postHoursOfOperation: (day, open_time, close_time) => {
      return dispatch(postHoursOfOperation(day, open_time, close_time));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PostAvailability);
