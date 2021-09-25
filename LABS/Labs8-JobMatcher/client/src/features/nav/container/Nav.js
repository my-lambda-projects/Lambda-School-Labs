import React, { Component } from "react";
import { connect } from "react-redux";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <nav>
        <ul>
          <li>home</li>
          <li>job</li>
        </ul>
      </nav>
    );
  }
}
// connect redux here
export default connect()(Nav);
