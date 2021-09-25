import React, { useState, useContext, useEffect } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import UserContext from "../../context/UserContext";

import CustomerFormDialog from "../CustomerFormDialog";

const InvoiceCustomer = props => {
  const context = useContext(UserContext);

  const [dialogState, setDialogState] = useState(false);

  const handleCustomerSelect = e => {
    if (e.target.value === "new") {
      setDialogState(true);
      props.onCustomerSelect({
        _id: "",
        name: "",
        email: "",
        phoneNumber: "",
        address1: "",
        address2: "",
        zipCode: "",
        city: "",
        state: ""
      });
    }

    if (e.target.value !== "new") {
      const [customer] = context.company.customers.filter(
        customer => customer._id === e.target.value
      );
      props.onCustomerSelect({
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        address1: customer.address1,
        address2: customer.address2,
        zipCode: customer.zipCode,
        city: customer.city,
        state: customer.state
      });
    }
  };

  const handleClose = () => {
    setDialogState(false);
  };

  useEffect(() => {
    console.log("[props.company in InvoiceCompany]: ", props.customer);
  }, [props.customer]);

  // const { classes } = props;

  return (
    <React.Fragment>
      <TextField
        id="customer"
        select
        label="Customer"
        // className={classes.textField}
        value={props.customer._id}
        onChange={handleCustomerSelect}
        // SelectProps={{
        //   MenuProps: {
        //     className: classes.menu
        //   }
        // }}
        // helperText="Select a customer"
        helperText="Select A Customer"
        margin="normal"
      >
        {context.company.customers.map(customer => (
          <MenuItem
            key={customer._id}
            value={customer._id}
          >
            {customer.name}
          </MenuItem>
        ))}
        <MenuItem
          value="new"
        >
          Add New Customer
        </MenuItem>
      </TextField>
      {dialogState ? <CustomerFormDialog onClose={handleClose} /> : null}
    </React.Fragment>
  );
};

export default InvoiceCustomer;
