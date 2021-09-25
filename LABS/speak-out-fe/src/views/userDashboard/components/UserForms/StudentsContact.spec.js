import React from 'react';
import ReactDOM from 'react-dom';
import{ render } from '@testing-library/react'
import StudentContacts from './StudentContacts';

const token = localStorage.setItem('token', {
  user_id: 6
})

const studentMockData = {
  // user_id: 1,
  cpr: '',
  first_name: '',
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
    const { getAllByText } = render(<StudentContacts studentForm={studentMockData} />)
    expect(getAllByText(/Emergency Contact/i)).toHaveLength(2)
  })

  test('should have all input Labels', () => {
    const { getByText } = render(<StudentContacts studentForm={studentMockData} />)
    expect(getByText(/Contact's Name/i))
    expect(getByText(/Relation to Student/i))
    expect(getByText(/Contact's Phone/i))
    expect(getByText(/Notes about Student/i))
  })
  
  test('should show address input textbox', () => {
    const { getAllByRole  } = render(<StudentContacts studentForm={studentMockData} />)
    expect(getAllByRole('textbox')).toHaveLength(4)
  })
})