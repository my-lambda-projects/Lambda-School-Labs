import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';

const StyledLinks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  width: 96%;
  .guides {
    border: var(--border);
    background: var(--color-bg-secondary);
    display: flex;
    min-height: 150px;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    margin-bottom: 1rem;
  }
  @media only screen and (min-width: 900px) {
    flex-direction: row;
    .guides {
      width: 30%;
      margin: 0;
    }
  }
  a {
    color: var(--color-text-accent);
    &:hover {
      text-decoration: underline;
    }
  }
`;
const MiscInfo = (props: any) => {
  return (
    <StyledLinks>
      <div className='guides'>
        <i className='far fa-file-alt fa-4x' />
        <a href='http://example.com'>Your Guest Guide</a>
      </div>
      <div className='guides'>
        <i className='fas fa-map-marked-alt fa-4x' />
        <Link to={`/guestmap/${props.id}`}>
          Directions
        </Link>
      </div>
      <div className='guides'>
        <i className='far fa-file-alt fa-4x' />
        <Link to={`/guestdashboard/${props.id}/surveys`}>
          Complete a Survey
        </Link>
      </div>
    </StyledLinks>
  );
};

export default MiscInfo;
