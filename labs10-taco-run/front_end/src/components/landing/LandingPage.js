import './custom.css'

import React from 'react';
import yelp from './img/yelp.jpg'
import events from './img/event.png'
import tacos from './img/tacos.jpg'
import tacos2 from './img/tacos2.jpeg'
import facebook from './img/facebook.png'
import google from './img/google.png'
import twitter from './img/twitter.png'

import Jonathan from "./img/Jonathan.jpg";
import Marshall from "./img/Marshall.jpg";
import MaxDavid from "./img/MaxDavid.jpg";
import Benny from "./img/Benny2.jpg";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import Popup from "reactjs-popup";


import {connect} from 'react-redux';
import {facebookAuth, twitterAuth, googleAuth} from '../../store/actions/authActions.js';

const styles = theme => ({
  providerButton: {
    height: 75,    
    [theme.breakpoints.down("sm")]: {
      height: 45,      
    }    
  }
});

class LandingPage extends React.Component {  
  render() {
    const { classes } = this.props;
    return (
      <div id="page-wrapper">
  
        <header id="header" className="alt">
          <h1 className = "header-logo"><a href="/">Let's Get Tacos</a> by Labs 10 Taco Run Team</h1>
          <nav id="nav" style = {{ top: "-3px" }}>
            <ul>            
              <li>              
                <ul>
                  <li><a href="generic.html">Generic</a></li>
                  <li><a href="contact.html">Contact</a></li>
                  <li><a href="elements.html">Elements</a></li>
                  <li>
                    <a href="/">Submenu</a>
                    <ul>
                      <li><a href="/">Option One</a></li>
                      <li><a href="/">Option Two</a></li>
                      <li><a href="/">Option Three</a></li>
                      <li><a href="/">Option Four</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <Popup 
                  trigger={<a href="#" className="button">Log In</a>}
                  modal
                  closeOnDocumentClick                  
                >
                  <h3 style = {{ textAlign: "center", color: "black" }}>Login With</h3>
                  <div className = "provider-buttons" style = {{    
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                  >
                    <img src={facebook}  className = {classes.providerButton} alt="facebook-provider-img" onClick={() => { this.props.facebookAuth(); this.props.history.push('/events_create') } }/>
                    <img src={google}  className = {classes.providerButton} alt="google-provider-img" onClick={() => { this.props.googleAuth(); this.props.history.push('/events_create') } }/>
                  </div>
                </Popup>
              </li>
            </ul>
          </nav>
        </header>
  
      
        <section id="banner">
          <h2 className = "description-header">Let's Get Tacos</h2>
          <p className = "banner-paragraph">Where friends don't let friends get tacos alone</p>
          <ul className="actions special">
            <li>
              <Popup 
                trigger={<a href="#" className="button primary">Get Started</a>}
                modal
                closeOnDocumentClick                  
              >
                <h3 style = {{ textAlign: "center", color: "black" }}>Login With</h3>
                <div className = "provider-buttons" style = {{    
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
                >
                  <img src={facebook}  className = {classes.providerButton} alt="facebook-provider-img" onClick={() => { this.props.facebookAuth(); this.props.history.push('/events_create') } }/>
                  <img src={google}  className = {classes.providerButton} alt="google-provider-img" onClick={() => { this.props.googleAuth(); this.props.history.push('/events_create') } }/>
                  <img src={twitter}  className = {classes.providerButton} alt="twitter-provider-img" onClick={() => { this.props.twitterAuth(); this.props.history.push('/events_create') } }/>
                </div>
              </Popup>
            </li>            
            <li><a href="#learn-more" className="button">Learn More</a></li>
          </ul>
        </section>
  
  
        <section id="main" className="container">
  
          <section className="box special">
            <header className="major">
              <h2 className = "description-header">Eating tacos is not an activity done alone
              <br />
              We made it easy to create an event with all your closest friends</h2>
              <p className = "description-paragraph">Don't have a group ready to devour some tacos? That's okay, here at Let's Get Tacos<br />
              you can meet other Taco-Lovers from all over the world</p>
            </header>
            <span className="image featured"><img src="images/pic01.jpg" alt="" /></span>
          </section>
  
          <section id="learn-more" className="box special features">
            <div className="features-row">
              <section>
                <span className="icon major fa-bolt accent2"></span>
                <h3 className = "learn-more-header">Fast And Easy To Use</h3>
                <p className = "paragraph-element">Tired from the hassle of coordinating a meetup? We make the process fast and simple, all you need is to give the meetup a name, place, and empty stomachs.</p>
              </section>
              <section>
                <span className="icon major fa-bookmark accent3"></span>
                <h3 className = "learn-more-header">Keep Track of Your Favorites</h3>
                <p className = "paragraph-element">Ate at a taco place that fits that made your taste buds jump for joy? Sweet, because now you can keep track on your profile all the taco places that are worth remembering for next time.</p>
              </section>
            </div>
            <div className="features-row">
              <section>
                <span className="icon major fa-map-marker accent4"></span>
                <h3 className = "learn-more-header">Using Yelp and Google Maps</h3>
                <p className = "paragraph-element">Find specific taco-serving restaurants, read ratings, and read reviews of restaurants to ensure you pick the most authentic taco restaurants the world has to offer</p>
              </section>
              <section>
                <span className="icon major fa-comments accent5"></span>
                <h3 className = "learn-more-header">Tacos Together</h3>
                <p className = "paragraph-element">Don't hold those feelings of excitement and anticipation back! Chat in the comment sections of events you plan on going to, and even share pictures as well!</p>
              </section>
            </div>
          </section>
  
          <div className="row twoColumn">
            <div className="col-6 col-12-narrower">
  
              <section className="box special">
                <span className="image featured backgroundImage4"></span>
                <h3>Marshall Lanners</h3>
                <p className = "paragraph-element">Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>
                <ul className="actions special">
                  <li><a href="https://github.com/lanners-marshall" target="_blank" className="button alt">Github</a></li>
                </ul>
              </section>
  
            </div>
            <div className="col-6 col-12-narrower">
  
              <section className="box special">
                <span className="image featured backgroundImage"></span>
                <h3>Benny Oseguera</h3>
                <p className = "paragraph-element">Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>
                <ul className="actions special">
                  <li><a href="https://github.com/bennyo27" target="_blank" className="button alt">Github</a></li>
                </ul>
              </section>
  
            </div>
          </div>
  
          <div className="row twoColumn">
            <div className="col-6 col-12-narrower">
  
              <section className="box special">
                <span className="image featured backgroundImage3"></span>
                <h3>Jonathan Laluces</h3>
                <p className = "paragraph-element">Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>
                <ul className="actions special">
                  <li><a href="https://github.com/jlaluces123" target="_blank" className="button alt">Github</a></li>
                </ul>
              </section>
  
            </div>
            <div className="col-6 col-12-narrower">
  
              <section className="box special">
                <span className="image featured backgroundImage2"></span>
                <h3>Max David Metelus</h3>
                <p className = "paragraph-element">Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>
                <ul className="actions special">
                  <li><a href="https://github.com/Mdmetelus" target="_blank" className="button alt">Github</a></li>
                </ul>
              </section>
  
            </div>
          </div>
  
        </section>      
  
  
        <footer id="footer">
          <ul className="icons">            
            <li><a href="https://www.instagram.com/searchfortheperfecttaco/" target="_blank" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
            <li><a href="https://github.com/Lambda-School-Labs/labs10-taco-run" target="_blank" className="icon fa-github"><span className="label">Github</span></a></li>                      
          </ul>
          <ul className="copyright">
            <li>&copy; Untitled. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
          </ul>
        </footer>
      </div>
    );
  } // --> render()
  
} // --> class

// LandingPage.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    error: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    twitterAuth: () => dispatch(twitterAuth()),
    facebookAuth: () => dispatch(facebookAuth()),
    googleAuth: () => dispatch(googleAuth()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LandingPage));
