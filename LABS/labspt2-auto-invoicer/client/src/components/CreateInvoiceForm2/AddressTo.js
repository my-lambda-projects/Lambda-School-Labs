import React from "react";

import { withStyles } from "@material-ui/core/styles";

import styles from "./styles";
//import { TextField } from "../../../node_modules/@material-ui/core";
import { TextField } from "@material-ui/core";

const AddressTo = props => {
  const { classes, onChangeHandler, value, error, helperText } = props;
  return (
    <TextField
      id="filled-name"
      label="Address"
      className={classes.textField}
      value={value}
      onChange={onChangeHandler}
      style={{ width: 400 }}
      InputLabelProps={{ style: { fontSize: 12 } }}
      InputProps={{ style: { fontSize: 12 } }}
      margin="normal"
      variant="filled"
      error={error}
      helperText={helperText}
    />
  );
};

export default withStyles(styles)(AddressTo);
