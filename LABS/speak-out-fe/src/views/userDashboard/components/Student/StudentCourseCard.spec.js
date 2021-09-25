import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import StudentCourseCard from './StudentCourseCard';
import UserDashboardHeader from '../UserDashboardHeader';

const token = localStorage.setItem('token', {
    user_id: 6
})

const mockStudent = {
    first_name: '',
    additional_names: ''
}

const mockCourse = {
    course_id: '',
    group_type: '',
    course_days: '',
    start_time: '',
    end_time: '',
    first_day: '',
    last_day: ''
}

describe('Student Course Card', () => {
    test('component renders', () => {
        const { queryAllByText } = render(<StudentCourseCard studentCourse={mockCourse} student={mockStudent}/>);
        expect(queryAllByText(/course/i));      
    })
    test('component renders', () => {
        const { queryAllByText } = render(<Router><UserDashboardHeader /></Router>);
        expect(queryAllByText(/Settings/i));      
    })
})