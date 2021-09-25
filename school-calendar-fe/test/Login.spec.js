import React from 'react';

import { render, cleanup } from '@testing-library/react';

import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import Login from '../components/Splash/LoginBar';

afterEach(cleanup);

describe('testing for state in Login', () => {
  const { getByTestId, findByTestId } = render(
    <AuthProvider>
      <Router>
        <Login />
      </Router>
    </AuthProvider>
  );

  it('shows sign in text', () => {
    const button = getByTestId('signBtn');
    expect(button).toHaveTextContent('sign in');
  });

  it.skip('should have required password input', () => {
    const password = findByTestId('loginPassword');
    expect(password).toBeRequired();
  });
});
