// import packages
import React from "react";

//import styles
import "./InvoiceList.css";

//import components/CreateInvoiceButton";
import Invoices from "../../components/Invoices";

const InvoiceList = props => {

    return (
      <section className="invoice-list-container">
        <Invoices createPDF={props.click} />
      </section>
    );
}
export default InvoiceList;