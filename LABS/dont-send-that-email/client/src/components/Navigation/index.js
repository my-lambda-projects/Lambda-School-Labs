import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" light expand="md">
          <Container>
            <NavbarBrand href="/">
              <FontAwesomeIcon icon={["fas", "at"]} className="space" />
              Don't Send That Email!
            </NavbarBrand>
            <Nav>
              <NavItem>
                <NavLink disabled href="#" className="greeting">
                  <p>Hello! {this.props.user.username}</p>
                </NavLink>
              </NavItem>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}
