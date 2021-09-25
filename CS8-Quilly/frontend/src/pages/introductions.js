import React from 'react';
import Sidebar from '../components/sidebar/sidebar';
import Introductions from '../components/introduction/introduction.js';

const Introductionspage = () => {
    return (
      <div className="pageContainer">
        <Sidebar />
        <div className="pageBackground">
          <h1 className="pageHeader">Introductions</h1>
          <Introductions />
        </div>
      </div>
    );
}

export default Introductionspage;
