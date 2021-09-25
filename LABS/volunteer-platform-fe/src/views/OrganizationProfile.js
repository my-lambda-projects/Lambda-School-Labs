import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useStateValue } from '../hooks/useStateValue';
import { StyledLoader } from '../styled';
import {
  createNewMessageThread,
  getOrganizationByOrgId,
  getAllEventsByOrg,
  getAllRecurringEventsByOrg,
} from '../actions';
import styled from 'styled-components';
import { StyledDashboard } from './OrganizationDashboard';
import { EventPanel } from '../components/OrgDashboard';
import { GeneralInfo, OrgHeader } from '../components/OrgProfile';
import { Calendar } from 'antd';

export const OrganizationProfile = ({ match, history }) => {
  const [{ org, auth, events }, dispatch] = useStateValue();
  const [selectedDate, setSelectedDate] = useState();
  const [calendarValue, setCalendarValue] = useState(moment());
  const { organization } = org;
  
  useEffect(() => {
    getOrganizationByOrgId(match.params.id, dispatch);
    getAllEventsByOrg(match.params.id, dispatch);
    getAllRecurringEventsByOrg(match.params.id, dispatch);
  }, [match.params.id]);

  console.log(org)
  const createMessageThread = () => {
    const from = {
      type: 'users',
      uid: auth.googleAuthUser.uid,
    };

    const to = {
      type: 'organizations',
      uid: org.organization.orgId,
    };

    createNewMessageThread(to, from);
    history.push('/messages');
  };

  const onSelect = value => {
    const beginning = value.startOf('date');
    const newValue = moment.unix(beginning.unix());
    if (selectedDate) {
      const date2 = newValue.unix();
      if (selectedDate === date2) {
        setSelectedDate(null);
        setCalendarValue(moment());
      } else {
        setSelectedDate(newValue.unix());
        setCalendarValue(newValue);
      }
    } else {
      setSelectedDate(newValue.unix());
      setCalendarValue(newValue);
    }
  };

  const onPanelChange = (value, mode) => {
    setCalendarValue(moment.unix(value.unix()));
  };

  const displayAll = e => {
    e.preventDefault();
    setSelectedDate(null);
    setCalendarValue(moment());
  };

  return (
    <>
      {org.isLoading ? (
        <StyledLoader />
      ) : (
        <StyledOrgProfile>
          <OrgHeader
            organization={organization}
            createMessageThread={createMessageThread}
          />
          <div className="second-row">
            <h2>Upcoming Events</h2>
            <div className="inline">
              {events.isLoading ? (
                <StyledLoader />
              ) : (
                <EventPanel
                  recurringEvents={events.recurringEvents}
                  events={events.events}
                  selectedDate={selectedDate}
                  displayAll={displayAll}
                />
              )}
              <div className="calendar-container">
                <Calendar
                  className="calendar"
                  fullscreen={false}
                  disabledDate={current =>
                    current && current < moment().startOf('day')
                  }
                  onSelect={onSelect}
                  onPanelChange={onPanelChange}
                  value={calendarValue}
                />
              </div>
            </div>
          </div>
          <div className="third-row">
            <h2>General Info</h2>
            <GeneralInfo organization={organization} />
          </div>
        </StyledOrgProfile>
      )}
    </>
  );
};

const StyledOrgProfile = styled(StyledDashboard)`
  .second-row,
  .third-row {
    width: 100%;
  }
  .inline {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .calendar-container {
    border: 1px solid ${({ theme }) => theme.gray5};
    border-radius: ${({ theme }) => theme.borderRadiusDefault};
    background: white;
    width: 30%;
    max-height: 320px;
  }
  .calendar {
    .ant-fullcalendar-selected-day .ant-fullcalendar-value {
      background: ${({ theme }) => theme.primary8};
      box-shadow: 0 0 0 1px ${({ theme }) => theme.primary8} inset;
    }
    .ant-fullcalendar-today .ant-fullcalendar-value {
      box-shadow: 0 0 0 1px ${({ theme }) => theme.primary8} inset;
    }
    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
      border-color: ${({ theme }) => theme.primary8};
      color: ${({ theme }) => theme.primary8};
    }
  }
`;
