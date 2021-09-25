import React from 'react';
import PropTypes from 'prop-types';

export const Profile = props => {
  // console.log('PROFILE PROPS',props);

  const untagged = props.pictureInfo.pictures.filter(picture => !picture.latitude)

  return(
      <div className={props.dark ? "profile-tab-dark" : "profile-tab-box"}>
        <div className="profile-tab-top-div">
          <div className="profile-tab-img-div">
            <img className="profile-tab-prof-pic" src= {props.pictureInfo.profile_pic} alt= {props.pictureInfo.username}/>
            <div className="bold-cont">
              <p className="top-div-details-bold">Edit Profile</p>
              <p className="top-div-details-bold">Privacy</p>
            </div>
          </div>
          <div className="top-div-details-div">
            <h5 className="top-div-details-name">{props.pictureInfo.username}</h5>
            <p className="top-div-details">{props.pictureInfo.email}</p>
            <div className="profile-tab-middle-div">
              <div>
                <p className="middle-div-details">{props.pictureInfo.pictures.length - untagged.length} <span>Geo-tagged</span></p>
              </div>
              <div>
                <p className="middle-div-details">{untagged.length} <span>Untagged Photos</span></p>
              </div>
            </div>
            <h6>{props.pictureInfo.full_name}</h6>
            <p>{props.pictureInfo.bio}</p>
            <p className='web'>{props.pictureInfo.website}</p>
            <div className="profile-tab-bottom-div">
              <button className="btn-signout" onClick={props.logout}>Sign Out</button>
            </div>
          </div>
        </div>
        {/* <div className="profile-tab-bottom-div">
            <button className="btn-signout" onClick={props.logout}>Sign Out</button>
        </div> */}
      </div>
  );
};

Profile.propTypes = {
  pictureInfo: PropTypes.shape({
    email: PropTypes.string,
    full_name: PropTypes.string,
    profile_pic: PropTypes.string,
    username: PropTypes.string,
    pictures: PropTypes.array
  })
};

export default Profile;