import styled from "styled-components";

import { device } from "./globals.js";

// STYLES FOR ADMIN DASHBOARD PAGE

export const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px 10% 0 10%;

  @media ${device.laptop} {
    margin: 96px 2% 2% 2%;
  }
`;

export const AdminHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 2%;
`;

export const Welcome = styled.h1`
  fontsize: 30px;
  fontweight: 300;
`;

export const AdminBody = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;

  @media ${device.laptop} {
    flex-direction: column;
  }
`;

export const ButtonContainer = styled.div`
  align-self: flex-end;

  @media ${device.tablet} {
    max-width: 92px;
  }
`;

export const HoOButton = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  padding: 5% 12%;
  justify-content: space-between;
  cursor: pointer;
`;

export const AdminDetailsContainer = styled.div`
  @media ${device.laptop} {
    padding-bottom: 80px;
  }
`;

export const AdminHoursContainer = styled.div`
  width: 50%;

  @media ${device.laptop} {
    width: 90%;
  }

  @media ${device.mobileL} {
    width: 100%;
  }
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
  margin: 5px 0;
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

  @media ${device.mobileL} {
    width: 100%;
  }
`;
