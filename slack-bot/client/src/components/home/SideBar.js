import React from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";

const SideBar = props => {
  return <div>
      <div className="sidebar">
        <Link to="/profile/conversations">
          <div className="ho">Conversations</div>
        </Link>
        <Link to="/profile/preferences">
          <div className="ho">Preferences</div>
        </Link>
        <Link to="/profile/billing">
          <div className="ho">Billing</div>
        </Link>
      </div>
    </div>;
};

export default SideBar;
