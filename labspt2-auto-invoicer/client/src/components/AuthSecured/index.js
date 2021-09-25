import React from "react";

// react router dom
import { Link } from "react-router-dom";
import { CompanyConsumer } from "../../contexts/CompanyContext";

const AuthSecured = props => {
  return (
    <CompanyConsumer>
      {({companyState: {credits, unlimited_tier}}) => {
        const plan = unlimited_tier ? "1 Month Unlimited" : credits
        return (
          <ul className="auth-container">
            <p className="credits">Credits: {plan}</p>
            <Link to="/" id="signOut" onClick={props.signOut}>
              Sign Out
            </Link>
          </ul>
        )
      }}
    </CompanyConsumer>
    
  );
};

export default AuthSecured;
