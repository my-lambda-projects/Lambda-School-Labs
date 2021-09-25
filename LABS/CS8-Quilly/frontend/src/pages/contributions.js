import React from 'react';
import Sidebar from '../components/sidebar/sidebar';
import Contribution from '../components/contribution/contribution';
import Signout from '../components/signout/signout';

const Contributionspage = (props) => {
  return (
    <div className="pageContainer">
      <Sidebar />
      <div className="pageBackground">
        <Signout {...props} />
        <h1 className="pageHeader">Contributions</h1>
        <Contribution />
      </div>
    </div>
  );
};

export default Contributionspage;
