import React from "react";
import { withStyles } from "@material-ui/core/styles";
//import styles from "./styles";
import { TextField } from "@material-ui/core";

const styles = theme => ({
  textField: {
    width: 100,
    paddingLeft: 10,
    paddingRight: 10,

    [`@media (max-width: 600px)`]: {
      width: 200
    }
  }
});

const SingleLineInput = props => {
  const { classes, onChangeHandler, value, error, helperText, label } = props;
  return (
    <TextField
      id="filled-name"
      label={label}
      className={classes.textField}
      value={value}
      onChange={onChangeHandler}
      InputLabelProps={{ style: { fontSize: 10 } }}
      InputProps={{ style: { fontSize: 10 } }}
      margin="normal"
      error={error}
      helperText={helperText}
    />
  );
};

export default withStyles(styles)(SingleLineInput);
