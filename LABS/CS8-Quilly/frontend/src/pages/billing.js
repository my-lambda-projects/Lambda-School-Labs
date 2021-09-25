import React from 'react';
import Sidebar from '../components/sidebar/sidebar';
import Billing from '../components/billing/billing';
import Signout from '../components/signout/signout';

const Billingpage = (props) => {
  return (
    <div className="pageContainer">
      <Sidebar />
      <div className="pageBackground">
        <Signout {...props} />
        <h1 className="pageHeader">Billing</h1>
        <Billing />
      </div>
    </div>
  );
};

export default Billingpage;
