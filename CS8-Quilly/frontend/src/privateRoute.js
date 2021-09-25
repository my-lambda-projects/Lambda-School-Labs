import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
  let validated = rest.isAuthenticated;
  return (
    <Route {...rest} render={(props) => validated === true ?
      <Component {...props} /> : <Redirect to={{pathname: '/', state: {from: props.location}}} />} />
    )};

export default PrivateRoute;
