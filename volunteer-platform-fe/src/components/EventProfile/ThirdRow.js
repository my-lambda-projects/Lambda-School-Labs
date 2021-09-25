import React from 'react';
import styled from 'styled-components';
import MapContainer from '../Map/MapContainer';
import { Row, Col } from 'antd';

export const ThirdRow = ({ localState }) => {
  const markers = [
    {
      title: localState.nameOfEvent,
      name: localState.nameOfEvent,
      address: `${localState.streetAddress} ${localState.city}, ${localState.state}`,
      position: { lat: localState.lat, lng: localState.lng },
    },
  ];

  return (
    <StyledThirdRow type='flex' justify='space-between' align='top'>
      <Col className="details" span={15}>
        <h4>Details</h4>
        <p className="details-info">{localState.eventDetails}</p>
      </Col>
      <Col className="map-container" span={8}>
        <h4>Find us at</h4>
        <div className='map'>
          {localState.lat && (
            <MapContainer
              marginLeft={'0'}
              height={'250px'}
              width={'250px'}
              lat={localState.lat}
              lng={localState.lng}
              markers={markers}
            />
          )}
        </div>
      </Col>
    </StyledThirdRow>
  );
};

const StyledThirdRow = styled(Row)`
  && {
    background: transparent;
    border: none;
    box-shadow: none;
    width: 100%;
    min-height: 150px;
    margin: 2rem 0;
    flex-wrap: nowrap;
  }

  h4 {
    margin-top: 0;
  }

  .details {
    display: flex;
    flex-direction: column;
    align-self: stretch;
    margin-right: 3rem;

    &-info {
      width: 100%;
      background: white;
      padding: 1rem;
      height: 100%;
      margin: 0;
    }
  }

  .map-container {
    display: flex;
    flex-direction: column;

    .map {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: white;
      padding: 1rem 0;
    }
  }

`;

export default ThirdRow;
