import React from 'react';

const styles = {
  backgroundColor: 'rgb(45, 45, 45)',
  color: 'white',
  border: 'none',
  fontSize: '1.5rem',
  height: '6rem',
  boxShadow: 'none',
};

const HomeNav = (props) => {
  return (
    <div className="invoice-navigation">
      <div className="invoice-search">
        <input
          type="text"
          placeholder="Search Invoices"
          className="invoice-search_input"
          value={props.search}
          onChange={props.updateSearch}
        />
        <div className="invoice-search-icon">
          <i className="fas fa-search" />
        </div>
      </div>
      <hr className="navigation-line" />
      <div onClick={props.addInvoiceCheck}>
        <p className="invoice-new">
          Add Invoice
          <i className="fas fa-plus fa-fw" />
        </p>
      </div>
      <hr className="navigation-line" />
      <div className="ui compact menu" style={{ border: 'none', boxShadow: 'none' }}>
        <div className="ui simple dropdown item" style={styles}>
          Sort
          <i className="fas fa-sort fa-fw" />
          <div className="menu" style={{ fontSize: '1.3rem' }}>
            <div className="item" onClick={() => props.sortData('amount')}>
              Total Amount
            </div>
            <div className="item" onClick={() => props.sortData('clientName')}>
              ClientName
            </div>
          </div>
        </div>
      </div>
      <hr className="navigation-line" />
      <div className="ui compact menu" style={{ border: 'none', display: props.display, boxShadow: 'none' }}>
        <div className=" try ui simple dropdown item" style={styles}>
          View
          <i className="fas fa-eye fa-fw" />
          <div className="menu" style={{ paddingTop: '0', fontSize: '1.3rem' }}>
            <div className="item" onClick={props.listView}>
              List
            </div>
            <div className="item" onClick={props.boxView}>
              Box
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeNav;
