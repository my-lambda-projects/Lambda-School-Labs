import React from "react";
import PropTypes from "prop-types";

import { Tab, Col, NavItem } from "react-bootstrap";
import { StyledNav, StyledRow } from "./indexCss";

const Profile = props => {
  //Profile function make the use of react-bootstrap Tap presentation to display  all forms
  //it takes is_seeker props to use conditional rendering whether the user is employer or not

  let stepsToArry = Object.entries(props.tabs);

  let steps = stepsToArry
    .filter(item =>
      props.is_seeker
        ? item[0] !== "Company"
        : item[0] !== "Skill" &&
          item[0] !== "Education" &&
          item[0] !== "Experience"
    )
    .map((item, index) => {
      return [
        <NavItem eventKey={index} key={index + 10}>
          {item[0]}
        </NavItem>,
        <Tab.Pane eventKey={index} key={index + 10}>
          {item[1]}
        </Tab.Pane>
      ];
    });
  let tabs = steps.map((step, index) => step[0]);
  let content = steps.map((step, index) => step[1]);

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey={0}>
      <StyledRow className="clearfix">
        <Col sm={4}>
          <StyledNav bsStyle="pills" stacked={true}>
            {tabs}
          </StyledNav>
        </Col>
        <Col sm={8}>
          <Tab.Content animation={false}>{content}</Tab.Content>
        </Col>
      </StyledRow>
    </Tab.Container>
  );
};
export default Profile;

Profile.propTypes = {
  tabs: PropTypes.object.isRequired,
  is_seeker: PropTypes.bool.isRequired
};
