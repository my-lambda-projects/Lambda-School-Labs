
import React, { Component } from "react";
import { StyledFormWrapper } from "../styled/components";

export default class NotificationsModal extends Component {
  render() {
    return (
      <StyledFormWrapper>
        <form>
          <h2>Are you sure you want to decline this event request?</h2>
          <div className="button-box">
            <button id={this.props.id} onClick={this.props.declineClick}>Decline Request</button>
            <button onClick={this.props.toggleModal}>Exit</button>
          </div>
        </form>
      </StyledFormWrapper>
    );
  }
}

