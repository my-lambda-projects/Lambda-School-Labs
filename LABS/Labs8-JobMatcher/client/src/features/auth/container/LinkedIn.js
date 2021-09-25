import React from "react";
const LinkedIn = props => {
  return (
    <button onClick={props.onclick} className="btn linkedin">
      {props.actionType} without LinkedIn
    </button>
  );
};

export default LinkedIn;
