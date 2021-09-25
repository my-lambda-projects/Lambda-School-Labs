import React from "react";
import { Redirect, Route } from "react-router";
import { useStateValue } from "../hooks/useStateValue";

export const LoginRoute = ( { component: Component, ...rest } ) => {
  const [ state ] = useStateValue();
  
  return ( <Route
    { ...rest }
    render={ props => {
      return localStorage.getItem("loggedIn") === "true" ? <Redirect to={ "/dashboard" }/> :
        <Component { ...props }/>;
    } }
  /> );
};

export default LoginRoute;