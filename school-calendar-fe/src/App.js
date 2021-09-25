import React, {useState, useEffect} from 'react';
import { Route } from 'react-router-dom';
// import ReactGA from 'react-ga';
import { Stack } from '@chakra-ui/core';
import Authenticate from './components/landing-page/Authenticate';
import { useAuth } from './contexts/auth';
import Header from './components/landing-page/Header';
import PrivateRoute from './components/home/PrivateRoute';
import Welcome from './components/landing-page/Welcome';
import Loading from './components/landing-page/Loading';
import Home from './components/home/Home';
import Dashboard from './components/home/Dashboard.js';
import InviteeAddContactForm from './components/groups/InviteeAddContactForm';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'


// function initializeAnalytics() {
//   ReactGA.initialize('UA-157827018-1');
//   ReactGA.pageview('/home');
// }


function App() {
  const { googleApi } = useAuth();
  
  //holds the current user, mostly to stop problems with user's profile image from not populating correctly
  const [userState, setUserState] = useState({})
  let currentUser = googleApi.currentUser
  useEffect(()=>{
    setUserState(currentUser)
  },[currentUser])

  
  //display loading spinner while waiting for google api response
  if (googleApi.isLoading) {
    return <Loading />;
  }

  //if user is logged in
  if(googleApi.currentUser){
    return (
      <Stack pos="relative" w="100%" minHeight="100vh">
            {/* <Header userState={userState} /> */}
            <Route path="/">
              <Authenticate />
            </Route>
            {googleApi.currentUser && <Route exact path="/">
              <Welcome />
            </Route>}
            <PrivateRoute path="/:id/dashboard">
              <Home setUserState={setUserState}/>
            </PrivateRoute>
          </Stack>
    )
    //if the user is not logged in
  } else {

    return(
      <Stack pos="relative" w="100%" minHeight="100vh">
              <Header />
              <Route path="/authenticate/google">
                <Authenticate />
              </Route>
              <Route exact path="/">
                <Welcome />
              </Route>
              <Route exact path='/invitee/:groupInviteHash'>
                <InviteeAddContactForm />
              </Route>
              <PrivateRoute path="/:id/dashboard">
                <Dashboard />
              </PrivateRoute>
            </Stack>
    )
  }

}
export default App;
