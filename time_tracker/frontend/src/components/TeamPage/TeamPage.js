import React, { Component } from 'react';
import styled from 'styled-components';
import TopBar from '../TopBar/TopBar';
import img from '../../assets/Mountains.jpg';
import github from '../../assets/github_logo.png';
import jacobG from '../../assets/JacobG.jpg';
import guelmisC from '../../assets/guelmiscortina.jpeg';
import troyw from '../../assets/TroyW.jpg';
import { Row, Col } from 'reactstrap';

class TeamPage extends Component {
  render() {
    return (
      <StyledBackground>
        <TopBar />
        <StyledTitle>About The Team -</StyledTitle>
        <Row>
          <Col sm="1" />
          <StyledCol>
            <StyledNames>Troy Williams</StyledNames>
            <StyledPic src={troyw} />
            <StyledBody>This is my description</StyledBody>
            <a href="https://github.com/tdwilliams7">
              <StyledLogo src={github} />
            </a>
          </StyledCol>
          <Col sm="1" />
          <StyledCol>
            <StyledNames>Jacob Gakstatter</StyledNames>
            <StyledPic src={jacobG} />
            <StyledBody>This is my description</StyledBody>
            <a href="https://github.com/gakko1">
              <StyledLogo src={github} />
            </a>
          </StyledCol>
          <Col sm="1" />
          <StyledCol>
            <StyledNames>Guelmis Cortina</StyledNames>
            <StyledPic src={guelmisC} />
            <StyledBody>This is my description</StyledBody>
            <a href="https://github.com/gcode101">
              <StyledLogo src={github} />
            </a>
          </StyledCol>
          <Col sm="1" />
        </Row>
      </StyledBackground>
    );
  }
}

const StyledCol = styled(Col)`
  background: white;
`;

const StyledTitle = styled.h1`
  font-size: 2em;
  background: white;
  width: 50%;
  margin: 0 auto 5px auto;
`;

const StyledPic = styled.img`
  height: 130px;
  width: 100px;
`;

const StyledBackground = styled.div`
  background-image: url(${img});
  background-repeat: no-repeat;
  background-position: center;
  height: 95vh;
`;

const StyledBody = styled.div`
  font-size 1em;
  height: 50vh;
`;

const StyledNames = styled.div`
  font-weight: bold;
  text-decoration: underline;
`;

const StyledLogo = styled.img`
  height: 30px;
  width: 30px;
  position: relative;
  bottom: 0;

  :hover {
    cursor: pointer;
  }
`;

export default TeamPage;
