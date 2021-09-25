import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from '../../contexts/auth';
import { DashboardContext, Context } from '../../contexts/Contexts';
import EditEventForm from './EditEventForm';
import styled from 'styled-components';
import { useToasts } from 'react-toast-notifications';
import axiosWithAuth from '../../utils/axiosWithAuth';

// component for event display
const EventPage = ({ event }) => {
  const { api, googleApi } = useAuth();

  const { setEventDisplay, setEventsUpdated } = useContext(DashboardContext);
  const { templateList } = useContext(Context);
  const { addToast } = useToasts();

  console.log('***', event);

  const [isEditing, setIsEditing] = useState(false);

  // handle close button
  const handleCloseButton = e => {
    e.preventDefault();
    setEventDisplay(false);
  };
  // sets the editing flag
  const handleEditButton = e => {
    e.preventDefault();
    setIsEditing(true);
  };

  // handle delete feature
  const handleDeleteButton = async e => {
    e.preventDefault();
    // user confirmation for delete
    const deleteConfirmation = window.confirm(
      'Are you sure you want to delete the event?'
    );
    // delete event if confirmed
    if (deleteConfirmation) {
      // api call for delete event
      await api.deleteEvent(event.id);
      // set event display to false
      setEventDisplay(false);
      // toast notification for user feedback
      addToast(`${event.title} was deleted successfully`, {
        appearance: 'info',
        autoDismiss: true,
        autoDismissTimeout: 6000
      });
      setEventsUpdated(true);
      // reload window to reflect changes
      // setTimeout(() => {
      //     window.location.reload();
      // }, 2000);
    }
  };

  return (
    <EventContainer>
      <EventHeader>
        <EventDate>{event.start.dateTime.substring(0, 10)} </EventDate>
        <CloseButton onClick={handleCloseButton}>X</CloseButton>
      </EventHeader>
      {isEditing ? (
        <EditEventForm event={event} setIsEditing={setIsEditing} />
      ) : (
        <div className="eventInfo" key={event.id}>
          <EventName>{event.title}</EventName>
          <EventTime>
            {event.starttime} - {event.endtime}
          </EventTime>
          <EventNotes>{event.notes}</EventNotes>
          <ButtonsDiv>
            <EditButton onClick={handleEditButton}>Edit</EditButton>
            <DeleteButton onClick={handleDeleteButton}>Delete</DeleteButton>
          </ButtonsDiv>
        </div>
      )}
    </EventContainer>
  );
};
export default EventPage;

// Styling
const EventContainer = styled.div`
  font-size: 90%;
  background: #e0e0e0;
  border: 2px solid #999898;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  padding: 5%;
`;

const EventHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5%;
`;

const EventDate = styled.div`
  width: 80%;
  font-style: normal;
  font-weight: 600;
  font-size: 1.5em;
  line-height: 2em;
  color: #999898;
`;
const EventName = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 1.5em;
  line-height: 2em;
  color: #2e5780;
`;
const EventTime = styled.div`
  font-size: 1.2em;
  line-height: 1.8em;
  color: #2e5780;
`;
const EventNotes = styled.div`
  font-size: 1.2em;
  line-height: 2em;
  color: #2e5780;
  margin-top: 5%;
`;
const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 10% auto;
`;
const EditButton = styled.button`
  background: #ffffff;
  font-size: 1.2em;
  line-height: 2em;
  color: #28807d;
  padding: 2% 10%;
  border: 2px solid #28807d;
  box-sizing: border-box;
  border-radius: 15px;
`;
const DeleteButton = styled.button`
  background: #28807d;
  font-size: 1.2em;
  line-height: 2em;
  color: #ffffff;
  padding: 2% 10%;
  border: 2px solid #28807d;
  box-sizing: border-box;
  border-radius: 15px;
`;
const CloseButton = styled.button`
  background: #28807d;
  font-size: 1em;
  color: #ffffff;
  font-weight: bold;
  padding: 1%;
  width: 10%;
  border-radius: 5px;
  margin-left: auto;
`;
