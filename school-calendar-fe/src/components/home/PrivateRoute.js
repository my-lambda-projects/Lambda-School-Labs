import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

// Redirect to Welcome page if not authenticated
const PrivateRoute = ({ children, ...rest }) => {
  const { googleApi } = useAuth();
  const { isAuthenticated } = googleApi;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: `/`,
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
