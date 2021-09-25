import React, { Component } from "react";
import { StyledAlertWrapper } from "../styled/components";

export default class AlertModal extends Component {
  render() {
    return (
        <StyledAlertWrapper>
          <div className='alert'>
            <h2>Success!</h2>
            <div className='button-box'>
            <button onClick={this.props.toggleForm}>Exit</button></div>
            </div>
        </StyledAlertWrapper>
    )
  }

}

