import React from 'react';
import WorkoutsForm from '../components/WorkoutsForm';
import WorkoutsDropdowns from '../components/WorkoutsDropdowns';

import '../components/styles/WorkoutsView.sass';

const WorkoutsView = () => (
  <div className="main workouts-view">
    <WorkoutsForm />
    <WorkoutsDropdowns />
  </div>
);

export default WorkoutsView;
