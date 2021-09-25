import React from 'react';
import './signout.css';

const SignOutButton = () => (
  <button
    className="button"
    type="button"
    onClick={() => console.log('signed out')}
  >
    Sign Out
  </button>
);

export default SignOutButton;
