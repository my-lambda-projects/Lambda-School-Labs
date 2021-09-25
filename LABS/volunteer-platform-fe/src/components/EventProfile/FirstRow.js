import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Row, Icon, Tooltip, Tag } from 'antd';
import { StyledButton } from '../../styled';

const RecurRegister = () => {
  return (
    <a
      onClick={() =>
        document
          .getElementById('recurSignUp')
          .scrollIntoView({ behavior: 'smooth' })
      }
    >
      <StyledButton width={'12rem'}>Register</StyledButton>
    </a>
  );
};

const NormalRegister = ({ localState, auth, register, unRegister }) => {
  return (
    <>
      {auth.googleAuthUser &&
      localState.registeredVolunteers.some(
        item => item.userId === auth.googleAuthUser.uid
      ) ? (
        <StyledButton width={'100%'} onClick={e => unRegister(e)}>
          Cancel Registration
        </StyledButton>
      ) : (
        <StyledButton width={'100%'} onClick={e => register(e)}>
          Register
        </StyledButton>
      )}
    </>
  );
};

const RecurDate = ({ localState, selectedDate }) => {
  return (
    <>
      <h4>{moment.unix(selectedDate).format('LL')}</h4>
      <h4>
        {`${moment.unix(selectedDate).format('LT')} –
            ${moment.unix(localState.endTimeStamp).format('LT')}`}
      </h4>
    </>
  );
};

const NormalDate = ({ localState }) => {
  return (
    <>
      <h4>
        {localState.startTimeStamp &&
          moment.unix(localState.startTimeStamp).format('LL')}
      </h4>
      <h4>
        {localState.startTimeStamp &&
          `${moment.unix(localState.startTimeStamp).format('LT')} –
              ${moment.unix(localState.endTimeStamp).format('LT')}`}
      </h4>
    </>
  );
};

export const FirstRow = ({
  localState,
  auth,
  register,
  unRegister,
  selectedDate,
  numberOfVolunteers,
}) => {
  let isRecurring = localState.recurringInfo;

  let signedUp = isRecurring
    ? (localState.registeredVolunteers[selectedDate] || []).length
    : localState.registeredVolunteers.length;

  return (
    <StyledFirstRow type="flex" justify="space-between" align="stretch">
      <div className="left-col">
        <div className="title-container">
          <h2>{localState.nameOfEvent}</h2>
        </div>
        <h5>
          <a className="org-link" href={`/organization/${localState.orgId}`}>
            {localState.orgName}
          </a>
        </h5>
        <div className="date-container">
          <div>
            {isRecurring ? (
              <RecurDate localState={localState} selectedDate={selectedDate} />
            ) : (
              <NormalDate localState={localState} />
            )}
          </div>
          {isRecurring && (
            <div className="recurring-notice">
              <Tag color="orange" className="recurring-tag">
                Recurring Event
              </Tag>
              <Tooltip
                placement="right"
                title="Recurring events may have multiple dates available. Scroll down to see the calender and sign up for the event that works for you."
              >
                <Icon type="question-circle" theme="outlined" />
              </Tooltip>
            </div>
          )}
        </div>
      </div>

      <div className="right-col">
        {isRecurring ? (
          <RecurRegister />
        ) : (
          <NormalRegister
            localState={localState}
            auth={auth}
            register={register}
            unRegister={unRegister}
          />
        )}
        <div className="needed-vols">
          <span>Needed:</span>
          <h2>{numberOfVolunteers - signedUp}</h2>
          <span>volunteers</span>
        </div>
      </div>
    </StyledFirstRow>
  );
};

const StyledFirstRow = styled(Row)`
  && {
    background: transparent;
    border: none;
    box-shadow: none;
    width: 100%;
    min-height: 150px;
    margin: 1rem 0 2rem 0;
    flex-wrap: nowrap;
  }

  h2,
  h4,
  h5 {
    margin: 0;
  }

  .title-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    min-height: 88px;
    max-width: 780px;
    width: 100%;
    /* margin: 0 0 8px 0; */
  }

  .left-col,
  .right-col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }

  .right-col {
    align-items: center;
  }

  .org-link {
    font-weight: normal;
    font-size: 18px;
  }

  .needed-vols {
    background: white;
    width: 16rem;
    display: flex;
    flex-direction: column;
    height: fit-content;
    align-items: center;
    border-radius: 4px;
    padding: 0.2rem 0;
  }

  .date-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 8px;

    h4 {
      font-weight: normal;
      &:first-child {
        font-size: 24px;
        margin-bottom: 8px;
      }
    }

    .recurring-notice {
      margin: 0px 8px 4px 48px;

      .recurring-tag {
        font-size: 1rem;
        color: ${props => props.theme.gray9};
      }
    }
  }
`;

export default FirstRow;
