import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Icon, message } from 'antd';
import uuid4 from 'uuid4';
import { confirmModal, StyledLoader } from '../styled';

import { useStateValue } from '../hooks/useStateValue';
import {
  Editor,
  CommentList,
  RecurSignUp,
  FirstRow,
  SecondRow,
  ThirdRow,
  FourthRow,
} from '../components/EventProfile';
import {
  addComment,
  addCommentToComment,
  signUpForRecurringEvent,
  cancelSignedUpRecurringEvent,
  signUpForEvent,
  cancelSignedUpEvent,
  deleteCommentClearSuccess,
  getEventById,
  getFileUrl,
} from '../actions';

export const EventProfile = props => {
  const [{ events, auth, comments }, dispatch] = useStateValue();

  const { selectedDate } = props.location.state;
  const { event } = events;

  const emptyState = {
    imageUrl: '',
    registeredVolunteers: [],
    interest: [],
    typesOfCauses: [],
    volunteerRequirements: [],
    orgName: '',
    nameOfEvent: '',
    startTimeStamp: '',
    endTimeStamp: '',
    numberOfVolunteers: 0,
    eventDetails: '',
    otherNotes: '',
    recurringInfo: '',
  };
  const [localState, setLocalState] = useState({ ...emptyState });

  useEffect(() => {
    if (props.match.params.id) {
      getEventById(props.match.params.id, dispatch);
    }
  }, []);

  useEffect(() => {
    if (comments.deletedComment) {
      message.success('Comment deleted successfully.');
      deleteCommentClearSuccess(dispatch);
    }
  }, [comments.deletedComment]);

  useEffect(() => {
    if (event.orgImagePath) {
      getFileUrl(event.orgImagePath).then(path =>
        setLocalState({ ...emptyState, ...event, imageUrl: path })
      );
    } else {
      setLocalState({
        ...emptyState,
        ...event,
      });
    }
  }, [event]);

  const submitComment = text => {
    const comment = {
      commentId: uuid4(),
      comment: text.comment,
      createdAt: moment().unix(),
      usersUid: auth.googleAuthUser.uid,
      name: auth.registeredUser.firstName + ' ' + auth.registeredUser.lastName,
      avatarPath: `/images/${auth.googleAuthUser.uid}`,
    };

    addComment(comment, event, dispatch);
  };

  const handleAddCommentToComment = (text, comment) => {
    const newComment = {
      commentId: uuid4(),
      comment: text.comment,
      createdAt: moment().unix(),
      usersUid: auth.googleAuthUser.uid,
      name: auth.registeredUser.firstName + ' ' + auth.registeredUser.lastName,
      avatarPath: `/images/${auth.googleAuthUser.uid}`,
    };

    addCommentToComment(newComment, event, comment, dispatch);
  };

  const backButton = () => {
    props.history.goBack();
  };

  const register = (e, date) => {
    const confirmRegModal = confirmModal({
      title: 'Are you sure you want to sign up for the event?',
      content: 'Please click OK to confirm your registration',
      onOk: () => {
        if (date) {
          signUpForRecurringEvent(event, auth.registeredUser, date, dispatch);
          return;
        }
        signUpForEvent(event, auth.registeredUser, dispatch);
      },
    });

    const promptRegModal = confirmModal({
      title: 'Login or register required',
      content:
        'In order to sign up for this event you must have an account with us.',
      okText: 'Sign up',
      onOk: () => {
        props.history.push({
          pathname: '/signup',
          state: { eventId: event.eventId },
        });
      },
    });

    e.preventDefault();
    if (auth.registeredUser) {
      confirmRegModal();
    } else {
      promptRegModal();
    }
  };

  const unRegister = (e, date) => {
    const confirmUnRegModal = confirmModal({
      title: 'Are you sure you want to cancel your registration?',
      content:
        'You will no longer be able to attend the event once you clicked OK. You may register again if you change your mind.',
      okType: 'danger',
      onOk: () => {
        if (date) {
          cancelSignedUpRecurringEvent(
            event,
            auth.registeredUser,
            date,
            dispatch
          );
          return;
        }
        cancelSignedUpEvent(event, auth.registeredUser, dispatch);
      },
    });

    e.preventDefault();
    confirmUnRegModal();
  };

  return (
    <StyledEventProfile>
      {events.isLoading ? (
        <StyledLoader />
      ) : (
        <>
          <div className="previous-page" onClick={backButton}>
            <Icon
              type="left-circle"
              theme="filled"
              style={{ fontSize: '25px', marginRight: '15px' }}
            />
            <h6>Previous Page </h6>
          </div>
          <FirstRow
            localState={localState}
            auth={auth}
            register={register}
            unRegister={unRegister}
            selectedDate={selectedDate}
            numberOfVolunteers={event.numberOfVolunteers}
          />
          <SecondRow localState={localState} />
          <ThirdRow localState={localState} />
          <FourthRow />
          {event.recurringInfo && (
            <RecurSignUp
              localState={localState}
              auth={auth}
              register={register}
              unRegister={unRegister}
              numberOfVolunteers={event.numberOfVolunteers}
            />
          )}
          <CommentList
            comments={event.comments}
            addCommentToComment={handleAddCommentToComment}
            isLoading={comments.isLoadingReplyToComment}
            event={event}
          />
          {auth.registeredUser && (
            <Editor onSubmit={submitComment} submitting={comments.isLoading} />
          )}
        </>
      )}
    </StyledEventProfile>
  );
};

const StyledEventProfile = styled.div`
  .previous-page {
    padding-top: 20px;
    display: flex;
    justify-content: flex-start;
    width: 15%;
    min-width: 150px;
    align-items: center;
    cursor: pointer;
  }
  /* width: 80vw; */
`;

EventProfile.propTypes = {
  event: PropTypes.object,
};

export default EventProfile;
