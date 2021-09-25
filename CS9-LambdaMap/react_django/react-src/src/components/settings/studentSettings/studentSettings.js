// Student view of settings page

import React, { Component } from "react";
import { signout, update } from "../../../actions";
import { connect } from "react-redux";
import "./studentSettings.css";
import JSnav from "../../nav/job-seeker/JSnav";
import DragDrop from "../../Modals/dragDrop";
import JsMiniMap from "../../miniMap/JsMiniMap/JsMiniMap";
import Messenger from "../../messenger/Messenger";

// const imageUrl = require(`./default-user.png`);
const user = JSON.parse(localStorage.getItem("user"));

class StudentSettings extends Component {
  constructor() {
    super();
    this.state = {
      profession: user.profession,
      city: user.city,
      state: user.state,
      codepen: user.codepen,
      twitter: user.twitter,
      linkedin: user.linkedin,
      github: user.github,
      phone: user.phone,
      email: user.email,
      website: user.website,
      about: user.about,
      dragDrop: false,
      picture: user.picture
    };
  }

  renderDragDrop = e => {
    e.stopPropagation();
    this.setState({ dragDrop: !this.state.dragDrop });
  };

  submitFile = file => {
    this.setState({ picture: file, dragDrop: false });
  };

  render() {
    let modal;
    if (this.state.dragDrop) {
      modal = (
        <DragDrop
          renderDragDrop={this.renderDragDrop}
          submitFile={this.submitFile}
        />
      );
    }
    return (
      <div className="settings">
        <JSnav />
        <JsMiniMap />
        <Messenger />
        {modal}
        <div className="setting-forms">
          <div className="signout2">
            <button
              className="signoutbutton"
              onClick={() => {
                this.props.signout(this.props.history);
              }}
            >
              Sign Out
            </button>
          </div>
          <div className="profile-update">
            <h2>Profile Information</h2>
            <div className="update-input">
              <div className="pic-div">
                <button
                  // style={{ backgroundImage: `url(${imageUrl})` }}
                  className="post-button-2"
                  onClick={e => {
                    this.renderDragDrop(e);
                  }}
                >
                  <div className="upload">Upload Profile Picture</div>
                </button>
                <textarea
                  name="about"
                  type="text"
                  value={this.state.about}
                  onChange={e =>
                    this.setState({ [e.target.name]: e.target.value })
                  }
                  placeholder="Bio"
                />
              </div>
              <div className="about-input">
              <div className="input-divs">
              Title:
                <input
                  name="profession"
                  type="text"
                  value={this.state.profession}
                  onChange={e =>
                    this.setState({ [e.target.name]: e.target.value })
                  }
                  placeholder="Job Title"
                /></div>
                <div className="input-divs">City:
                <input
                  name="city"
                  type="text"
                  value={this.state.city}
                  onChange={e =>
                    this.setState({ [e.target.name]: e.target.value })
                  }
                  placeholder="City"
                /></div>
                <div className="input-divs">State:
                <input
                  name="state"
                  type="text"
                  value={this.state.state}
                  onChange={e =>
                    this.setState({ [e.target.name]: e.target.value })
                  }
                  placeholder="State"
                /></div>
                  <div className="input-divs">Email:
                <input
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={e =>
                    this.setState({ [e.target.name]: e.target.value })
                  }
                  placeholder="E-mail"
                /></div>  
                <div className="input-divs"> Phone:
                <input
                  name="phone"
                  type="tel"
                  value={this.state.phone}
                  onChange={e =>
                    this.setState({ [e.target.name]: e.target.value })
                  }
                  placeholder="Phone Number"
                /></div>
              </div>
              <div className="link-inputs">
              <div className="input-divs">LinkedIn:
                <input
                  name="linkedin"
                  type="url"
                  value={this.state.linkedin}
                  onChange={e =>
                    this.setState({ [e.target.name]: e.target.value })
                  }
                  placeholder="LinkedIn"
                /></div>
                  <div className="input-divs">Codepen:
                <input
                  name="codepen"
                  type="url"
                  value={this.state.codepen}
                  onChange={e =>
                    this.setState({ [e.target.name]: e.target.value })
                  }
                  placeholder="Codepen"
                /></div>
                  <div className="input-divs">GitHub:
                <input
                  name="github"
                  type="url"
                  value={this.state.github}
                  onChange={e =>
                    this.setState({ [e.target.name]: e.target.value })
                  }
                  placeholder="GitHub"
                /></div>
                  <div className="input-divs">Website:
                <input
                  name="website"
                  type="url"
                  value={this.state.website}
                  onChange={e =>
                    this.setState({ [e.target.name]: e.target.value })
                  }
                  placeholder="Portfolio Website"
                /></div>
                  <div className="input-divs">Twitter:
                <input
                  name="twitter"
                  type="url"
                  value={this.state.twitter}
                  onChange={e =>
                    this.setState({ [e.target.name]: e.target.value })
                  }
                  placeholder="Twitter"
                /></div>
              </div>
            </div>
            <button
              className="update-button"
              onClick={() => {
                this.props.update({
                  profession:
                    this.state.profession !== ""
                      ? this.state.profession
                      : this.state.profession,
                  state:
                    this.state.state !== ""
                      ? this.state.state
                      : this.state.state,
                  city:
                    this.state.city !== "" ? this.state.city : this.state.city,
                  codepen:
                    this.state.codepen !== ""
                      ? this.state.codepen
                      : this.state.codepen,
                  linkedin:
                    this.state.linkedin !== ""
                      ? this.state.linkedin
                      : this.state.linkedin,
                  github:
                    this.state.github !== ""
                      ? this.state.github
                      : this.state.github,
                  phone:
                    this.state.phone !== ""
                      ? this.state.phone
                      : this.state.phone,
                  email:
                    this.state.email !== ""
                      ? this.state.email
                      : this.state.email,
                  personal_website:
                    this.state.website !== ""
                      ? this.state.website
                      : this.state.website,
                  about:
                    this.state.about !== ""
                      ? this.state.about
                      : this.state.about,
                  twitter:
                    this.state.twitter !== ""
                      ? this.state.twitter
                      : this.state.twitter,
                  picture:
                    this.state.picture !== ""
                      ? this.state.picture
                      : this.state.picture
                });
                this.setState({
                  profession: user.profession,
                  city: user.city,
                  state: user.state,
                  codepen: user.codepen,
                  twitter: user.twitter,
                  linkedin: user.linkedin,
                  github: user.github,
                  phone: user.phone,
                  email: user.email,
                  website: user.website,
                  about: user.about,
                  picture: user.picture
                });
                this.props.history.push(`/jsview/${user.ID}`);
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { signout, update }
)(StudentSettings);
