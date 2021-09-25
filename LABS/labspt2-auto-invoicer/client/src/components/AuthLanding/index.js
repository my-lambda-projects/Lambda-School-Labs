import React from 'react';

const AuthLanding = props => {
  return (
    <ul className="auth-container">
      {/* <button className="authentication-btns" onClick={props.signUpModal}>
        Sign Up
      </button> */}
      <button className="authentication-btns" onClick={props.signInModal}>
        Sign In
      </button>
    </ul>
  );
};

export default AuthLanding;
