//________MODULES________
import React, { Component } from "react";
import {Link} from 'react-router-dom'

//________STYLING________
import "./MenuBar.css";

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="Menu-Bar">
          <Link to="/classlist">
              <div className="Menu-Item">Classes</div>

          </Link>
          <Link to="/settings">
              <div className="Menu-Item">Settings</div>
          </Link>
      </div>
    );
  }
}

export default MenuBar;
