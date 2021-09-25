import React from 'react';
import NavBar from './header/NavBar';
import Dashboard from './main/Dashboard';

import './mainStyle/components.scss';

function Index() {

  return (
    <div className='dashboardContainer'>
      <NavBar />
      <Dashboard />
    </div>
  )
}

export default Index;