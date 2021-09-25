import React from "react";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";

import styles from "./styles";
//import { TextField } from "../../../node_modules/@material-ui/core";
import { TextField } from "@material-ui/core";

const ZipTo = props => {
  const { classes, onChangeHandler, value, error, helperText } = props;
  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Bill To
      </Typography>
      <TextField
        id="filled-name"
        label="Client Zip Code"
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
    </React.Fragment>
  );
};

export default withStyles(styles)(ZipTo);
