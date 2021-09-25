import React from "react";

import TimePicker from "../Atoms/TimePicker.js";

import { PortalButton } from "../../styles/Calendar.js";
import { Portal, Label } from "semantic-ui-react";

class PostShiftTime extends React.Component {
  state = {
    open: false,
    clickX: 0,
    clickY: 0,
  };

  submitTimeChange(time24, time) {
    const event = {
      target: {
        name: this.props.data,
        value: time,
        value24: time24,
      },
    };
    this.props.inputChangeHandler(event);
  }

  handleOpen = e => {
    this.setState({ open: true, clickX: e.pageX, clickY: e.pageY });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    this.submitTimeChange = this.submitTimeChange.bind(this);

    return (
      <div>
        <PortalButton onClick={this.handleOpen}>
          <h4 style={{ margin: 0, padding: 0 }}>{this.props.day}</h4>
          {this.props.start ? (
            <Label as="a">{this.props.start}</Label>
          ) : this.props.day === "Start Time" ? (
            <Label as="a" style={{ minWidth: "64px" }} size="huge" />
          ) : null}
          {this.props.end ? (
            <Label as="a">{this.props.end}</Label>
          ) : this.props.day === "End Time" ? (
            <Label as="a" style={{ minWidth: "64px" }} size="huge" />
          ) : null}
        </PortalButton>
        <Portal
          open={this.state.open}
          onClose={this.handleClose}
          closeOnPortalMouseLeave
        >
          <div
            style={{
              position: "absolute",
              top: `${
                this.state.clickY > window.innerHeight - 300
                  ? this.state.clickY - 362
                  : this.state.clickY - 100
              }px`,
              left: `${
                this.state.clickX > window.innerWidth - 260
                  ? this.state.clickX - 262
                  : this.state.clickX + 20
              }px`,
              zIndex: 5000,
              minWidth: "120px",
            }}
          >
            <TimePicker
              currentTime={this.props.start ? this.props.start : this.props.end}
              handleClose={this.handleClose}
              submitTimeChange={this.submitTimeChange}
            />
          </div>
        </Portal>
      </div>
    );
  }
}

export default PostShiftTime;
