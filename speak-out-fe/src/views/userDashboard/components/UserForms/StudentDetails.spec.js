import React from 'react';
import ReactDOM from 'react-dom';
import{ render } from '@testing-library/react'
import StudentDetails from './StudentDetails';

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

describe('Details Form', () => {
  test('should mount form', () => {
    const { getByText } = render(<StudentDetails studentForm={studentMockData} />)
    expect(getByText(/Student Details/i))
  })

  test('should have all input Labels', () => {
    const { getByText } = render(<StudentDetails studentForm={studentMockData} />)
    expect(getByText(/First Name/i))
    expect(getByText(/Additional Name/i))
    expect(getByText(/Government ID/i))
    expect(getByText(/Date of Birth/i))
    expect(getByText(/Gender/i))
    expect(getByText(/Phone/i))
    expect(getByText(/Email/i))
    expect(getByText(/Name of School/i))
    expect(getByText(/Grade Level/i))
  })
  
  test('should show All input textboxes', () => {
    const { getAllByRole  } = render(<StudentDetails studentForm={studentMockData} />)
    expect(getAllByRole('textbox')).toHaveLength(6)
  })
})
