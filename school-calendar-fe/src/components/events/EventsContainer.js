import React, { useState } from 'react';
import TemplateContainer from './TemplateContainer';
import styled from 'styled-components';
import NewEventForm from './NewEventForm';

const EventsContainer = () => {
  const [showAddEventForm, setShowAddEventForm] = useState(false);

  const handleEventsContainer = e => {
    e.stopPropagation();
  };
  return (
    <EventsContainerDiv onClick={e => handleEventsContainer(e)}>
      <TemplateContainer />
      <AddGroupBtn onClick={e => setShowAddEventForm(true)}>
        add event
      </AddGroupBtn>
      {showAddEventForm && (
        <NewEventForm setShowAddEventForm={setShowAddEventForm} />
      )}
      {/* more events related things go here */}
    </EventsContainerDiv>
  );
};

export default EventsContainer;

const EventsContainerDiv = styled.div`
  width: 100%;
  //border: 3px solid purple;
`;

const AddGroupBtn = styled.div`
  margin: 0.5rem auto;
  cursor: pointer;
  width: 90%;
  color: #28807d;
  font-weight: bold;
  border: 2px solid #28807d;
  border-radius: 0.5rem;
  text-align: center;
  padding: 0.25rem 1rem;
  font-size: 1rem;
`;
