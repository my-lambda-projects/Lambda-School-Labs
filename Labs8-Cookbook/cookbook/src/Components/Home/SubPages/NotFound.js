//license https://codepen.io/sowmyaseshadri/details/YOEozx

import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <Helmet>
        <title>404 | COOKBOOK</title>
      </Helmet>
      <div className="notfound-caption">
        <div className="notfound-hat-cont">
          <div className="notfound-lines" />
          <div className="notfound-hat" />
          <div className="notfound-left" />
          <div className="notfound-top" />
          <div className="notfound-left-opp" />
        </div>
        <div className="notfound-head-text">
          Recipe not Found! Please click <Link to="/home/recipes">here</Link> to
          go back!
        </div>
      </div>
      <div className="notfound-head">
        <div className="notfound-pan-wrapper">
          <div className="notfound-center">
            <div className="notfound-sub-center">
              <div className="notfound-egg">
                <div className="notfound-yolk" />
              </div>
            </div>
          </div>
          <div className="notfound-handle" />
          <div className="notfound-handle-sub" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
