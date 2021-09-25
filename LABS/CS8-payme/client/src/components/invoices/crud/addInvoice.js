import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Sidebar from '../../sidebar';
import { addInvoice } from '../../../actions/invoices';

class AddInvoice extends Component {
  // state = {
  //   remind: '',
  // };

  // handleRemind = e => {
  //   this.setState({ remind: e.target.value });

  // };

  handleFormSubmit = event => {
    event.preventDefault();
    const info = new FormData(event.target);
    info.append('filename', event.target.file.name);
    this.props.addInvoice(info, this.props.history);
  };

  render() {
    // console.log(this.state.remind);
    return (
      <div className="invoice">
        <Sidebar />
        <Link to="invoices">
          <p>
            <i className="fas fa-arrow-left add fa-fw" />
          </p>
        </Link>
        <div className="invoice-form">
          <h1>Add Invoice</h1>
          <form className="add-invoice" onSubmit={this.handleFormSubmit}>
            <input name="clientName" className="add-invoice_field" placeholder="Name" />
            <br />
            <input name="companyName" className="add-invoice_field" placeholder="Company" />
            <br />
            <input name="email" className="add-invoice_field" placeholder="Email" />
            <br />
            <input type="number" name="phone" className="add-invoice_field" placeholder="Phone" />
            <br />
            <input
              type="number"
              name="number"
              className="add-invoice_field"
              placeholder="Invoice Number"
            />
            <br />
            <input
              type="string"
              name="totalAmount"
              className="add-invoice_field"
              placeholder="Total Amount"
            />
            <br />
            <div className="reminder-radios">
              <div className="reminder-select">
                <label>Daily</label>
                <input
                  name="remind"
                  type="radio"
                  value="daily"
                  // checked={this.state.remind === 'daily'}
                  onChange={this.handleRemind}
                />
              </div>
              <div>
                <label>Weekly</label>
                <input
                  name="remind"
                  type="radio"
                  value="weekly"
                  // checked={this.state.remind === 'weekly'}
                  onChange={this.handleRemind}
                />
              </div>
              <div>
                <label>Monthy</label>
                <input
                  name="remind"
                  type="radio"
                  value="monthly"
                  // checked={this.state.remind === 'monthly'}
                  onChange={this.handleRemind}
                />
              </div>
            </div>

            <input type="file" name="file" className="add-invoice_field" />
            <button className="add-invoice_submit" type="submit">
              Add Invoice
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addInvoice },
)(AddInvoice);
