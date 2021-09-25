import React from "react";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import styles from "./styles";

const CardHolderName = props => {
  const { classes, onChangeHandler, value } = props;
  return (
    <TextField
      InputProps={{
        inputProps: {
          className: classes.textField
        }
      }}
      InputLabelProps={{
        className: classes.label
      }}
      id="standard-with-placeholder"
      style={{ fontSize: "1.4rem" }}
      label="Card Holder's Name"
      placeholder="Enter your name"
      className={classes.textField}
      margin="normal"
      name="name"
      value={value}
      onChange={onChangeHandler}
    />
  );
};

export default withStyles(styles)(CardHolderName);
