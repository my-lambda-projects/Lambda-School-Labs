import React from 'react';

import { render, cleanup } from '@testing-library/react';

import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import RegisterModal from '../components/Splash/RegisterModal';

afterEach(cleanup);

describe('testing for state in Register', () => {
  const { getByTestId } = render(
    <AuthProvider>
      <Router>
        <RegisterModal />
      </Router>
    </AuthProvider>
  );

  it('shows register btn text', () => {
    const button = getByTestId('registerBtn');
    expect(button).toHaveTextContent('Register');
  });
});
