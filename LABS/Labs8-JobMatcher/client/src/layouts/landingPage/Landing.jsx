import React from "react";
import "./index.css";
import { LandingDiv, CenterDiv } from "./landingPageCss";
import styled from "styled-components";
import Typing from "react-typing-animation";
import { Row, Col } from "reactstrap";
import MenuLogin from "./MenuLogin";
import TransitionGroup from "react-transition-group/TransitionGroup"; // ES6

const FixedTagLine = styled(Col)`
  text-align: right;
  padding-right: 0;
  // @media()
`;
const DynamicTagLine = styled(Col)`
  text-align: start;
  padding-left: 5px;
  font-weight: bold;
  // font-style: italic;
  span {
    text-decoration: underline;
    //   background-color: blue;
    //   color: white;
    //   padding: 4px;
  }
`;
const StyledMenu = styled.div`
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  border-radius: 5px;
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.125);
  padding: 4px 15px;
  color: white;
  font-size: 16px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-family: Raleway, Helvetica, sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  i {
    float: right;
  }
  &:hover {
    text-decoration: none;
  }
`;

const StyledH2 = styled.h2`
  // border-bottom: solid 2px rgba(255, 255, 255, 0.125);
  font-size: 2.25em;
  margin-bottom: 25px;
  padding-bottom: 14px;
  color: #ffffff;
  font-family: Raleway, Helvetica, sans-serif;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin: 0 0 1em 0;
  text-transform: uppercase;
`;
const StyledP = styled.p`
    font-family: Raleway, Helvetica, sans-serif;
    font-size: 10px;
    font-weight: 200;
    letter-spacing:5px
    line-height: 2;
    text-transform: uppercase;
    font-size: 14px;
`;
const StyledDivLogo = styled.div`
  margin-bottom: 20px;
  i {
    border-radius: 100%;
    border: solid 2px rgba(255, 255, 255, 0.125);
    cursor: default;
    display: inline-block;
    font-size: 40px;
    height: 2.25em;
    line-height: 2.25em;
    text-align: center;
    width: 2.25em;
  }
`;

class Landing extends React.Component {
  state = {
    is_menuOpen: false
  };

  toggleMenu = e => {
    this.setState({
      is_menuOpen: !this.state.is_menuOpen
    });
  };

  render() {
    return (
      <React.Fragment>
        <LandingDiv is_menuOpen={this.state.is_menuOpen}>
          <StyledMenu onClick={this.toggleMenu}>Sign Up | Sign In</StyledMenu>
          <CenterDiv>
            <section id="banner">
              <div className="inner">
                <StyledDivLogo className="logo">
                  <i className="fas fa-binoculars">{""}</i>
                </StyledDivLogo>
                <StyledH2>This is Seek Geek</StyledH2>
                <h3>
                  <Row>
                    <FixedTagLine xs={6}>Helping employers find</FixedTagLine>
                    <DynamicTagLine xs={6}>
                      <Typing
                        speed={100}
                        loop={true}
                        component={"span"}
                        startDelay={2000}
                        className={"typer_cursor"}
                        hideCursor={true}
                        cursorClassName={"typer_cursor"}
                      >
                        {"Geniuses,Engineers,Developers,Data Scientists,Mobile Devs,Full Stack Developers,Executives"
                          .split(",")
                          .map(word => (
                            <React.Fragment>
                              <span>{` ${word} `}</span>
                              <Typing.Backspace
                                count={word.length + 1}
                                delay={1000}
                              />
                              {/*<Typing.Delay ms={1000} />*/}
                            </React.Fragment>
                          ))}
                      </Typing>
                    </DynamicTagLine>
                  </Row>
                </h3>
              </div>
            </section>
          </CenterDiv>
        </LandingDiv>
        {this.state.is_menuOpen && (
          <TransitionGroup>
            <MenuLogin
              is_menuOpen={this.state.is_menuOpen}
              onClick={this.toggleMenu}
            />
          </TransitionGroup>
        )}
      </React.Fragment>
    );
  }
}

export default Landing;
