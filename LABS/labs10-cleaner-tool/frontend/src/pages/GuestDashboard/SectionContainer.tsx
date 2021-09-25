import React from 'react';
import styled from '@emotion/styled';

interface SectionContainerProps {
  className?: string;
  children?: any;
  text?: string;
}

const StyledSectionContainer = styled.section`
  display: grid;
  margin: 1rem;
  border: var(--border);
  padding: 0;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(6, 1fr);
  h2 {
    font-size: var(--header-font-size-secondary);
    padding: 0 1rem;
    margin: 0;
    color: var(--color-text-accent-light);
    grid-column-start: 1;
    grid-column-end: 7;
    justify-self: start;
    align-self: center;
  }
  div {
    grid-column-start: 1;
    grid-column-end: 7;
    grid-row-start: 2;
    grid-row-end: 7;
  }
  @media only screen and (min-width: 900px) {
  }
`;

const SectionContainer = (props: SectionContainerProps) => {
  const { className, children, text } = props;
  return (
    <StyledSectionContainer className={className}>
      <h2>{text}</h2>
      <div>{children}</div>
    </StyledSectionContainer>
  );
};

export default SectionContainer;
