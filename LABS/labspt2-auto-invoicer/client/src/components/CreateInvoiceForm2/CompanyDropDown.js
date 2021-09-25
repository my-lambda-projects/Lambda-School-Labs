import React from "react";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

//import styles from "./styles";

const styles = theme => ({
  textField: {
    width: 200,
    [`@media (max-width: 600px)`]: {
      width: 400
    }
  }
});

const companies = [
  {
    name: "Google"
  },
  {
    name: "Facebook"
  },
  {
    name: "Apple"
  },
  {
    name: "Netflix"
  }
];

const CompanyDropDown = props => {
  const { classes, onChangeHandler, value, error, helperText } = props;

  return (
    <TextField
      InputProps={{
        inputProps: {
          className: classes.textField
        }
      }}
      InputLabelProps={{
        className: classes.label,
        style: { fontSize: 14 }
      }}
      select
      label="Company"
      name="company"
      className={classes.textField}
      value={value}
      onChange={onChangeHandler}
      SelectProps={{
        MenuProps: {
          className: classes.menu
        }
      }}
      FormHelperTextProps={{
        className: classes.helperText,
        style: { fontSize: 14 }
      }}
      error={error}
      helperText={helperText}
      margin="normal"
    >
      {companies.map(company => (
        <MenuItem key={company._id} value={company.name}>
          {company.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default withStyles(styles)(CompanyDropDown);
