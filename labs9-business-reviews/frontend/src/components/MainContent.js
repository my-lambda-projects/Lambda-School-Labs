import React from 'react';
import PopularReviewers from './PopularReviewers';
import PopularBusinesses from './PopularBusinesses';
import styled from 'styled-components';

const MainContentContainer = styled.div`
  width: 100%;
`;

const PopularReviewersContainer = styled.div`
  background: #f1f1f1;
`;

function MainContent() {
  return (
    <MainContentContainer>
      <PopularBusinesses />
      <PopularReviewersContainer>
        <PopularReviewers />
      </PopularReviewersContainer>
    </MainContentContainer>
  );
}

export default MainContent;
