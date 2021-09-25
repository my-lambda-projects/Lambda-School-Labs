import React from 'react';
import { render, fireEvent } from '../utility/customRender';
import Login from '../views/Login';

describe('Login Page', () => {
    
  it('properly renders', () => {
    const login = render(<Login />);
    expect(login.getByText(/login with/i)).toBeInTheDocument();
  });

  it('to have a google button', () => {
    const login = render(<Login />);
    const googleLoginButton = login.getByText(/Google/);
    expect(googleLoginButton).toBeVisible();
  });

  it('to have a facebook button', () => {
    const login = render(<Login />);
    const facebookButton = login.getByText(/facebook/i);
    expect(facebookButton).toBeVisible();
  });

  it('to have a facebook button', () => {
    const login = render(<Login />);
    const twitterButton = login.getByText(/twitter/i);
    expect(twitterButton).toBeVisible();
  });

  it('should have a user name and password text input', () => {
    const login = render(<Login />);
    const emailInput = login.getByTitle(/email/);
    const passwordInput = login.getByTitle(/password/);
    fireEvent.change(emailInput, { target: { value: 'jeremiah' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    expect(emailInput).toHaveValue('jeremiah');
    expect(passwordInput).toHaveValue('password');
  });
});