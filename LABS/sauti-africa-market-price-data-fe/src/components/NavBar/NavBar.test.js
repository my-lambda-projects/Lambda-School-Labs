import React from 'react'
import ReactDOM from 'react-dom'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'
import NavBar from './NavBar'

describe('<NavBar />', () => {
  it('renders navbar!', () => {
    render(<NavBar />)
  })
  it('renders login button', () => {
    const loginButton = render(<NavBar />)
    loginButton.getByText(/login/i)
  })
})
