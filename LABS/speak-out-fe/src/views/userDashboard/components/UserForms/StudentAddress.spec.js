import React from 'react';
import ReactDOM from 'react-dom';
import{ render } from '@testing-library/react'
import StudentAddress from './StudentAddress';

const token = localStorage.setItem('token', {
  user_id: 6
})

const studentMockData = {
  // user_id: 1,
  cpr: '',
  first_name: 'Timy',
  additional_names: '',
  birthdate: '',
  gender: '',
  school_name: '',
  school_grade_id: Number,
  email: '',
  address: '',
  phone_number: '',
  primary_emergency_contact_name: '',
  primary_emergency_relationship: '',
  primary_emergency_phone: '',
  notes: ''
}

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
})

describe('Address Form', () => {
  test('should mount address form', () => {
    const { queryAllByText } = render(<StudentAddress studentForm={studentMockData} />)
    expect(queryAllByText(/Student Address/i))
  })

  test('should have all input Labels', () => {
    const { getByText } = render(<StudentAddress studentForm={studentMockData} />)
    expect(getByText(/Current Address/i))
  })
  
  test('should show address input textbox', () => {
    const { getByRole  } = render(<StudentAddress studentForm={studentMockData} />)
    expect(getByRole('textbox')).toBeTruthy()
  })
})