import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal,
  Badge
} from "reactstrap";

//from old NavBar
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../auth/store/action";

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      modalSearch: false,
      color: "navbar-transparent"
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateColor);
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: "bg-white"
      });
    } else {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };
  // this function opens and closes the collapse on small devices
  toggleCollapse = () => {
    if (this.state.collapseOpen) {
      this.setState({
        color: "navbar-transparent"
      });
    } else {
      this.setState({
        color: "bg-white"
      });
    }
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // this function is to open the Search modal
  // toggleModalSearch = () => {
  //   this.setState({
  //     modalSearch: !this.state.modalSearch
  //   });
  // };
  //from NavBar
  handleSignOut = e => {
    e.preventDefault();
    this.props.onLogOut();
  };
  render() {
    // let photoSrc;
    // if (this.props.currentUser) {
    //   photoSrc =
    //     this.props.currentUser.photo.length > 1
    //       ? this.props.currentUser.photo
    //       : "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180";
    // } else {
    //   photoSrc =
    //     "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180";
    // }
    return (
      <>
        <Navbar
          className={classNames("navbar-absolute", this.state.color)}
          expand="lg"
        >
          <Container fluid>
            <div className="navbar-wrapper">
              <div
                className={classNames("navbar-toggle d-inline", {
                  toggled: this.props.sidebarOpened
                })}
              >
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={this.props.toggleSidebar}
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
              <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                {this.props.brandText}
              </NavbarBrand>
            </div>
            <button
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navigation"
              data-toggle="collapse"
              id="navigation"
              type="button"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
            </button>
            {this.props.authenticatoin_succeed && (
              <Collapse navbar isOpen={this.state.collapseOpen}>
                <Nav className="ml-auto" navbar>
                  {/* <InputGroup className="search-bar">
                  <Button
                    color="link"
                    data-target="#searchModal"
                    data-toggle="modal"
                    id="search-button"
                    onClick={this.toggleModalSearch}
                  >
                    <i className="tim-icons icon-zoom-split" />
                    <span className="d-lg-none d-md-block">Search</span>
                  </Button>
                </InputGroup> */}
                  <UncontrolledDropdown nav>
                    <DropdownToggle
                      caret
                      color="default"
                      data-toggle="dropdown"
                      nav
                    >
                      <div className="notification d-none d-lg-block d-xl-block" />
                      <i className="tim-icons icon-sound-wave" />
                      <p className="d-lg-none">Balance</p>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-navbar" right tag="ul">
                      {this.props.currentUser &&
                      this.props.currentUser.is_seeker &&
                      !this.props.currentUser.is_employer ? (
                        <NavLink tag="li">
                          <DropdownItem className="nav-item">
                            Free Apps{" "}
                            <Badge color="info">
                              {this.props.currentUser.free_apps}
                            </Badge>
                          </DropdownItem>
                        </NavLink>
                      ) : null}

                      {this.props.currentUser &&
                      this.props.currentUser.is_employer &&
                      !this.props.currentUser.is_seeker ? (
                        <>
                          <NavLink tag="li">
                            <DropdownItem className="nav-item">
                              Postings Availible{" "}
                              <Badge color="default">
                                {this.props.currentUser.postings}
                              </Badge>
                            </DropdownItem>
                          </NavLink>
                          <NavLink tag="li">
                            <DropdownItem className="nav-item">
                              Free Calls{" "}
                              <Badge color="info">
                                {this.props.currentUser.free_calls}
                              </Badge>
                            </DropdownItem>
                          </NavLink>
                        </>
                      ) : null}

                      <NavLink tag="li">
                        <DropdownItem className="nav-item">
                          Credits{" "}
                          <Badge color="success">
                            {this.props.currentUser.credits}
                          </Badge>
                        </DropdownItem>
                      </NavLink>
                      {/* <NavLink tag="li">
                        <DropdownItem className="nav-item">
                          Another one
                        </DropdownItem>
                      </NavLink> */}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav>
                    <DropdownToggle
                      caret
                      color="default"
                      data-toggle="dropdown"
                      nav
                      onClick={e => e.preventDefault()}
                    >
                      <div className="photo">
                        {/* <img alt="..." src={require("assets/img/anime3.png")} /> */}
                        <img
                          alt="..."
                          src={
                            this.props.currentUser.photo ||
                            require("assets/img/anime3.png")
                          }
                        />
                      </div>
                      <b className="caret d-none d-lg-block d-xl-block" />
                      <p className="d-lg-none">Account</p>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-navbar" right tag="ul">
                      <NavLink tag="li">
                        <Link to="/profile">
                          <DropdownItem className="nav-item">
                            <i className="tim-icons icon-single-02" /> Profile
                          </DropdownItem>
                        </Link>
                      </NavLink>
                      <NavLink tag="li">
                        <Link to="/billing">
                          <DropdownItem className="nav-item">
                            <i className="tim-icons icon-cart" /> Billing
                          </DropdownItem>
                        </Link>
                      </NavLink>
                      <DropdownItem divider tag="li" />
                      <NavLink tag="li">
                        <Link to="/" onClick={this.handleSignOut}>
                          <DropdownItem className="nav-item">
                            <i className="tim-icons icon-button-power" /> Sign
                            Out
                          </DropdownItem>
                        </Link>
                      </NavLink>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <li className="separator d-lg-none" />
                </Nav>
              </Collapse>
            )}
          </Container>
        </Navbar>
        {/* <Modal
          modalClassName="modal-search"
          isOpen={this.state.modalSearch}
          toggle={this.toggleModalSearch}
        >
          <div className="modal-header">
            <Input id="inlineFormInputGroup" placeholder="SEARCH" type="text" />
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={this.toggleModalSearch}
            >
              <i className="tim-icons icon-simple-remove" />
            </button>
          </div>
        </Modal> */}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.user
  };
}

const mapDispatchToProps = dispatch => ({
  onLogOut: user => {
    dispatch(logOut());
  }
});
// const ConnectedNavBar = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AdminNavbar);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminNavbar);

// export default class WrappedNavbar extends React.Component {
//   render() {
//     return <ConnectedNavBar />;
//   }
// }
