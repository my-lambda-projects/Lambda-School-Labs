import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import BrowseSeekerContainer from "../../../presentation/TestLayout";
class Testing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props);
    return <BrowseSeekerContainer />;
  }
}

export default withRouter(Testing);
