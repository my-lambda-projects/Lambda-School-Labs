import React from "react";
import TimeKeeper from "react-timekeeper";

class TimePicker extends React.Component {
  state = {
    time: this.props.currentTime || "2:50 pm",
    time24: this.props.currentTime24 || "14:50",
  };

  handleTimeChange(newTime) {
    this.setState({
      time: newTime.formatted,
      time24: newTime.formatted24,
    });
  }

  render() {
    this.handleTimeChange = this.handleTimeChange.bind(this);
    return (
      <TimeKeeper
        time={this.state.time}
        switchToMinuteOnHourSelect={true}
        onChange={this.handleTimeChange}
        config={{
          // Custom stylings: https://github.com/catc/react-timekeeper/blob/master/src/helpers/config.js
          TIMEPICKER_BACKGROUND: "white",
          DONE_BUTTON_COLOR: "#64c9f1",
          DONE_BUTTON_BORDER_COLOR: "#ededed",
        }}
        onDoneClick={() => {
          this.props.handleClose();
          this.props.submitTimeChange(
            this.state.time24,
            this.state.time.toUpperCase()
          );
        }}
      />
    );
  }
}

export default TimePicker;
