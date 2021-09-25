import React from 'react';
import styled from 'styled-components';
import sad_face from '../../assets/sad_face.png';
import usa_map from '../../assets/usa_map.png';

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: 18px;
  div {
    padding: 20px 0;
  }
`;

export const NoResultsFound = ({ filtersTouched }) => {
  return filtersTouched ? (
    <Container>
      <img src={sad_face} alt="Sad face" />
      <div>No events found. Try some other filters!</div>
    </Container>
  ) : (
    <Container>
      <img src={usa_map} alt="Map of the United States" />
      <div>Enter your location above to get searching!</div>
    </Container>
  );
};
