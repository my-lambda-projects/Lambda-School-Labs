import React, { Component } from "react";
import { StyledAlertWrapper } from "../styled/components";
import { Link } from "react-router-dom";

export default class ChildPromptModal extends Component {
  render() {
    return (
      <StyledAlertWrapper spaceBetween>
        <div className="alert">
          <h2>
            Thanks for signing up.</h2> <p>Before you can start keeping tabs on your family, you'll have to register some family members. You can take care of that at the household page. If you would like to take advantage of our pro features, why not head over to the billing page?
          </p>
          <div className="button-box">
            <Link to="/home/household">Manage Household</Link>
            <Link to='/home/billing'>Upgrade Account</Link>
          </div>
        </div>
      </StyledAlertWrapper>
    );
  }
}
