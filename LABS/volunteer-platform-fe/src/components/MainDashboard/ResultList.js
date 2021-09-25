import React, { useState } from 'react';
import styled from 'styled-components';
import { EventCard, OrganizationCard } from '../MainDashboard';
import { NoResultsFound } from './NoResultsFound';
import { Pagination } from 'antd';
import { device } from '../../styled/deviceBreakpoints';

export const ResultList = ({ results, type, tags }) => {
  const itemPerPage = 10;
  const [current, setCurrent] = useState(1);
  const [displayResults, setDisplayResults] = useState(
    results.slice(0, itemPerPage)
  );

  const changePage = page => {
    setCurrent(page);
    setDisplayResults(
      results.slice(itemPerPage * (page - 1), itemPerPage * page)
    );
    window.scrollTo(0, 0);
  };
  //console.log(results)
  return displayResults.length ? (
    <>
      <StyledResultList>
        {displayResults.map(result =>
          type === 'Events' ? (
            // <EventCard key={`${result.nextDate}${result.eventId}`} event={result} recurDate={result.registeredVolunteers} />
            <EventCard
              key={`${result.nextDate}${result.eventId}`}
              event={result}
              tags={tags}
            />
          ) : (
            <OrganizationCard key={result.orgId} org={result} />
          )
        )}
      </StyledResultList>
      <Pagination
        current={current}
        onChange={changePage}
        total={results.length}
        style={{ width: '80%', margin: '0 auto' }}
      />
    </>
  ) : (
    <NoResultsFound />
  );
};

const StyledResultList = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;

  @media ${device.tablet} {
    width: 100%;
  }
`;

export default ResultList;
