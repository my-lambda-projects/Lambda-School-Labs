import React from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import PropTypes from "prop-types";
import {
  StyledInput,
  FormDiv,
  StyledLabel,
  FormGroup,
  SaveButton,
  Title
} from "./indexCss";
import "./form.css";
const Forms = ({ state, onChange, title, onSubmit, btnName }) => {
  //Form will display a set of group form,
  //TODO represent the state of inputs using visual aid.

  let arr = Object.entries(state);
  let inputs = arr.map((item, index) =>
    //check for date input type and using daterangepicker lib
    !item[0].includes("date") ? (
      <FormGroup key={item[1].id || item[0]} className="form group">
        <StyledInput
          type={item[1].type || "text"}
          disable={item[1].disable || false}
          name={item[0]}
          id={item[1].id || item[0]}
          placeholder={item[1].placeholder || item[1].name || item[0]}
          value={item[1].value}
          src={item[1].src || undefined}
          onChange={onChange}
          className={item[1].controlledClass || `form_input ${item[1].disable}`}
          checked={item[1].type === "checkbox" ? item[1].checked : null}
        />
        <StyledLabel
          htmlFor={item[1].id || item[0]}
          className={item[1].controlledLabelClass || ""}
        >
          {item[1].label || item[0]}
        </StyledLabel>
      </FormGroup>
    ) : (
      <DateRangePicker
        key={item[1].id || item[0]}
        onChange={onChange}
        value={item[1].date}
        calendarClassName={item[1].controlledClass || "icalander"}
        className={item[1].controlledClass || `icalander2 ${item[1].disable}`}
      />
    )
  );
  return (
    <FormDiv>
      <Title>{title}</Title>
      {inputs}
      <SaveButton onClick={onSubmit}> {btnName || "Save"} </SaveButton>
    </FormDiv>
  );
};

export default Forms;
Forms.propTypes = {
  state: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func
};
