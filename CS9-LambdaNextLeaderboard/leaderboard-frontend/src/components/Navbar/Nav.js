import React, { Component } from "react";
import {
  Button,
  Modal,
  Menu,
  Grid,
  GridColumn,
  Form,
  Input,
  Label,
  Popup,
  GridRow,
  Container,
  Transition,
  Dropdown
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import jwt from "jsonwebtoken";
import {
  registerAdminAction,
  loginAdminAction,
  logoutAdminAction
} from "../../actions/adminActions";

import "./Nav.css";

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: "",
      openModal: false,
      RegisterUsername: "",
      RegisterEmail: "",
      RegisterPassword: "",
      RegisterPassword2: "",
      SignInEmail: "",
      SignInPassword: "",
      expiredToken: false
    };
  }

  handleOpenModal = (e, { content }) => {
    this.setState({ activeItem: content, openModal: true });
  };

  handleCloseModal = () => {
    this.setState({ activeItem: "", openModal: false });
    this.clearErrors();
  };

  handleMenuItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.clearErrors();
  };

  handleRegisterInput = (e, { id, name, value }) => {
    this.setState({ [name]: value });
    this.props.registerErrors[id] = "";
  };

  handleLoginInput = (e, { id, name, value }) => {
    this.setState({ [name]: value });
    this.props.loginErrors[id] = "";
  };

  handleSubmitRegister = () => {
    this.clearErrors();
    this.props.registerAdminAction({
      username: this.state.RegisterUsername,
      email: this.state.RegisterEmail,
      password: this.state.RegisterPassword,
      password2: this.state.RegisterPassword2
    });
    this.setState({ RegisterPassword: "", RegisterPassword2: "" });
  };

  handleSubmitLogin = () => {
    this.clearErrors();
    this.props.loginAdminAction({
      email: this.state.SignInEmail,
      password: this.state.SignInPassword
    });
    this.setState({ SignInPassword: "", SignInUsername: "" });
  };

  handleDashboardClick = () => {
    this.props.history.push("/dashboard");
  };

  handleSettingsClick = () => {
    this.props.history.push("/Settings");
  };

  handleLogout = () => {
    this.props.logoutAdminAction();
    localStorage.removeItem("token");
    localStorage.removeItem("adminID");
    this.props.history.push("/");
  };

  clearErrors = () => {
    this.props.registerErrors.username = "";
    this.props.registerErrors.email = "";
    this.props.registerErrors.password = "";
    this.props.registerErrors.password2 = "";
    this.props.loginErrors.email = "";
    this.props.loginErrors.password = "";
    this.props.loginErrors.invalidLogin = "";
  };

  sessionHasExpired = () => {
    this.handleLogout();
    this.setState({ expiredToken: true });
  };

  hideExpiredMsg = () => {
    this.setState({ expiredToken: false });
  };

  componentDidMount = () => {
    this.props.onRef(this);
  };

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    // check token expiry
    this.props.checkTokenExpiry();

    return true;
  };

  componentDidUpdate = (prevProps, prevState) => {
    // if expired token message is showing -> hide expired token message
    if (this.state.expiredToken) {
      this.hideExpiredMsg();
    }

    // registration successful -> showing login
    if (
      this.props.registeredAdmin &&
      this.props.registeredAdmin !== prevProps.registeredAdmin &&
      this.state.openModal
    ) {
      this.setState({
        RegisterUsername: "",
        RegisterEmail: "",
        activeItem: "Sign In"
      });
    }

    // login successful -> redirecting to dashboard
    if (
      this.props.loggedInAdmin &&
      this.props.loggedInAdmin !== prevProps.loggedInAdmin
    ) {
      if (this.state.openModal) {
        this.setState({
          openModal: false,
          RegisterUsername: "",
          RegisterEmail: "",
          RegisterPassword: "",
          RegisterPassword2: "",
          SignInEmail: "",
          SignInPassword: ""
        });
        this.props.history.push("/dashboard");
      } else {
        this.setState({
          RegisterUsername: "",
          RegisterEmail: "",
          RegisterPassword: "",
          RegisterPassword2: "",
          SignInEmail: "",
          SignInPassword: ""
        });
        this.props.history.push("/dashboard");
      }
    }

    // logged out -> redirecting to landing page
    if (
      !this.props.loggedInAdmin &&
      this.props.loggedInAdmin !== prevProps.loggedInAdmin
    ) {
      this.props.history.push("/");
    }
  };

  render() {
    const { activeItem } = this.state;
    if (this.state.expiredToken) {
      setTimeout(this.hideExpiredMsg, 7000);
    }
    return (
      <nav className="Nav">
        <Container>
          <div className="Nav__container">
            <Link to="/" className="Nav__link">
              <h1>NextSteps</h1>
            </Link>
            {!localStorage.token ? (
              <div>
                <Button
                  size="small"
                  color="linkedin"
                  content="Sign In"
                  onClick={this.handleOpenModal}
                />
                <Button
                  size="small"
                  color="linkedin"
                  content="Register"
                  onClick={this.handleOpenModal}
                />
              </div>
            ) : (
              // <div>
              //   {this.props.history.location.pathname !== "/dashboard" ? (
              //     <Link to="/dashboard">
              //       <Button size="small" color="blue" content="Dashboard" />
              //     </Link>
              //   ) : null}
              //   <Button
              //     size="small"
              //     color="red"
              //     content="Log Out"
              //     onClick={this.handleLogout}
              //   />
              // </div>
              <Button.Group color="blue">
                <Dropdown
                  className="mydropdown"
                  text={`${
                    jwt.decode(localStorage.token.split(" ")[1]).username
                  }`}
                  floating
                  button
                >
                  <Dropdown.Menu direction="right">
                    <Dropdown.Item
                      text="Dashboard"
                      onClick={this.handleDashboardClick}
                    />
                    <Dropdown.Item
                      text="Settings"
                      onClick={this.handleSettingsClick}
                    />
                    <Dropdown.Item text="Logout" onClick={this.handleLogout} />
                  </Dropdown.Menu>
                </Dropdown>
              </Button.Group>
            )}
          </div>
        </Container>
        <Modal
          open={this.state.openModal}
          onClose={this.handleCloseModal}
          centered={false}
          // dimmer="blurring"
          size="small"
        >
          <Modal.Content>
            <Menu tabular>
              <Menu.Item
                name="Sign In"
                active={activeItem === "Sign In"}
                onClick={this.handleMenuItemClick}
              />
              <Menu.Item
                name="Register"
                active={activeItem === "Register"}
                onClick={this.handleMenuItemClick}
              />
            </Menu>
            <Grid divided>
              <GridRow stretched>
                <GridColumn width={9}>
                  {this.state.activeItem === "Sign In" ? (
                    <Form size="large">
                      <Form.Field
                        error={Boolean(
                          this.props.loginErrors.invalidLogin ||
                            this.props.loginErrors.email
                        )}
                      >
                        {this.props.loginErrors.invalidLogin ||
                        this.props.loginErrors.email ? (
                          <Label
                            color="red"
                            pointing="below"
                            content={
                              this.props.loginErrors.invalidLogin ||
                              this.props.loginErrors.email
                            }
                          />
                        ) : null}
                        <Input
                          id="email"
                          name="SignInEmail"
                          value={this.state.SignInEmail}
                          onChange={this.handleLoginInput}
                          icon="mail"
                          iconPosition="left"
                          placeholder="Your email address"
                          type="text"
                        />
                      </Form.Field>
                      <Form.Field
                        error={Boolean(
                          this.props.loginErrors.invalidLogin ||
                            this.props.loginErrors.password
                        )}
                      >
                        {this.props.loginErrors.password ? (
                          <Label
                            color="red"
                            pointing="below"
                            content={this.props.loginErrors.password}
                          />
                        ) : null}
                        <Input
                          id="password"
                          name="SignInPassword"
                          value={this.state.SignInPassword}
                          onChange={this.handleLoginInput}
                          icon="lock"
                          iconPosition="left"
                          placeholder="Your password"
                          type="password"
                        />
                      </Form.Field>
                      <Form.Field>
                        <Button
                          fluid
                          color="green"
                          content="Sign In"
                          onClick={this.handleSubmitLogin}
                          size="large"
                        />
                      </Form.Field>
                      <Popup
                        trigger={
                          <div className="ForgotPassword">
                            <Link to="/">Forgot your password?</Link>
                          </div>
                        }
                        content="Not implemented yet. Sorry!"
                        position="bottom center"
                        size="small"
                      />
                    </Form>
                  ) : (
                    <Form size="large">
                      <Form.Field
                        error={Boolean(this.props.registerErrors.username)}
                      >
                        {this.props.registerErrors.username ? (
                          <Label
                            color="red"
                            pointing="below"
                            content={this.props.registerErrors.username}
                          />
                        ) : null}
                        <Input
                          id="username"
                          name="RegisterUsername"
                          value={this.state.RegisterUsername}
                          onChange={this.handleRegisterInput}
                          icon="user"
                          iconPosition="left"
                          placeholder="Pick a username"
                          type="text"
                        />
                      </Form.Field>
                      <Form.Field
                        error={Boolean(this.props.registerErrors.email)}
                      >
                        {this.props.registerErrors.email ? (
                          <Label
                            color="red"
                            pointing="below"
                            content={this.props.registerErrors.email}
                          />
                        ) : null}
                        <Input
                          id="email"
                          name="RegisterEmail"
                          value={this.state.RegisterEmail}
                          onChange={this.handleRegisterInput}
                          icon="mail"
                          iconPosition="left"
                          placeholder="Your email address"
                          type="text"
                        />
                      </Form.Field>
                      <Form.Field
                        error={Boolean(this.props.registerErrors.password)}
                      >
                        {this.props.registerErrors.password ? (
                          <Label
                            color="red"
                            pointing="below"
                            content={this.props.registerErrors.password}
                          />
                        ) : null}
                        <Input
                          id="password"
                          name="RegisterPassword"
                          value={this.state.RegisterPassword}
                          onChange={this.handleRegisterInput}
                          icon="lock"
                          iconPosition="left"
                          placeholder="Create a password"
                          type="password"
                        />
                      </Form.Field>
                      <Form.Field
                        error={Boolean(this.props.registerErrors.password2)}
                      >
                        {this.props.registerErrors.password2 ? (
                          <Label
                            color="red"
                            pointing="below"
                            content={this.props.registerErrors.password2}
                          />
                        ) : null}
                        <Input
                          id="password2"
                          name="RegisterPassword2"
                          value={this.state.RegisterPassword2}
                          onChange={this.handleRegisterInput}
                          icon="lock"
                          iconPosition="left"
                          placeholder="Confirm password"
                          type="password"
                        />
                      </Form.Field>
                      <Button
                        fluid
                        color="green"
                        content="Create My Account"
                        onClick={this.handleSubmitRegister}
                        size="large"
                      />
                    </Form>
                  )}
                </GridColumn>
                <GridColumn width={7}>OAuth here...</GridColumn>
              </GridRow>
            </Grid>
          </Modal.Content>
          <Modal.Actions />
        </Modal>
        <Transition
          visible={this.state.expiredToken}
          animation="drop"
          duration={500}
          mountOnShow
          unmountOnHide
        >
          <div className="expiredToken" onClick={this.hideExpiredMsg}>
            Your login session has expired.
          </div>
        </Transition>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    registerErrors: state.registerErrors,
    loginErrors: state.loginErrors,
    registeredAdmin: state.registeredAdmin,
    loggedInAdmin: state.loggedInAdmin
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { loginAdminAction, registerAdminAction, logoutAdminAction }
  )(Nav)
);
