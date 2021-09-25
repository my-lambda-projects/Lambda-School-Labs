import React from "react";

import { withStyles } from "@material-ui/core/styles";

//import styles from "./styles";
import { TextField } from "@material-ui/core";

const styles = theme => ({
  textField: {
    width: 300,

    [`@media (max-width: 600px)`]: {
      width: 380
    }
  }
});

const BalanceDue = props => {
  const { classes, onChangeHandler, value, error, helperText } = props;
  return (
    <TextField
      id="filled-name"
      label="Balance Due"
      className={classes.textField}
      value={value}
      onChange={onChangeHandler}
      //style={{ width: 300 }}
      InputLabelProps={{ style: { fontSize: 12 } }}
      InputProps={{ style: { fontSize: 12 } }}
      margin="normal"
      error={error}
      helperText={helperText}
    />
  );
};

export default withStyles(styles)(BalanceDue);
