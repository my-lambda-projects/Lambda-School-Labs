import React, { Component } from "react";
import JSnav from "../../nav/job-seeker/JSnav";
import Messenger from "../../messenger/Messenger";
import "./ClientLanding.css";
import marker from "./marker_icon.png";
import { get_listings, signout } from "../../../actions/index";
import { connect } from "react-redux";
import { GoClock } from "react-icons/go";
import { TiPin } from "react-icons/ti";
import JsMiniMap from "../../miniMap/JsMiniMap/JsMiniMap";

const Timestamp = require("react-timestamp");

class ClientLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      jobListing: [],
      color: "black"
    };
  }

  favorited = () => {
    if (this.state.color === "black") {
      this.setState({ color: "orange" });
    } else {
      this.setState({ color: "black" });
    }
  };

  componentDidMount = () => {
    this.props.get_listings();
  };

  render() {
    let user = JSON.parse(localStorage.getItem("user"));
    let companyListing = null;
    let favoritesListing = null;
    var randomCompany = this.props.jobListing.job_listings[
      Math.floor(Math.random() * this.props.jobListing.job_listings.length)
    ];
    var randomCompany2 = this.props.jobListing.job_listings[
      Math.floor(Math.random() * this.props.jobListing.job_listings.length)
    ];

    if (randomCompany) {
      companyListing = (
        <div className="feat-job">
          <img
            src={`http://127.0.0.1:8000/media/${randomCompany.picture}`}
            alt="user"
          />
          <div className="list-info">
            <div className="pinit">
              <h3 className="jobloc">
                {randomCompany.city}, {randomCompany.state}
              </h3>{" "}
              <TiPin className={this.state.color} onClick={this.favorited} />
            </div>
            <h5 className="job">{randomCompany.jobListings[0].job_title}</h5>
            <p className="job-desc">{randomCompany.jobListings[0].job_desc}</p>
            <p className="post-time">
              <GoClock className="post-clock" />{" "}
              <Timestamp
                time={randomCompany.jobListings[0].posted_time}
                actualSeconds
              />
            </p>
          </div>
        </div>
      );
    }
    if (randomCompany2) {
      favoritesListing = (
        <div className="pinned-listing">
          <img
            src={`http://127.0.0.1:8000/media/${randomCompany.picture}`}
            alt="user"
          />
          <div className="list-info">
            <div className="pinit">
              <h3 className="jobloc">
                {randomCompany.city}, {randomCompany.state}
              </h3>
              <TiPin className="pin-icon" />
            </div>
            <h5 className="job">{randomCompany.jobListings[0].job_title}</h5>
            <p>{randomCompany.jobListings[0].job_desc}</p>
            <p className="post-time">
              <GoClock className="post-clock" />
              <Timestamp
                time={randomCompany.jobListings[0].posted_time}
                actualSeconds
              />
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="client">
        <JSnav />
        <JsMiniMap />
        <Messenger />
        <div className="landing-container">
          <div className="signout">
            <button
              className="signoutbutton"
              onClick={() => {
                this.props.signout(this.props.history);
              }}
            >
              Sign Out
            </button>
          </div>

          <div className="welcome-container">
            <img src={marker} className="profile-marker" alt="marker" />
            <img
              src={`http://127.0.0.1:8000/media/${user.picture}`}
              className="user-pic"
              alt="user"
            />
            <h1>Welcome back, {user.first_name}.</h1>
            <hr className="hr1"></hr>
            <hr className="hr2"></hr>
            <hr className="hr3"></hr>
            <hr className="hr4"></hr>
            <hr className="hr5"></hr>
            <hr className="hr6"></hr>
          </div>
          {companyListing}
          <h3 className="pinned-title">Pinned Jobs:</h3>
          <div className="pinned-jobs">
            <div className="pinned-container">
              {favoritesListing}
              {favoritesListing}
              {favoritesListing}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clients: state.clients,
    jobListing: state.jobListing,
    fetchingListings: state.fetchingListings,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { get_listings, signout }
)(ClientLanding);
