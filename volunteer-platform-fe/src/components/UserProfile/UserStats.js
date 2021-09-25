import React, { useState, useEffect } from 'react';
import { Progress } from 'antd';
import styled from 'styled-components';
import { volunteerProgress, getAccHoursForDuration } from '../../utility/volunteerProgress';
import stats from '../../assets/stats.svg';

export const UserStats = (props) => {
  const [progress, setProgress] = useState(0);
  const [accHours, setAccHours] = useState(0);

  useEffect(() => {
    if (props.user.registeredEvents && props.user.goals) {
      let currProgress = volunteerProgress(props.user.goals, props.user.registeredEvents);
      let currHours = getAccHoursForDuration(props.user.goals.duration, props.user.registeredEvents);
      setProgress(currProgress);
      setAccHours(currHours);
    }
  }, [props.user])
  
  return (
    <StyledDiv>
      <img src={stats} alt='user-stats' />  
      <div className='progress'>
        <p>You logged {accHours} hours</p>
        <Progress type='circle' percent={progress} width={80} strokeColor={`#fa8c16`} />
      </div>
    </StyledDiv>
  )
}

export default UserStats;

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 40px 0;
  border-radius: 3px;
  background: white;
  border: 1px solid ${({theme}) => theme.gray4};

  img {
    width: 40%;
  }

  .progress {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`