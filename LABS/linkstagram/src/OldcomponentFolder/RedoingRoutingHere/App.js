import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import app from "./firebase";

import Home from "./Home";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

class App extends Component {
  state = { 
      loading: true, 
      authenticated: false, 
      user: null, 
      uid: null
    };

   
    
      componentDidMount() {
        auth.onAuthStateChanged(user => {
          if (user) {
            window.localStorage.setItem(storageKey, user.uid);
            this.setState({ 
                uid: user.uid,
                authenticated: true,
                currentUser: user,
                loading: false
             });
          } else {
            window.localStorage.removeItem(storageKey);
            this.setState({ 
                uid: null,
                authenticated: false,
                currentUser: null,
                loading: false
            });
          }
        });
      }
   
 
 
   

    render() {
        const { loading } = this.state;

        if (loading) {
          return <p>Loading..</p>;
        }
        return (
          <BrowserRouter>
            <Match exactly pattern="/" component={HomePage} />
            <Match pattern="/login" component={Login} />
            <MatchWhenAuthorized pattern="/protected" component={ProtectedPage} />
          </BrowserRouter>
        );
      }
    }
    
    const MatchWhenAuthorized = ({ component: Component, ...rest }) => (
      <Match
        {...rest}
        render={renderProps =>
          isAuthenticated() ? (
            <Component {...renderProps} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: renderProps.location },
              }}
            />
          )
        }
      />
    );
export default App;