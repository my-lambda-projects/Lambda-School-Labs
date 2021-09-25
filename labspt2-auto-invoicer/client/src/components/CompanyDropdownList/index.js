import React from 'react';

import './CompanyDropdownList.css';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './styles';

const CompanyDropdownList = props => {
  const { classes, handleChange } = props;
  return (
    <section className="companies-list">
      <TextField
        InputProps={{
          inputProps: {
            className: classes.textField
          }
        }}
        SelectProps={{
          MenuProps: {
            className: classes.menu
          }
        }}
        FormHelperTextProps={{ className: classes.helperText }}
        helperText="Please select your company"
        margin="normal"
        InputLabelProps={{
          className: classes.label
        }}
        select
        label="Current Company"
        onChange={handleChange}
      >
        <MenuItem value="create">create</MenuItem>
        {props.companies ? (
          props.companies.map(company => {
            return (
              <MenuItem
                value={company.companyName}
                key={`${company.companyName}+${company.companyZip}`}
              >
                {company.companyName}
              </MenuItem>
            );
          })
        ) : (
          <MenuItem value="create">create</MenuItem>
        )}
      </TextField>
    </section>
  );
};

export default withStyles(styles)(CompanyDropdownList);
