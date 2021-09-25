import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import ReduxPromise from 'redux-promise';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import AccountCreation from './Component/AccountCreation';
import AccountLogin from './Component/AccountLogin';
import LoanList from './Component/LoanList';
import Settings from './Component/Settings';
import LoanCreate from './Component/LoanCreate';
import EditLoan from './Component/EditLoan';
import AddAssignment from './Component/AddAssignment';
import StripeWrapper from './Component/StripeBilling/StripeWrapper';
import OpenLoans from './Component/OpenLoans';
import ClosedLoans from './Component/ClosedLoans';
import MyLoans from './Component/MyLoans';
import BorrowerSettings from './Component/BorrowerSettings';
import PasswordReset from './Component/PasswordReset';
import LearnMore from './Component/LearnMore';
import ClientSelectedLoan from './Component/ClientSelectedLoan';
import registerServiceWorker from './registerServiceWorker';
import EditAssignment from './Component/EditAssignment';
import EditPhase from './Component//EditPhase';

// import rootReducers from './Reducers';

// const configureStore = applyMiddleware(ReduxPromise)(createStore);
// const store = configureStore(
//   rootReducers,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// );

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/new_account" component={AccountCreation} />
      <Route path="/login_user" component={AccountLogin} />
      <Route path="/loan_list" component={LoanList} />
      <Route path="/create_loan" component={LoanCreate} />
      <Route path="/open_loans" component={OpenLoans} />
      <Route path="/closed_loans" component={ClosedLoans} />
      <Route path="/billing" component={StripeWrapper} />
      <Route path="/settings" component={Settings} />
      <Route path="/my_loans" component={MyLoans} />
      <Route path="/my_loan/:loanID" component={ClientSelectedLoan} />
      <Route path="/user_settings" component={BorrowerSettings} />
      <Route path="/learn_more" component={LearnMore} />
      <Route path="/password_reset" component={PasswordReset} />
      <Route path="/edit_loan" component={EditLoan} />
      <Route path="/add_assignment" component={AddAssignment} />
      <Route path="/edit_assignment" component={EditAssignment} />
      <Route path="/edit_phase" component={EditPhase} />
    </div>
  </Router>,
  document.getElementById('root'),
);
registerServiceWorker();
