import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  LandingNavBar,
  ScheduleButton,
  WelcomeSide,
  MainLogo,
  WelcomeH1,
  WelcomeLogo,
  WelcomeHolder,
  CircleDiv,
  Circles,
  CircleImg,
  NavButton,
} from "../../styles/Landing.js";

import "../../styles/LandingRef.css";

import main_logo from "../../assets/logos/employee_scheduler2.png";
import talkingLogo from "../../assets/logos/talking.png";
import women from "../../assets/logos/3_women.png";
import chat_at_table from "../../assets/logos/chat_at_table.png";
import coding_at_work from "../../assets/logos/coding_at_work.png";
import working_at_comp from "../../assets/logos/working_at_comp.png";
import working_solo from "../../assets/logos/working_solo.png";

class LandingCard extends Component {
  state = { visible: false };

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    return (
      <div className="container" data-test="component-LandingCard">
        <WelcomeHolder>
          <WelcomeSide>
            <MainLogo src={main_logo} />
            <WelcomeH1>Build your Work Schedule in Minutes.</WelcomeH1>
            {/* <WelcomeText>
                            <p>Build your Work Schedule in Minutes.</p>
                        </WelcomeText> */}
            <ScheduleButton>
              <Link to="/signup">
                <ScheduleButton className="btn" data-test="schedule-button">
                  Schedule Now
                </ScheduleButton>
              </Link>
            </ScheduleButton>
          </WelcomeSide>
          <WelcomeLogo>
            <LandingNavBar>
              <NavButton>
                <Link to="/signup">
                  <NavButton className="signup_btn" data-test="signup-button">
                    Sign up
                  </NavButton>
                </Link>
              </NavButton>
              <NavButton>
                <Link to="/signin">
                  <NavButton className="signin_btn" data-test="signin-button">
                    Sign in
                  </NavButton>
                </Link>
              </NavButton>
            </LandingNavBar>
            <CircleDiv className="fade_1">
              <Circles>
                <CircleImg src={talkingLogo} />
                <CircleImg src={women} />
                <CircleImg src={chat_at_table} />
                <CircleImg src={coding_at_work} />
                <CircleImg src={working_at_comp} />
                <CircleImg src={working_solo} />
              </Circles>
            </CircleDiv>
          </WelcomeLogo>
        </WelcomeHolder>
      </div>
    );
  }
}

export default LandingCard;
