import React from "react";

const DisabledSelect = props => {
  return (
    <div className="form-group">
      <select
        name={props.name}
        value={props.selectedOption}
        onChange={props.controlFunc}
        className="form-select"
        disabled
      >
        <option value="">{props.placeholder}</option>
        {props.options.map(opt => {
          return (
            <option key={opt} value={opt}>
              {opt}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DisabledSelect;
