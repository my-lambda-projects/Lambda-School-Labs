import React, { Component } from "react";
import "./HPprofile.css";
import JSnav from "../nav/job-seeker/JSnav";
import Messenger from "../messenger/Messenger";
import JSMiniMap from "../miniMap/JsMiniMap/JsMiniMap";
import { get_hp, signout } from "../../actions";
import { connect } from "react-redux";
import { FaLink, FaEnvelope, FaPhoneSquare } from "react-icons/fa";
import { GoClock } from "react-icons/go";

const Timestamp = require("react-timestamp");

class HpProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hirePartner: []
    };
  }
  componentDidMount = () => {
    const id = this.props.match.params.id;
    this.props.get_hp(id);
  };
  render() {
    var mappedListings = null;
    if (this.props.hirePartner.HP.job_listings !== undefined) {
      mappedListings = (
        <div className="posted-container">
          {this.props.hirePartner.HP.job_listings.map(jls => (
            <div key={jls.id} className="hpposted-listing">
              <div className="list-info">
                <h4 className="job">{jls.fields.job_title}</h4>
                <p>{jls.fields.job_desc}</p>
                <FaLink className="joblink-url" />
              </div>
              <div className="posted-time">
                <GoClock className="clock" />
                <Timestamp time={jls.fields.posted_time} actualSeconds />
              </div>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="main">
        <JSnav />
        <JSMiniMap />
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
        <div className="hpprof-container">
          <div className="hpsidebyside">
            <div className="hpprofile-container">
              <div className="pic-bg">
                <img src={`http://127.0.0.1:8000/media/${this.props.hirePartner.HP.picture}`} alt="hppic" />
                <h1>{this.props.hirePartner.HP.company_name}</h1>
                <h3>
                  {this.props.hirePartner.HP.city},{" "}
                  {this.props.hirePartner.HP.state}
                </h3>
              </div>
            </div>
            <div className="info-container">
              <div className="hpprofile-contact">
                <p>
                  <FaEnvelope className="contactIcons" />
                  {this.props.hirePartner.HP.email}
                </p>
                <p>
                  <FaPhoneSquare className="contactIcons" />
                  {this.props.hirePartner.HP.phone}
                </p>
              </div>
              <div className="hpprofile-about">
                {this.props.hirePartner.HP.about}
              </div>
            </div>
          </div>
          <hr />
          <div className="hps-listings">
            <h3 className="pinned-title">
              {this.props.hirePartner.HP.company_name}
              's Current Job Listing:
            </h3>
            {mappedListings}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    hirePartner: state.hirePartner,
    fetchingListings: state.fetchingHp,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { get_hp, signout }
)(HpProfileView);
