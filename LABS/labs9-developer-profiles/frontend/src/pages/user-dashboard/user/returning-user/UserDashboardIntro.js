import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { centerFlex } from '../../../../global-styles/Mixins';


class UserDashboardIntro extends Component {
  state = {
    
  }

  render() {
    let profileStatus;
    const {
      profileProgress,

      subscriptionSuccess,
      firstNameSuccess,
      desiredTitleSuccess,
      currentLocationNameSuccess,
      summarySuccess,
      topSkillsSuccess,

      profileImgSuccess,
      publicEmailSuccess,
      areaOfWorkSuccess,
      portfolioSuccess,

      additionalSkillsSuccess,
      familiarSkillsSuccess,
      userProjects,
      userExperience,
      userEducation,

      linkedinSuccess,
      githubSuccess
    } = this.props.userInfo;


    if (profileProgress >= 30 && profileProgress < 60) {
      profileStatus = 'Basic';
    } else if (profileProgress >= 60 && profileProgress < 90) {
      profileStatus = 'Intermediate';
    } else if (profileProgress >= 90 && profileProgress < 100) {
      profileStatus = 'Strong';
    } else if (profileProgress === 100) {
      profileStatus = 'Powerhouse';
    } else {
      profileStatus = 'Starting';
    }


    return (
      <IntroContainer>
        <header>
          <h1 className="main-heading">Your Dashboard</h1>
        </header>

        <article className="container">
          <header>
            <h2 className="sub-heading">Profile Strength: <strong>{profileStatus}</strong></h2>
          </header>

          {/* Will crash if moved around due to 'width: ${props => props.children.props.progress};' :) */}
          <section className="progress-container">
            <ProgressContainer>
              <div progress={`${profileProgress}%`} className="progress-bar">
              {profileProgress >= 30 ?
                <div className="progress-end">
                  <span><i className="success fa fa-check"></i></span>
                </div>
                :
                null
              }
              </div>
            </ProgressContainer>
          </section>

          <section className="basic-section">
            <h3 className="sub-sub-heading">Basic</h3>
            <div>
              <span className="input-status">
                {subscriptionSuccess ?
                  <p>Package Selected <span><i className="success fa fa-check"></i></span></p>
                  :
                  <Link to="/dashboard/billing">Select a Package</Link>
                }
              </span>
              <span className="input-status">
                {firstNameSuccess ?
                  <p>First Name <span><i className="success fa fa-check"></i></span></p>
                  :
                  <Link to="/dashboard/personal-info">First Name</Link>
                }
              </span>
              <span className="input-status">
                {desiredTitleSuccess ?
                  <p>Desired Title <span><i className="success fa fa-check"></i></span></p>
                  :
                  <Link to="/dashboard/personal-info">Desired Title</Link>
                }
              </span>
              <span className="input-status">
                {currentLocationNameSuccess ?
                  <p>Location <span><i className="success fa fa-check"></i></span></p>
                  :
                  <Link to="/dashboard/where-to-find-you">Location</Link>
                }
              </span>
              <span className="input-status">
                {summarySuccess ?
                  <p>Summary <span><i className="success fa fa-check"></i></span></p>
                  :
                  <Link to="/dashboard/about-you">Summary</Link>
                }
              </span>
              <span className="input-status">
                {topSkillsSuccess ?
                  <p>Top Skills <span><i className="success fa fa-check"></i></span></p>
                  :
                  <Link to="/dashboard/about-you">Top Skills</Link>
                }
              </span>
            </div>
          </section>

          <section className="intermediate-section">
            <h3 className="sub-sub-heading">Intermediate</h3>
            <div>
              <span className="input-status">
                {profileImgSuccess ?
                  <p>Profile Image <span><i className="success fa fa-check"></i></span></p>
                  :
                  <Link to="/dashboard/personal-info">Profile Image</Link>
                }
              </span>
              <span className="input-status">
                {publicEmailSuccess ?
                  <p>Public Email <span><i className="success fa fa-check"></i></span></p>
                  :
                  <Link to="/dashboard/personal-info">Public Email</Link>
                }
              </span>
              <span className="input-status">
                {areaOfWorkSuccess ?
                  <p>Area of Work <span><i className="success fa fa-check"></i></span></p>
                  :
                  <Link to="/dashboard/personal-info">Area of Work</Link>
                }
              </span>
              <span className="input-status">
                {portfolioSuccess ?
                  <p>Portfolio Website <span><i className="success fa fa-check"></i></span></p>
                  :
                  <Link to="/dashboard/where-to-find-you">Portfolio Website</Link>
                }
              </span>
            </div>
          </section>

          <section className="strong-section">
            <h3 className="sub-sub-heading">Strong</h3>
            <div>
              <span className="input-status">
                {additionalSkillsSuccess ?
                  <p>Additional Skills <span><i className="success fa fa-check"></i></span></p>
                  :
                  <Link to="/dashboard/about-you">Additional Skills</Link>
                }
              </span>
              <span className="input-status">
                {familiarSkillsSuccess ?
                  <p>Familiar Skills <span><i className="success fa fa-check"></i></span></p>
                  :
                  <Link to="/dashboard/about-you">Familiar Skills</Link>
                }
              </span>
              <span className="input-status">
                {userProjects.length >= 1 ?
                  <p>At Least 1 Project <span><i className="success fa fa-check"></i></span></p>
                  :
                  <Link to="/dashboard/projects">At Least 1 Project</Link>
                }
              </span>
              <span className="input-status">
                {userExperience.length >= 1 ?
                  <p>At Least 1 Job Experience <span><i className="success fa fa-check"></i></span></p>
                  :
                  <Link to="/dashboard/experience">At Least 1 Job Experience</Link>
                }
              </span>
              <span className="input-status">
                {userEducation.length >= 1 ?
                  <p>At Least 1 Education <span><i className="success fa fa-check"></i></span></p>
                  :
                  <Link to="/dashboard/education">At Least 1 Education</Link>
                }
              </span>
            </div>
          </section>

          <section className="powerhouse-section">
            <h3 className="sub-sub-heading">Powerhouse</h3>
            <div>
              <span className="input-status">
                {linkedinSuccess ?
                  <p>LinkedIn <span><i className="success fa fa-check"></i></span></p>
                  :
                  <Link to="/dashboard/where-to-find-you">LinkedIn</Link>
                }
              </span>
              <span className="input-status">
                {githubSuccess ?
                  <p>Github <span><i className="success fa fa-check"></i></span></p>
                  :
                  <Link to="/dashboard/where-to-find-you">Github</Link>
                }
              </span>
              <span className="input-status">
                {userProjects.length >= 3 ?
                  <p>At Least 3 Projects <span><i className="success fa fa-check"></i></span></p>
                  :
                  <Link to="/dashboard/projects">At Least 3 Projects</Link>
                }
              </span>
              <span className="input-status">
                {userExperience.length >= 2 ?
                  <p>At Least 2 Job Experiences <span><i className="success fa fa-check"></i></span></p>
                  :
                  <Link to="/dashboard/experience">At Least 2 Job Experiences</Link>
                }
              </span>
            </div>
          </section>
        </article>

        {/* <article className="container">
          <header>
            <h2>Your Projects</h2>
          </header>
          <section>
            {userProjects.length === 0 ?
              <p>No Projects!</p>
              :
              userProjects.map((project) => {
                return (
                  <div>
                    <p>{project.project_title}</p>
                    <p>{project.project_description}</p>
                  </div>
                )
              })
            }
          </section>
        </article>

        <article className="container">
          <header>
            <h2>Experience</h2>
          </header>
          <section>
            {userExperience.length === 0 ?
              <p>No Experience Listed!</p>
              :
              userExperience.map((experience) => {
                return (
                  <div>
                    <p>{experience.job_title}</p>
                    <p>{experience.job_description}</p>
                  </div>
                )
              })
            }
          </section>
        </article>

        <article className="container">
          <header>
            <h2>Education</h2>
          </header>
          <section>
            {userEducation.length === 0 ?
              <p>No Experience Listed!</p>
              :
              userEducation.map((education) => {
                return (
                  <div>
                    <p>{education.school}</p>
                    <p>{education.course}</p>
                  </div>
                )
              })
            }
          </section>
        </article> */}

      </IntroContainer>
    )
  }
}

const IntroContainer = styled.div`
  width: calc(100% - 300px);
  margin-left: 300px;
  padding: 130px 50px 50px;
  @media (max-width: 1400px) {
    width: calc(100% - 80px);
    margin-left: 80px;
  }
  @media (max-width: 1150px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  @media (max-width: 450px) {
    padding-left: 10px;
    padding-right: 10px;
  }
  @media (max-width: 400px) {
    padding-left: 5px;
    padding-right: 5px;
  }
  @media (max-width: 650px) {
    width: 100%;
    padding-top: 200px;
    margin-left: 0px;
  }
  @media (max-width: 600px) {
    padding-top: 300px;
  }
  @media (max-width: 400px) {
    padding-top: 350px;
  }

  .main-heading {
    font-size: 5rem;
    color: rgb(42,42,42);
    margin-bottom: 50px;
    text-align: center;
    @media (max-width: 1100px) {
      text-align: left;
      font-size: 4rem;
    }
    @media (max-width: 600px) {
      font-size: 3.5rem;
    }
    @media (max-width: 450px) {
      padding-left: 10px;
    }
    @media (max-width: 400px) {
      font-size: 3.2rem;
      padding-left: 5px;
    }
  }


  .container {
    width: 100%;
    max-width: 750px;
    margin-top: 75px;
    border: 1px solid lightgrey;
    border-radius: 5px;
    padding: 50px;
    padding-left: 40px;
    padding-right: 40px;
    @media (max-width: 1150px) {
      padding-left: 20px;
      padding-right: 20px;
    }

    .basic-section,
    .intermediate-section,
    .strong-section,
    .powerhouse-section {
      margin-bottom: 30px;
    }
    
    .sub-heading {
      font-size: 3rem;
      margin-bottom: 50px;
      @media (max-width: 600px) {
      font-size: 2.8rem;
      line-height: 35px;
      }
      @media (max-width: 450px) {
        padding-left: 10px;
      }
      @media (max-width: 400px) {
        font-size: 2.7rem;
        padding-left: 5px;
      }
    }

    .sub-sub-heading {
      font-size: 2.5rem;
      margin-bottom: 20px;
      border-top: 1px solid lightgrey;
      border-bottom: 1px solid lightgrey;
      padding: 12px 8px;
    }

    .input-status {
      font-size: 1.5rem;
      display: inline-block;
      margin: 20px 40px;
      @media (max-width: 850px) {
        margin: 20px 20px;
      }
      @media (max-width: 450px) {
        margin: 30px 30px;
      }
      @media (max-width: 400px) {
        margin: 45px 20px;
        ${centerFlex('column')}
      }
      .success {
        color: var(--accent-color);
      }
    }
    a {
      text-decoration: none;
    }
  }
`;
/* width: ${props => props.children.props.progress}; */
const ProgressContainer = styled.div`
  width: 100%;
  background-color: lightgrey;
  height: 10px;
  border-radius: 50px;
  margin-bottom: 50px;
  .progress-bar {
    background-color: var(--accent-color);
    height: 10px;
    border-right: solid 1px rgba(255,255,255,.3);
    border-radius: 50px;
    width: ${props => props.children.props.progress};
    ${centerFlex()};
    p {
      color: rgb(42,42,42);
      font-size: 1.7rem;
      font-weight: bold;
    }
    .progress-end {
      position: absolute;
      right: -16.5px;
      width: 33px;
      height: 33px;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 50%;
      background-color: var(--lp_btn_color);
      ${centerFlex()};
      .success {
        color: var(--accent-color);
      }
    }
  }
`;

export default UserDashboardIntro;
