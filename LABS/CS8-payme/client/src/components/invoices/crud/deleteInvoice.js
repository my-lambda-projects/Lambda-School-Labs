/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteInvoice } from '../../../actions/invoices';

const DeleteInvoice = (props) => {
  return (
    <div className='DeleteModal'>
      <div className='DeleteModal-Box'>
        <p> Are you sure you want to delete this? </p>
        <Link to='/invoices'>
          <button
            type='button'
            onClick={() => {
              props.deleteInvoice(props.id, props.history);
            }}
            className='DeleteModal-Box-Delete'
          >
          Delete
          </button>
        </Link>
        <button
          type='button'
          onClick={() => {
            props.toggleModal();
          }}
          className="NoDelete"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default connect(null, { deleteInvoice })(DeleteInvoice);
/* eslint-enable */
