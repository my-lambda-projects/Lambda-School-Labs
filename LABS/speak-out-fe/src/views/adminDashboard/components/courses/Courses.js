import React, { useState } from 'react';
import CourseTable from './CourseTable.js';
import CourseCard from './CourseCard.js';
import { Switch, Route } from 'react-router-dom';

const Course = () => {

  return (
    <Switch>
      <Route exact path='/dashboard/courses'>
        <CourseTable />
      </Route>
      <Route path='/dashboard/courses/:courseID'>
        <CourseCard />
      </Route>
    </Switch>
  );
};

export default Course;
