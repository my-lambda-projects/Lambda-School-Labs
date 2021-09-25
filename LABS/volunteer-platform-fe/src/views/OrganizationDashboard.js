import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Calendar, Select } from 'antd';
import moment from 'moment';
import { useStateValue } from '../hooks/useStateValue';
import {
  getAllEventsByOrg,
  deleteOrganization,
  getFileUrl,
  updateOrganization,
  deleteOrganizationImage,
  getAllRecurringEventsByOrg,
} from '../actions';
import {
  OrgButtons,
  OrgPhoto,
  OrgInfo,
  EventPanel,
} from '../components/OrgDashboard';
import { deleteModal, StyledCard, StyledLine, StyledLoader } from '../styled';

export const OrganizationDashboard = props => {
  const [{ events, org }, dispatch] = useStateValue();
  const [displayOrg, setDisplayOrg] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const [calendarValue, setCalendarValue] = useState(moment());

  useEffect(() => {
    if (props.location.state) {
      setDisplayOrg(props.location.state.org);
      if ('orgId' in props.location.state.org) {
        getAllEventsByOrg(props.location.state.org.orgId, dispatch);
        getAllRecurringEventsByOrg(props.location.state.org.orgId, dispatch);
      } else {
        getAllEventsByOrg(org.newOrgId, dispatch);
        getAllRecurringEventsByOrg(org.newOrgId, dispatch);
      }
      if (props.location.state.org.imageUrl) {
        setImageUrl(props.location.state.org.imageUrl);
      } else {
        setImageUrl(null);
      }
    }
  }, [props.location]);

  const deleteOrg = e => {
    const deleteOrgModal = deleteModal({
      title: 'Are you sure you want to delete this organization?',
      content: 'This cannot be undone.',
      onOk: () => deleteOrganization(displayOrg.orgId, dispatch),
    });

    e.preventDefault();
    deleteOrgModal();
  };

  const onFileUpload = path => {
    getFileUrl(path)
      .then(url => {
        setImageUrl(url);
        const updatedDisplayOrg = {
          ...displayOrg,
          imagePath: path,
          imageUrl: url,
        };
        updateOrganization(displayOrg.orgId, updatedDisplayOrg, dispatch);
      })
      .catch(err => console.log(err));
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

  const deleteImage = org => {
    deleteOrganizationImage(org);
    setImageUrl(null);
  };

  return (
    <StyledDashboard>
      <h4>Dashboard of</h4>
      <h2 className={'org-name'}>{displayOrg.organizationName}</h2>
      <OrgButtons displayOrg={displayOrg} deleteOrg={deleteOrg} />
      <StyledContent>
        <div className={'org-dash-top'}>
          <div className="calendar">
            <Calendar
              fullscreen={false}
              disabledDate={current =>
                current && current < moment().startOf('day')
              }
              onSelect={onSelect}
              onPanelChange={onPanelChange}
              value={calendarValue}
            />
          </div>
          <div className="org-events">
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
          </div>
        </div>
        <div className={'line-box'}>
          <StyledLine big width={'53%'} />
        </div>
        <div className={'org-dash-bottom'}>
          <div className={'left-col'}>
            <OrgPhoto
              imageUrl={imageUrl}
              imageOwner={displayOrg}
              deleteImage={deleteImage}
              onFileUpload={onFileUpload}
              imageName={displayOrg.orgId}
            />
            <StyledAboutUs backgroundcolor={'white'} borderRadius="3px">
              <h5>About Us</h5>
              <StyledLine width={'40%'} />
              <p>{displayOrg.aboutUs}</p>
            </StyledAboutUs>
          </div>
          <div className={'right-col'}>
            <OrgInfo displayOrg={displayOrg} />
          </div>
        </div>
      </StyledContent>
    </StyledDashboard>
  );
};

export const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  width: 1020px;
  margin: 0 auto;

  .org-title {
    margin-bottom: 0.7rem;
  }

  .org-name {
    margin-bottom: 2.5rem;
    margin-top: 0;
    font-size: 40px;
  }
`;

const StyledContent = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: baseline;

  .org-dash-top {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .calendar {
      margin-right: 1rem;
      background: white;
      width: 50%;
      border-radius: 3px;
      border: 1px solid ${({ theme }) => theme.gray4};
    }

    .org-events {
      width: 80%;
    }
  }

  .line-box {
    width: 100%;
    margin: 2rem;
  }

  .org-dash-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;

    .left-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 1rem;

      .ant-card {
        padding: 0 33px;
        margin-bottom: 2rem;
        box-shadow: none;
      }
    }

    .right-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
  }
`;

export const StyledAboutUs = styled(StyledCard)`
  .ant-card-body {
    padding: 6px;
  }
  h5 {
    font-size: 16px;
    text-align: center;
  }

  p {
    margin-top: 10px;
    padding: 15px;
  }
`;
export default OrganizationDashboard;
