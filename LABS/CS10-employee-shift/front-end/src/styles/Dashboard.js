import styled from "styled-components";

import { device } from "./globals.js";

// STYLES FOR EMPLOYEE DASHBOARD PAGE

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px 10% 0 10%;

  @media ${device.laptop} {
    padding-top: 80px;
    margin: 16px 18% 0 18%;
  }

  @media ${device.tablet} {
    margin: 16px 1% 0 1%;
  }
`;

export const HorizontalContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;

  @media ${device.laptop} {
    flex-direction: column;
  }
`;

export const DashboardHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

export const Welcome = styled.h1`
  fontsize: 30px;
  fontweight: 300;
`;

export const AssignedShiftsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-top: 5%;
  flex-direction: column;
`;

export const TimeOffApprovedContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-top: 5%;
  flex-direction: column;

  @media ${device.laptop} {
    padding-top: 80px;
  }
`;

export const TimeOffRequestContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-top: 5%;
  flex-direction: column;

  @media ${device.laptop} {
    padding-top: 80px;
  }
`;

export const FormItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  margin: 10%;
  background-color: lightgray;
  padding: 13px;
`;
