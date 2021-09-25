import React, { Component } from "react";

class Preferences extends Component {
  state = {
    selectedOption: "On"
  };
  handleOptionChange = (e) => {
    this.setState({
      selectedOption: e.target.value
    });
  };

  render() {
    return (
      <div className="preferences">
        <h1>Preferences</h1>
        <div className="email">Email Summary</div>
        <form>
          <div className="radio">
            <label>
              <input
                type="radio"
                onChange={this.handleOptionChange}
                value="On"
                checked={this.state.selectedOption === "On"}
              />
              On
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                onChange={this.handleOptionChange}
                value="Off"
                checked={this.state.selectedOption === "Off"}
              />
              Off
            </label>
          </div>
        </form>
      </div>
    );
  }
}

export default Preferences;
