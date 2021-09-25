import React from 'react';
import {Redirect, Route} from 'react-router';
import {useStateValue} from '../hooks/useStateValue';

export const OrganizationRoute = ({component: Component, ...rest}) => {
  
  const [state] = useStateValue();
  
  return (<Route
    {...rest}
    render={props => {
      return (localStorage.getItem('loggedIn') === 'true' &&
        localStorage.getItem('createdOrg') === 'true') ?
        <Component {...props}/> : <Redirect to={'/dashboard'}/>;
    }}
  />);
};

export default OrganizationRoute;