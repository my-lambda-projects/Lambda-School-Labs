import React, { Component } from "react";
import { Helmet } from "react-helmet";

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: true,
      colors: ["#343e5a", "#de6a5a", "#fed092", "#f5e9df", "#bcc9d2"],
      intervalId: null
    };
  }

  componentDidMount() {
    const intervalId = setInterval(() => {
      this.setState({ animate: false });
      this.shuffleColors();
      setTimeout(() => {
        this.setState({ animate: true });
      }, 100);
    }, 2900);
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  }

  shuffleColors = () => {
    let colorsCopy = this.state.colors;

    function shuffle(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    colorsCopy = shuffle(colorsCopy);
    this.setState({ colors: colorsCopy });
  };

  render() {
    return (
      <div className="loading-container">
        <Helmet>
          <title>COOKBOOK</title>
        </Helmet>
        <div
          className={
            this.state.animate
              ? "color-container is-animated"
              : "color-container"
          }
        >
          <svg id="transition-container" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <path fill={this.state.colors[0]} d="M0 0h2000v450H0z" />
              <path fill={this.state.colors[1]} d="M0 0h2000v450H0z" />
              <path fill={this.state.colors[2]} d="M0 0h2000v450H0z" />
              <path fill={this.state.colors[3]} d="M0 0h2000v450H0z" />
              <path fill={this.state.colors[4]} d="M0 0h2000v450H0z" />
              <path fill="#ffffff" d="M0 0h2000v450H0z" />
            </g>
          </svg>
        </div>

        <span className="text" style={{ color: this.state.colors[0] }}>
          loading...
        </span>
      </div>
    );
  }
}

export default Loading;
