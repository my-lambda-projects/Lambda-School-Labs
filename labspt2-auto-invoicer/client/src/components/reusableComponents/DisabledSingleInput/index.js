import React from "react";

const DisabledSingleInput = props => {
  return (
    <div>
      <label className="form-label">{props.title}</label>
      <input
        className="form-input"
        name={props.name}
        type={props.inputType}
        value={props.content}
        onChange={props.controlFunc}
        placeholder={props.placeholder}
        disabled
      />
    </div>
  );
};

export default DisabledSingleInput;
