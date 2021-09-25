import React from 'react';
import { Route, Switch, withRouter } from 'react-router';
import {
  LandingPage,
  Properties,
  Login,
  PostRegister,
  Settings,
  PropertyDetails,
  NewProperty,
  Guests,
  GuestDetail,
  NewGuest,
  Checkout,
  Assistants,
  AssistantDetails,
  InviteAst,
  Surveys,
  SurveyView,
  SurveyAnswers,
  GuestDashboard,
  GuestSurveys,
  SurveyResponse,
  FillSurvey,
  CreateSurvey,
  LinkLogin,
  GuestMap,
} from './pages/index';
import { Sidebar } from './components/index';
import './App.css';
import Billing from './pages/Billing/Billing';
import { UserContextProvider } from './UserContext';

const App = () => {
  return (
    <div className='App'>
      <UserContextProvider>
        <Sidebar />
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/assistants' component={Assistants} />
          <Route exact path='/assistants/:id' component={AssistantDetails} />
          <Route exact path='/billing' component={Billing} />
          <Route exact path='/checkout/:id' component={Checkout} />
          <Route exact path='/guests' component={Guests} />
          <Route exact path='/guests/new' component={NewGuest} />
          <Route exact path='/guests/:id' component={GuestDetail} />
          <Route exact path='/invite' component={InviteAst} />
          <Route exact path='/Login' component={Login} />
          <Route exact path='/postreg' component={PostRegister} />
          <Route exact path='/properties' component={Properties} />
          <Route exact path='/properties/new' component={NewProperty} />
          <Route exact path='/properties/:id' component={PropertyDetails} />
          <Route exact path='/settings' component={Settings} />
          <Route exact path='/surveys' component={Surveys} />
          <Route exact path='/surveys/:id' component={SurveyView} />
          <Route exact path='/surveys/:id/answers' component={SurveyAnswers} />
          <Route exact path='/guestdashboard/:id' component={GuestDashboard} />
          <Route exact path='/surveys/:id/responses' component={SurveyResponse} />
          <Route exact path='/createsurvey' component={CreateSurvey} />
          <Route exact path='/guestdashboard/:stayId/surveys' component={GuestSurveys} />
          <Route exact path='/guestdashboard/:stayId/surveys/:id/:surveyId/:staysurveyId' component={FillSurvey} />
          <Route path='/linklogin' component={LinkLogin} />
          <Route exact path='/guestmap/:id' component={GuestMap} />
        </Switch>
      </UserContextProvider>
    </div>
  );
};

export default withRouter(App);
