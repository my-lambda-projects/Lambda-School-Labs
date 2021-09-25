import React, { Component } from "react";
import { connect } from "react-redux";

import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import moment from "moment";

import { postRequestOff } from "../../store/requestOff/actions.js";

import TimePicker from "../Atoms/TimePicker.js";

import { Segment, Input, Button, Header, Portal } from "semantic-ui-react";
import { TimeOffRequestContainer, FormItem } from "../../styles/Dashboard.js";

class TimeOffRequest extends Component {
  state = {
    start_date: moment(),
    end_date: moment(),
    start_time: "",
    end_time: "",
    reason: "",
    open: false,
    clickX: 0,
    clickY: 0,
  };

  submitTimeChange(time, newTime) {
    if (this.state.open === 1) {
      this.setState({
        start_time: newTime,
        start_time24: time,
      });
    } else if (this.state.open === 2) {
      this.setState({
        end_time: newTime,
        end_time24: time,
      });
    }
  }

  handleOpen = e => {
    const index = e.target.name === "start_time" ? 1 : 2;
    const { open } = this.state;

    const newOpen = open === index ? 0 : index;
    this.setState({ open: newOpen, clickX: e.pageX, clickY: e.pageY });
  };

  handleClose = () => {
    this.setState({ open: 0 });
  };

  submitHandler = e => {
    e.preventDefault();
    if (this.state.start_time24 && this.state.end_time24) {
      const [start_hours, start_minutes] = this.state.start_time24.split(":");
      const [end_hours, end_minutes] = this.state.end_time24.split(":");
      const start_datetime = this.state.start_date
        .clone()
        .second(0)
        .minute(start_minutes)
        .hour(start_hours)
        .utc()
        .format();
      const end_datetime = this.state.end_date
        .clone()
        .second(0)
        .minute(end_minutes)
        .hour(end_hours)
        .utc()
        .format();

      this.props.postRequestOff(
        this.props.id,
        start_datetime,
        end_datetime,
        this.state.reason
      );

      this.setState({
        start_date: moment(),
        end_date: moment(),
        start_time: "",
        end_time: "",
        reason: "",
        open: false,
        clickX: 0,
        clickY: 0,
      });
    }
  };

  inputChangeHandler = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    this.submitTimeChange = this.submitTimeChange.bind(this);
    return (
      <TimeOffRequestContainer>
        <Header>Request Time Off</Header>
        <Segment
          style={{
            width: "80%",
            minHeight: "60vh",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              height: "400px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <FormItem>
              <Input
                value={this.state.start_time}
                onChange={this.inputChangeHandler}
                name="start_time"
                icon="clock"
                iconPosition="left"
                type="text"
                placeholder="00:00:00"
                onClick={this.handleOpen}
              />
              <Portal
                open={this.state.open === 1}
                onClose={this.handleClose}
                closeOnDocumentClick={false}
              >
                <div
                  style={{
                    position: "fixed",
                    top: `${this.state.clickY - 200}px`,
                    left: `${this.state.clickX - 358}px`,
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
            </FormItem>
            <div style={{ maxWidth: "150px", margin: "0 auto" }}>
              <DateRangePicker
                startDate={this.state.start_date} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={this.state.end_date} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) =>
                  this.setState({
                    start_date: startDate,
                    end_date: endDate,
                  })
                } // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                numberOfMonths={1}
                minimumNights={0}
              />
            </div>
            <FormItem>
              <Input
                value={this.state.end_time}
                onChange={this.inputChangeHandler}
                name="end_time"
                icon="clock"
                iconPosition="left"
                type="text"
                placeholder="00:00:00"
                onClick={this.handleOpen}
              />
              <Portal
                open={this.state.open === 2}
                onClose={this.handleClose}
                closeOnDocumentClick={false}
              >
                <div
                  style={{
                    position: "fixed",
                    top: `${this.state.clickY - 200}px`,
                    left: `${this.state.clickX - 358}px`,
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
            </FormItem>
            <FormItem>
              <Input
                value={this.state.reason}
                onChange={this.inputChangeHandler}
                name="reason"
                icon="sticky note"
                iconPosition="left"
                type="text"
                placeholder="Reason"
              />
            </FormItem>
            <FormItem style={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={this.submitHandler}>Submit</Button>
            </FormItem>
          </div>
        </Segment>
      </TimeOffRequestContainer>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postRequestOff: (profile, start_datetime, end_datetime, reason) => {
      return dispatch(
        postRequestOff(profile, start_datetime, end_datetime, reason)
      );
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(TimeOffRequest);
