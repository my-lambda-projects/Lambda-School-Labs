// Hiring Partner View of favorites

import React, { Component } from 'react';
import './hiringPartnerFavorites.css';
import { FaCaretDown, FaStar, FaSquare, FaTwitter, FaLinkedin, FaGithub, FaCodepen, FaFile, FaDesktop, FaEnvelope, FaPhoneSquare } from 'react-icons/fa';
import HPnav from '../../nav/company/HPnav';
import defaultuser from "./defaultuser.svg";
import { Link } from 'react-router-dom';
import { get_hpFavs } from '../../../actions';
import { connect } from 'react-redux';

class HPFavorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hp_favorites: [],
    }
  }

  componentDidMount = () => {
    this.props.get_hpFavs();
  }

  render() {
    return (
      <div className="main-JSlist">
        <HPnav />
        <div className="signout">
        <div className="backgroundskew"></div>
        <div className="backgroundskew2"></div>
          <button className="signoutbutton">Sign Out</button>
        </div>
        <div className="jslist-container">
          <div className="filter-main">
            <header className="header">Prospective Candidates</header>
            <div className="filter-display" >
            <input type="checkbox" />
            <button>Filter</button><FaCaretDown className="filter-icon" />
              <div className="filter-options">
                <label className="switch">
                  <input type="checkbox"></input>
                  <span className="slider round"></span>
                </label><h4>Software Engineer</h4>
              
                <label className="switch">
                  <input type="checkbox"></input>
                  <span className="slider round"></span>
                </label><h4>Full Stack Developer</h4>
              
                <label className="switch">
                  <input type="checkbox"></input>
                  <span className="slider round"></span>
                </label><h4>Front-end Developer</h4>
              
                <label className="switch">
                  <input type="checkbox"></input>
                  <span className="slider round"></span>
                </label><h4>Back-end Developer</h4>

                <label className="switch">
                  <input type="checkbox"></input>
                  <span className="slider round"></span>
                </label><h4>UI/UX Developer</h4>
              
                <label className="switch">
                  <input type="checkbox"></input>
                  <span className="slider round"></span>
                </label><h4>iOS Developer</h4>
              
                <label className="switch">
                  <input type="checkbox"></input>
                  <span className="slider round"></span>
                </label><h4>Android Developer</h4>
              
              </div>
            </div>
          </div>
          <hr className="cards-hr"></hr>
          <div className="jobseekercards-container">
          <div className="cards-main">
            {/* {this.props.clients.map(clients =>
                <div key={clients.id} className="jobseeker-cards">
                  <Link to={'/'} className="profile-link">
                    <div className="card-header">
                    <img src={defaultuser} className="JScardpic" alt="Job Seeker" />
                    <div className="jscard-name">
                    <h3>{clients.first_name}{clients.last_name}</h3>
                    <h5>{clients.city}{clients.state}</h5>
                    </div>
                    <FaStar className="card-favIcon"/>
                    </div>
                    <div className="card-info">
                      <p className="card-bio">{clients.about}</p>
                      <a className="emailcontact"><FaEnvelope className="contactIcons"/>{clients.email}</a>
                      <a className="phonecontact"><FaPhoneSquare className="contactIcons"/>{clients.phone}</a>
                    </div>
                    <div className="card-socialmedia">
                      <a target="_blank" rel="noopener noreferrer" href={clients.twitter}><FaTwitter className="card-smIcons"/></a>
                      <a target="_blank" rel="noopener noreferrer" href={clients.linkedin}><FaLinkedin className="card-smIcons"/></a>
                      <a target="_blank" rel="noopener noreferrer" href={clients.github}><FaGithub className="card-smIcons"/></a>
                      <a target="_blank" rel="noopener noreferrer" href={clients.codepen}><FaCodepen className="card-smIcons"/></a>
                      <a target="_blank" rel="noopener noreferrer" href="https://www.google.com"><FaFile className="card-smIcons"/></a>
                      <a target="_blank" rel="noopener noreferrer" href={clients.personalWebsite}><FaDesktop className="card-smIcons"/></a>
                    </div>
                  </Link>
                </div>)} */}
              </div>
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    hp_favorites: state.hp_favorites,
    fetchingHPFavs: state.fetchingHPFavs,
    error: state.error
  };
};

export default connect(mapStateToProps, { get_hpFavs })( HPFavorites );
