// import packages
import React, { Component } from "react";

//import styles
import "./CreateInvoice.css";

//import components
//import CreateInvoiceForm from "../../components/CreateInvoiceForm";
//import GoogleCalApi from "../../components/GoogleCalApi";
import { UserConsumer } from "../../contexts/UserContext";
import { CompanyConsumer } from "../../contexts/CompanyContext";

import CreateInvoiceForm2 from "../../components/CreateInvoiceForm2";

export default class index extends Component {
  //No state held - views only render
  render() {
    return (
      <UserConsumer>
        {({ userState }) => {
          return (
            <CompanyConsumer>
              {({ companyState, fetchInvoices }) => {
                return (
                  <div className="main-container">
                    Views 2.
                    {/* <CreateInvoiceForm
                      click={this.props.click}
                      user={userState}
                      company={companyState}
                      fetchInvoices={fetchInvoices}
                    />
                    <GoogleCalApi /> */}
                    <CreateInvoiceForm2
                      history={this.props.history}
                      user={userState}
                      company={companyState}
                      fetchInvoices={fetchInvoices}
                    />
                  </div>
                );
              }}
            </CompanyConsumer>
          );
        }}
      </UserConsumer>
    );
  }
}
