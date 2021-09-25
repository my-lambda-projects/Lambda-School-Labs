import React from 'react';

import ListOfPullRequests from './ListOfPullRequests';
import UserBar from './UserBar.js';
import SideBar from './SideBar';
import './App.css';


export default () => (
  <div className="App">
    <div className="side-navs">
      <SideBar />
      <UserBar />
    </div>
    <ListOfPullRequests />
  </div>
);
