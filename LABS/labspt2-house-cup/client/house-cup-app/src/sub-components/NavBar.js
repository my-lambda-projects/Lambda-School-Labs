import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import auth from '../utils/Auth.js';

function NavBar(props) {
  const signOut = () => {
    auth.logout();
    props.history.replace('/');
  };

  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/">
           House-Cup
      </Link>

      {
        !auth.isAuthenticated() &&
        <button className="btn btn-dark" onClick={auth.login}>Sign In</button>
      }
      
      {
        auth.isAuthenticated() &&
        <div>
          <label className="mr-2 text-white">{auth.getProfile().name}</label>
          <button className="btn btn-dark" onClick={() => {signOut()}}>Sign Out</button>
        </div>
      }
    </nav>
  );
}

export default withRouter(NavBar);
