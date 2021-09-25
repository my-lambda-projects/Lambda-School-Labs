import React, { Component } from "react";
import Register from "../../components/Register";

//this screen should return components necessary to build the landing page.

class ScreensRegister extends Component {
  render(props) {
    return (
      <React.Fragment>
        <Register {...this.props} />
      </React.Fragment>
    );
  }
}

export default ScreensRegister;
