import React from 'react';
import styled from 'styled-components';

export const RecurringInfoReview = props => {
  const { localState } = props;
  const { recurringInfo } = localState;

  const intro = `* This event occurs ${recurringInfo.repeatTimePeriod}`;
  const otherIntro = `* This event will occur every ${
    recurringInfo.repeatEvery
  } ${recurringInfo.repeatEveryValue.toLowerCase()} on `;

  const dyanmicRender = {
    On: ` until ${recurringInfo.occurrenceEndDate.format('LL')}.`,
    After: `  and ends after ${recurringInfo.occurrenceEndsAfter} occurrences.`,
    Never: ' and does not end.',
  };

  const recurringRenderOther = () => {
    if (
      recurringInfo.repeatEveryValue === 'Day' ||
      recurringInfo.repeatEveryValue === 'Days'
    ) {
      return <p>{otherIntro + dyanmicRender[recurringInfo.occurrenceEnds]}</p>;
    } else if (
      recurringInfo.repeatEveryValue === 'Week' ||
      recurringInfo.repeatEveryValue === 'Weeks'
    ) {
      return (
        <p>
          {otherIntro +
            recurringInfo.days.map(day => ` ${day}`) +
            dyanmicRender[recurringInfo.occurrenceEnds]}
        </p>
      );
    } else {
      const editMontlyPeriod = recurringInfo.monthlyPeriod
        .split(' ')
        .splice(2, 3)
        .join(' ');
      return (
        <p>
          {otherIntro +
            editMontlyPeriod +
            dyanmicRender[recurringInfo.occurrenceEnds]}
        </p>
      );
    }
  };

  return (
    <StyledDiv>
      {recurringInfo.repeatTimePeriod !== 'Other' ? (
        <p>{intro + dyanmicRender[recurringInfo.occurrenceEnds]}</p>
      ) : (
        recurringRenderOther()
      )}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  p {
    font-style: italic;
    margin-left: 15px;
  }
`;

export default RecurringInfoReview;
