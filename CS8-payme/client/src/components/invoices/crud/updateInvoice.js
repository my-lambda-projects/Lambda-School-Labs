import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateInvoice } from '../../../actions/invoices';

class UpdateInvoice extends Component {
  handleFormSubmit = event => {
    event.preventDefault();
    const info = new FormData(event.target);
    info.append('filename', event.target.file.name);
    this.props.updateInvoice(info, this.props.history);
  };

  render() {
    const { invoice } = this.props;
    const email = invoice.email ? invoice.email.address : '';
    const phone = invoice.phone ? invoice.phone.number : '';
    const url = `http://localhost:5000/api/getpdf/${invoice._id}`;
    return (
      <div className="invoice-update">
        <div className="invoice-update-form">
          <h1 className="invoice-update-title">Update Invoice</h1>
          <form className="add-invoice" onSubmit={this.handleFormSubmit}>
            <div className="invoice-update-flex">
              <p>Client Name</p>
              <input
                name="clientName"
                defaultValue={invoice.clientName}
                className="invoice-update_field"
                placeholder="Name"
              />
            </div>
            <div className="invoice-update-flex">
              <p>Company Name</p>
              <input
                name="companyName"
                defaultValue={invoice.companyName}
                className="invoice-update_field"
                placeholder="Company"
              />
            </div>
            <div className="invoice-update-flex">
              <p>Email</p>
              <input
                type="email"
                name="email"
                defaultValue={email}
                className="invoice-update_field"
                placeholder="Email"
              />
            </div>
            <div className="invoice-update-flex">
              <p>Phone Number</p>
              <input
                name="phone"
                defaultValue={phone}
                className="invoice-update_field"
                placeholder="Phone Number"
              />
            </div>
            <div className="invoice-update-flex">
              <p>Invoice Number</p>
              <input
                type="number"
                name="number"
                defaultValue={invoice.number}
                className="invoice-update_field"
                placeholder="Invoice Number"
              />
            </div>
            <div className="invoice-update-flex">
              <p>Total Amount</p>
              <input
                type="string"
                name="totalAmount"
                defaultValue={(invoice.totalAmount / 100).toFixed(2)}
                className="invoice-update_field"
                placeholder="Invoice Number"
              />
            </div>
            <div className="invoice-update-flex">
              <p>Current PDF</p>
              <a className="invoice-update_field--pdf_input" href={url} target="_blank">
                {' '}
                Current PDF
              </a>
            </div>
            <div className="invoice-update-flex">
              <p>New PDF</p>
              <input
                type="file"
                name="file"
                accept="application/pdf"
                className="invoice-update_field--newpdf"
              />
            </div>
            <button className="invoice-update_submit" type="submit" defaultValue="Submit">
              Update Invoice
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    invoice: state.invoice.currentInvoice,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { updateInvoice },
  )(UpdateInvoice),
);
