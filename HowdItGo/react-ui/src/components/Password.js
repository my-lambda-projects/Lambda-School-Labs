import React from 'react';

import PasswordChangeForm from './PasswordChange';
import LeftNavigation from './LeftNav';
import './password.css';

const PasswordPage = () => (
  <div className="page">
    <div>
      <LeftNavigation />
    </div>
    <div className="content">
      <div>
        <h1>Password Change</h1>
      </div>

      <PasswordChangeForm />
    </div>
  </div>
);

export default PasswordPage;
