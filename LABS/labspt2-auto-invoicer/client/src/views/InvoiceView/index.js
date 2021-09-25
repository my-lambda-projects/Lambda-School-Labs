import React from "react";
//import styles
//import "./InvoiceView.css";

//import components
import SingleInvoiceView from "../../components/SingleInvoiceView";


const InvoiceView = props => {
  // No state held - views only render
    return (
      <div>
        <SingleInvoiceView props={props}/>
      </div>
    );
}
export default InvoiceView;