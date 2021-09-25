import React, { useState, useContext, Fragment } from "react";
import { withStyles, Button } from "@material-ui/core";
import styles from "./styles";

// import components
import Total from "../CreateInvoiceForm2/Total";
import AmountPaid from "../CreateInvoiceForm2/AmountPaid";
import BalanceDue from "../CreateInvoiceForm2/BalanceDue";

import UserContext from '../../context/UserContext'

const Form = props => {
  const {invoice, handleToggle} = props

  const context = useContext(UserContext)
  const [invoiceId, setInvoiceId] = useState(invoice._id)
  const [total, setTotal] = useState(invoice.total)
  const [balance, setBalance] = useState(invoice.balance)
  const [amountPaid, setAmountPaid] = useState('')
  
  const handleFormSubmit = async e => {
    e.preventDefault();
    const editedData = {balance, amountPaid}
    await context.addPayment(invoiceId, editedData)
    handleToggle()
  };

  const handleAmountPaidChange = e => {
    setAmountPaid(e.target.value);
  };

  return (
    <Fragment>
      <form>
        <Total
          value={total}
        />
        <AmountPaid
          onChangeHandler={handleAmountPaidChange}
          value={amountPaid}
        />
        <BalanceDue
          value={balance}
        />
      </form>
      <Button
        onClick={handleFormSubmit}
        variant="contained"
        style={{ background: "#4fc878", width: 100 }}
      >
        Submit
      </Button>

      <Button
        onClick={handleToggle}
        variant="contained"
        style={{ background: "#ff8080", width: 100, marginLeft: 10 }}
      >
        Cancel
      </Button>
    </Fragment>
  );
}

export default withStyles(styles)(Form)