import React, { useEffect } from 'react';
import { StyledButton, StyledCancelButton } from '../../../styled';
import { Icon, Tag } from 'antd';
import styled from 'styled-components';
import { confirmModal } from '../../../styled';
import RecurringInfoReview from './RecurringInfoReview';

export const CreateEventReviewList = props => {
  const { localState, handleReviewSubmit, cancelForm, setEdit } = props;

  const editForm = () => {
    setEdit(true);
  };

  const confirmForm = () => {
    const confirmFormModal = confirmModal({
      title: 'Creating an Event',
      content: 'Please ensure all the information is correct.',
      onOk: () => handleReviewSubmit(),
    });
    confirmFormModal();
  };

  return (
    <StyledDiv className={'styledReviewDiv'}>
      <div>
        <StyledButtons>
          <div className="icon" onClick={editForm}>
            <Icon type="edit" />
          </div>
        </StyledButtons>
      </div>

      <div className={'reviewWrapper'}>
        <div className={'text'}>
          <p className={'title'}>Event Name</p>
          <p className={'value'}>{localState.nameOfEvent}</p>
        </div>
        <div>
          <p className={'title'}>Locations</p>
          <p className={'value'}>{localState.address}</p>
        </div>
        <div>
          <p className={'title'}>Causes</p>
          <p className={'value selectMax'}>
            {localState.typesOfCauses &&
              localState.typesOfCauses.map(cause => {
                return (
                  <div className={'tag'} key={cause}>
                    <Tag>{cause}</Tag>
                  </div>
                );
              })}
          </p>
        </div>
        <div>
          <p className={'title'}>Requirments</p>
          <p className={'value selectMax'}>
            {localState.volunteerRequirements &&
              localState.volunteerRequirements.map(req => {
                return (
                  <div className={'tag'} key={req}>
                    <Tag>{req}</Tag>
                  </div>
                );
              })}
          </p>
        </div>

        <div>
          <p className={'title'}>Interests</p>
          <p className={'value selectMax'}>
            {localState.interest &&
              localState.interest.map(interest => {
                return (
                  <div className={'tag'} key={interest}>
                    <Tag>{interest}</Tag>
                  </div>
                );
              })}
          </p>
        </div>
        <div>
          <p className={'title'}>Point of Contact</p>
          <p className={'value'}>{localState.fullName}</p>
          <p className={'value'}>
            <Icon type="phone" /> {localState.phoneNumber}
          </p>
          <p className={'value'}>
            <Icon type="mail" /> {localState.email}
          </p>
        </div>
        <div>
          <p className={'title'}>Time of event</p>
          <p className={'value'}>{localState.date.format('LL')}</p>
          <p className={'value'}>
            {localState.startTime.format('LT')} -{' '}
            {localState.startTime.format('LT')}
          </p>
        </div>

        <div>
          <p className={'title'}>Volunteers Needed</p>
          <p className={'value'}>{localState.numberOfVolunteers}</p>
        </div>
        <div>
          <p className={'title'}>Event Details</p>
          <p className={'value'}>{localState.eventDetails}</p>
        </div>
        <div>
          <p className={'title'}>Website</p>
          <p className={'value'}>{localState.website}</p>
        </div>

        <div>
          <p className={'title'}>Other Notes</p>
          <p className={'value'}>{localState.otherNotes}</p>
        </div>

        {localState.recurringInfo.recurringEvent === 'Yes' && (
          <RecurringInfoReview localState={localState} />
        )}
      </div>
      <div
        className="buttonStyles"
        style={{ marginRight: '0px', marginLeft: '0px' }}
      >
        <div>
          <StyledCancelButton key="cancel" type="second" onClick={cancelForm}>
            Cancel
          </StyledCancelButton>
        </div>
        <div>
          <StyledButton key="submit" type="primary" onClick={confirmForm}>
            Confirm
          </StyledButton>
        </div>
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  .reviewWrapper {
    text-align: left;

    .title {
      color: ${({ theme }) => theme.primary8};
    }
    .value {
      width: 100%;
      margin-left: 15px;

      .tag {
        display: inline;
      }
    }
  }
  .buttonStyles {
    margin-right: 0px;
    margin-left: 0px;
  }
`;

const StyledButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  .icon {
    display: flex;
    font-size: 2rem;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
`;

export default CreateEventReviewList;
