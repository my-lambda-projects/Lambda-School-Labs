import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { centerFlex } from '../../../../global-styles/Mixins';

import { TextInput, Select, TextArea } from 'grommet';

var noLeaks;
class QuickstartBasics extends Component {

  state = {
    submitSuccess: false,
    submitFailure: false,
    current: this.props.current,


    profileImg: this.props.userInfo.image || "",
    profileImgUploadSuccess: false,
    firstName: this.props.userInfo.first_name  || "",
    desiredTitle: this.props.userInfo.desired_title  || "",
    locationAutocomplete: [],
    currentLocationObjArr: [],
    currentLocationInput: this.props.userInfo.current_location_name || "",
    currentLocationName: this.props.userInfo.current_location_name || "",
    currentLocationLat: this.props.userInfo.current_location_lat || "",
    currentLocationLon: this.props.userInfo.current_location_lon || "",
    summary: this.props.userInfo.summary || "",

    skillbank: null,
    topSkillsInput: "",
    topSkillsInputSuccess: false,
    userTopSkills: [],
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSkillSearch = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/list/skills/search/${e.target.value}`)
    .then(response => {
      this.setState({skillbank: response.data})
    }).catch(error => {
      this.setState({skillbank: null})
    });
  }

  onLocationChange = (e) => {
    let newObjArr;
    let newAutoArr;
    var self = this;
    axios
    .post(`${process.env.REACT_APP_BACKEND_SERVER}/api/location`, {inputLocation: e})
    .then(response => {
      newObjArr = response.data.predictions.map(location => {
        return {
          name: location.description,
          id: location.place_id
        };
      });
      newAutoArr = newObjArr.map(location => {
        return location.name;
      })
      self.setState({ locationAutocomplete: newAutoArr, currentLocationObjArr: newObjArr });
    })
    .catch(error => {
      console.log(error);
    });
  }

  chooseCurrentLocation = (e) => {
    let locationHolder = this.state.currentLocationObjArr.filter(location => {
      return location.name === e.value;
    })
    let id = locationHolder[0].id
    axios
    .post(`${process.env.REACT_APP_BACKEND_SERVER}/api/gio`, {placeId: id})
      .then(res => {
        const { lat, lng } = res.data.result.geometry.location;
        this.setState({
          currentLocationInput: e.value,
          currentLocationName: e.value,
          currentLocationLat: lat,
          currentLocationLon: lng,
          currentLocationObjArr: [],
          locationAutocomplete: []
        });
      })
      .catch(err => console.log(err))
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

  addSkillsNew = (e) => {
    e.preventDefault()
    let skillInput = e.target.getAttribute('name')
    axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}/createskill/${e.target.id}`, {"skill": `${this.state[skillInput]}`})
    .then(res => {
      let skillInputSuccess = `${skillInput}Success`
      this.setState({ [skillInput]: "", [skillInputSuccess]: true })
      this.props.updateProgress()
      noLeaks = setTimeout(() => {
        this.setState({ [skillInputSuccess]: false })
      }, 1000)
    })
  }

  addSkillsFromBank = (skillID, e) => {
    e.preventDefault()
    let skillInput = e.target.getAttribute('name')
    axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}/addskills/${e.target.id}`, {"id": `${skillID}`})
    .then( response => {
      this.setState({skillbank: null, [skillInput]: ""})
      this.props.updateProgress()
    })
  }


  checkOnSubmit = (e) => {
    e.preventDefault()
    const { firstName, profileImg, desiredTitle, currentLocationName, currentLocationLat, currentLocationLon, summary } = this.state;
    const lePackage = {
      first_name: firstName,
      image: profileImg,
      desired_title: desiredTitle,
      current_location_name: currentLocationName,
      current_location_lat: currentLocationLat,
      current_location_lon: currentLocationLon,
      summary
    }
    axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}`, lePackage)
      .then(res => {
        this.setState({ submitSuccess: true })
        noLeaks = setTimeout(() => {
          this.setState({ submitSuccess: false })
          this.props.changeCurrent('billing')
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
    const {
      profileImgSuccess,
      firstNameSuccess,
      desiredTitleSuccess,
      currentLocationNameSuccess,
      summarySuccess,
      topSkillsSuccess,
    } = this.props.userInfo;

    return (
      <MainContainer>
        <header>
          <h2 className="sub-heading">Let's Start with the Basics</h2>
        </header>
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

            {/* location */}
            <div className="select-input-container">
              <LabelContainer>
                <label htmlFor="usercurrentLocation">
                Current Location:
                </label>
                {currentLocationNameSuccess ?
                  <span>
                    <i className="success fa fa-check-circle"></i>
                  </span>
                  :
                  null
                }
              </LabelContainer>
              <Select
                id="usercurrentLocation"
                name="currentLocationInput"
                value={this.state.currentLocationInput}
                onSearch={this.onLocationChange}
                onChange={this.chooseCurrentLocation}
                options={this.state.locationAutocomplete}
              />
            </div>

            {/* summary */}
            <div className="text-input-container">
              <LabelContainer>
                <label htmlFor="userSummary">
                  Summary:
                </label>
                {summarySuccess ?
                  <span>
                    <i className="success fa fa-check-circle"></i>
                  </span>
                  :
                  null
                }
              </LabelContainer>
              <TextArea
                id="userSummary"
                name="summary"
                className="text-input"
                placeholder="Here you can give a quick summary about yourself, your personal elevator pitch! Max length is 128 characters"
                maxLength="128"
                style={{height: '120px'}}
                focusIndicator
                resize={false}
                value={this.state.summary}
                onChange={this.onInputChange}
              />
            </div>

            {/* Top Skills */}
            <div className="text-input-container">
              <LabelContainer>
                <label htmlFor="top_skills">
                  Top Skills:
                </label>
                {topSkillsSuccess ?
                  <span>
                    <i className="success fa fa-check-circle"></i>
                  </span>
                  :
                  null
                }
              </LabelContainer>
              <TextInput
                id="top_skills"
                name="topSkillsInput"
                className="text-input"
                placeholder="Add a skill from the list or create a new one"
                focusIndicator
                value={this.state.topSkillsInput}
                onChange={this.onSkillSearch}
              />
              {this.state.skillbank ? this.state.topSkillsInput !== "" ? <div className="skillbank">{this.state.skillbank.map(skill => <div key={skill.id} className="skill" id="top_skills" name="topSkillsInput"onClick={this.addSkillsFromBank.bind(this, skill.id)}>{skill.skill}</div>)}</div> : null : null}
              <button className="skills-btn" id="top_skills" name="topSkillsInput" onClick={this.addSkillsNew}>
                {this.state.topSkillsInputSuccess ?
                  <i className="success fa fa-check-circle fa-1x"></i>
                  :
                  'Add New'
                }
              </button>
            </div>

          </form>
        </FormSection>
        <ButtonContainer style={{justifyContent: 'center'}}>
          <div>
            <button onClick={this.checkOnSubmit}>
            {this.state.submitSuccess ?
              <i className="success fa fa-check-circle fa-2x"></i>
              :
              'Save Info'
            }
            </button>
          </div>
        </ButtonContainer>

      </MainContainer>
    )
  }
}

const MainContainer = styled.div`
  padding-left: 50px;
  padding-right: 50px;
  @media (max-width: 1150px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  @media (max-width: 450px) {
    padding-left: 10px;
    padding-right: 10px;
  }
  .sub-heading {
    font-size: 3rem;
    margin-bottom: 50px;
    @media (max-width: 600px) {
    font-size: 2.8rem;
    line-height: 35px;
    }
    @media (max-width: 450px) {
      font-size: 2.7rem;
    }
  }
`;

const FormSection = styled.section`
  .text-input-container,
  .select-input-container {
    margin-bottom: 30px;
  }

  .text-input-container {
    /****SKILLS BUTTONS****/
    .skills-btn {
      width: 100px;
      height: 40px;
      color: white;
      padding: 8px;
      margin-top: 10px;
      font-size: 1.4rem;
      letter-spacing: 1.5px;
      background-color: var(--accent-color);
      border: none;
      border-radius: 100px;
      ${centerFlex()};
      &:hover {
        color: var(--lp_btn_color);
        transform: scale(1.1);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        cursor: pointer;
      }
      &:active {
        transform: scale(1);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      }
      .success {
        color: var(--lp_btn_color);
      }
    }
  }
  .skillbank {
    display: flex;
    flex-wrap: wrap;
  }
  .skill {
    cursor: pointer;
    margin: 5px 5px 5px 0;
    padding: 0 5px;
    border: solid grey 1px;
    border-radius: 5px;
  }
  .text-input,
  #userAreaOfWork,
  #usercurrentLocation,
  #userPlacesInterested {
    width: 85%;
    @media (max-width: 850px) {
      width: 95%;
    }
  }
`;


const LabelContainer = styled.div`
  display: flex;
  align-items: baseline;
  .success {
    color: var(--accent-color);
  }
  label {
    color: rgba(42,42,42,.8);
    font-size: 1.7rem;
    margin-bottom: 8px;
    font-weight: bold;
    line-height: 23px;
    letter-spacing: 1px;
    margin-right: 5px;
  }
`;

const ImageContainer = styled.div`
  margin-bottom: 30px;
  .img-input-sub-container {
    width: 85%;
    border: solid 1px rgba(0,0,0,.33);
    border-radius: 4px;
    @media (max-width: 850px) {
      width: 95%;
    }
    .img-input-overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      ${centerFlex()};
    }
    .success {
      color: var(--accent-color);
    }
    .upload {
      color: var(--lp_btn_color);
    }
    input[type=file] {
      padding: 11px 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .validate {
    width: 100%;
    border: none;
  }
`;


const ButtonContainer = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 45px;
  margin-bottom: 50px;

  .success {
    color: var(--lp_btn_color);
  }

  /****ALL OTHER BUTTONS****/
  button {
    width: 330px;
    height: 80px;
    color: white;
    padding: 20px 30px;
    font-size: 2rem;
    letter-spacing: 1.5px;
    background-color: var(--accent-color);
    border: none;
    border-radius: 100px;
    ${centerFlex()};
    margin-left: 25px;
    margin-right: 25px;
    @media (max-width: 450px) {
      margin-left: 0;
      margin-right: 0;
      margin-bottom: 25px;
      width: 245px;
      height: 50;
      padding: 5px 10px;
    }
    &:hover {
      color: var(--lp_btn_color);
      transform: scale(1.1);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      cursor: pointer;
    }
    &:active {
      transform: scale(1);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }
  }
`;

export default QuickstartBasics;
