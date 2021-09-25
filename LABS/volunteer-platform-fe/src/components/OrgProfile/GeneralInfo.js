import React from 'react';
import styled from 'styled-components';
import { StyledCard } from '../../styled';
import { Tag, Icon } from 'antd';
import { setDaysOpen } from '../../utility/setDaysOpen';
import moment from 'moment';
import MapContainer from '../../components/Map/MapContainer';

export const GeneralInfo = ({ organization }) => {
  const markers = [
    {
      name: organization.organizationName,
      position: { lat: organization.lat, lng: organization.lng },
    },
  ];
  return (
    <StyledGeneralInfo width={'100%'}>
      <div className="col">
        <div className="section">
          <h4>Hours</h4>
          <span>{setDaysOpen(organization.daysOfTheWeek)}</span>
          <span>
            {`${moment
              .unix(organization.startTime)
              .format('LT')} - ${moment
              .unix(organization.endTime)
              .format('LT')}`}
          </span>
        </div>
        <div className="section">
          <h4>Location</h4>
          <span style={{ marginBottom: '25px' }}>
            <Icon type="environment" theme="twoTone" twoToneColor={'#005a87'} />
            {organization.address}
          </span>
        </div>
        {organization.lat && (
          <MapContainer
            lat={organization.lat}
            lng={organization.lng}
            width={'450px'}
            height={'150px'}
            markers={markers}
            zoom={16}
          />
        )}
      </div>
      <div className="col">
        <div className="section">
          <h4>Cause Area(s)</h4>
          <div className="tags">
            {organization.causeAreas &&
              organization.causeAreas.map(cause => (
                <StyledTag>{cause}</StyledTag>
              ))}
          </div>
        </div>
        <div className="section">
          <h4>Contact(s)</h4>
          <div className="inline">
            {organization.POC &&
              organization.POC.map(contact => {
                return (
                  <div className="poc-col">
                    <span>{contact.fullName}</span>
                    <span>{contact.email}</span>
                    <span>{contact.phone}</span>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="section">
          <h4>Website</h4>
          <span>{organization.website}</span>
        </div>
      </div>
    </StyledGeneralInfo>
  );
};

const StyledTag = styled(Tag)`
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;
const StyledGeneralInfo = styled(StyledCard)`
  &&& {
      width: 100%;
    .ant-card-body {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
    }

    .poc-col {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items; flex-start;
    }
    .tags {
      display: flex;
      justify-content: flex-start;
    }
    .col {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      width: 50%;
    }

    .section {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      width: 100%;
    }

    i {
      font-size: 20px;
      padding-right: 8px;
    }
  }
`;
export default GeneralInfo;
