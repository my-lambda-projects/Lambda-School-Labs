import styled from 'styled-components';

export const ButtonContainer = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 90px;

`;

export const GoogleButton = styled.button`

  display: flex;
  flex-direction: row;
  align-items: center;
  width: 220px;
  border-radius: 3px;
  border: 1px solid rgba(0,0,0,0.2);
  background-color: #dd4b39;
  color: #fff;
  &:hover {
    background-color: #ca3926;
  }
  outline: none;

`;

export const GitHubButton = styled.button`

  display: flex;
  flex-direction: row;
  align-items: center;
  width: 220px;
  border-radius: 3px;
  border: 1px solid rgba(0,0,0,0.2);
  background-color: #555;
  color: #fff;
  &:hover {
    background-color: #444;
  }
  outline: none;

`;

export const ButtonIcon = styled.i`

  padding: 10px 10px 10px 5px;
  border-right: 1px solid rgba(0,0,0,0.2);
  pointer-events:none;

`;

export const ButtonText = styled.span`

  padding-left: 20px;
  pointer-events:none;
  
`;