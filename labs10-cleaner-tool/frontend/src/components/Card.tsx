import React, { ReactChildren } from 'react';
import styled from '@emotion/styled';

interface CardProps {
  className?: string;
  children?: any;
}

const StyledCard = styled.div`
  width: 100%;
  font-family: Roboto;
  font-size: var(--font-size-primary);
  color: var(--color-text-dark);
  box-shadow: var(--box-shadow);
  padding: 1.5rem 1rem;
  border-radius: var(--border-radius);
  border-bottom: var(--border-bottom);
  background-color: var(--color-bg-secondary);
`;

const Card = (props: CardProps) => {
  const { className, children } = props;
  return <StyledCard className={className}>{children}</StyledCard>;
};

export default Card;
