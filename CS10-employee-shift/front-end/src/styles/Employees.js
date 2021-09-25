import styled from "styled-components";

// import { device } from "./globals.js";

// Maybe combine with all other "cards" styling

export const EmployeesContainer = styled.div`
  display: flex;
  margin: 70px 10% 0 10%;
  flex-direction: column;
`;

export const EmployeeHeader = styled.h1`
  margin: 30px auto;
  color: black;
`;

export const CardInner = styled.div`
  border: 1px solid black;
  max-width: 80%;
  margin-left: 16px;
  margin-bottom: 16px;
`;

export const EmployeesRequestedTimeOffContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const GridContainer = styled.div`
  display: grid;
  position: relative;
  width: 100%;
  height: 100%;
  grid-template-column: repeat(2, 1fr);
  grid-template-rows: repeat(14, 20%);
  padding: 1% 0;
  place-items: stretch stretch;
  place-content: stretch stretch;
`;

export const RowHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  grid-row-start: ${props => props.row};
  grid-row-end: ${props => props.row};
  grid-column: 1 / span 1;
  font-size: 16px;
  font-weight: 200;
`;

export const HorizontalContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  grid-row-start: ${props => props.row};
  grid-row-end: ${props => props.row};
  grid-column: 2 / span 1;
`;
