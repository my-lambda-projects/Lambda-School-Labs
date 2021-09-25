import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { FamilyConsumer } from "./FamilyContext";

const PrivateRoute = ({ component: Component,  ...rest }) => {
  return (
    <FamilyConsumer>
      {context => (
        <Route
          {...rest}
          render={props => {
            if (!context.auth.isAuthenticated()) return context.auth.login();

            return <Component {...context} {...props} />;
          }}
        />
      )}
    </FamilyConsumer>
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

PrivateRoute.defaultProps = {
  scopes: []
};

export default PrivateRoute;
