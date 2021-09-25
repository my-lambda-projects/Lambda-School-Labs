import React from 'react';
import {Redirect, Route} from 'react-router';
import {useStateValue} from '../hooks/useStateValue';

export const RegisteredAndLoggedInRoute = ({
  component: Component,
  width,
  ...rest
}) => {
  const [state] = useStateValue();
  return (
    <Route
      {...rest}
      render={props => {
        return (localStorage.getItem('loggedIn') === 'true' &&
          localStorage.getItem('userRegistered') === 'true') ? (
          <Component {...props} width={width} />
        ) : (
          <Redirect to={'/register'}/>
        );
      }}
    />
  );
};

export default RegisteredAndLoggedInRoute;
