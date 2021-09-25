import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      slideIndex: 1,
    };
    this.plusDivs = this.plusDivs.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.plusDivs, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  plusDivs() {
    if (this.state.slideIndex <= 3) this.setState(prev => prev.slideIndex++);
    if (this.state.slideIndex > 3) this.setState({ slideIndex: 1 });
  }

  render() {
    return (
      <div>
        <div className="slides">
          <img
            src="https://static.pexels.com/photos/461077/pexels-photo-461077.jpeg"
            alt="slideshow"
            className={this.state.slideIndex === 1 ? 'show-slide' : 'hide-slide'}
          />
          <img
            src="https://static.pexels.com/photos/163125/board-printed-circuit-board-computer-electronics-163125.jpeg"
            alt="slideshow"
            className={this.state.slideIndex === 2 ? 'show-slide' : 'hide-slide'}
          />
          <img
            src="https://static.pexels.com/photos/7919/pexels-photo.jpg"
            alt="slideshow"
            className={this.state.slideIndex === 3 ? 'show-slide' : 'hide-slide'}
          />
          <Link to="pull-requests"><h1 className="enter-btn">Enter</h1></Link>
        </div>
      </div>
    );
  }
}

//dummy images for now, just to give an idea
