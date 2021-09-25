import React, { Component } from "react";
import SideNav from "../Organisms/SideNavigation.js";
import TopNav from "../Organisms/TopNavigation.js";

import { Link } from "react-router-dom";

import {
  MainContainer,
  ComponentContainer,
  MainLogo,
} from "../../styles/Template.js";

import main_logo from "../../assets/logos/employee_scheduler2.png";

import { Button, Segment, Sidebar, Icon } from "semantic-ui-react";

class main extends Component {
  state = { visible: false };

  handleButtonClick = () => this.setState({ visible: !this.state.visible });

  handleSidebarHide = () => this.setState({ visible: false });

  render() {
    return (
      <MainContainer>
        <Sidebar.Pushable as={Segment}>
          <SideNav
            visible={this.state.visible}
            handleSidebarHide={this.handleSidebarHide}
          />
          <Sidebar.Pusher>
            <Button
              style={{
                position: "absolute",
                top: "18px",
                left: "18px",
                zIndex: "5000",
              }}
              onClick={this.handleButtonClick}
            >
              <Icon name="sidebar" />
            </Button>
            <Link to="/">
              <MainLogo src={main_logo} />
            </Link>
            <TopNav />
            <ComponentContainer>
              <this.props.component />
            </ComponentContainer>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </MainContainer>
    );
  }
}

export default main;
