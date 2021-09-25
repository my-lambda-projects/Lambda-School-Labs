import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import BillingPage from './components/BillingPage';
import Login from './components/Login';
import Footer from './components/Footer';
import SearchResult from './components/SearchResult';
import UpdateUser from './components/UpdateUser';
import UpdatePassword from './components/UpdatePassword';
import UserProfile from './components/UserProfile';
import RegisterForm from './components/RegisterForm';
import EditReview from './components/EditReview';

const StyledContainer = styled.div`
  margin: 0 auto;
`;

function App() {
  // outline ring css property is disabled UNLESS a user hits the tab key- // this is for removing that unsightly focus ring but not disabling it
  // entirely so as to perserve the accessability for mouse-less users.

  function handleFirstTab(e) {
    if (e.keyCode === 9) {
      // tab key
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);
  return (
    <div className="App">
      <StyledContainer className="container">
        <Route exact path="/" component={LandingPage} />
        <Route path="/billing" component={BillingPage} />
        <Route path="/updateuser" component={UpdateUser} />
        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/updatepassword" component={UpdatePassword} />
        <Route
          path="/business/:id"
          render={props => <SearchResult {...props} />}
        />
        <Route
          exact
          path="/user/:id"
          render={props => <UserProfile {...props} />}
        />
        <Route
          path="/user/review/:reviewId"
          render={props => <EditReview {...props} />}
        />
        <Route path="/register" component={RegisterForm} />
      </StyledContainer>
      <Footer />
    </div>
  );
}

export default App;
