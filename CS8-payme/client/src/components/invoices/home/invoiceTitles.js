import React from 'react';

const InvoiceTitles = () => {
  return (
    <div className="invoice-list">
      <div className="invoice-list-box">
        <p>Invoice Number</p>
      </div>
      <div className="invoice-list-box">
        <p>Client Name</p>
      </div>
      <div className="invoice-list-box">
        <p>Company Name</p>
      </div>
      <div className="invoice-list-box">
        <p>PDF</p>
      </div>
      <div className="invoice-list-box">
        <p>Reminder</p>
      </div>
    </div>
  );
};

export default InvoiceTitles;
