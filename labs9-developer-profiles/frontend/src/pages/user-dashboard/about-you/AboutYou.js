import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserCard from '../../../components/user-card/UserCard';

import { TextArea, Select, TextInput } from 'grommet';
import {
  MainFormContainer,
  FormSection,
  LabelContainer,
  ButtonContainer,
  CardPreviewSection,
  MobileCardPreviewSection
} from '../styles/FormStyles';


var noLeaks;
class AboutYou extends Component {
  state = {
    submitSuccess: false,
    submitFailure: false,
    placesAutocomplete: [],
    placesInterestedArr: this.props.userInfo.placesInterestedArr || [],
    placesInterestedInput: "",
    placesInterested: this.props.userInfo.interested_location_names || "",
    summary: this.props.userInfo.summary || "",
    skillbank: null,
    topSkillsInput: "",
    topSkillsInputSuccess: false,
    userTopSkills: [],
    additionalSkillsInput: "",
    additionalSkillsInputSuccess: false,
    userAddSkills: [],
    familiarSkillsInput: "",
    familiarSkillsInputSuccess: false,
    userFamSkills: [],
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

  // places interested
  onPlacesChange = (e) => {
    let newArr;
    var self = this;
    axios
    .post(`${process.env.REACT_APP_BACKEND_SERVER}/api/location`, {inputLocation: e})
    .then(response => {
      newArr = response.data.predictions.map(location => {
        return location.description
      });
      newArr.unshift('Remote')
      self.setState({ placesAutocomplete: newArr });
    })
    .catch(error => {
      console.log(error);
    });
  }

  choosePlacesInterested = (e) => {
    let newPlacesInterested;
    let newPlacesInterestedArr;
    let dupCheck;
    let dupBool;
    if (this.state.placesInterested === '') {
      newPlacesInterested = '';
      newPlacesInterested = e.value;
      newPlacesInterestedArr = [];
      newPlacesInterestedArr.push(newPlacesInterested)
    } else {
      newPlacesInterested = this.state.placesInterested.slice();
      dupCheck = newPlacesInterested.split('|');
      dupCheck.forEach((place) => {
        if (place === e.value) {
          dupBool = true;
        }
      })
      if (!dupBool) {
        newPlacesInterested = newPlacesInterested + '|' + e.value;
      }
      newPlacesInterestedArr = newPlacesInterested.split('|');
    }
    const lePackage = {
      interested_location_names: newPlacesInterested,
    }
    axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}`, lePackage)
    .then(res => {
      this.setState({
        placesInterestedArr: newPlacesInterestedArr,
        placesInterested: newPlacesInterested,
        placesAutocomplete: [],
        placesInterestedInput: ""
      });
      this.props.updateProgress()
    })
    .catch(err => console.log(err))
  }

  removePlace = (location) => {
    let newPlacesInterestedArr = this.state.placesInterestedArr.slice();
    newPlacesInterestedArr = newPlacesInterestedArr.filter(place => {
      return place !== location
    });

    let newPlacesInterestedStr = newPlacesInterestedArr.join('|');
    const lePackage = {
      interested_location_names: newPlacesInterestedStr,
    }
    axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}`, lePackage)
    .then(res => {
      this.setState({ placesInterestedArr: newPlacesInterestedArr });
      this.props.updateProgress()
    })
    .catch(err => console.log(err))
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
        const { summary } = this.state;
        const lePackage = {
          summary
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
    const {
      placesInterestedSuccess,
      summarySuccess,
      topSkillsSuccess,
      additionalSkillsSuccess,
      familiarSkillsSuccess,
    } = this.props.userInfo;

    return (
      <MainFormContainer>
        <header>
          <h1 className="main-heading">About You</h1>
        </header>

        <div className="container">
          <FormSection>
            <form>

              {/* places */}
              <div className="select-input-container">
                <LabelContainer>
                  <label htmlFor="userPlacesInterested">
                    Places Interested:
                  </label>
                  {placesInterestedSuccess ?
                    <span>
                      <i className="success fa fa-check-circle"></i>
                    </span>
                    :
                    null
                  }
                </LabelContainer>
                <Select
                  id="userPlacesInterested"
                  className="text-input"
                  name="placesInterestedInput"
                  value={this.state.placesInterestedInput}
                  onSearch={this.onPlacesChange}
                  onChange={this.choosePlacesInterested}
                  options={this.state.placesAutocomplete}
                  />
                  {this.state.placesInterestedArr.length === 0 ?
                    null
                    :
                    <div className="showing-places">
                      {this.state.placesInterestedArr.length === 0 ?
                        null
                        :
                        this.state.placesInterestedArr.map((location) => {
                          return (
                            <span className="places" key={location}>
                              <i onClick={() => this.removePlace(location)} className="delete far fa-times-circle"></i> {location}
                            </span>
                          );
                        })
                      }
                    </div>
                  }
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

              {/* Additional Skills */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="add_skills">
                    Additional Skills:
                  </label>
                  {additionalSkillsSuccess ?
                    <span>
                      <i className="success fa fa-check-circle"></i>
                    </span>
                    :
                    null
                  }
                </LabelContainer>
                <TextInput
                  id="add_skills"
                  name="additionalSkillsInput"
                  className="text-input"
                  placeholder="Put additional skills here"
                  focusIndicator
                  value={this.state.additionalSkillsInput}
                  onChange={this.onSkillSearch}
                />
                {this.state.skillbank ? this.state.additionalSkillsInput !== "" ? <div className="skillbank">{this.state.skillbank.map(skill => <div key={skill.id} className="skill" id="add_skills" name="additionalSkillsInput"onClick={this.addSkillsFromBank.bind(this, skill.id)}>{skill.skill}</div>)}</div> : null : null}
                <button className="skills-btn" id="add_skills" name="additionalSkillsInput" onClick={this.addSkillsNew}>
                  {this.state.additionalSkillsInputSuccess ?
                    <i className="success fa fa-check-circle fa-1x"></i>
                    :
                    'Add New'
                  }
                </button>
              </div>
            
              {/* Familiar Skills */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="familiar">
                  Familiar With:
                  </label>
                  {familiarSkillsSuccess ?
                    <span>
                      <i className="success fa fa-check-circle"></i>
                    </span>
                    :
                    null
                  }
                </LabelContainer>
                <TextInput
                  id="familiar"
                  name="familiarSkillsInput"
                  className="text-input"
                  placeholder="These are skills you are just familiar with"
                  focusIndicator
                  value={this.state.familiarSkillsInput}
                  onChange={this.onSkillSearch}
                />
                {this.state.skillbank ? this.state.familiarSkillsInput !== "" ? <div className="skillbank">{this.state.skillbank.map(skill => <div key={skill.id} className="skill" id="familiar" name="familiarSkillsInput"onClick={this.addSkillsFromBank.bind(this, skill.id)}>{skill.skill}</div>)}</div> : null : null}
                <button className="skills-btn" id="familiar" name="familiarSkillsInput" onClick={this.addSkillsNew}>
                  {this.state.familiarSkillsInputSuccess ?
                    <i className="success fa fa-check-circle fa-1x"></i>
                    :
                    'Add New'
                  }
                </button>
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
                updateProgress={this.props.updateProgress}
                preview={this.props.preview}
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
          </CardPreviewSection>
        </div>
        <ButtonContainer>
          <Link to="/dashboard/where-to-find-you">Back</Link>
          <button onClick={this.checkOnSubmit}>
          {this.state.submitSuccess ?
            <i className="success fa fa-check-circle fa-2x"></i>
            :
            'Save Info'
          }
          </button>
          <Link to="/dashboard/projects">Next</Link>
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
            preview={this.props.preview}
            updateProgress={this.props.updateProgress}
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

export default AboutYou;
