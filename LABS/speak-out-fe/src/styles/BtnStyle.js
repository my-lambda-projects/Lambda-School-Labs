import styled from 'styled-components';
import './_variables.scss';

// Button with brand color
export const PrimaryButton = styled.button`
  background: #70bf44;
  color: #fff;
  border: none;
  border-radius: 3px;
  width: 7rem;
  height: 3rem;
  text-align: center;
  font-size: 1.5rem;
  cursor: pointer;
`;

// Button with neutral color
export const SecondaryButton = styled.button`
  background: #e0e0e0;
  color: #70bf44;
  border: none;
  border-radius: 3px;
  width: 7rem;
  height: 3rem;
  text-align: center;
  font-size: 1.5rem;
  cursor: pointer;
`;

// Button with destructive color
export const DeleteButton = styled.button`
  background: #ff4a4a;
  color: #fff;
  border: none;
  border-radius: 3px;
  width: 7rem;
  height: 3rem;
  text-align: center;
  font-size: 1.5rem;
  cursor: pointer;
`;