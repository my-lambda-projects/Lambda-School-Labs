import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Icon, Menu, Sidebar } from "semantic-ui-react";

const SideNav = props => {
  let content = null;
  if (props.authorization) {
    content =
      props.authorization.user.groups[0].name === "manager" ? (
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          onHide={props.handleSidebarHide}
          vertical
          visible={props.visible}
          width="thin"
          onMouseLeave={props.handleSidebarHide}
        >
          <Menu.Item as={Link} to={"/admin"}>
            <Icon name="dashboard" />
            Dashboard
          </Menu.Item>
          <Menu.Item as={Link} to="/calendar">
            <Icon name="calendar alternate outline" />
            Calendar
          </Menu.Item>
          <Menu.Item as={Link} to="/employees">
            <Icon name="users" />
            Employees
          </Menu.Item>
          <Menu.Item as={Link} to="/billing">
            <Icon name="money" />
            Billing
          </Menu.Item>
          <Menu.Item as={Link} to="/settings">
            <Icon name="settings" />
            Settings
          </Menu.Item>
        </Sidebar>
      ) : (
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          onHide={props.handleSidebarHide}
          vertical
          visible={props.visible}
          width="thin"
        >
          <Menu.Item as={Link} to={"/dashboard"}>
            <Icon name="dashboard" />
            Dashboard
          </Menu.Item>
          <Menu.Item as={Link} to="/settings">
            <Icon name="settings" />
            Settings
          </Menu.Item>
        </Sidebar>
      );
  }
  return content;
};

const mapStateToProps = state => {
  return {
    authorization: state.user.currentUser,
  };
};

export default connect(
  mapStateToProps,
  null
)(SideNav);
