// import packages
import React, { Component } from "react";
import AddIcon from "@material-ui/icons/AddCircle";

// import styles
import "./CreateInvoiceButton.css";

class CreateInvoiceButton extends Component {
  render() {
    return (
      <article className="invoice-card add-invoice">
        <h3>New Invoice</h3>
        <AddIcon className="add-icon" />
      </article>
    );
  }
}

export default CreateInvoiceButton;
