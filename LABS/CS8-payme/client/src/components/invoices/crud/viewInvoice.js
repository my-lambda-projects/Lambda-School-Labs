import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleInvoiceIdx, getAllInvoices, getInvoice } from '../../../actions/invoices';

import Sidebar from '../../sidebar';
import DeleteInvoice from './deleteInvoice';
import UpdateInvoice from './updateInvoice';
import ViewExport from './viewexport';

class ViewInvoice extends Component {
  state = { 
    modalTrigger: false,
    updateField: false,
  }

  showUpdate = () => {
    this.setState({ updateField: !this.state.updateField });
  }
  toggleModal = _ => {
    this.setState({ modalTrigger: !this.state.modalTrigger });
  };

  render() {

    const { invoice } = this.props;
    const params = this.props.match.params.id;
    if (!invoice) {
      this.props.getInvoice(params);
    }
    return (
      <div className="view-invoice">
        <Sidebar />
        <div className="view-invoice-main">
          <div className="view-invoice-navigation">
            <p className="view-invoice-navigation_delete" onClick={() => this.toggleModal()}>Delete <i className="far fa-trash-alt fa-fw" /><br />Invoice</p>
            <hr className="navigation-line" />
            <p className="view-invoice-navigation_update"
                onClick={() => this.showUpdate()}
              >
              Update
              <i className="fas fa-pen-square fa-fw" />
              <br />
              Invoice
            </p>
          </div>
          <Link to="/invoices"><p><i className="fas fa-arrow-left update fa-fw" /></p></Link>
          {invoice ? (
            <div>
              {!this.state.updateField ? (
                <ViewExport invoice={invoice} url={`http://localhost:5000/api/getpdf/${invoice._id}`}/>
              ) : <UpdateInvoice /> }
              {this.state.modalTrigger ? (
                <div>
                  <DeleteInvoice
                    toggleModal={this.toggleModal}
                    handleDeleteNote={this.props.handleDeleteNote}
                    id={invoice.number}
                    history={this.props.history}
                  />
                </div>
              ) : null}
            </div>
          ) : <div className="loader">Loading..</div> }
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

export default connect(mapStateToProps, { handleInvoiceIdx, getInvoice, getAllInvoices })(ViewInvoice);
