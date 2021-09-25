import React, { Component } from "react";

//import styles

//import components
import EditInvoiceForm from "../../components/EditInvoiceForm";
import { CompanyConsumer } from "../../contexts/CompanyContext";

export default class index extends Component {
  // No state held - views only render

  render() {
    return (
      <CompanyConsumer>
        {({fetchInvoices}) => {
          console.log(fetchInvoices)
          return (
            <div>
              Edit Invoice Views Only.
            <EditInvoiceForm fetchInvoices={fetchInvoices} 
            test={'test'}/>
          </div>
          )
        }}
      </CompanyConsumer>
    );
  }
}
