import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import UserDashboardHeader from './UserDashboardHeader';
import UserDashboard from './UserDashboard';
import RegisterStudentForm from './UserForms/RegisterStudentForm';
import UserSettings from './UserSettings';
import UserSettingsEdit from './UserSettingsEdit';
import Footer from '../../marketing/components/Footer';
import EndTest from './placementTest/EndTest';

import '../userDashboard.scss';

function Index() {
  let { path } = useRouteMatch();
  return (
    <div className="userContent">
      <UserDashboardHeader />
      <Switch>
        <Route exact path={path}>
          <UserDashboard />
        </Route>
        <Route path={`${path}/student-register`}>
          <RegisterStudentForm />
        </Route>
        <Route exact path={`${path}/account-settings`}>
          <UserSettings />
        </Route>
        <Route path={`${path}/account-settings/edit`}>
          <UserSettingsEdit />
        </Route>
        <Route path={`${path}/endtest`}>
          <EndTest />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default Index;
