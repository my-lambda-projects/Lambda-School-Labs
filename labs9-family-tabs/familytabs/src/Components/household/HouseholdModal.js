import React, { Component } from "react";
import Switch from "react-switch";
import { StyledFormWrapper } from "../styled/components";





export default class HouseholdModal extends Component {

  componentDidMount() {
    if (this.props.edit) {
      this.props.handleNotificationChange(this.props.notification);
    }
  }

  render() {
    console.log("this.props", this.props);
    
    return (
      this.props.profile.isSubscribed === 1 ?
      (
      <StyledFormWrapper>
        <form onSubmit={this.props.addOrEdit}>
        <h2>{this.props.edit ? "Edit" : "Add"} Family Member</h2>
          <input
            type="text"
            name="userName"
            placeholder="Name"
            onChange={this.props.inputHandler}
            value={this.props.userName}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={this.props.inputHandler}
            value={this.props.phone}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={this.props.inputHandler}
            value={this.props.email}
          />

          <div className="switchbox">
            <label>Admin</label>
            <Switch
              onChange={this.props.handleAdminChange}
              checked={!!this.props.isAdmin}
              className="react-switch"
              id="admin-switch"
              onColor='#00A3CF'
            />
          </div>

          <div className="switchbox">
            <label>Notifications</label>
            <Switch
              onChange={this.props.handleNotificationChange}
              checked={!!this.props.notification}
              className="react-switch"
              id="notification-switch"
              onColor='#00A3CF'
            />
            </div>
            
            <div className="button-box">
            <button>Save {this.props.edit ? "Changes" : "Family Member"}</button>
            <button onClick={this.props.toggleForm}>Exit</button>
            </div>
            
        </form>
      </StyledFormWrapper>
            )

            :

            (
        <StyledFormWrapper>
        <form onSubmit={this.props.addOrEdit}>
        <h2>{this.props.edit ? "Edit" : "Add"} Family Member</h2>
          <input
            type="text"
            name="userName"
            placeholder="Name"
            onChange={this.props.inputHandler}
            value={this.props.userName}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={this.props.inputHandler}
            value={this.props.phone}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={this.props.inputHandler}
            value={this.props.email}
          />

          <div className="switchbox">
            <label>Admin</label>
            <Switch
              onChange={this.props.handleAdminChange}
              checked={!!this.props.isAdmin}
              className="react-switch"
              id="admin-switch"
              onColor='#00A3CF'
            />
          </div>
          <div className="button-box">
            <button>Save {this.props.edit ? "Changes" : "Family Member"}</button>
            <button onClick={this.props.toggleForm}>Exit</button>
          </div>
        </form>
      </StyledFormWrapper>

            )

    );
  }
}
