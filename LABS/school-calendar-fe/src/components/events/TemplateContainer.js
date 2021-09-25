import React, { useContext } from 'react';
import { Context } from '../../contexts/Contexts';
import ChooseDateForm from './ChooseDateForm';
import styled from 'styled-components';
import NewEventForm from '../events/NewEventForm';

const TemplateContainer = () => {
  const { templateList, width } = useContext(Context);

  console.log(templateList);
  return (
    <div>
      {width < 768 && <Title as="h2">Events</Title>}

      <EventDiv>
        {templateList &&
          templateList.map(t => (
            <ChooseDateForm
              key={t.id}
              id={t.id}
              starttime={t.starttime}
              endtime={t.endtime}
              title={t.title}
              notes={t.notes}
              group={
                t.groups[0] ? t.groups[0] : { groupColor: '', groupIcon: '' }
              }
            />
          ))}
      </EventDiv>
    </div>
  );
};

export default TemplateContainer;

const Title = styled.h1`
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 1.25rem;
  line-height: 27px;
`;

const EventDiv = styled.div`
  margin-top: 20%;
`;
