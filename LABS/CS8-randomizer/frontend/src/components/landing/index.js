import React from "react";
import { connect } from "react-redux";
import { logIn, addUser } from "../../actions";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";

import {
  Nav,
  NavItem,
  NavLink,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input
} from "reactstrap";

import "./landing.css";

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.signToggle = this.signToggle.bind(this);
    this.logToggle = this.logToggle.bind(this);
    this.abToggle = this.abToggle.bind(this);
    this.mainSignToggle = this.mainSignToggle.bind(this);
    // this.isAuth = this.auth.bind(this);
    this.state = {
      dropdownOpen: false,
      signModal: false,
      logModal: false,
      abModal: false,
      // isAuth: this.props.auth
      username: "",
      password: "",
      confirmPassword: "",



    };
  }

  logToggle() {
    this.setState({
      // dropdownOpen: !this.state.dropdownOpen,
      logModal: !this.state.logModal
    });
  }
  mainSignToggle() {
    this.setState({
      abModal: !this.state.abModal,
      signModal: !this.state.signModal
    });
  }

  signToggle() {
    this.setState({
      // dropdownOpen: !this.state.dropdownOpen,
      signModal: !this.state.signModal
    });
  }
  abToggle() {
    this.setState({
      abModal: !this.state.abModal
    });
  }
  loginSimulation() {
    console.log("Logging in");
    this.setState({
      isAuth: true
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    
    if (this.state.confirmPassword !== this.state.password) {
      swal({ icon: "error", text: "Passwords do not match" });
      return;
    }
    if (this.state.password.length < 6) {
      swal({
        icon: "error",
        text: "Password must be six or more characters in length"
      });
      return;
    }
    if (this.state.username.length < 6) {
      swal({
        icon: "error",
        text: "Username must be six or more characters in length"
      });
      return;
    }


    this.props.addUser(
      {
        username: this.state.username.trim(),
        password: this.state.password.trim()
      },
      this.props.history
    );
    this.setState({
      username: "",
      password: "",
      confirmPassword: "",
      dropdownOpen: false,
      signModal: false,
      logModal: false,
      abModal: false,

    });

    

  


    
  };

  handleLogin = event => {
    event.preventDefault();
    if (this.state.password.length < 6) {
      swal({
        icon: "error",
        text: "Password must be six or more characters in length"
      });
      return;
    }
    this.props.logIn(
      {
        username: this.state.username.trim(),
        password: this.state.password.trim()
      },
      this.props.history
    );
    this.setState({
      username: "",
      password: "",
      confirmPassword: ""
    });
  };

  handleChange = event => {
    console.log("HANDLECHANGE");
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  componentDidMount(){
    localStorage.clear();
  }

  render() {


  

  

    return (
      <div className="landing">

        {/* <Nav className="nav" id="Nav-div">
 
        </Nav> */}
        <Nav id="nav-login" className="nav-login">
          <NavItem id="nav-login-button">
            <Button id="nav-button" onClick={this.mainSignToggle}>
              Sign Up
            </Button>
            <NavItem className="nav-about">
            <NavLink>
              
              <Button id="about-button" onClick={this.abToggle}>

                About Magic Randomizer
              </Button>
            </NavLink>
          </NavItem>
          <NavItem className="nav-signup">
            <Modal
              isOpen={this.state.abModal}
              toggle={this.abToggle}
              className={this.props.className}
            >
              <ModalHeader className="modalHeader" toggle={this.abToggle}>
                Our App
              </ModalHeader>
              <ModalFooter className="modalFooter">
                <p className="description">
                  Magic Randomizer is a web app that allows teachers to pick
                  students randomly to call on in class. It also features an "All Pick" mode allows the teacher
                  to make sure that all students get a chance to answer a
                  question before they are called on a second time.
                </p>
                <Button id="nav-button" onClick={this.signToggle}>
                  Sign Up
                </Button>{" "}
                {/* <Button id="nav-button" onClick={this.abToggle}>
                  Cancel
                </Button> */}
              </ModalFooter>
              <Modal isOpen={this.state.signModal} toggle={this.signToggle}>
                <ModalHeader
                  className="modalHeader"
                  toggle={this.mainSignToggle}
                >
                  Sign Up
                </ModalHeader>
                <ModalBody className="modalFooter">
                  <Input
                    className="form__input"
                    type="email"
                    name="username"
                    placeholder="Username (required, 30 chars max)..."
                    maxLength="30"
                    required
                    onChange={this.handleChange}
                    value={this.state.username}
                  />
                  <Input
                    className="form__input"
                    type="password"
                    name="password"
                    placeholder="Password (required, minimum 6 characters)..."
                    maxLength="20"
                    required
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                  <Input
                    className="form__input"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password (required)..."
                    maxLength="15"
                    required
                    onChange={this.handleChange}
                    value={this.state.confirmPassword}
                  />
                </ModalBody>
                <ModalFooter className="modalFooter">
                  <Button id="nav-logconf-button" onClick={this.handleSubmit}>
                    Submit
                  </Button>

                

                </ModalFooter>
              </Modal>
            </Modal>
          </NavItem>

            <Button id="nav-button" onClick={this.logToggle}>
              Login
            </Button>
            <Modal
              isOpen={this.state.logModal}
              toggle={this.logToggle}
              className={this.props.className}
            >
              <ModalHeader className="modalHeader" toggle={this.logToggle}>
                Login
              </ModalHeader>
              <ModalBody>
                <Input
                  type="username"
                  name="username"
                  placeholder="Username (required, minimum 6 characters)..."
                  maxLength="30"
                  required
                  onChange={this.handleChange}
                  value={this.state.username}
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password (required, minimum 6 characters)..."
                  maxLength="20"
                  required
                  onChange={this.handleChange}
                  value={this.state.password}
                />
              </ModalBody>
              <ModalFooter className="modalFooter">
                {/* <Button id="nav-button" onClick={this.mainSignToggle}>
                  Signup
                </Button> */}
                <Button id="nav-logconf-button" onClick={this.handleLogin}>
                  Confirm
                </Button>
                {/* <Button color="secondary" onClick={this.logToggle}>
                  Cancel
                </Button> */}
              </ModalFooter>
            </Modal>

      

          </NavItem>
        </Nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  { logIn, addUser }
)(withRouter(Landing));
