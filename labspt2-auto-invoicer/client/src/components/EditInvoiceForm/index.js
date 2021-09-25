import React, { Component } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";

import AddLogo from "../reusableComponents/AddLogo";
import SingleInput from "../reusableComponents/SingleInput";
import TextArea from "../reusableComponents/TextArea";

import { FetchInvoice } from "../../graphQL/queries/invoices";
import { EditAmountPaid } from "../../graphQL/mutations/invoices";

import "./EditInvoiceForm.css";
import "react-day-picker/lib/style.css";

export default class EditInvoiceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice: {},
      amountPaid: ""
    };
  }

  async componentDidMount() {
    try {
      const returnedData = `
      _id
      invoiceNumber
      companyName
      userName
      languageSelection
      currencySelection
      addressFrom
      addressTo
      cityTo
      stateRegionTo
      zipCodeTo
      clientEmailTo
      selectedDate
      invoiceDueDate
      balanceDue
      subtotal
      discount
      tax
      shipping
      total
      amountPaid
      invoiceNotes
      invoiceTerms
      `;
      const { invoiceID } = this.props.match.params;
      const invoice = await FetchInvoice(invoiceID, returnedData);
      this.setState({ ...invoice, amountPaid: invoice.amountPaid });
    } catch (error) {
      throw error;
    }
  }

  handleFormSubmit = async e => {
    e.preventDefault();
    await EditAmountPaid(
      this.state.invoice._id,
      this.state.amountPaid,
      "amountPaid"
    );
    await this.props.fetchInvoices();
    this.props.history.push(`/user/${this.props.userID}/invoices`);
  };

  handleAmountPaidChange = e => {
    this.setState({ amountPaid: e.target.value });
  };

  render() {
    return (
      <div>
        EDIT Invoice Form.
        <div className="main-container">
          Main Container
          <section className="top-section">
            <div className="top-section-top">
              <div>*Thank you Message*</div>
              <div>
                <AddLogo />
              </div>
            </div>
            <div className="top-section-bottom">
              <div>
                <form onSubmit={this.handleFormSubmit}>
                  <div>Invoice No.</div>
                  <SingleInput
                    inputType="number"
                    // title={"Invoice Number"}
                    name="invoiceNumber"
                    controlFunc={this.handleInputChange}
                    content={this.state.invoice.invoiceNumber}
                    placeholder="# Invoice Number"
                  />
                </form>
              </div>
              <div>
                <form>
                  <div>Language</div>
                  {/* <Select
                    name="languageSelection"
                    placeholder="Choose Your Language of Choice"
                    controlFunc={this.handleInputChange}
                    options={this.state.languageOptions}
                    selectedOption={this.state.languageSelection}
                  /> */}
                </form>
              </div>
              <div>
                <form>
                  <div>Currency</div>
                  {/* <Select
                    name="currencySelection"
                    placeholder="Choose Your Currency"
                    controlFunc={this.handleInputChange}
                    options={this.state.currencyOptions}
                    selectedOption={this.state.currencySelection}
                  /> */}
                </form>
              </div>
            </div>
          </section>
          <section className="mid-section">
            <div className="mid-section-left">
              <div className="address-from">
                <form onSubmit={this.handleFormSubmit}>
                  <div>FROM</div>
                  <TextArea
                    inputType="text"
                    // title={"Invoice From"}
                    rows={5}
                    resize={false}
                    name="addressFrom"
                    controlFunc={this.handleInputChange}
                    content={this.state.invoice.addressFrom}
                    placeholder={
                      "Your Business, Inc. \nYour Address \nCity, State/Region, \nYour Country"
                    }
                  />
                </form>
              </div>
              <div>
                <form onSubmit={this.handleFormSubmit}>
                  <div>TO</div>
                  <div>
                    <div>Street Address</div>
                    <SingleInput
                      inputType="text"
                      // title={"Invoice Number"}
                      name="addressTo"
                      controlFunc={this.handleInputChange}
                      content={this.state.invoice.addressTo}
                      placeholder="Client Street Address"
                    />
                  </div>
                  <div>
                    <div>City</div>
                    <SingleInput
                      inputType="text"
                      // title={"Invoice Number"}
                      name="cityTo"
                      controlFunc={this.handleInputChange}
                      content={this.state.invoice.cityTo}
                      placeholder="Client City"
                    />
                  </div>
                  <div>
                    <div>State or Region</div>
                    <SingleInput
                      inputType="text"
                      // title={"Invoice Number"}
                      name="stateRegionTo"
                      controlFunc={this.handleInputChange}
                      content={this.state.invoice.stateRegionTo}
                      placeholder="Client State or Region"
                    />
                  </div>
                  <div>
                    <div>Zip Code</div>
                    <SingleInput
                      inputType="number"
                      // title={"Invoice Number"}
                      name="zipCodeTo"
                      controlFunc={this.handleZipCodeToChange}
                      content={this.state.invoice.zipCodeTo}
                      placeholder="Client Zip Code"
                    />
                  </div>
                  <div>
                    <div>Client Email</div>
                    <SingleInput
                      inputType="text"
                      // title={"Invoice Number"}
                      name="clientEmailTo"
                      controlFunc={this.handleInputChange}
                      content={this.state.invoice.clientEmailTo}
                      placeholder="Client Email"
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="mid-section-right">
              <div>
                <form onSubmit={this.handleFormSubmit}>
                  <div>Date</div>

                  <div>
                    <DayPickerInput
                      name="selectedDate"
                      onDayChange={this.handleSelectedDateChange}
                      placeholder="Today's Date"
                    />
                  </div>
                </form>
              </div>
              <div>
                <form>
                  <div>Invoice Due</div>

                  <div>
                    <DayPickerInput
                      name="invoiceDueDate"
                      onDayChange={this.handleInvoiceDueDateChange}
                      placeholder="Invoice Due Date"
                    />
                  </div>
                </form>
              </div>
              <div>
                <form onSubmit={this.handleFormSubmit}>
                  <div>Balance Due</div>
                  <SingleInput
                    inputType="number"
                    // title={"Balance Due"}
                    name="balanceDue"
                    controlFunc={this.handleInputChange}
                    content={this.state.invoice.balanceDue}
                    placeholder="Balance Due"
                  />
                </form>
              </div>
            </div>
          </section>
          <section className="bottom-section">
            <div className="bottom-section-top">
              <form
                onSubmit={this.handleFormSubmit}
                onChange={this.handleInvoiceItemsInputChange}
              >
                {/* <InvoiceItemInput invoiceItems={this.state.invoiceItems} /> */}
                <button onClick={this.addInvoiceItem}>Add Line Item +</button>
              </form>
            </div>
            <div className="bottom-section-mid">
              <div className="bottom-section-bottom-left">
                <div>
                  <form onSubmit={this.handleFormSubmit}>
                    <div>Notes</div>
                    <TextArea
                      inputType="text"
                      // title={"Invoice Notes"}
                      rows={5}
                      resize={false}
                      name="invoiceNotes"
                      controlFunc={this.handleInputChange}
                      content={this.state.invoice.invoiceNotes}
                      placeholder="Invoice Notes"
                    />
                  </form>
                </div>
                <div>
                  <form onSubmit={this.handleFormSubmit}>
                    <div>Terms</div>
                    <TextArea
                      inputType="text"
                      // title={"Invoice Terms"}
                      rows={5}
                      resize={false}
                      name="invoiceTerms"
                      controlFunc={this.handleInputChange}
                      content={this.state.invoice.invoiceTerms}
                      placeholder="Invoice Terms"
                    />
                  </form>
                </div>
              </div>
              <div className="bottom-section-bottom-right">
                <div>
                  <div>Subtotal</div>
                  <form onSubmit={this.handleFormSubmit}>
                    <SingleInput
                      inputType="number"
                      // title={"Subtotal"}
                      name="subtotal"
                      controlFunc={this.handleInputChange}
                      content={this.state.invoice.subtotal}
                      placeholder="Subtotal"
                    />
                  </form>
                </div>
                <div>
                  <form onSubmit={this.handleFormSubmit}>
                    <div>Discount</div>
                    <SingleInput
                      inputType="number"
                      // title={"Discount"}
                      name="discount"
                      controlFunc={this.handleInputChange}
                      content={this.state.invoice.discount}
                      placeholder="Discount"
                    />
                  </form>
                </div>
                <div>
                  <form onSubmit={this.handleFormSubmit}>
                    <div>Tax</div>
                    <div>
                      {Math.round(this.state.invoice.tax * 100).toFixed(2) ||
                        "0.00"}{" "}
                      %
                    </div>
                  </form>
                </div>
                <div>
                  <form onSubmit={this.handleFormSubmit}>
                    <div>Shipping</div>
                    <SingleInput
                      inputType="number"
                      // title={"Shipping"}
                      name="shipping"
                      controlFunc={this.handleInputChange}
                      content={this.state.invoice.shipping}
                      placeholder="Shipping"
                    />
                  </form>
                </div>
                <div>
                  <form onSubmit={this.handleFormSubmit}>
                    <div>Total</div>
                    <SingleInput
                      inputType="number"
                      // title={"Total"}
                      name="total"
                      controlFunc={this.handleInputChange}
                      content={this.state.invoice.total}
                      placeholder="Total"
                    />
                  </form>
                </div>
                <div>
                  <form onSubmit={this.handleFormSubmit}>
                    <div>Amount Paid</div>
                    <SingleInput
                      inputType="number"
                      // title={"Amount Paid"}
                      name="amountPaid"
                      controlFunc={this.handleAmountPaidChange}
                      content={this.state.amountPaid}
                      placeholder="Amount Paid"
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className="bottom-section-bottom">
              <div>Email: example@company.com </div>
              <br />
              <div>Phone: +1-555-555-5555</div>
            </div>
          </section>
          <button
            type="button"
            className="btn btn-link float-left"
            onClick={this.handleFormSubmit}
          >
            UPDATE INVOICE
          </button>
          <footer className="footer">Footer</footer>
        </div>
      </div>
    );
  }
}
