import React from "react";

const TextArea = props => {
  return (
    <div>
      <label className="form-label">{props.title}</label>
      <textarea
        className="form-input"
        name={props.name}
        rows={props.rows}
        value={props.content}
        onChange={props.controlFunc}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default TextArea;
