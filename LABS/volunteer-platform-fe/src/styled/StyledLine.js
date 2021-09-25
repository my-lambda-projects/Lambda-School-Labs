import styled from 'styled-components';

export const StyledLine = styled.div`
  border-bottom: ${props =>
    props.big ? '3px solid lightgrey;' : '1px solid lightgrey'};
  width: ${props => props.width || '80%'};
  margin: 0 auto;
  max-width: ${props => props.maxWidth || '400px'};
`;
