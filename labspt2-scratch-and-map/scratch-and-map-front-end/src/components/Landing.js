import React, { Component } from "react";
import logo from '../img/logowhite.png'
import { Segment } from "semantic-ui-react"

class Landing extends Component {
 
  componentDidMount(){
    let el = document.querySelector('.blurb');
    let text = document.querySelector('.blurb-text');
  el.classList.add('fade-out');
  text.classList.add('fade-out-text');
  }

  render() {

    return (
      <div className="landingpg">
        <Segment raised inverted className="blurb">
          <p className="blurb-text">Get ready to travel the world, one scratch at a time…</p>
          </Segment>
          <img className="logoimg" src={logo} />
      </div>
    );
  }
}

export default Landing;