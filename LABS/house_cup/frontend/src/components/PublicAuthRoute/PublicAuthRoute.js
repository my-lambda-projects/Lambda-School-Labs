/* eslint-disable */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicAuthRoute = ({ component: Component, ...rest }) => {

  const token = localStorage.getItem('token');
  const isAuthenticated =  !!token;
  
  const componentToRender = (props) => {
    if (isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: { from: props.location }
          }}
        />
      );
    }

    return <Component {...props} />;
  };

  return <Route {...rest} render={componentToRender} />;

};


export default PublicAuthRoute;
