import React, { Component } from "react";
import HPnav from "../../nav/company/HPnav";
import {
  create_listing,
  signout,
  get_hp,
  delete_listing
} from "../../../actions/index";
import { connect } from "react-redux";
import { GoClock } from "react-icons/go";
import HpMiniMap from "../../miniMap/HpMiniMap/HpMiniMap";
import Messenger from "../../messenger/Messenger";
import "./HPlanding.css";
import marker from "./marker_icon.png";

const Timestamp = require("react-timestamp");
let user = JSON.parse(localStorage.getItem("user"));

class HPLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job_title: "",
      job_desc: "",
      job_link: "",
      remote_job: false
    };
  }

  componentDidMount = () => {
  
    this.props.get_hp(user.ID);
  };

  render() {
    var mappedListings = null;
    if (this.props.hirePartner.HP.job_listings !== undefined) {
      mappedListings = (
        <div className="posted-container1">

          {this.props.hirePartner.HP.job_listings.map(jls => (
            <div key={jls.ID} className="posted-listing">
              <div className="list-info">
                <h4 className="job">{jls.fields.job_title}</h4>
                <p>{jls.fields.job_desc}</p>
                <p className="post-time">
                  <GoClock className="post-clock" />
                  <Timestamp time={jls.posted_time} actualSeconds />
                </p>
                <div className="delete">
                  <button
                    onClick={() => {
                      this.props.delete_listing(jls.ID);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="hp-landing">
        <HPnav />
        <HpMiniMap />
        <Messenger />
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
        <div className="main-hplanding">
          <div className="welcome-container">
            <img src={marker} className="profile-marker" alt="marker" />
            <img
              src={`http://127.0.0.1:8000/media/${user.picture}`}
              className="user-pic"
              alt="user"
            />
            <h1>Welcome back, {user.company_name}.</h1>
            <hr className="hr1"></hr>
            <hr className="hr2"></hr>
            <hr className="hr3"></hr>
            <hr className="hr4"></hr>
            <hr className="hr5"></hr>
            <hr className="hr6"></hr>
          </div>
          <div className="new-joblisting">
            <h2>Add New Job Listing</h2>
            <div className="listing-input">
              <div className="remote-switch">
                <label className="switch">
                  <input
                    type="checkbox"
                    name="remote_job"
                    className="input"
                    checked={this.state.remote_job}
                    onChange={e =>
                      this.setState({ [e.target.name]: e.target.checked })
                    }
                  />
                  <span className="slider round" />
                </label>
                <h4>* Remote Job</h4>
              </div>

              <input
                type="text"
                placeholder="Job Title"
                name="job_title"
                className="input"
                value={this.state.job_title}
                onChange={e =>
                  this.setState({ [e.target.name]: e.target.value })
                }
              />

              <input
                type="url"
                placeholder="Job Link"
                name="job_link"
                className="input"
                value={this.state.job_link}
                onChange={e =>
                  this.setState({ [e.target.name]: e.target.value })
                }
              />

              <textarea
                type="text"
                placeholder="Job Description"
                name="job_desc"
                className="input"
                value={this.state.job_desc}
                onChange={e =>
                  this.setState({ [e.target.name]: e.target.value })
                }
              />
            </div>
            <button
              onClick={() => {
                this.props.create_listing({
                  hp_id: user.ID,
                  job_title: this.state.job_title,
                  job_desc: this.state.job_desc,
                  job_link: this.state.job_link,
                  remote_job: this.state.remote_job
                });
                this.setState({
                  job_title: "",
                  job_desc: "",
                  job_link: "",
                  remote_job: false
                });
              }}
            >
              Post
            </button>
          </div>
          <h3 className="pinned-title">Your Posted Jobs:</h3>
          {mappedListings}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    jobListing: state.jobListing,
    hirePartner: state.hirePartner,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { create_listing, signout, get_hp, delete_listing }
)(HPLanding);