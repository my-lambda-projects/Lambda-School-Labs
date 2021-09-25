import React from "react";
import ContentBox from "../../components/content-box/ContentBox";
import {
  Pagewrap,
  Moreinfo,
  DevText,
  RecruiterText,
  LandingPageDiv,
  TextBlock,
  Btn
} from "./landingpage.styles";
import Footer from "../../components/Footer/Footer";
import ProfileSvg from "./profile.svg";
import GraphSvg from "./activity.svg";
import { Link } from "react-router-dom";

const LandingPage = (props) => {

  const moreInfoRef = React.createRef();
  const devRef = React.createRef();
  const scroll = (ref) => {
    ref.current.scrollIntoView({behavior: 'smooth', block: "start"})
  }
    return (
      <LandingPageDiv>
        <Pagewrap>
          <ContentBox scroll={scroll} myRef={moreInfoRef} myDevRef={devRef}/>
        </Pagewrap>
        <Moreinfo ref={moreInfoRef}>
          <RecruiterText>
            <TextBlock>
              <h2 id="recruiters">Recruiters</h2>{" "}
              <p>
                Whether you're looking for junior or senior developers, let us
                do the work for you. Sort by location and willingness to
                relocate, view skills and check out candidates' featured
                projects, gitHub pages and portfolios!
              </p>
              <Link to="/public"><Btn>View Developers</Btn></Link>
            </TextBlock>
            <img src={ProfileSvg} alt="profile graphic" />
          </RecruiterText>
          <DevText ref={devRef}>
            <TextBlock>
              <h2 id="developers">Developers</h2>{" "}
              <p>
                Let us help you get you where you want to go by showing your
                profile to top companies across a wide variety of industries. Give us a try today with one of our subscription options!
              </p>
              <Btn onClick={props.auth.login}>Get Started</Btn>
            </TextBlock>
            <img className="dev" src={GraphSvg} alt="git contribution graphic" />
          </DevText>
        </Moreinfo>
        <Footer />
      </LandingPageDiv>
    );
}

export default LandingPage;
