import React from 'react';
import Sidebar from '../components/sidebar/sidebar';
import Signout from '../components/signout/signout';
import ResumeView from '../components/resumeView/resumeView'

const Resumespage = (props) => {
  return (
    <div className="pageContainer">
      <Sidebar />
      <div className="pageBackground">
        <Signout {...props} />
        <ResumeView />
      </div>
    </div>
  );
}

export default Resumespage;
