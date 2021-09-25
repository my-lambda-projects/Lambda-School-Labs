import React from 'react';
import styled from 'styled-components';
import LandingNav from './LandingNav';
import MainContent from './MainContent';

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;

  @media (max-width: 900px) {
    background-color: white;
  }
`;

export default function LandingPage() {
  return (
    <Container>
      <LandingNav />
      <MainContent />
    </Container>
  );
}
