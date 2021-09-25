import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Logo from '../assets/logo-geograpics.svg'
import LogoWhite from '../assets/logo-geograpics-white.svg';
import Profile from './Profile/Profile';

const ProfileBar = props => {
  // console.log('profilebar', props);

  const [ShowProfile, setShowProfile] = useState(false);

  const toggleProfile = (e) => {
    e.preventDefault();
    setShowProfile(!ShowProfile)
  }

  const logout = () => {
      localStorage.clear();
      props.history.push('/') 
  }

  return (
    <div className="top-toolbar">
      <div className="top-toolbar-static">
        <img className="top-toolbar-logo" src={!props.dark ? Logo : LogoWhite} alt="Geograpics Logo" />
        <div className="top-toolbar-profile-thumbnail">
          {/* <input className="top-toolbar-searchbox" placeholder="Search" type="text" /> // for later */}
          <button className="top-toolbar-profile-button" onClick={toggleProfile}>
            <img className="top-toolbar-thumbnail-photo" src= {props.pictureInfo.profile_pic} alt={props.pictureInfo.username}/>
          </button>
          {ShowProfile ? (
            <Profile {...props} logout={logout} dark={props.dark}/>
          ): null}
        </div>
      </div>
    </div>
  )
};

ProfileBar.propTypes = {
  pictureInfo: PropTypes.shape({
    profile_pic: PropTypes.string,
    username: PropTypes.string
  })
}

export default ProfileBar;