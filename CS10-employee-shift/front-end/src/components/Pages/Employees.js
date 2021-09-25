import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Accordion,
  Icon,
  Segment,
  SegmentGroup,
  Label,
} from "semantic-ui-react";

import { getAllProfiles } from "../../store/Profile/actions";
import { getAvailabilities } from "../../store/Availability/actions";
import { getRequestOffs } from "../../store/requestOff/actions";

import EmployeeCard from "../Organisms/EmployeesEmployeeCard";
import NewEmployee from "../Organisms/EmployeesNewEmployee";

import { EmployeesContainer, EmployeeHeader } from "../../styles/Employees.js";

class Employees extends Component {
  state = {
    activeIndex: -1,
  };

  handleTitleClick = (e, itemProps) => {
    const { index } = itemProps;
    const { activeIndex } = this.state;

    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  componentDidMount() {
    this.props.getAllProfiles();
    this.props.getAvailabilities();
    this.props.getRequestOffs();
  }

  render() {
    return (
      <EmployeesContainer>
        <EmployeeHeader>Employees</EmployeeHeader>
        <SegmentGroup>
          <NewEmployee
            active={this.state.activeIndex === 0}
            index={0}
            click={this.handleTitleClick}
            employeesNumber={this.props.allProfiles.length}
            isPremium={this.props.account ? this.props.account.enabled : false}
          />
          {this.props.allProfiles.map((profile, index) => (
            <Segment key={index + 1}>
              <Accordion>
                <Accordion.Title
                  active={this.state.activeIndex === index + 1}
                  index={index + 1}
                  onClick={this.handleTitleClick}
                >
                  <Label color="blue">
                    <Icon name="dropdown" />
                    {profile.user.first_name} {profile.user.last_name}
                    <Label.Detail>{profile.user.username}</Label.Detail>
                  </Label>
                </Accordion.Title>
                <Accordion.Content
                  active={this.state.activeIndex === index + 1}
                  children={
                    <EmployeeCard
                      profile={profile}
                      allAvailabilities={this.props.allAvailabilities}
                      allRequestOffs={this.props.allRequestOffs}
                    />
                  }
                />
              </Accordion>
            </Segment>
          ))}
        </SegmentGroup>
      </EmployeesContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    allProfiles: state.profile.allProfiles,
    allAvailabilities: state.availability.allAvailabilities,
    allRequestOffs: state.requestOff.allRequestOffs,
    account: state.user.currentUser.account,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllProfiles: () => {
      return dispatch(getAllProfiles());
    },
    getAvailabilities: () => {
      return dispatch(getAvailabilities());
    },
    getRequestOffs: () => {
      return dispatch(getRequestOffs());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Employees);
