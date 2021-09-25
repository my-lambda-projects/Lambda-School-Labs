import React from 'react';
import Sidebar from '../components/sidebar/sidebar';
import Settings from '../components/settings/settings';
import Signout from '../components/signout/signout';

const Settingspage = (props) => {
  return (
    <div className="pageContainer">
      <Sidebar />
      <div className="pageBackground">
        <Signout {...props} />
        <h1 className="pageHeader">Settings</h1>
        <Settings />
      </div>
    </div>
  );
};

export default Settingspage;
