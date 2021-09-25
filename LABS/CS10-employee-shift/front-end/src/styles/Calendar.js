import styled from "styled-components";

import { device } from "./globals.js";

// STYLES FOR CALENDAR PAGE

export const CalendarContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-content: center;
  overflow: auto;
`;

// Top Calendar Navigation Bar

export const TopNavContainer = styled.div`
  margin: 30px;
  width: 100%;
  height: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TopNavHeader = styled.h1`
  min-width: 380px;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  @media ${device.tablet} {
    font-size: 23px;
    min-width: 260px;
  }

  @media ${device.mobileL} {
    font-size: 21px;
    min-width: 200px;
  }
`;

export const TopNavHeaderText = styled.div`
  min-width: 200px;
`;

// Calendar Grid

export const GridContainer = styled.div`
  display: grid;
  position: relative;
  width: 100%;
  height: 100%;
  grid-template-column: repeat(8, 1fr);
  grid-template-rows: repeat(${props => props.rows}, 70px);
  padding: 1% 0;
  place-items: stretch stretch;
  place-content: stretch stretch;

  @media ${device.tablet} {
    margin-top: 30px;
  }
`;

export const GridItemHeader = styled.div`
  grid-column-start: ${props => props.column};
  grid-column-end: ${props => props.column};
  grid-row: 1 / span 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-bottom: ${props => (props.column > 1 ? "1px solid #ddd" : "none")};
`;

export const GridItemHeaderDate = styled.div`
  font-size: 30px;

  @media ${device.tablet} {
    font-size: 24px;
  }
`;

export const GridItemHeaderDay = styled.div`
  font-size: 16px;

  @media ${device.tablet} {
    content: "M";
    font-size: 13px;
  }
`;

export const GridItemOpenShift = styled.div`
  grid-row-start: ${props => props.row};
  grid-row-end: ${props => props.row};
  grid-column-start: 1;
  grid-column-end: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: hsl(104, 62.5%, 95%);

  &::after {
    background: #ddd;
    content: "";
    height: 6px;
    width: 6px;
    position: absolute;
    right: -2.5px;
    bottom: -5px;
    transform: translateY(-50%);
    border-radius: 50%;
  }
`;

export const GridItemOpenShiftHeader = styled.h3`
  background: hsl(104, 62.5%, 96%);
`;

export const GridItemEmployee = styled.div`
  grid-row-start: ${props => props.row};
  grid-row-end: ${props => props.row};
  grid-column-start: 1;
  grid-column-end: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    background: #ddd;
    content: "";
    height: 5px;
    width: 5px;
    position: absolute;
    right: -2.5px;
    bottom: -5px;
    transform: translateY(-50%);
    border-radius: 50%;
  }
`;

export const GridItemShift = styled.div`
  grid-row-start: ${props => props.row};
  grid-row-end: ${props => props.row};
  grid-column-start: ${props => props.column};
  grid-column-end: ${props => props.column};
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  background: ${props => props.background};

  &:hover {
    background: #f6f6f6;
    cursor: pointer;
  }
`;

export const GridItemActiveShift = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  grid-row-start: ${props => props.row};
  grid-row-end: ${props => props.row};
  grid-column-start: ${props => props.column};
  grid-column-end: ${props => props.column};
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  display: flex;
  align-items: center;

  &:hover {
    background: #f6f6f6;
    cursor: pointer;
  }
`;

export const GridItemActiveShiftInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props =>
    props.end - props.start > 8 ? (props.end - props.start) * 5 : 45}%;
  height: 70%;
  background: hsl(${props => props.hue}, 62%, 90%);
  color: hsl(${props => props.hue}, 84%, 29%);
  border: hsl(${props => props.hue}, 62%, 81%) solid 1px;
  border-left: hsl(${props => props.hue}, 65%, 60%) solid 4px;
  margin-left: calc(${props => props.start * 4}% + 6px);
  font-size: 13px;
  overflow: hidden;
  padding-left: 2px;

  ${props =>
    props.conflict
      ? `
  background: hsl(0, 62%, 90%);
  color: hsl(0, 84%, 29%);
  border: hsl(0, 62%, 81%) solid 1px;
  border-left: hsl(0, 65%, 60%) solid 4px;
  `
      : null};

  @media ${device.laptop} {
    width: 100%;
    height: 100%;
    font-size: 11px;
    margin-left: 0;
  }

  &:hover {
    cursor: pointer;
    background: hsl(${props => props.hue}, 62.5%, 75.6%);
  }
`;

export const ShiftConflictText = styled.h5`
  position: absolute;
  top: -5px;
  margin-left: -68px;
  left: 50%;
  grid-row-start: ${props => props.row};
  grid-row-end: ${props => props.row};
  grid-column-start: ${props => props.column};
  grid-column-end: ${props => props.column};
  color: hsl(0, 65%, 60%);

  @media ${device.laptop} {
    visibility: hidden;
  }
`;

export const PortalButton = styled.div`
  width: 100%;
  display: flex;
  margin: 5% 0;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
`;

export const PostShiftContainer = styled.div`
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ProfileIcon = styled.div`
  color: white;
  text-align: center;
  margin-right: 10px;
  background: hsl(${props => props.hue}, 65%, 60%);
  height: 20px;
  width: 20px;
  border-radius: 50%;
  font-size: 20px;
`;

export const ScheduleShiftGapHeader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  top: -25px;
  position: absolute;
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: ${props => props.column};
  grid-column-end: ${props => props.column};

  @media ${device.laptop} {
    top: -36px;
  }

  @media ${device.tablet} {
    top: -50px;
  }
`;

export const ScheduleShiftGap = styled.div`
  width: ${props =>
    props.end - props.start ? (props.end - props.start) * 4.6 : 4}%;
  opacity: 0.15;
  height: ${props => (props.height + 2) * 100}%;
  background: red;
  position: absolute;
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: ${props => props.column};
  grid-column-end: ${props => props.column};
  left: ${props => props.start * 4}%;
  pointer-events: none;
`;

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  background: grey;
`;

export const ScheduleClosedDay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  opacity: 0.5;
  background: lightgrey;
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: ${props => props.column};
  grid-column-end: ${props => props.column};
  height: ${props => (props.height + 2) * 100}%;
  z-index: -1;
`;

export const ScheduleTimeOff = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  width: 100%;
  opacity: 0.5;
  background: black;
  grid-row-start: ${props => props.row};
  grid-row-end: ${props => props.row};
  grid-column-start: ${props => (props.startColumn ? props.startColumn : 2)};
  grid-column-end: ${props => (props.endColumn ? props.endColumn : 8)};
  height: 100%;
  z-index: -1;
  color: white;
  font-weight: bold;
`;
