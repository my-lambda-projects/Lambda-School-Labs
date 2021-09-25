import React from "react";

import { withStyles } from "@material-ui/core/styles";

import styles from "./styles";
//import { TextField } from "../../../node_modules/@material-ui/core";
import { TextField } from "@material-ui/core";

const StateTo = props => {
  const { classes, onChangeHandler, value } = props;
  return (
    <TextField
      id="filled-name"
      label="Client State"
      className={classes.textField}
      value={value}
      onChange={onChangeHandler}
      style={{ width: 400 }}
      InputLabelProps={{ style: { fontSize: 12 } }}
      InputProps={{ style: { fontSize: 12 } }}
      margin="normal"
      variant="filled"
    />
  );
};

export default withStyles(styles)(StateTo);
