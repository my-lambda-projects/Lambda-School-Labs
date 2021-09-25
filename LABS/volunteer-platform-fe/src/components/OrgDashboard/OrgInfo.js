import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Icon, Tag } from 'antd';
import { StyledCard } from '../../styled';
import { setDaysOpen } from '../../utility/setDaysOpen';
import MapContainer from '../Map/MapContainer';

export const OrgInfo = ({ displayOrg }) => {
  const causes =
    displayOrg &&
    displayOrg.causeAreas.map(item => <Tag>{(item = [item])}</Tag>);

  const markers = displayOrg && [
    {
      name: displayOrg.organizationName,
      position: { lat: displayOrg.lat, lng: displayOrg.lng },
    },
  ];

  return (
    <OrgInfoDiv
      style={{
        background: 'white',
        borderRadius: '3px',
        margin: '0 0 40px 0',
        width: '100%',
        boxShadow: 'none',
      }}
    >
      <h3 style={{ marginBottom: '5px' }}>General Info</h3>
      <h5>Website</h5>
      <span>{displayOrg.website}</span>
      <div className="hours-of-op">
        <h5>Hours</h5>
        <div className="hours-row">
          <span>{setDaysOpen(displayOrg.daysOfTheWeek)} </span>
          <Icon type="clock-circle" />
          <span>
            {`${moment.unix(displayOrg.startTime).format('LT')} - 
              ${moment.unix(displayOrg.endTime).format('LT')}`}
          </span>
        </div>
      </div>
      <div className="location">
        <div className="address">
          <Icon
            type="environment"
            theme={'twoTone'}
            twoToneColor={'#005a87'}
            className={'icon'}
          />
          <span>{displayOrg.address}</span>
        </div>
        <div>
          {displayOrg.lat && (
            <MapContainer
              lat={displayOrg.lat}
              lng={displayOrg.lng}
              width={'450px'}
              height={'150px'}
              markers={markers}
              zoom={16}
            />
          )}
        </div>
      </div>
      <div className="causes">
        <h5>Cause{causes && causes.length > 1 ? 's' : ''}</h5>
        {causes}
      </div>
      <div className="lower-info">
        <h5>Contact{displayOrg.POC && displayOrg.POC.length > 1 ? 's' : ''}</h5>
        {displayOrg.POC &&
          displayOrg.POC.map(contact => {
            return (
              <div className="poc">
                <div className="poc-name">
                  {contact.fullName
                    ? `${contact.fullName}`
                    : `${contact.firstName} ${contact.lastName}`}
                </div>
                <div className="poc-row2">
                  <div className="poc-info">
                    <Icon
                      type="mail"
                      theme="twoTone"
                      twoToneColor={'#005a87'}
                      className="icon"
                    />
                    {contact.email}
                  </div>
                  {contact.phone && (
                    <>
                      <div className="poc-info">
                        <Icon
                          type="phone"
                          theme="twoTone"
                          twoToneColor={'#005a87'}
                          className="icon"
                        />
                        {contact.phone}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </OrgInfoDiv>
  );
};

const OrgInfoDiv = styled(StyledCard)`
  .upper-info {
    display: flex;
    align-items: center;
  }

  h3 {
    text-align: center;
  }

  .hours-of-op {
    display: flex;
    flex-direction: column;
    width: 100%;

    .hours-row {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      > * {
        margin-right: 1rem;
      }
    }
  }

  .location {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 1rem;
    width: 100%;

    .address {
      display: flex;
      margin-bottom: 0.5rem;
    }
  }

  .causes {
    flex-direction: row;
    justify-content: flex-start;
  }

  .icon {
    font-size: 24px;
    padding-right: 10px;
  }

  .poc {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .poc-name {
      min-width: 30%;
      margin-bottom: 5px;
    }

    .poc-row2 {
      display: flex;
      justify-content: space-between;
      width: 100%;

      .poc-info {
        display: flex;
        align-items: center;
        min-width: 30%;
      }
    }
  }

  .lower-info {
    display: flex;
    flex-direction: column;
  }
`;
export default OrgInfo;
