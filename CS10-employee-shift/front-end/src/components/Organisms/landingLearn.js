import React from "react";
import { Link } from "react-router-dom";
import {
  Frame1TextContainer,
  FrameHeading,
  FrameText,
  FrameContainer,
  Frame2,
  Frame2Heading,
} from "../../styles/Landing.js";
import "../../styles/LandingRef.css";
import bgPicture from "../../assets/background/worklife.png";

const LandingLearn = () => {
  return (
    <div>
      <Frame1TextContainer>
        <FrameHeading>
          Employee Scheduling Software for Your Industry
        </FrameHeading>
        <FrameText>
          MyShift was built to serve the employee scheduling and communication
          needs of workplaces across a wide range of industries. MyShift make
          scheduling staff easy for coffee shops, restaurants, customer service
          departments, retail shops, colleges, healthcare organizations,
          nonprofits, and many, many other types of workplaces. If you have
          hourly employees, we can help make scheduling, communication, and
          collaboration easier for you and your team.
        </FrameText>
      </Frame1TextContainer>

      <FrameContainer>
        <img
          className="frame1"
          src={bgPicture}
          alt="scrabble letters work versus life on a balance"
        />
        <Frame2>
          <Frame2Heading>
            Employee Scheduling Software. Reinvented.
          </Frame2Heading>
          <Link to="/signup">
            <div className="cta-button">
              <p>START SCHEDULING</p>
            </div>
          </Link>
        </Frame2>
      </FrameContainer>
    </div>
  );
};

export default LandingLearn;
