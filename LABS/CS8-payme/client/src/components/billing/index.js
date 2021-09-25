import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../sidebar';
import AdminBilling from './AdminBilling';

class Billing extends Component {
  state = {};

  getSub() {
    const subInMS = this.props.admin.subscription;
    if (new Date().getTime() - subInMS > 0) {
      return 'EXPIRED';
    }
    const date = new Date(subInMS).toDateString();
    return date;
  }

  render() {
    return (
      <div className="billing">
        <Sidebar />
        <div className="billing-container">
          <div className="billing-navigation">
            <div className="billing-navigation_container">
              <p className="billing-navigation_data_title">Sub Expiration:</p>
              <p className="billing-navigation_data"> {this.getSub()}</p>
            </div>
            <div className="billing-navigation_container">
              <p className="billing-navigation_data_title">Invoice Credits: </p>
              <p className="billing-navigation_data"> {this.props.admin.invoiceCredits}</p>
            </div>
            <div className="billing-navigation_container">
              <p className="billing-navigation_data_title">Free Invoice Avaliable:</p>
              <p className="billing-navigation_data">
                {this.props.admin.invoices && this.props.admin.invoices.length === 0 ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
          <AdminBilling />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    admin: state.auth.admin,
  };
};

export default connect(mapStateToProps)(Billing);
