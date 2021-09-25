import React, { Component } from "react";
import {
  Fade,
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { connect } from 'react-redux';
import { firebase, provider, facebookProvider } from '../firebase/firebase';
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";
import "../css/header.css"
import google from '../google.png';
import facebook from '../facebook.png';


class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      fadeIn: false,
      user: null
    };
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.facebookLogin = this.facebookLogin.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
  }

  customlink = url => {
    this.props.locationChange();
    this.props.history.push(url);
    this.setState({user:localStorage})
  };

  // componentWillMount() {
  //   this.setState({user:localStorage})
  // }; 

  login() {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {        
        const user = {
          name: result.user.displayName,
          email: result.user.email,
          ext_user_id: result.user.uid,
          photoURL:result.user.photoURL
        };
        this.props.loginUser(user)
        this.setState({
          user
        });
      });
  }

  facebookLogin () {	
    firebase	
   .auth()	
   .signInWithPopup(facebookProvider)	
   .then(result => {	
     const user = {	
       name: result.user.displayName,	
       email: result.user.email,	
       ext_user_id: result.user.uid,
       photoURL:result.user.photoURL	
     };	
     this.props.loginUser(user);	

      this.setState({	
       user
     });	
   });	
}

  logout() {
    firebase.auth().signOut();
    this.props.logoutUser();
    this.props.locationChange();    
    this.props.history.push("/");
    this.setState({
      user: null
    })
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleFade() {
    this.setState({
        fadeIn: !this.state.fadeIn
    });
    
}



  render() {
    
    console.log("user:", this.state.user)
    return (
      <div className=
        {this.props.history.location.pathname ==='/'
          ? "nav-container-landing"
          : "nav-container"
        }>
        <Navbar light expand="md">
          <NavbarBrand id="click" onClick={e => this.customlink("/")}>
            Taco Log
          </NavbarBrand>
          {/* <NavbarToggler onClick={this.toggle} /> */}
          <h3 id= "collapse" onClick={this.toggle}> {String.fromCharCode(9776)} </h3>

          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>              
              {this.props.userLoggedIn

                ? <div className="nav-div">
                    <NavLink id ="click" onClick={e => this.customlink("/profile")}>
                      Profile
                    </NavLink>
                    <NavLink id ="click" onClick={e => this.customlink("/home")}>
                      Home
                    </NavLink> </div>
                : <div className="button-div">
                    <div className="signIn" onClick={this.toggleFade}> Sign In </div>
                    <Fade in={this.state.fadeIn} className="fade">
                      {this.state.fadeIn
                        ? <div className="appear">
                            <button className="google-button" onClick={this.login}> <img className="google-logo" src={google} alt="google logo" /> Google </button> 
                            <div className="fb-button" onClick={this.facebookLogin}> <img className="facebook-logo" src={facebook} alt="facebook logo" /> Facebook </div>
                          </div>
                        : <div className="disappear"></div>
                      }
                    </Fade>
                  </div>
                  
              }

              {this.props.userLoggedIn
              ?<UncontrolledDropdown nav inNavbar>
                <DropdownToggle id= "click" nav caret>
                  
                </DropdownToggle>
                <DropdownMenu right>
                  {/* <DropdownItem onClick={e => this.customlink("/AccountSettings")}>
                    <NavLink>Settings</NavLink>
                  </DropdownItem>
                  <DropdownItem>About Us</DropdownItem> */}
                  <DropdownItem>
                    <StripeProvider apiKey="pk_test_wWgYjRm8woZFFe75so0wo6jp">
                      <Elements>
                        <CheckoutForm />
                      </Elements>
                    </StripeProvider>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.logout}>
                  Log Out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              : <div className="disappear"></div>
                }
                
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return { user: state.user };
};

export default connect (mapStateToProps) (Header);