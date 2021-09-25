import React from "react";

import Logo from "../assets/logo-geograpics.svg";
import Search from "../assets/Path.png";

const ProfileContainer = props => {
  return (
    <div>
      <div className="top-toolbar">
        <div className="top-toolbar-static">
          <img className="top-toolbar-logo" src={Logo} alt="Geograpics Logo" />
          <div className="top-toolbar-profile-thumbnail">
            <input
              className="top-toolbar-searchbox"
              placeholder="Search"
              type="text"
            />
            <button
              className="top-toolbar-profile-button"
              onClick={props.toggleProfile}
            >
              <img
                className="top-toolbar-thumbnail-photo"
                src={props.pictureInfo.profile_pic}
                alt={props.pictureInfo.username}
              />
            </button>
          </div>
        </div>
    </div>
    {props.showProfile ? (
        <div className="profile-tab-bar">
          <div className="profile-tab-box">
            <div className="profile-tab-top-div">
              <div className="profile-tab-img-div">
                <img
                  className="profile-tab-prof-pic"
                  src={props.pictureInfo.profile_pic}
                  alt={props.pictureInfo.username}
                />
              </div>
              <div className="top-div-details-div">
                <h5 className="top-div-details-name">
                  {props.pictureInfo.full_name}
                </h5>
                <p className="top-div-details">{props.pictureInfo.email}</p>
                <p className="top-div-details-bold">Edit Profile</p>
                <p className="top-div-details-bold">Privacy Settings</p>
              </div>
            </div>
            <div className="profile-tab-middle-div">
              <div>
                <p className="middle-div-details">
                  {props.pictureInfo.pictures.length}
                </p>
                <p className="middle-div-details">Posts</p>
              </div>
              <div>
                <p className="middle-div-details">50</p>
                <p className="middle-div-details">Followers</p>
              </div>
              <div>
                <p className="middle-div-details">
                  {props.pictureInfo.pictures.length}
                </p>
                <p className="middle-div-details">Posts</p>
              </div>
            </div>
            <div className="profile-tab-bottom-div">
              <button className="btn-instagramaccount">
                Instagram Account
              </button>
              <button className="btn-signout" onClick={props.logout}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileContainer;
