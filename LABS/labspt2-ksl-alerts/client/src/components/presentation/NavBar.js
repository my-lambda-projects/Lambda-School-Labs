import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

class NavBar extends Component {
  state = { activeItem: "Feed" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  // may need to do a conditional render for mobile
  render() {
    const { activeItem } = this.state;

    return (
      <Menu secondary vertical>
        <Menu.Item
          name="Feed"
          active={activeItem === "Feed"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Create Alert"
          active={activeItem === "Create Alert"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Settings"
          active={activeItem === "Settings"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Billing"
          active={activeItem === "Billing"}
          onClick={this.handleItemClick}
        />
      </Menu>
    );
  }
}

export default NavBar;
