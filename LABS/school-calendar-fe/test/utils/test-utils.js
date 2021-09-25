import React from 'react'
import { render } from '@testing-library/react';
import { AuthProvider } from '../../src/contexts/auth';

const AllTheProviders = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

// export const customRender = (ui, options) =>
//   render(ui, { wrapper: AllTheProviders, ...options });

export const customRender = (ui, options) =>
  render(ui, { wrapper: AuthProvider, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
// export { customRender as render };
