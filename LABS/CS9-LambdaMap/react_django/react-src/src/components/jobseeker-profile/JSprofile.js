// Hiring Partner View of individual job seeker profile
import React, { Component } from "react";
import "./JSprofile.css";
import HPnav from "../nav/company/HPnav";
import Messenger from "../messenger/Messenger";
import HpMiniMap from "../miniMap/HpMiniMap/HpMiniMap";
import { get_client, signout } from "../../actions";
import { connect } from "react-redux";
import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaCodepen,
  FaFile,
  FaDesktop,
  FaEnvelope,
  FaPhoneSquare,
  FaCheckSquare
} from "react-icons/fa";

class JSprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: []
    };
  }

  componentDidMount = () => {
    const id = this.props.match.params.id;
    this.props.get_client(id);
  };

  render() {
    let remoteWork = null
    let relocating = null
    if (this.props.clients.client.remote === true) {
      remoteWork = (

         <p><FaCheckSquare className="contactIcons" />Open to remote work</p>

      )
    } else if (this.props.clients.client.relocate === true) {
      relocating = (

          <p><FaCheckSquare className="contactIcons"/>Open to relocating</p>
      )
    }
    return (
      <div className="main">
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
        <div className="main-container">
          <div className="sidebyside">
            <div className="jsprofile-container">
              <div className="pic-bg">
                <img src={`http://127.0.0.1:8000/media/${this.props.clients.client.picture}`} alt="jspic" />
                <h1>
                  {this.props.clients.client.first_name} {this.props.clients.client.last_name}
                </h1>
                <h3>
                  {this.props.clients.client.city}, {this.props.clients.client.state}
                </h3>
              </div>
            </div>
            <div className="info-container">
              <div className="jsprofile-contact">
                <p>
                  <FaEnvelope className="contactIcons" />
                  {this.props.clients.client.email}
                </p>
                <p>
                  <FaPhoneSquare className="contactIcons" />
                  {this.props.clients.client.phone}
                </p>
                {remoteWork}
                {relocating}
                <h2>{this.props.clients.client.profession}</h2>
              </div>
              <div className="jsprofile-about">
                <p>{this.props.clients.client.about}</p>
              </div>
            </div>
          </div>
          <div className="socialmedia">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={this.props.clients.client.twitter}
            >
              <FaTwitter className="smIcons" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={this.props.clients.client.linkedin}
            >
              <FaLinkedin className="smIcons" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={this.props.clients.client.github}
            >
              <FaGithub className="smIcons" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={this.props.clients.client.codepen}
            >
              <FaCodepen className="smIcons" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.google.com"
            >
              <FaFile className="smIcons" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.google.com"
            >
              <FaDesktop className="smIcons" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clients: state.clients,
    client: state.client,
    fetchingClient: state.fetchingClient,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { get_client, signout }
)(JSprofile);
