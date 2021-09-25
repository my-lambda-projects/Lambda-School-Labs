import React, { useEffect } from 'react';
import '../../userDashboard.scss';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { completeTest } from '../../../../actions/userDashboardActions/placementActions';

function EndTest() {
  const dispatch = useDispatch();
  const { userAnswers, score } = useSelector(
    state => ({
      userAnswers: state.placementTestingReducer.userAnswers,
      score: state.placementTestingReducer.score,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(completeTest({ score, userAnswers }));
  }, []);

  return (
    <div className="endTest">
      <h1>Time's Up</h1>
      <p>Your completed answers have been submitted</p>
      <p>We will reach out to you shortly</p>
    </div>
  );
}

export default EndTest;
