import React, { useContext, useState } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import UserContext from "../../../context/UserContext";
import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import style from "../styles";

const EditUserDetails = props => {
  const { classes } = props;
  const context = useContext(UserContext);
  const { name, email, phoneNumber } = context.user;
  const [userData, setUserData] = useState({ name, email, phoneNumber });

  const editUser = async editedData => {
    await context.updateUser(editedData);
    props.toggleView();
  };

  return (
    <div className={classes.editContainer}>
      <form className={classes.formContainer}>
        <TextField
          className={classes.inputText}
          id={"name"}
          label={"Name"}
          fullWidth={true}
          placeholder={"Name"}
          name={"name"}
          onChange={e => setUserData({ ...userData, name: e.target.value })}
          value={userData.name}
          InputProps={{
            classes: {
              input: classes.text,
            },
          }}
          InputLabelProps={{
            FormLabelClasses: {
              root: classes.labelText
            },
          }}
        />
        <TextField
          className={classes.inputText}
          id={"email"}
          label={"Email"}
          fullWidth={true}
          placeholder={"Email"}
          name={"email"}
          onChange={e => setUserData({ ...userData, email: e.target.value })}
          value={userData.email}
          type='email'
          InputProps={{
            classes: {
              input: classes.text,
            },
          }}
          InputLabelProps={{
            FormLabelClasses: {
              root: classes.labelText
            },
          }}
        />
        <TextField
          className={classes.inputText}
          id={"phone_num"}
          label={"Phone Number"}
          fullWidth={true}
          placeholder={"Phone Number"}
          name={"phone_num"}
          onChange={e =>
            setUserData({ ...userData, phoneNumber: e.target.value })
          }
          value={userData.phoneNumber}
          InputProps={{
            classes: {
              input: classes.text,
            },
          }}
          InputLabelProps={{
            FormLabelClasses: {
              root: classes.labelText
            },
          }}
        />
      </form>
      <Button className={classes.cancel} onClick={props.toggleView}>
        cancel
      </Button>
      <Button className={classes.save} onClick={() => editUser(userData)}>
        save
      </Button>
    </div>
  );
};

export default withStyles(style)(EditUserDetails);
