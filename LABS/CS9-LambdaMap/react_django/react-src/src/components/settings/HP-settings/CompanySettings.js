// HP view of settings page

import React, { Component } from "react";
import { signout, update } from "../../../actions";
import { connect } from "react-redux";
import "./CompanySettings.css";
import HPnav from "../../nav/company/HPnav";
import DragDrop from "../../Modals/dragDrop";
import HPMiniMap from "../../miniMap/HpMiniMap/HpMiniMap";
import Messenger from "../../messenger/Messenger";

const user = JSON.parse(localStorage.getItem("user"));

class CompanySettings extends Component {
  constructor() {
    super();
    this.state = {
      // company_name: user.company_name,
      city: user.city,
      state: user.state,
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
        <HPnav />
        <HPMiniMap />
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
            <div className="hpupdate-input">
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
                <div>
                  {/* Company Name:
                  <input
                    name="companyName"
                    type="text"
                    value={this.state.company_name}
                    onChange={e =>
                      this.setState({ [e.target.name]: e.target.value })
                    }
                    placeholder="Company Name"
                  /> */}
                </div>
                <div>
                  City:
                  <input
                    name="city"
                    type="text"
                    value={this.state.city}
                    onChange={e =>
                      this.setState({ [e.target.name]: e.target.value })
                    }
                    placeholder="City"
                  />
                </div>
                <div>
                  State:
                  <input
                    name="state"
                    type="text"
                    value={this.state.state}
                    onChange={e =>
                      this.setState({ [e.target.name]: e.target.value })
                    }
                    placeholder="State"
                  />
                </div>
                <div>
                  E-mail:
                  <input
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={e =>
                      this.setState({ [e.target.name]: e.target.value })
                    }
                    placeholder="E-mail"
                  />
                </div>
                <div>
                  Phone:
                  <input
                    name="phone"
                    type="tel"
                    value={this.state.phone}
                    onChange={e =>
                      this.setState({ [e.target.name]: e.target.value })
                    }
                    placeholder="Phone Number"
                  />
                </div>
              </div>
            </div>
            <button
              className="update-button"
              onClick={() => {
                this.props.update({
                  // company_name:
                  //   this.state.company_name !== ""
                  //     ? this.state.company_name
                  //     : this.state.company_name,
                  state:
                    this.state.state !== ""
                      ? this.state.state
                      : this.state.state,
                  city:
                    this.state.city !== "" ? this.state.city : this.state.city,
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
                  picture:
                    this.state.picture !== ""
                      ? this.state.picture
                      : this.state.picture
                });
                this.setState({
                  // company_name: user.company_name,
                  city: user.city,
                  state: user.state,
                  phone: user.phone,
                  email: user.email,
                  website: user.website,
                  about: user.about,
                  dragDrop: false,
                  picture: user.picture
                });
                this.props.history.push(`/hpview/${user.ID}`)
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
)(CompanySettings);
