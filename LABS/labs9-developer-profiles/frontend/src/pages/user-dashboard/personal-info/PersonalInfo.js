import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserCard from '../../../components/user-card/UserCard';

import { TextInput, Select } from 'grommet';
import {
  MainFormContainer,
  FormSection,
  LabelContainer,
  ImageContainer,
  ButtonContainer,
  CardPreviewSection,
  MobileCardPreviewSection
} from '../styles/FormStyles';

var noLeaks;
class PersonalInfo extends Component {
  state = {
    submitSuccess: false,
    submitFailure: false,
    profileImg: this.props.userInfo.image || "",
    profileImgUploadSuccess: false,
    publicEmail: this.props.userInfo.public_email  || "",
    firstName: this.props.userInfo.first_name  || "",
    lastName: this.props.userInfo.last_name  || "",
    areaOfWork: this.props.userInfo.area_of_work  || "",
    areaOfWorkOptions: ['Full Stack Web', 'iOS', 'Android', 'UI/UX'],
    desiredTitle: this.props.userInfo.desired_title  || "",
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  uploadPhoto = (e) => {
    const file = e.target.files[0];
    let XHR = new XMLHttpRequest();
    let FD  = new FormData();
    FD.append('image', file);

    // Define what happens on successful data submission
    var self = this;
    XHR.addEventListener('load', function(event) {
      let url = JSON.parse(event.target.responseText);
      self.setState({profileImg: url.imgUrl, profileImgUploadSuccess: true})
      setTimeout(() => {
        self.setState({profileImgUploadSuccess: false})
      }, 2000)
    });

    // Define what happens in case of error
    XHR.addEventListener('error', function(event) {
      alert('Oops! Something went wrong.');
    });

    XHR.open('POST', `${process.env.REACT_APP_BACKEND_SERVER}/api/image-upload`);

    XHR.send(FD);
  }

  checkOnSubmit = (e) => {
    e.preventDefault()
    const {publicEmail, firstName, lastName, profileImg, areaOfWork, desiredTitle} = this.state;
    const lePackage = {
      public_email: publicEmail,
      first_name: firstName,
      last_name: lastName,
      image: profileImg,
      area_of_work: areaOfWork,
      desired_title: desiredTitle
    }
    axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}`, lePackage)
      .then(res => {
        this.setState({ submitSuccess: true })
        noLeaks = setTimeout(() => {
          this.setState({ submitSuccess: false })
        }, 2000)
        this.props.updateProgress()
      })
      .catch(err => {
        this.setState({ submitFailure: true })
        noLeaks = setTimeout(() => {
          this.setState({ submitFailure: false })
        }, 2000)
        console.log(err)
      })
  }

  componentWillUnmount() {
    clearTimeout(noLeaks)
  }

  render() {
    const {profileImgSuccess, publicEmailSuccess, firstNameSuccess, lastNameSuccess, areaOfWorkSuccess, desiredTitleSuccess } = this.props.userInfo;

    return (
      <MainFormContainer>
        <header>
          <h1 className="main-heading">Personal Info</h1>
        </header>

        <div className="container">
          <FormSection>
            <form>
              {/* Image */}
              <ImageContainer>
                <LabelContainer>
                  <label htmlFor="userProfileImg">
                    Choose a profile picture:
                  </label>
                  {profileImgSuccess ?
                    <span>
                      <i className="success fa fa-check-circle"></i>
                    </span>
                    :
                    null
                  }
                </LabelContainer>
                <div className="img-input-sub-container">
                  {this.state.profileImgUploadSuccess ?
                    <div className="img-input-overlay">
                      <i className="success fa fa-check-circle fa-2x"></i>
                    </div>
                    :
                    <div className="img-input-overlay">
                      <i className="upload fa fa-upload fa-2x"></i>
                    </div>
                  }

                  <input
                    id="userProfileImg"
                    type="file"
                    accept="image/*"
                    encrypt="multipart/form-data"
                    onChange={this.uploadPhoto}
                  />
                </div>
              </ImageContainer>

              {/* public email */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userPublicEmail">
                  Public Email:
                  </label>
                  {publicEmailSuccess ?
                    <span>
                      <i className="success fa fa-check-circle"></i>
                    </span>
                    :
                    null
                  }
                </LabelContainer>
                <TextInput
                  id="userPublicEmail"
                  name="publicEmail"
                  className="text-input"
                  placeholder="user@gmail.com"
                  focusIndicator
                  value={this.state.publicEmail}
                  onChange={this.onInputChange}
                />
              </div>

              {/* firstname */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userFirstName">
                  First Name:
                  </label>
                  {firstNameSuccess ?
                    <span>
                      <i className="success fa fa-check-circle"></i>
                    </span>
                    :
                    null
                  }
                </LabelContainer>
                <TextInput
                  id="userFirstName"
                  name="firstName"
                  className="text-input"
                  placeholder="john"
                  focusIndicator
                  value={this.state.firstName}
                  onChange={this.onInputChange}
                />
              </div>

              {/* lastname */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userLastName">
                  Last Name:
                  </label>
                  {lastNameSuccess ?
                    <span>
                      <i className="success fa fa-check-circle"></i>
                    </span>
                    :
                    null
                  }
                </LabelContainer>
                <TextInput
                  id="userLastName"
                  name="lastName"
                  className="text-input"
                  placeholder="doe"
                  focusIndicator
                  value={this.state.lastName}
                  onChange={this.onInputChange}
                />
              </div>

              {/* areaOfWork */}
              <div className="select-input-container">
                <LabelContainer>
                  <label htmlFor="userAreaOfWork">
                  Area of Work:
                  </label>
                  {areaOfWorkSuccess ?
                    <span>
                      <i className="success fa fa-check-circle"></i>
                    </span>
                    :
                    null
                  }
                </LabelContainer>
                <Select
                  id="userAreaOfWork"
                  className="text-input"
                  name="areaOfWork"
                  value={this.state.areaOfWork}
                  onChange={e => this.setState({
                    areaOfWork: e.value,
                  })}
                  options={this.state.areaOfWorkOptions}
                />
              </div>

              {/* desiredTitle */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userDesiredTitle">
                  Desired Title:
                  </label>
                  {desiredTitleSuccess ?
                    <span>
                      <i className="success fa fa-check-circle"></i>
                    </span>
                    :
                    null
                  }
                </LabelContainer>
                <TextInput
                  id="userDesiredTitle"
                  name="desiredTitle"
                  className="text-input"
                  placeholder="software engineer"
                  focusIndicator
                  value={this.state.desiredTitle}
                  onChange={this.onInputChange}
                />
              </div>
            </form>
          </FormSection>
          <CardPreviewSection>
            <header>
              <LabelContainer>
                <label>
                Profile Preview:
                </label>
              </LabelContainer>
            </header>
            <UserCard
              id={this.props.userInfo.id}
              github={this.props.userInfo.github}
              linkedin={this.props.userInfo.linkedin}
              portfolio={this.props.userInfo.portfolio}
              badge={this.props.userInfo.badge}
              key={this.props.userInfo.id}
              first_name={this.props.userInfo.first_name}
              last_name={this.props.userInfo.last_name}
              image={this.props.userInfo.image}
              summary={this.props.userInfo.summary}
              desired_title={this.props.userInfo.desired_title}
              location={this.props.userInfo.current_location_name}
            />
          </CardPreviewSection>
        </div>
        <ButtonContainer>
          <Link to="/dashboard">Home</Link>
          <button onClick={this.checkOnSubmit}>
            {this.state.submitSuccess ?
              <i className="success fa fa-check-circle fa-2x"></i>
              :
              'Save Info'
            }
          </button>
          <Link to="/dashboard/where-to-find-you">Next</Link>
        </ButtonContainer>
        <MobileCardPreviewSection>
          <header>
            <LabelContainer>
              <label>
                Profile Preview:
              </label>
            </LabelContainer>
          </header>
          <UserCard
            id={this.props.userInfo.id}
            github={this.props.userInfo.github}
            linkedin={this.props.userInfo.linkedin}
            portfolio={this.props.userInfo.portfolio}
            badge={this.props.userInfo.badge}
            key={this.props.userInfo.id}
            first_name={this.props.userInfo.first_name}
            last_name={this.props.userInfo.last_name}
            image={this.props.userInfo.image}
            summary={this.props.userInfo.summary}
            desired_title={this.props.userInfo.desired_title}
            location={this.props.userInfo.current_location_name}
            userTopSkills={this.props.userInfo.userTopSkills}
            userAddSkills={this.props.userInfo.userAddSkills}
            userFamSkills={this.props.userInfo.userFamSkills}
          />
        </MobileCardPreviewSection>
      </MainFormContainer>
    )
  }
}

export default PersonalInfo;
