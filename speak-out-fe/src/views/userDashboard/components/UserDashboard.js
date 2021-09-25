import React, { useEffect, useState } from 'react';
import { withRouter, Link, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import axiosWithAuth from '../../../utils/axiosWithAuth';

import StudentCourseCard from './Student/StudentCourseCard';

import '../userDashboard.scss';

import { getStudentsInFamily } from '../getStudentsinFamily';
import { getMessagesForUser } from '../getMessagesForUser';

function UserDashboard(props) {
  const [userData, setUserData] = useState({
    subject: null,
    name: '',
    students: [],
    messages: [],
  });
  const [user, setUser] = useState({});

  let { url } = useRouteMatch();

  // Get subject from JWT
  let token = localStorage.getItem('token');
  let tokenData = JSON.parse(atob(token.split('.')[1]));

  const { subject } = tokenData;

  useEffect(() => {
    axiosWithAuth()
      .get(`/users/${subject}`)
      .then(res => {
        setUser(res.data[0]);
      })
      .catch(err => {
        console.log('whoops', err);
      });
  }, []);

  // retrieve list of students associated with this account (search by user ID)
  useEffect(() => {
    getStudentsInFamily(subject)
      .then(result => {
        setUserData({ students: result });
      })
      .catch(error => {
        console.log('Error in retrieving students:', error);
      });
  }, [subject, props.studentTableReducer.needToUpdateStudentList]);

  // update userData once students have been updated
  useEffect(() => {
    // determine which messages to display to user upon login
    let messages = getMessagesForUser(userData.students);

    // store all info into state variable
    setUserData({ ...userData, messages });
  }, [userData.students]);

  // if userData hasn't loaded yet, return a loading message/icon
  if (Object.keys(userData).length === 0 || !userData.students || !userData.messages) {
    return <h2>Loading...</h2>;
  } else if (!subject) {
    return <h2>Invalid user ID</h2>;
  }

  return (
    <div className="userDashboard ">
      <h1>Welcome, {user.name}.</h1>

      {userData.students.map((student, id) => (
        <Link to={`/student/${student.id}`}>
          <StudentCourseCard key={student.id} student={student} />
        </Link>
      ))}

      <Link to={`${url}/student-register`}>
        <div className="iconContainer">
          <i className="fas fa-user-plus add-icon"></i>
        </div>
      </Link>
    </div>
  );
}

const mapStateToProps = state => {
  return state;
};

export default withRouter(connect(mapStateToProps)(UserDashboard));
