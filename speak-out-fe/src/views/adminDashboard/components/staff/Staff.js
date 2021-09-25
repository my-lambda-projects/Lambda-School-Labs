import React, { useState } from 'react';
import StaffTable from './StaffTable';
import StaffCard from './staffCard/StaffCard';
import { Switch, Route } from 'react-router-dom';

const Staff = props => {
  return(
    <Switch>
      <Route exact path='/dashboard/staff'>
        <StaffTable />
      </Route>
      <Route path='/dashboard/staff/:staffID'>
        <StaffCard />
      </Route>
    </Switch>
  )
};

export default Staff;
