import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledCard, StyledButton } from '../../styled';
import { useStateValue } from '../../hooks/useStateValue';
import moment from 'moment';
import { Tag, Icon, Tooltip } from 'antd';

export const EventCard = ({ event, tags }) => {
  const [{ org, events, auth }, dispatch] = useStateValue();

  let ableToDelete = false;

  org.userOrganizations.forEach(organization => {
    if (organization.orgId === events.events.orgId) {
      ableToDelete = true;
    }
  });

  let selectedTags = [];
  let otherTags = [];

  const eventTags = [
    ...event.typesOfCauses,
    ...event.interest,
    ...event.volunteerRequirements,
  ];
  const filteredTags = {
    ...tags.causeAreas,
    ...tags.interests,
    ...tags.requirements,
  };

  eventTags.forEach(tag => {
    tag in filteredTags && filteredTags[tag] === true
      ? selectedTags.push(<EventCardTag color="blue">{tag}</EventCardTag>)
      : otherTags.push(<EventCardTag>{tag}</EventCardTag>);
  });

  return (
    <StyledEventCard margin={'0 0 20px 0'}>
      <div className="title-container">
        <h4>{event.nameOfEvent}</h4>
      </div>
      <div className="details-container">
        <h5>
          {event.orgName && event.orgId && (
            <span>
              <a href={`/organization/${event.orgId}`}>{event.orgName}</a>
              <Spacer>•</Spacer>
            </span>
          )}
          {event.city}
        </h5>
      </div>
      <div className="tags-container">
        {selectedTags}
        {otherTags}
      </div>
      <div className="description-container">
        <div className="text-overflow-block">{event.eventDetails}</div>
      </div>
      <div className="date">
        <Icon type="calendar" theme="twoTone" />
        {moment.unix(event.nextDate).format('LL')}
        <Spacer>•</Spacer>
        {moment.unix(event.startTimeStamp).format('LT')}
        {event.recurringInfo && (
          <span>
            <Spacer>•</Spacer>
            <Tag color="orange" className="recurring-tag">
              This is a recurring event
            </Tag>
            <Tooltip
              placement="right"
              title="Recurring events may have multiple dates available. View details to see the calender and sign up for the event that works for you."
            >
              <Icon type="question-circle" theme="outlined" />
            </Tooltip>
          </span>
        )}
      </div>
      {ableToDelete && <StyledButton type="danger">Delete</StyledButton>}
      <Link
        to={{
          pathname: `/events/${event.eventId}`,
          state: { selectedDate: event.nextDate },
        }}
      >
        {' '}
        View More{' '}
      </Link>
    </StyledEventCard>
  );
};

const StyledEventCard = styled(StyledCard)`
  margin-bottom: 20px;

  .ant-card-body {
    width: 100%;
  }

  .title-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    min-height: 48px;
    width: 100%;
    margin: 0 0 8px 0;
    h4 {
      line-height: 28px;
      padding: 0;
      margin: 0;
    }
  }

  .details-container {
    h5 {
      margin: 0;
    }
  }

  .tags-container {
    margin: 8px 0;
  }

  .description-container {
    margin-right: 1em;
    margin-top: 16px;

    .text-overflow-block {
      overflow: hidden;
      position: relative;
      line-height: 1.2em;
      max-height: 3.5em;
      text-align: justify;
      margin-right: -1em;
      padding-right: 1em;
    }
    .text-overflow-block:before {
      content: '...';
      position: absolute;
      right: 0;
      bottom: 0;
    }
    .text-overflow-block:after {
      content: '';
      position: absolute;
      right: 0;
      width: 1em;
      height: 1em;
      margin-top: 0.2em;
      background: white;
    }
  }

  .date {
    font-size: 0.85rem;
    margin: 16px 0;
    & > :first-child {
      margin-right: 8px;
    }
    .recurring-tag {
      color: ${props => props.theme.gray9};
      opacity: 0.8;
    }
  }
`;

const Spacer = styled.span`
  color: ${props => props.theme.gray4};
  margin: 0 8px;
`;

const EventCardTag = styled(Tag)`
  font-size: 0.75rem;
  margin: 4px 4px 0 0;
`;

export default EventCard;
