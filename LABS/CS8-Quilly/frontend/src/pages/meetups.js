import React from 'react';
import Sidebar from '../components/sidebar/sidebar';
import Meetup from '../components/meetup/meetup';
import Signout from '../components/signout/signout';

const Meetupspage = (props) => {
  return (
    <div className="pageContainer">
      <Sidebar />
      <div className="pageBackground">
        <Signout {...props} />
        <h1 className="pageHeader">Meetups</h1>
        <Meetup />
      </div>
    </div>
  );
};

export default Meetupspage;
