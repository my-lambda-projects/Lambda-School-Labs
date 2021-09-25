import React, { useState } from 'react';
import { adminDashboardTabs } from '../../../../data';
import TabList from './TabList';
import Display from './Display';
import {DashboardWrap, TabsWrap, DisplayWrap} from '../mainStyle/styledComponent.js';

function Dashboard() {
const [tabColor, setTabColor] = useState("transparent");


  return (
    <DashboardWrap>
      <TabsWrap>
        <TabList tabs={adminDashboardTabs} tabColor={tabColor} setTabColor={setTabColor} />
      </TabsWrap>

      <DisplayWrap>
          <Display  />
      </DisplayWrap>
    </DashboardWrap>
  )
}


export default Dashboard;