import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Loader from '../../components/loader/Loader';


import UserDashboardNav from './UserDashboardNav'
import UserDashboardIntro from './user/returning-user/UserDashboardIntro'
import UserDashboardNew from './user/new-user/UserDashboardNew'
import DashboardQuickstart from './user/new-user/DashboardQuickstart'

import PersonalInfo from './personal-info/PersonalInfo';
import WhereToFindYou from './where-to-find/WhereToFindYou';
import AboutYou from './about-you/AboutYou';
import Projects from './projects/Projects';
import Experience from './experience/Experience';
import Education from './education/Education';
import Billing from './billing/Billing';


class UserDashboardContainer extends Component {
  state = {
    isLoading: false
  }

  updateProgress = () => {
    const userInfo = this.props.auth.getProfile();
    const userEmail = userInfo.email;
    axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userEmail}`)
    .then(res => {
      const userInfo = res.data;
      // getting edu, exp, proj
      const getUserProjects = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/projects`)
      const getUserExperience = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/experience`)
      const getUserEducation = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/education`)
      const getUserTopSkills = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/skills/top_skills`)
      const getUserAddSkills = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/skills/add_skills`)
      const getUserFamSkills = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/skills/familiar`)

      Promise.all([getUserProjects, getUserExperience, getUserEducation, getUserTopSkills, getUserAddSkills, getUserFamSkills])
      .then(values => {
  
        // now you have userInfo + locations + all 3(edu,exp,proj)
        const userProjects = values[0].data;
        const userExperience = values[1].data;
        const userEducation = values[2].data;
        const userTopSkills = values[3].data;
        const userAddSkills = values[4].data;
        const userFamSkills = values[5].data;

        let placesInterestedArr = [];
        if (userInfo.interested_location_names !== "" && userInfo.interested_location_names !== null) {
          placesInterestedArr = userInfo.interested_location_names.split('|');
        }

        let
          profileProgress,
          profileImgSuccess,
          publicEmailSuccess,
          firstNameSuccess,
          lastNameSuccess,
          areaOfWorkSuccess,
          desiredTitleSuccess,
          currentLocationNameSuccess,
          githubSuccess,
          linkedinSuccess,
          portfolioSuccess,
          acclaimSuccess,
          placesInterestedSuccess,
          summarySuccess,
          topSkillsSuccess,
          additionalSkillsSuccess,
          familiarSkillsSuccess,
          subscriptionSuccess
        ;
        userInfo.image ? profileImgSuccess = true : profileImgSuccess = false;
        userInfo.public_email ? publicEmailSuccess = true : publicEmailSuccess = false;
        userInfo.first_name ? firstNameSuccess = true : firstNameSuccess = false;
        userInfo.last_name ? lastNameSuccess = true : lastNameSuccess = false;
        userInfo.area_of_work ? areaOfWorkSuccess = true : areaOfWorkSuccess = false;
        userInfo.desired_title ? desiredTitleSuccess = true : desiredTitleSuccess = false;
        userInfo.current_location_name ? currentLocationNameSuccess = true : currentLocationNameSuccess = false;
        userInfo.github ? githubSuccess = true : githubSuccess = false;
        userInfo.linkedin ? linkedinSuccess = true : linkedinSuccess = false;
        userInfo.portfolio ? portfolioSuccess = true : portfolioSuccess = false;
        userInfo.badge ? acclaimSuccess = true : acclaimSuccess = false;
        userInfo.summary ? summarySuccess = true : summarySuccess = false;
        userInfo.interested_location_names ? placesInterestedSuccess = true : placesInterestedSuccess = false;
        userInfo.stripe_subscription_name ? subscriptionSuccess = true : subscriptionSuccess = false;
        userInfo.top_skills ? topSkillsSuccess = true : topSkillsSuccess = false;
        userInfo.add_skills ? additionalSkillsSuccess = true : additionalSkillsSuccess = false;
        userInfo.familiar ? familiarSkillsSuccess = true : familiarSkillsSuccess = false;

        profileProgress = 5
        if (
          subscriptionSuccess &&
          firstNameSuccess &&
          desiredTitleSuccess &&
          currentLocationNameSuccess &&
          summarySuccess &&
          topSkillsSuccess
          ) {
            profileProgress = 30;
          }
          
          if (
          subscriptionSuccess &&
          firstNameSuccess &&
          desiredTitleSuccess &&
          currentLocationNameSuccess &&
          summarySuccess &&
          topSkillsSuccess &&
          
          profileImgSuccess &&
          publicEmailSuccess &&
          areaOfWorkSuccess &&
          portfolioSuccess
        ) {
          profileProgress += 30;
        }
        
        if (
          subscriptionSuccess &&
          firstNameSuccess &&
          desiredTitleSuccess &&
          currentLocationNameSuccess &&
          summarySuccess &&
          topSkillsSuccess &&
          
          profileImgSuccess &&
          publicEmailSuccess &&
          areaOfWorkSuccess &&
          portfolioSuccess &&

          additionalSkillsSuccess &&
          familiarSkillsSuccess &&
          userProjects.length >= 1 &&
          userExperience.length >= 1 &&
          userEducation.length >=1
        ) {
          profileProgress += 30;
        }

        if (
          linkedinSuccess &&
          githubSuccess &&
          userProjects.length >= 3 &&
          userExperience.length >= 2
        ) {
          profileProgress += 10;
        }


        const allUserInfo = {
          ...userInfo,
          profileImgSuccess,
          publicEmailSuccess,
          firstNameSuccess,
          lastNameSuccess,
          areaOfWorkSuccess,
          desiredTitleSuccess,
          currentLocationNameSuccess,
          githubSuccess,
          linkedinSuccess,
          portfolioSuccess,
          acclaimSuccess,
          placesInterestedSuccess,
          summarySuccess,
          topSkillsSuccess,
          additionalSkillsSuccess,
          familiarSkillsSuccess,
          subscriptionSuccess,
          userTopSkills,
          userAddSkills,
          userFamSkills,
          userProjects,
          userExperience,
          userEducation,
          placesInterestedArr,
          profileProgress
        }
        // console.log("FULL USER", allUserInfo)
        this.setState(allUserInfo)
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  }


  componentDidMount() {
    this.setState({isLoading: true})
    const userInfo = this.props.auth.getProfile();
    const userEmail = userInfo.email;
    axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userEmail}`)
    .then(res => {
      const userInfo = res.data;
      // getting edu, exp, proj
      const getUserProjects = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/projects`)
      const getUserExperience = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/experience`)
      const getUserEducation = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/education`)
      const getUserTopSkills = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/skills/top_skills`)
      const getUserAddSkills = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/skills/add_skills`)
      const getUserFamSkills = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/skills/familiar`)

      Promise.all([getUserProjects, getUserExperience, getUserEducation, getUserTopSkills, getUserAddSkills, getUserFamSkills])
      .then(values => {
  
        // now you have userInfo + locations + all 3(edu,exp,proj)
        const userProjects = values[0].data;
        const userExperience = values[1].data;
        const userEducation = values[2].data;
        const userTopSkills = values[3].data;
        const userAddSkills = values[4].data;
        const userFamSkills = values[5].data;

        let placesInterestedArr = [];
        if (userInfo.interested_location_names !== "" && userInfo.interested_location_names !== null) {
          placesInterestedArr = userInfo.interested_location_names.split('|');
        }

        let
          profileProgress,
          profileImgSuccess,
          publicEmailSuccess,
          firstNameSuccess,
          lastNameSuccess,
          areaOfWorkSuccess,
          desiredTitleSuccess,
          currentLocationNameSuccess,
          githubSuccess,
          linkedinSuccess,
          portfolioSuccess,
          acclaimSuccess,
          placesInterestedSuccess,
          summarySuccess,
          topSkillsSuccess,
          additionalSkillsSuccess,
          familiarSkillsSuccess,
          subscriptionSuccess
        ;
        userInfo.image ? profileImgSuccess = true : profileImgSuccess = false;
        userInfo.public_email ? publicEmailSuccess = true : publicEmailSuccess = false;
        userInfo.first_name ? firstNameSuccess = true : firstNameSuccess = false;
        userInfo.last_name ? lastNameSuccess = true : lastNameSuccess = false;
        userInfo.area_of_work ? areaOfWorkSuccess = true : areaOfWorkSuccess = false;
        userInfo.desired_title ? desiredTitleSuccess = true : desiredTitleSuccess = false;
        userInfo.current_location_name ? currentLocationNameSuccess = true : currentLocationNameSuccess = false;
        userInfo.github ? githubSuccess = true : githubSuccess = false;
        userInfo.linkedin ? linkedinSuccess = true : linkedinSuccess = false;
        userInfo.portfolio ? portfolioSuccess = true : portfolioSuccess = false;
        userInfo.badge ? acclaimSuccess = true : acclaimSuccess = false;
        userInfo.summary ? summarySuccess = true : summarySuccess = false;
        userInfo.interested_location_names ? placesInterestedSuccess = true : placesInterestedSuccess = false;
        userInfo.stripe_subscription_name ? subscriptionSuccess = true : subscriptionSuccess = false;
        userInfo.top_skills ? topSkillsSuccess = true : topSkillsSuccess = false;
        userInfo.add_skills ? additionalSkillsSuccess = true : additionalSkillsSuccess = false;
        userInfo.familiar ? familiarSkillsSuccess = true : familiarSkillsSuccess = false;

        profileProgress = 5
        if (
          subscriptionSuccess &&
          firstNameSuccess &&
          desiredTitleSuccess &&
          currentLocationNameSuccess &&
          summarySuccess &&
          topSkillsSuccess
          ) {
            profileProgress = 30;
          }
          
          if (
          subscriptionSuccess &&
          firstNameSuccess &&
          desiredTitleSuccess &&
          currentLocationNameSuccess &&
          summarySuccess &&
          topSkillsSuccess &&
          
          profileImgSuccess &&
          publicEmailSuccess &&
          areaOfWorkSuccess &&
          portfolioSuccess
        ) {
          profileProgress += 30;
        }
        
        if (
          subscriptionSuccess &&
          firstNameSuccess &&
          desiredTitleSuccess &&
          currentLocationNameSuccess &&
          summarySuccess &&
          topSkillsSuccess &&
          
          profileImgSuccess &&
          publicEmailSuccess &&
          areaOfWorkSuccess &&
          portfolioSuccess &&

          additionalSkillsSuccess &&
          familiarSkillsSuccess &&
          userProjects.length >= 1 &&
          userExperience.length >= 1 &&
          userEducation.length >=1
        ) {
          profileProgress += 30;
        }

        if (
          linkedinSuccess &&
          githubSuccess &&
          userProjects.length >= 3 &&
          userExperience.length >= 2
        ) {
          profileProgress += 10;
        }


        const allUserInfo = {
          ...userInfo,
          profileImgSuccess,
          publicEmailSuccess,
          firstNameSuccess,
          lastNameSuccess,
          areaOfWorkSuccess,
          desiredTitleSuccess,
          currentLocationNameSuccess,
          githubSuccess,
          linkedinSuccess,
          portfolioSuccess,
          acclaimSuccess,
          placesInterestedSuccess,
          summarySuccess,
          topSkillsSuccess,
          additionalSkillsSuccess,
          familiarSkillsSuccess,
          subscriptionSuccess,
          userTopSkills,
          userAddSkills,
          userFamSkills,
          userProjects,
          userExperience,
          userEducation,
          placesInterestedArr,
          profileProgress
        }
        // console.log("FULL USER", allUserInfo)
        this.setState({isLoading: false})
        this.setState(allUserInfo)
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  }

  delExtra(user_id, extra, extras_id){
      if(window.confirm(`Are you sure you want to delete this ${extra}? This cannot be undone.`)){
          axios.delete(`${process.env.REACT_APP_BACKEND_SERVER}/users/${user_id}/${extra}/${extras_id}`).then(res => {
              alert(`${extra} deleted!`)
              window.location.reload()
              }).catch(err => {
                console.log(err)
              })
      }
  }

  render() {
    return (
      <DashboardContainer>
        <UserDashboardNav {...this.props} />
        {!this.state.isLoading && this.state.id ?
          <main>
            <Route 
              exact 
              path={`${this.props.match.path}/`} 
              render={props =><UserDashboardIntro 
                  {...props} 
                  userInfo={this.state} />} />
            <Route 
              exact 
              path={`${this.props.match.path}/new`} 
              render={props => <UserDashboardNew 
                  {...props} 
                  userInfo={this.state} />} />
            <Route 
              exact 
              path={`${this.props.match.path}/new/quickstart`} 
              render={props => <DashboardQuickstart 
                  {...props} 
                  userInfo={this.state} 
                  updateProgress={this.updateProgress}/>} />
            <Route 
              path={`${this.props.match.path}/personal-info`} 
              render={props => <PersonalInfo 
                  {...props} 
                  preview={true} 
                  updateProgress={this.updateProgress} 
                  userInfo={this.state}/>} />
            <Route 
              path={`${this.props.match.path}/where-to-find-you`} 
              render={props => <WhereToFindYou 
                  preview={true} 
                  updateProgress={this.updateProgress} 
                  {...props} 
                  userInfo={this.state}/>} />
            <Route 
              path={`${this.props.match.path}/about-you`} 
              render={props => <AboutYou 
                  preview={true} 
                  updateProgress={this.updateProgress} 
                  {...props} 
                  userInfo={this.state}/>} />
            <Route 
              path={`${this.props.match.path}/projects`} 
              render={props => <Projects 
                  {...props} 
                  delExtra={this.delExtra}
                  preview={true} 
                  updateProgress={this.updateProgress} 
                  userInfo={this.state}/>} />
            <Route 
              path={`${this.props.match.path}/experience`} 
              render={props => <Experience 
                  preview={true} 
                  delExtra={this.delExtra}
                  updateProgress={this.updateProgress} 
                  {...props} 
                  userInfo={this.state}/>} />
            <Route 
              path={`${this.props.match.path}/education`} 
              render={props => <Education 
                  preview={true} 
                  delExtra={this.delExtra}
                  updateProgress={this.updateProgress} 
                  {...props} 
                  userInfo={this.state}/>} />
            <Route 
              path={`${this.props.match.path}/billing`} 
              render={props => <Billing 
                  preview={true} 
                  updateProgress={this.updateProgress} 
                  {...props} 
                  userInfo={this.state}/>} />
          </main>
          :
          <Loader />
        }
      </DashboardContainer>
    )
  }
}

const DashboardContainer = styled.main`
  font-family: inherit;
  .validated-text-input, .text-input {
    font-family: inherit;
    line-height: 23px;
  }
`;


export default UserDashboardContainer;
