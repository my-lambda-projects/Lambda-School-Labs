import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logOut } from "../../auth/store/action";
import {
  Navbar,
  Nav,
  NavItem,
  Collapse,
  NavbarToggler,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { ProfilePhotoContainer, ProfileImg } from "./indexCss";
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSignOut = e => {
    e.preventDefault();
    this.props.logOut();
  };
  toggle = () => {
    this.setState({ navbarTogglerOpen: !this.state.navbarTogglerOpen });
  };

  dropDownToggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };
  render() {
    let photoSrc;
    if (this.props.currentUser) {
      photoSrc =
        this.props.currentUser.photo.length > 1
          ? this.props.currentUser.photo
          : "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180";
    } else {
      photoSrc =
        "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180";
    }
    // let credit;
    // if (this.props.currentUser && this.props.currentUser.is_seeker) {
    //   credit = `Free Apps: ${this.props.currentUser.free_apps}`;
    // } else {
    //   credit = `Free Calls: ${this.props.currentUser.free_calls}`;
    // }

    return (
      <Navbar color="light" light expand="sm">
        <div className="container">
          <NavLink
            to="/"
            activeStyle={{
              fontWeight: "bold",
              textDecoration: "none",
              color: "#4D4D4D",
              fontSize: "30px"
            }}
          >
            Job Matcher
          </NavLink>
          <NavbarToggler onClick={this.toggle} />
          {this.props.authenticatoin_succeed && (
            <Collapse isOpen={this.state.navbarTogglerOpen} navbar>
              <Nav className="ml-auto" navbar>
                {this.props.currentUser &&
                this.props.currentUser.is_seeker &&
                !this.props.currentUser.is_employer ? (
                  <NavItem
                    style={{ color: "#4D4D4D", padding: "8px" }}
                    activeStyle={{ color: "red" }}
                  >
                    Free Apps:{this.props.currentUser.free_apps}
                  </NavItem>
                ) : null}

                {this.props.currentUser &&
                this.props.currentUser.is_employer &&
                !this.props.currentUser.is_seeker ? (
                  <>
                    <NavItem style={{ color: "#4D4D4D", padding: "8px" }}>
                      Postings Availible:{this.props.currentUser.postings}
                    </NavItem>
                    <NavItem style={{ color: "#4D4D4D", padding: "8px" }}>
                      Free Calls: {this.props.free_calls}
                    </NavItem>
                  </>
                ) : null}
                <NavItem
                  style={{ color: "#4D4D4D", margin: "8px" }}
                  activeStyle={{ color: "red" }}
                >
                  Balance credits:{this.props.currentUser.credits}
                </NavItem>
                <ProfilePhotoContainer>
                  <ProfileImg src={photoSrc} alt="" />
                </ProfilePhotoContainer>
                <UncontrolledDropdown
                  nav
                  inNavbar
                  isOpen={this.state.dropdownOpen}
                  toggle={this.dropDownToggle}
                >
                  <DropdownToggle
                    nav
                    caret
                    style={{
                      color: "#4D4D4D",
                      // color: "initial",
                      textTransform: "uppercase"
                    }}
                  >
                    {this.props.currentUser.first_name}{" "}
                    {this.props.currentUser.last_name}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <Link to="/">Home</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/profile">My Profile</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/Matches">Matches</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/Messages">Messages</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/Billing">Billing</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/view">View</Link>
                    </DropdownItem>
                    {this.props.currentUser &&
                    this.props.currentUser.is_employer &&
                    !this.props.currentUser.is_seeker ? (
                      <DropdownItem>
                        <Link to="/Job">Job</Link>
                      </DropdownItem>
                    ) : null}
                    <DropdownItem divider />
                    <DropdownItem>
                      <Link to="/" onClick={this.handleSignOut}>
                        Sign Out
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          )}
        </div>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.user
  };
}

// const mapDispatchToProps = dispatch => ({
//   onLogOut: user => {
//     dispatch(logOut());
//   }
// });

const ConnectedNavBar = connect(
  mapStateToProps,
  { logOut }
)(NavBar);

export default class Wrapper extends React.Component {
  render() {
    return <ConnectedNavBar />;
  }
}
