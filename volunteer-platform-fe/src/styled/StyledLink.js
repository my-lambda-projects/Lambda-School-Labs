import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  font-size: 1.7rem;
  margin: 2rem;
  color: ${props => props.theme.primaryColor};
  background-color: ${props => props.theme.secondaryColor};
  padding: 10px;
  border-radius: ${props => props.theme.borderRadiusDefault};
`;
