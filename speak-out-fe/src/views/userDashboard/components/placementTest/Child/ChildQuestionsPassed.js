import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { completeTest } from '../../../../../actions/userDashboardActions/placementActions';

const ChildQuestionsPassed = ({ userTest }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(completeTest(userTest));
  }, []);

  return (
    <div>
      <h1>Your test is complete</h1>
      <p style={{ textAlign: 'center' }}>We will reach out to you soon!</p>
    </div>
  );
};

export default ChildQuestionsPassed;
