import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { FamilyConsumer } from "./FamilyContext";

const PublicRoute = ({ component: Component, scopes,  ...rest }) => {
  return (
    <FamilyConsumer>
      {context => (
        <Route
          {...rest}
          render={props => <Component {...context} {...props} />
          }
        />
      )}
    </FamilyConsumer>
  );
};

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  scopes: PropTypes.array
};

PublicRoute.defaultProps = {
  scopes: []
};

export default PublicRoute;
