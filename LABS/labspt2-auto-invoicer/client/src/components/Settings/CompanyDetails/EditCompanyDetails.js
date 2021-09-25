import React, { useContext, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import style from "../styles";
import UserContext from "../../../context/UserContext";

const EditCompanyDetails = props => {
  const { classes } = props
  const context = useContext(UserContext);

  const {
    name,
    email,
    address1,
    address2,
    phoneNumber,
    city,
    state,
    zipCode
  } = context.company;

  const [companyData, setCompanyData] = useState({
    name,
    email,
    address1,
    address2,
    phoneNumber,
    city,
    state,
    zipCode
  });

  const editCompany = async editedData => {
    await context.updateCompany(editedData);
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
          onChange={e => setCompanyData({ ...companyData, name: e.target.value })}
          value={companyData.name}
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
          onChange={e =>
            setCompanyData({ ...companyData, email: e.target.value })
          }
          value={companyData.email}
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
            setCompanyData({ ...companyData, phoneNumber: e.target.value })
          }
          value={companyData.phoneNumber}
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
          id={"address_1"}
          label={"Address_1"}
          fullWidth={true}
          placeholder={"Address_1"}
          name={"address_1"}
          onChange={e =>
            setCompanyData({ ...companyData, address1: e.target.value })
          }
          value={companyData.address1}
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
          id={"address_2"}
          label={"Address_2"}
          fullWidth={true}
          placeholder={"Address_2"}
          name={"address_2"}
          onChange={e =>
            setCompanyData({ ...companyData, address2: e.target.value })
          }
          value={companyData.address2}
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
          id={"city"}
          label={"City"}
          fullWidth={true}
          placeholder={"City"}
          name={"city"}
          onChange={e => setCompanyData({ ...companyData, city: e.target.value })}
          value={companyData.city}
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
          id={"state"}
          label={"State"}
          fullWidth={true}
          placeholder={"State"}
          name={"state"}
          onChange={e =>
            setCompanyData({ ...companyData, state: e.target.value })
          }
          value={companyData.state}
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
          id={"postal_code"}
          label={"Postal Code"}
          fullWidth={true}
          placeholder={"Postal Code"}
          name={"postal_code"}
          onChange={e =>
            setCompanyData({ ...companyData, zipCode: e.target.value })
          }
          value={companyData.zipCode}
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
          Cancel
      </Button>
      <Button className={classes.save} onClick={() => editCompany(companyData)}>
        Save
      </Button>
    </div>
  );
};

export default withStyles(style)(EditCompanyDetails);
