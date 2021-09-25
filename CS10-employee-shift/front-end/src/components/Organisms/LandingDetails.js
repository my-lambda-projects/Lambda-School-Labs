import React from "react";

import {
  BackgroundHolder,
  TopContainer,
  FontTitle,
  TextBox,
  MidContainer,
  InnerText,
  TitleText,
} from "../../styles/Landing.js";

import "../../styles/LandingRef.css";

import Accountability from "../../assets/icons/benefits-accountability.png";
import Changes from "../../assets/icons/benefits-changes.png";
import Time from "../../assets/icons/benefits-time.png";

const divStyle = {
  // backgroundColor: '#b8b8b8'
  backgroundColor: "#e6e6e6",
};

const LandingDetails = () => {
  return (
    <div>
      <BackgroundHolder style={divStyle}>
        <TopContainer>
          <FontTitle>The Benefits of MyShifts</FontTitle>
        </TopContainer>

        <MidContainer>
          <TextBox>
            <img className="ouricon" src={Time} alt="time" />
            <TitleText>Spend More Time Growing Your Business</TitleText>
            <InnerText>
              Spend more time working to grow your business and less time
              fighting fires.
            </InnerText>
          </TextBox>

          <TextBox>
            <img
              className="ouricon"
              src={Accountability}
              alt="accountability"
            />
            <TitleText>Increase Employee Accountability</TitleText>
            <InnerText>
              Reduce employee no-shows and improve accountability across your
              team by 25%
            </InnerText>
          </TextBox>

          <TextBox>
            <img className="ouricon" src={Changes} alt="changes" />
            <TitleText>Handle Changes with Ease</TitleText>
            <InnerText>
              Stop rebuilding schedules by reviewing and approving employee
              requests in real-time.
            </InnerText>
          </TextBox>
        </MidContainer>
      </BackgroundHolder>
    </div>
  );
};

export default LandingDetails;
