import React, { Component } from 'react';

import "./loader.css"

export default class Loader extends Component {
  constructor(props) {
    super(props);
  }

  timer;

  finishTimer;

  start() {
    this.timer = setTimeout(this.showPage, 2000);
  }

  showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("loaderText").style.display = "none";
    document.getElementById("complete").style.display = "block";
  }
  
  render() {
    if (this.props.loading) {
      this.start();
      return (
        <div className="loaderBox">
          <div style={{ display:'block' }} id="loader"></div>
          <div style={{ display: 'block'}} id="loaderText">This will only take a moment...</div>
          <div style={{ display:'none' }} id="complete" className="animate-bottom">
            Thank you!
          </div>
        </div>
      )
    } else return null;
  } 
}