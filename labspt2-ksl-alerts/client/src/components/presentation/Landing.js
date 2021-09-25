import React, { Component } from "react";
import { Button } from "reactstrap";
export default class Landing extends Component {
  render() {
    return (
      <div className="Container">
        {/* <div className="sideOverlay">
                <div className="loginToggle">
                    <Button>Sign Up</Button>
                    <Button>Sign In</Button>
                    </div> */}
        {/* <div className="Motto">
                    <h1>BUY</h1>
                    <h1>SELL</h1>
                    <h1>TRADE</h1>
                    <h1>LIST</h1>
                    <h1>TRACK</h1>
                    </div>
                </div> */}
        {/* <p className="Header">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquam sapien non lacus euismod tempor. Duis quis congue turpis. Nam sed rutrum ante. Praesent eget sem orci. Aliquam non fringilla purus, nec aliquet quam. Pellentesque et ante non dolor fermentum dapibus quis vitae nibh. Integer vehicula purus non pharetra luctus.
                </p> */}
        <div className="buynowBtn">
          <div>Buy Now</div>
        </div>
      </div>
    );
  }
}
