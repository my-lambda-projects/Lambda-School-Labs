// Hiring Partner's side nav

import React, { Component } from "react";
import "./HPnav.css";
import navlogo from "./logoatlas.PNG";
import {
  FaHome,
  FaCopyright,
  FaAngleRight,
  FaMap,
  FaMapMarker,
  FaStar,
  FaEnvelope
} from "react-icons/fa";
import { MdSettings, MdAttachMoney } from "react-icons/md";
import { Link } from "react-router-dom";

export default class HPnav extends Component {
  render() {
    return (
      <div className="companyNav-container">
       <div className="skew"></div>
        <div className="secondary-container">
          <div className="lambdamap">
          <img src={navlogo} className="logo" alt="Atlas" />
            <div className="lambda">
             Atlas
            </div>
            <div className="quote">
              "Connecting you with Lambda School's best"
            </div>
          </div>
          <hr className="hrLambda" />

          <Link
            to="/hplanding/"
            className="nav-links"
            style={{ textDecoration: "none" }}
          >
            <li>
              <FaHome className="icons" />
              Home
            </li>
          </Link>

          <Link
            to="/hpmap/"
            className="nav-links"
            style={{ textDecoration: "none" }}
          >
            <li>
              <FaMap className="icons" />
              Map
            </li>
          </Link>

          <Link
            to="/jobseekers/"
            className="nav-links"
            style={{ textDecoration: "none" }}
          >
            <li>
              <FaMapMarker className="icons" />
              Job Seekers
            </li>
          </Link>

          {/* <Link
            to="/favorites/"
            className="nav-links"
            style={{ textDecoration: "none" }}
          > */}
            <li>
              <FaStar className="icons" />
              Favorites
            </li>
          {/* </Link> */}

          <li>
            <FaEnvelope className="icons" />
            Messages
          </li>

          <Link
            to="/settings/"
            className="nav-links"
            style={{ textDecoration: "none" }}
          >
            <li>
              <MdSettings className="icons" />
              Settings
            </li>
          </Link>
        <Link
        to="/billing"
        className="nav-links"
        style={{ textDecoration: "none" }}
        >
          <li>
            <MdAttachMoney className="icons" />
            Billing
          </li>
          </Link>
          
          <footer>
            <h5 className="footer">
              <FaCopyright className="footerIcon" />
              DreamTeam
            </h5>
          </footer>
        </div>
        <div className="arrow">
          <FaAngleRight />
        </div>
      </div>
    );
  }
}
