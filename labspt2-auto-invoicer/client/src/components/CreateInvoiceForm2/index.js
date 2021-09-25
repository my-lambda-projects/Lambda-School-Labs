import React, { Component } from "react";

import { Paper, Grid, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";

import styles from "./styles";
import styled from "styled-components";

import InvoiceNumberInput from "./InvoiceNumberInput";
import DateIssue from "./DateIssue";
import DueDate from "./DueDate";
import InvoiceDescription from "./InvoiceDescription";

import CompanyDropDown from "./CompanyDropDown";
//import BillTo from "./BillTo";
import InvoiceItemInput from "./InvoiceItemInput";
import InvoiceItemTableHead from "./InvoiceItemTableHead";
//import InvoiceBalance from "./InvoiceBalance";
import InvoiceNotesTerms from "./InvoiceNotesTerms";
import CityTo from "./CityTo";
import StateTo from "./StateTo";
import ZipTo from "./ZipTo";

import AddressTo from "./AddressTo";
import EmailTo from "./EmailTo";
import Subtotal from "./Subtotal";
import Discount from "./Discount";
import Tax from "./Tax";
import Shipping from "./Shipping";
import Total from "./Total";
import AmountPaid from "./AmountPaid";
import BalanceDue from "./BalanceDue";
import { CreateInvoice } from "../../graphQL/mutations/invoices";

// import history from '../reusableComponents/history/history'

//@media (max-width: 500px)
const StyledSection = styled.section`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid lightgray;

  height: 125px;
  width: 100%;

  @media (max-width: 600px) {
    height: 300px;
    width: 400px;

    flex-direction: column;
  }
`;

const StyledAddress = styled.section`
  padding-top: 10px;
  padding-left: 10px;
  height: 475px;

  display: flex;

  @media (max-width: 600px) {
    width: 410px;
  }
`;

const StyledInvoiceItem = styled.section`
  padding-top: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid lightgray;
  height: auto;

  @media (max-width: 600px) {
    width: 420px;
  }
`;

const StyledButton = styled(Button)`
  width: 100px;

  @media (max-width: 600px) {
    width: 400px;
    height: 50px;
    font-size: 2em;
  }
`;

const StyledInvoiceBalance = styled.section`
  padding-top: 25px;

  display: flex;
  justify-content: space-around;

  @media (max-width: 600px) {
    padding-left: 20px;
    flex-direction: column-reverse;
    width: 400px;
  }
`;

class CreateInvoiceForm2 extends Component {
  state = {
    invoiceNumber: "",
    invoiceDescription: "",
    selectedDate: new Date(),
    invoiceDueDate: new Date(),
    company: "",
    invoiceItems: [{ item: "", quantity: "", rate: "", amount: "" }],

    invoiceNotesTermsItems: [{ notes: "", terms: "" }],
    cityTo: "",
    stateTo: "",
    zipCodeTo: "",

    addressTo: "",
    emailTo: "",
    subtotal: "",
    discount: "",
    tax: "",
    shipping: "",
    total: "",
    amountPaid: "",
    balanceDue: "",
    errorText: ""
  };

  handleInputChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleInvoiceDueDateChange = date => {
    this.setState({ invoiceDueDate: date });
  };

  handleBillToItemsChange = event => {
    if (
      ["address1", "address2", "city", "state", "zip", "email"].includes(
        event.target.className
      )
    ) {
      const billToItems = [...this.state.billToItems];
      billToItems[event.target.dataset.id][
        event.target.className
      ] = event.target.value.toUpperCase();
      this.setState({ billToItems }, () => console.log("Bill To Items"));
    } else {
      this.setState({ [event.target.name]: event.target.value.toUpperCase() });
    }
  };

  handleInvoiceItemsInputChange = e => {
    if (["item", "quantity", "rate", "amount"].includes(e.target.className)) {
      const invoiceItems = [...this.state.invoiceItems];
      invoiceItems[e.target.dataset.id][
        e.target.className
      ] = e.target.value.toUpperCase();
      this.setState({ invoiceItems }, () => console.log("Invoice Items"));
    } else {
      this.setState({ [e.target.name]: e.target.value.toUpperCase() });
    }
  };

  addInvoiceItem = e => {
    e.preventDefault();
    this.setState(prevState => ({
      invoiceItems: [
        ...prevState.invoiceItems,
        { item: "", quantity: "", rate: "", amount: "" }
      ]
    }));
  };

  handleInvoiceBalanceItemsChange = e => {
    if (
      [
        "subtotal",
        "discount",
        "tax",
        "shipping",
        "total",
        "amountPaid"
      ].includes(e.target.className)
    ) {
      const invoiceBalanceItems = [...this.state.invoiceBalanceItems];
      invoiceBalanceItems[e.target.dataset.id][
        e.target.className
      ] = e.target.value.toUpperCase();
      this.setState({ invoiceBalanceItems }, () =>
        console.log("Invoice Balance Items")
      );
    } else {
      this.setState({ [e.target.name]: e.target.value.toUpperCase() });
    }
  };

  handleInvoiceNotesTermsItemsChange = e => {
    if (["notes", "terms"].includes(e.target.className)) {
      const invoiceNotesTermsItems = [...this.state.invoiceNotesTermsItems];
      invoiceNotesTermsItems[e.target.dataset.id][
        e.target.className
      ] = e.target.value.toUpperCase();
      this.setState({ invoiceNotesTermsItems }, () =>
        console.log("Invoice Notes & Terms items")
      );
    } else {
      this.setState({ [e.target.name]: e.target.value.toUpperCase() });
    }
  };

  // ZipCode & Tax API

  // Tax Rate from API
  getTaxRateObject = zip => {
    if (zip) {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://api.zip-tax.com/request/v40?key=jXN4sqZiwuMr8HCA&postalcode=${zip}`
        )
        .then(res => {
          this.setState({ tax: res.data.results[0].taxSales });
        });
    }
  };

  // ZipcodeApi Function
  zipcodeApiAutofill = () => {
    if (this.state.zipCodeTo.length > 4) {
      // clientkey comes from zipcodeapi.com for client side key after registering for api key
      const clientKey =
        "js-2zEUwuIKNMSQvyjRbj8Ko7OQy0PdrquR9s6rvdbZTjcFvP9HYEQVp0dqAXVc27jZ";
      const zipcode = this.state.zipCodeTo;
      const url = `https://www.zipcodeapi.com/rest/${clientKey}/info.json/${zipcode}/radians`;
      axios
        .get(url)
        .then(res => {
          this.setState({
            cityTo: res.data.city,
            stateTo: res.data.state
          });
          // return this.getTaxRateObject(zipcode);
        })
        .catch(error => {
          console.log("Server Error", error);
        });
    } else {
      this.setState({ cityTo: "", stateTo: "", tax: "" });
    }
  };

  handleZipCodeToChange = async e => {
    await this.setState({ zipCodeTo: e.target.value });
    this.zipcodeApiAutofill();
  };

  // handleClearForm = e => {
  //   e.preventDefault();
  //   this.setState({
  //     invoiceNumber: "",
  //     invoiceDescription: ""
  //   });
  // };

  handleFormSubmit = e => {
    e.preventDefault();

    if (
      this.state.invoiceNumber.length === 0 ||
      this.state.invoiceDescription.length === 0 ||
      this.state.company.length === 0 ||
      this.state.zipCodeTo.length === 0 ||
      this.state.addressTo.length === 0 ||
      this.state.emailTo.length === 0 ||
      this.state.subtotal.length === 0 ||
      this.state.discount.length === 0 ||
      this.state.shipping.length === 0 ||
      this.state.total.length === 0 ||
      this.state.amountPaid.length === 0 ||
      this.state.balanceDue.length === 0
    ) {
      this.setState({ errorText: "please enter your info" });
    } else {
      const formPayload = {
        invoiceNumber: this.state.invoiceNumber,
        invoiceDescription: this.state.invoiceDescription,
        selectedDate: this.state.selectedDate,
        invoiceDueDate: this.state.invoiceDueDate,
        company: this.state.company,
        //invoiceItems: [{ item: "", quantity: "", rate: "", amount: "" }],
        //invoiceNotesTermsItems: [{ notes: "", terms: "" }],
        notes: this.state.invoiceNotesTermsItems.notes - 0,
        terms: this.state.invoiceNotesTermsItems.terms - 0,
        cityTo: this.state.cityTo,
        stateTo: this.state.stateTo,
        zipCodeTo: this.state.zipCodeTo,
        addressTo: this.state.addressTo,
        emailTo: this.state.emailTo,
        subtotal: this.state.subtotal,
        discount: this.state.discount,
        tax: this.state.tax,
        shipping: this.state.shipping,
        total: this.state.total,
        amountPaid: this.state.amountPaid,
        balanceDue: this.state.balanceDue,
        // from props
        userID: this.props.user.userID,
        userName: this.props.user.name,
        addressFrom: this.props.company.address_1,
        companyID: this.props.company.companyID,
        companyName: this.props.company.name,
        customerID: this.props.company.customers[0]._id
      };
      CreateInvoice(formPayload, "invoiceNumber total");
      // this.props.click(formPayload);
      this.props.fetchInvoices();
      this.props.history.push(`/user/${this.props.user.userID}/invoices`);
      console.log(this.props);
      console.log(formPayload);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={16}>
        <Paper className={classes.paper}>
          <div className={classes.container}>
            <StyledSection>
              <Grid item xs={12} sm={6}>
                <InvoiceNumberInput
                  onChangeHandler={this.handleInputChange("invoiceNumber")}
                  value={this.state.invoiceNumber}
                  error={
                    this.state.invoiceNumber.length === 0
                      ? !!this.state.errorText
                      : false
                  }
                  helperText={
                    this.state.invoiceNumber
                      ? !!this.state.errorText
                      : this.state.errorText
                  }
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DateIssue
                  onChangeHandler={this.handleDateChange}
                  value={this.state.selectedDate}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DueDate
                  onChangeHandler={this.handleInvoiceDueDateChange}
                  value={this.state.invoiceDueDate}
                />
              </Grid>
            </StyledSection>
            <StyledSection>
              <Grid item xs={9}>
                <InvoiceDescription
                  onChangeHandler={this.handleInputChange("invoiceDescription")}
                  value={this.state.invoiceDescription}
                  error={
                    this.state.invoiceDescription.length === 0
                      ? !!this.state.errorText
                      : false
                  }
                  helperText={
                    this.state.invoiceDescription
                      ? !!this.state.errorText
                      : this.state.errorText
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <CompanyDropDown
                  onChangeHandler={this.handleInputChange("company")}
                  value={this.state.company}
                  error={
                    this.state.company.length === 0
                      ? !!this.state.errorText
                      : false
                  }
                  helperText={
                    this.state.company
                      ? !!this.state.errorText
                      : this.state.errorText
                  }
                />
              </Grid>
            </StyledSection>
            <StyledAddress>
              <Grid item xs={4}>
                <ZipTo
                  onChangeHandler={this.handleZipCodeToChange}
                  value={this.state.zipCodeTo}
                  error={
                    this.state.zipCodeTo.length === 0
                      ? !!this.state.errorText
                      : false
                  }
                  helperText={
                    this.state.zipCodeTo
                      ? !!this.state.errorText
                      : this.state.errorText
                  }
                />
                <AddressTo
                  onChangeHandler={this.handleInputChange("addressTo")}
                  value={this.state.addressTo}
                  error={
                    this.state.addressTo.length === 0
                      ? !!this.state.errorText
                      : false
                  }
                  helperText={
                    this.state.addressTo
                      ? !!this.state.errorText
                      : this.state.errorText
                  }
                />
                <CityTo
                  onChangeHandler={this.handleInputChange("cityTo")}
                  value={this.state.cityTo}
                />
                <StateTo
                  onChangeHandler={this.handleInputChange("stateTo")}
                  value={this.state.stateTo}
                />
                <EmailTo
                  onChangeHandler={this.handleInputChange("emailTo")}
                  value={this.state.emailTo}
                  error={
                    this.state.emailTo.length === 0
                      ? !!this.state.errorText
                      : false
                  }
                  helperText={
                    this.state.emailTo
                      ? !!this.state.errorText
                      : this.state.errorText
                  }
                />
              </Grid>
            </StyledAddress>
            <StyledInvoiceItem>
              <Grid item xs={12} sm={12}>
                <form
                  onSubmit={this.handleFormSubmit}
                  onChange={this.handleInvoiceItemsInputChange}
                >
                  <InvoiceItemTableHead />
                  <InvoiceItemInput invoiceItems={this.state.invoiceItems} />
                  <StyledButton
                    variant="contained"
                    style={{ background: "#a8e4bc" }}
                    //color="secondary"
                    onClick={this.addInvoiceItem}
                  >
                    Add Line Item +
                  </StyledButton>
                </form>
              </Grid>
            </StyledInvoiceItem>
            <StyledInvoiceBalance>
              <Grid item xs={4}>
                <form
                  onSubmit={this.handleFormSubmit}
                  onChange={this.handleInvoiceNotesTermsItemsChange}
                >
                  <InvoiceNotesTerms
                    invoiceNotesTermsItems={this.state.invoiceNotesTermsItems}
                  />
                </form>
              </Grid>
              <Grid item xs={4}>
                <Subtotal
                  onChangeHandler={this.handleInputChange("subtotal")}
                  value={this.state.subtotal}
                  error={
                    this.state.subtotal.length === 0
                      ? !!this.state.errorText
                      : false
                  }
                  helperText={
                    this.state.subtotal
                      ? !!this.state.errorText
                      : this.state.errorText
                  }
                />
                <Discount
                  onChangeHandler={this.handleInputChange("discount")}
                  value={this.state.discount}
                  error={
                    this.state.subtotal.length === 0
                      ? !!this.state.errorText
                      : false
                  }
                  helperText={
                    this.state.discount
                      ? !!this.state.errorText
                      : this.state.errorText
                  }
                />
                <Tax
                  onChangeHandler={this.handleInputChange("tax")}
                  value={this.state.tax * 100 + `%`}
                />

                <Shipping
                  onChangeHandler={this.handleInputChange("shipping")}
                  value={this.state.shipping}
                  error={
                    this.state.shipping.length === 0
                      ? !!this.state.errorText
                      : false
                  }
                  helperText={
                    this.state.shipping
                      ? !!this.state.errorText
                      : this.state.errorText
                  }
                />
                <Total
                  onChangeHandler={this.handleInputChange("total")}
                  value={this.state.total}
                  error={
                    this.state.total.length === 0
                      ? !!this.state.errorText
                      : false
                  }
                  helperText={
                    this.state.total
                      ? !!this.state.errorText
                      : this.state.errorText
                  }
                />
                <AmountPaid
                  onChangeHandler={this.handleInputChange("amountPaid")}
                  value={this.state.amountPaid}
                  error={
                    this.state.amountPaid.length === 0
                      ? !!this.state.errorText
                      : false
                  }
                  helperText={
                    this.state.amountPaid
                      ? !!this.state.errorText
                      : this.state.errorText
                  }
                />
                <BalanceDue
                  onChangeHandler={this.handleInputChange("balanceDue")}
                  value={this.state.balanceDue}
                  error={
                    this.state.balanceDue.length === 0
                      ? !!this.state.errorText
                      : false
                  }
                  helperText={
                    this.state.balanceDue
                      ? !!this.state.errorText
                      : this.state.errorText
                  }
                />
              </Grid>
            </StyledInvoiceBalance>
            <StyledButton
              onClick={this.handleFormSubmit}
              variant="contained"
              style={{ background: "#4fc878" }}
              //color="primary"
            >
              Generate
            </StyledButton>
          </div>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(CreateInvoiceForm2);
