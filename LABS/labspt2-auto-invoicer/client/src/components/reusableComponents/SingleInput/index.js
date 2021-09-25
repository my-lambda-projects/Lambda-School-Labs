import React from "react";
import styled from "styled-components";

const StyledSingleInput = styled.input`
  @media (max-width: 500px) {
    height: 40px;
    width: 90%;
  }
`;

const SingleInput = props => {
  return (
    <div>
      <label className="form-label">{props.title}</label>
      <StyledSingleInput
        //className="form-input"
        name={props.name}
        type={props.inputType}
        value={props.content}
        onKeyUp={props.onKeyUp}
        onChange={props.controlFunc}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default SingleInput;
