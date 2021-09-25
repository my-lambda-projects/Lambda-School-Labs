import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";

const addLetter = props => {
  return (
    <div>
      <Link to="/dashboard/create/add">
        <i className="fas fa-plus-circle" />
      </Link>
    </div>
  );
};

export default addLetter;
