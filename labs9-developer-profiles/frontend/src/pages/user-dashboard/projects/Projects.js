import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserCard from '../../../components/user-card/UserCard';

import { TextInput, TextArea } from 'grommet';
import {
  MainFormContainer,
  FormSection,
  LabelContainer,
  ImageContainer,
  ButtonContainer,
  Validator,
  CardPreviewSection,
  MobileCardPreviewSection
} from '../styles/FormStyles';

var noLeaks;
class Projects extends Component {
  state = {
    enableEdit: false,
    submitSuccess: false,
    submitFailure: false,
    projectImg: "",
    projectImgValidation: true,
    projectImgUploadSuccess: false,
    projectTitle: "",
    projectTitleValidation: true,
    projectLink: "",
    projectLinkValidation: true,
    projectDescription: "",
    projectDescriptionValidation: true,
    projects: this.props.userInfo.userProjects || []
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  uploadPhotoProj = (e) => {
    const file = e.target.files[0];
    let XHR = new XMLHttpRequest();
    let FD  = new FormData();

    // Push our data into our FormData object
    FD.append('image', file);

    var self = this;
    // Define what happens on successful data submission
    XHR.addEventListener('load', function(event) {
      let url = JSON.parse(event.target.responseText);
      self.setState({projectImg: url.imgUrl, projectImgUploadSuccess: true})
      setTimeout(() => {
        self.setState({projectImgUploadSuccess: false})
      }, 2000)
    });

    // Define what happens in case of error
    XHR.addEventListener('error', function(event) {
      alert('Oops! Something went wrong.');
    });

    // Set up our request
    XHR.open('POST', `${process.env.REACT_APP_BACKEND_SERVER}/api/image-upload`);

    // Send our FormData object; HTTP headers are set automatically
    XHR.send(FD);
  }

  checkOnSubmit = (e) => {
    e.preventDefault()

    const { projectTitle, projectImg, projectLink, projectDescription } = this.state;

    if (projectImg === "") {
      this.setState({projectImgValidation: false})
      return
    } else {
      this.setState({projectImgValidation: true})
    }
    
    if (projectTitle === "") {
      this.setState({projectTitleValidation: false})
      return
    } else {
      this.setState({projectTitleValidation: true})
    }
    
    if (projectLink === "") {
      this.setState({projectLinkValidation: false})
      return
    } else {
      this.setState({projectLinkValidation: true})
    }
    
    if (projectDescription === "") {
      this.setState({projectDescriptionValidation: false})
      return
    } else {
      this.setState({projectDescriptionValidation: true})
    }
    
    const lePackage = {
      user_id: this.props.userInfo.id,
      project_title: projectTitle,
      project_img: projectImg,
      link: projectLink,
      project_description: projectDescription
    }
    
    axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}/projects`, lePackage)
    .then(res => {
      this.setState({
        enableEdit: false,
        submitSuccess: true,
        projectTitle: "",
        projectImg: "",
        projectLink: "",
        projectDescription: "",
      })
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

  editExtra = (edit) => {
    if(this.state.enableEdit){
        this.setState({
          enableEdit: false,
          project_id: null,
          projectTitle: '',
          projectImg: '',
          projectLink: '',
          projectDescription: '',
        })
    } else {
        this.setState({
          enableEdit: true,
          projectTitle: edit.project_title,
          projectId: edit.id,
          projectImg: edit.project_img,
          projectLink: edit.link,
          projectDescription: edit.project_description,
        })
    }
  }

  submitEdit = () => {
    const lePackage = {
      user_id: this.props.userInfo.id,
      project_title: this.state.projectTitle,
      project_img: this.state.projectImg,
      link: this.state.projectLink,
      project_description: this.state.projectDescription
    }
    axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}/projects/${this.state.projectId}`, lePackage)
    .then(res => {
      window.location.reload()
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <MainFormContainer>
        <header>
          <h1 className="main-heading">Projects</h1>
        </header>

        
        <div className="container">
          <FormSection>
            <form>
              {/* Image */}
              <ImageContainer>
                <LabelContainer>
                  <label htmlFor="userProjectImg">
                    Choose a Project Image:
                  </label>
                </LabelContainer>
                <Validator validated={this.state.projectImgValidation}>
                  <div className="img-input-sub-container validate">

                    {this.state.projectImgUploadSuccess ?
                      <div className="img-input-overlay">
                        <i className="success fa fa-check-circle fa-2x"></i>
                      </div>
                      :
                      <div className="img-input-overlay">
                        <i className="upload fa fa-upload fa-2x"></i>
                      </div>
                    }

                    <input
                      id="userProjectImg"
                      type="file"
                      accept="image/*"
                      encrypt="multipart/form-data"
                      onChange={this.uploadPhotoProj}
                    />
                  </div>
                </Validator>

              </ImageContainer>



              {/* projtitle */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userProjectTitle">
                  Project Name:
                  </label>
                </LabelContainer>
                <Validator validated={this.state.projectTitleValidation}>
                  <TextInput
                    id="userProjectTitle"
                    name="projectTitle"
                    className="validated-text-input"
                    placeholder="My Cool Project"
                    focusIndicator
                    plain
                    value={this.state.projectTitle}
                    onChange={this.onInputChange}
                  />
                </Validator>
              </div>

              {/* link */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userProjectLink">
                    Project Link:
                  </label>
                </LabelContainer>
                <Validator validated={this.state.projectLinkValidation}>
                  <TextInput
                    id="userProjectLink"
                    name="projectLink"
                    className="validated-text-input"
                    placeholder="www.mysite.com"
                    focusIndicator
                    plain
                    value={this.state.projectLink}
                    onChange={this.onInputChange}
                  />
                </Validator>
              </div>

              {/* projdescription */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userProjectDescription">
                    Summary:
                  </label>
                </LabelContainer>
                <Validator validated={this.state.projectDescriptionValidation}>
                  <TextArea
                    id="userProjectDescription"
                    name="projectDescription"
                    className="validated-text-input"
                    placeholder="Here you can give a quick summary of your project, your elevator pitch! Max length is 128 characters"
                    maxLength="128"
                    style={{height: '120px'}}
                    focusIndicator
                    plain
                    resize={false}
                    value={this.state.projectDescription}
                    onChange={this.onInputChange}
                  />
                </Validator>
              </div>
            </form>
            <ButtonContainer>
                {this.state.enableEdit ? <button onClick={this.submitEdit}>Submit Edit</button> : null}
            </ButtonContainer>
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
              canEdit
              canEditPro
              enableEdit
              delExtra={this.props.delExtra}
              editExtra={this.editExtra}

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
              userProjects={this.props.userInfo.userProjects}
            />
          </CardPreviewSection>
        </div>
        <ButtonContainer>
          <Link to="/dashboard/about-you">Back</Link>
          <button onClick={this.checkOnSubmit}>
            {this.state.submitSuccess ?
              <i className="success fa fa-check-circle fa-2x"></i>
              :
              'Save Info'
            }
          </button>
          <Link to="/dashboard/experience">Next</Link>
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

export default Projects;
