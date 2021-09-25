import React, { Component } from "react";
import { connect } from "react-redux";
import { FormGroup } from "reactstrap";
import GlobalTacoList from "./GlobalTacoList";
import LandingPageFiller from "./LandingPageFiller";
// import landingPageCover from "../img/landingpagecover.jpg";
import { firebase, provider, facebookProvider } from "../firebase/firebase";
import google from "../google.png";
import facebook from "../facebook.png";
import "../css/landing.css";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exptacos: [],
      selectedTab: "global",
      taco_location: "",
      fadeIn: false,
      photo: "",
      address: "",
      place_id: "",
      staticMap: "",
      lat: "",
      lng: "",
      modal: false
    };
    this.toggleFade = this.toggleFade.bind(this);
    this.searchTaco = this.searchTaco.bind(this);
    this.login = this.login.bind(this);
    this.facebookLogin = this.facebookLogin.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleToggle = e => {
    this.setState({
      selectedTab: e.target.id
    });
  };

  toggleFade() {
    this.setState({
      fadeIn: !this.state.fadeIn
    });
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchTaco() {
    const taco = {
      photo: this.state.photo,
      address: this.state.address,
      taco_location: this.state.taco_location,
      place_id: this.state.place_id,
      staticMap: this.state.staticMap,
      lat: this.state.lat,
      lng: this.state.lng
    };
    this.props.storeLandingTaco(taco);
    if (this.props.userLoggedIn) {
      this.props.history.push("/home");
    } else {
      this.toggleModal();
    }
  }

  toggleModal() {
    this.setState({ modal: !this.state.modal });
  }

  componentDidMount() {
    this.props.GET_TACO();
    let expTacos = [];
    if (this.props.userInfo.taco_logs) {
      for (let i = 0; i < this.props.userInfo.taco_logs.length; i++) {
        let exp = this.props.userInfo.taco_logs[i].special_experience;
        if (exp === 1) {
          expTacos.push(this.props.userInfo.taco_logs[i]);
        }
      }
      this.setState({
        expTacos: expTacos
      });
    }

    const inputElement = document.querySelector(".input");
    const dropdown = new window.google.maps.places.Autocomplete(inputElement);
    dropdown.addListener("place_changed", () => {
      const place = dropdown.getPlace();
      this.setState({
        address: place.formatted_address,
        taco_location: place.name,
        place_id: place.id,
        staticMap: true,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        photo: place.photos[0].getUrl()
      });
    });
  }

  login() {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const user = {
          name: result.user.displayName,
          email: result.user.email,
          ext_user_id: result.user.uid,
          photoURL: result.user.photoURL
        };
        this.props.loginUser(user);
        this.props.locationChange();
        this.props.history.push("/home");
        this.setState({
          user
        });
      });
  }

  facebookLogin() {
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then(result => {
        const user = {
          name: result.user.displayName,
          email: result.user.email,
          ext_user_id: result.user.uid,
          photoURL: result.user.photoURL
        };
        this.props.loginUser(user);
        // this.props.locationChange();
        // this.props.history.push("/home");

        this.setState({
          user
        });
      });
  }

  render() {
    
    return (
      <div className="landing-container">
        <div
          className={this.state.modal ? "signin-modal display" : "signin-modal"}
        >
          
          <div className="content">

            <div className="modal-text">
              Please sign in to continue. No sign up required!
            </div>
            {/* <span onClick={this.toggleModal}> X </span> */}
            <div className="modal-btns">
              <button className="google-button" onClick={this.login}>
                
                <img
                  className="google-logo"
                  src={google}
                  alt="google logo"
                />
                Google
              </button>
              <div className="fb-button" onClick={this.facebookLogin}>
                
                <img
                  className="facebook-logo"
                  src={facebook}
                  alt="facebook logo"
                />
                Facebook
              </div>
            </div>
            <span className="close-modal" onClick= {this.toggleModal}>close</span>
          </div>
        </div>
        <div className="img-container">
          <div className="img-intro">
            <h1>Welcome to Taco Logs</h1>
            <h4>Home of the Taco Enthusiast!</h4>
            <div className="form">
              <FormGroup className="form-group-landing">
                <input
                  onChange={this.handleInputChange}
                  className="input"
                  type="search"
                  value={this.state.taco_location}
                  name="taco_location"
                  id="search"
                  placeholder="Find Taco"
                />
                <button className="button" onClick={this.searchTaco}>
                  {" "}
                  Search{" "}
                </button>
              </FormGroup>
              <h4>Find a taco to log!</h4>
            </div>
          </div>
        </div>

        <div className="mid-section">
          <div className="global">
            <div>User Taco Logs</div>
            <GlobalTacoList {...this.props} />
          </div>
          
          <LandingPageFiller />
        </div>
      </div>
    );
  }
}

export default connect()(Landing);
