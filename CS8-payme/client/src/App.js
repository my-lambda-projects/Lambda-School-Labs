import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import authentication related pages
import Landing from './components/landing/landing';
import Signin from './components/Auth/signin';
import EnterCode from './components/Auth/codeVerification';
import Signup from './components/Auth/signup';
import Settings from './components/settings';
import NotFound from './components/Auth/notFound.js';

// Import dashboard pages
import Reminders from './components/reminders/reminders';
import Invoices from './components/invoices/home';
import PDF from './components/invoices/home/pdf';
import Billing from './components/billing';
import AddInvoice from './components/invoices/crud/addInvoice';
import ViewInvoice from './components/invoices/crud/viewInvoice';
import UpdateInvoice from './components/invoices/crud/updateInvoice';
import ClientBilling from './components/payInvoice/ClientBilling';

// Import higher order components
import RequireAuth from './hoc/requireAuth';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signin/entercode" component={EnterCode} />
        <Route path="/signup" component={Signup} />
        <Route path="/reminders" component={RequireAuth(Reminders)} />
        <Route path="/settings" component={RequireAuth(Settings)} />
        <Route path="/billing" component={RequireAuth(Billing)} />
        <Route path="/invoices" component={RequireAuth(Invoices)} />
        <Route path="/addInvoice" component={RequireAuth(AddInvoice)} />
        <Route path="/invoice/:id" component={RequireAuth(ViewInvoice)} />
        <Route path="/updateinvoice" component={RequireAuth(UpdateInvoice)} />
        <Route path="/pdf" component={RequireAuth(PDF)} />
        <Route path="/payinvoice/:id" component={ClientBilling} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
