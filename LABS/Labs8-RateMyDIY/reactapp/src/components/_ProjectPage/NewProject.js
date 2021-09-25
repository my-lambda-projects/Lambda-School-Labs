// Dependencies
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Select from 'react-select';
import axios from 'axios';

// Components
import { ConfirmModal, Header } from '../../components';

// Actions
import { addProject } from '../../actions';

// Styles
import styled from 'styled-components';

const NewProjectContainer = styled.div`
  width: 640px;
  padding: 25px 30px 25px 30px;
  margin: 0 auto;
  margin-top: 110px;
  display: flex;
  flex-direction: column;
  background: #e9ded8;
  border-radius: 4px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const NewProjectBody = styled.div`
  width: 100%;
`;

const NewProjectHeader = styled.div``;
const StatusMessage = styled.p``;

const ProjectForm = styled.form``;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 380px;
  width: 100%;
  background: #c8c8c8;
  margin-bottom: 20px;
`;

const Img = styled.img`
  align-self: center;
  height: 100%;
  width: 100%;
  object-fit: contain;
  background: #c8c8c8;
`;

const ProjectImageFlex = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ProjectImage = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const ProjectImageFile = styled.div`
  font-size: 1.25em;
  font-weight: 700;
  color: #f1e5e6;
  background-color: #254f8d;
  display: flex;
  justify-content: space-between;
  padding: 10px 15px 10px 15px;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  &:hover {
    outline: 1px dotted #000;
    outline: -webkit-focus-ring-color auto 5px;
    background-color: #1c293b;
  }
`;

const ImageFileUpload = styled.div`
  width: 1em;
  height: 1em;
  vertical-align: middle;
  fill: currentColor;
  margin-top: -0.25em;
  margin-right: 0.25em;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  width: 100%;
  font-size: 1.6rem;
  line-height: 2.4rem;
  outline: none;
  resize: none;
  padding: 10px;
  margin: 6px 0 20px;
`;

const CancelButton = styled.button`
  font-size: 1.25em;
  font-weight: 700;
  color: #f1e5e6;
  background-color: #254f8d;
  display: flex;
  justify-content: space-between;
  padding: 10px 15px 10px 15px;
  cursor: pointer;
  &:hover {
    outline: 1px dotted #000;
    outline: -webkit-focus-ring-color auto 5px;
    background-color: #1c293b;
  }
`;

const SubmitInput = styled.input`
  font-size: 1.25em;
  font-weight: 700;
  color: #f1e5e6;
  background-color: #254f8d;
  display: flex;
  justify-content: space-between;
  padding: 10px 15px 10px 15px;
  cursor: pointer;
  &:hover {
    outline: 1px dotted #000;
    outline: -webkit-focus-ring-color auto 5px;
    background-color: #1c293b;
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  /* margin-top: 10px; */
  margin-bottom: 20px;
`;

const ProjectNameInput = styled.input`
  width: 70%;
  font-size: 1.6rem;
  padding: 8px;
`;

const ProjectButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const selectorStyles = {
  control: base => ({
    ...base,
    height: '38px',
    border: '1px solid #A9A9A9',
    borderRadius: 'none',
    fontSize: '1.6rem'
  })
};

const options = [
  { value: 1, label: 'Home' },
  { value: 2, label: 'Garden' },
  { value: 3, label: 'Cooking' },
  { value: 4, label: 'Carpentry' },
  { value: 5, label: 'Tech' },
  { value: 6, label: 'Automotive' },
  { value: 7, label: 'Misc' }
];

class NewProject extends Component {
  state = {
    project_name: '',
    img_url: null,
    text: '',
    categories: [],
    imagePreviewUrl: ''
  };

  handleSelect = categories => {
    this.setState({ categories });
    console.log(`Option selected:`, categories);
  };

  singleFileChangedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  };

  singleFileUploadHandler = event => {
    event.preventDefault();
    const data = new FormData();
    // If file selected
    if (!this.state.selectedFile && !this.state.uploadingProjectImage) {
      this.submitProjectChanges();
    } else if (this.state.selectedFile && !this.state.uploadingProjectImage) {
      data.append(
        'image',
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      this.setState({
        uploadingProjectImage: true
      });
      axios
        .post(
          (process.env.REACT_APP_BACKEND || 'http://localhost:5000') +
            `/api/projects/image-upload`,
          data,
          {
            onUploadProgress: progressEvent => {
              console.log(
                'Upload Progress:' +
                  Math.round(
                    (progressEvent.loaded / progressEvent.total) * 100
                  ) +
                  '%'
              );
            }
          },
          {
            headers: {
              accept: 'application/json',
              'Accept-Language': 'en-US,en;q=0.8',
              'Content-Type': `multipart/form-data; boundary=${data._boundary}`
            }
          }
        )
        .then(response => {
          if (200 === response.status) {
            // If file size is larger than expected.
            if (response.data.error) {
              if ('LIMIT_FILE_SIZE' === response.data.error.code) {
                // this.ocShowAlert("Max size: 2MB", "red");
                this.setState({
                  uploadingProjectImage: false
                });
              } else {
                this.setState({
                  uploadingProjectImage: false
                });
                console.log(response.data.location);
                // If not the given file type
                // this.ocShowAlert(response.data.error, "red");
                console.log(response.data.path);
              }
            } else {
              let photo = response.data.location;
              this.setState(
                {
                  projectImage: photo,
                  uploadingProjectImage: false
                },
                () => {
                  this.submitProjectChanges();
                }
              );
            }
          } else {
            console.log('error');
          }
        })
        .catch(error => {
          // If another error
          console.log('error');
        });
    }
  };
  // Keep form data in the state
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Submit new project
  submitProjectChanges = event => {
    if (this.props.selectedFile && !this.state.uploadingProjectImage) {
      this.singleFileUploadHandler(event);
    }
		this.props.addProject(
			{
				user_id: this.props.userInfo.user_id,
				project_name: this.state.project_name,
				img_url: this.state.projectImage,
				text: this.state.text,
				categories: [this.state.categories.value]
			},
			url => this.setState({ redirect: url })
		);
	};

  // Cancel new project (with confirmation prompt)
  cancelHandler = event => {
    event.preventDefault();

    if (this.state.project_name || this.state.img_url || this.state.text) {
      this.setState({
        confirm: {
          text: ['Do you want to discard these changes?'],
          cancel: event => {
            event.preventDefault();
            this.setState({ confirm: undefined });
          },
          submit: event => {
            event.preventDefault();
            this.setState({ redirect: '/' });
          }
        }
      });
    } else {
      this.setState({ redirect: '/' });
    }
  };

  render() {
    let { imagePreviewUrl } = this.state;
    return (
      <NewProjectBody>
        <NewProjectHeader>
          <Header />
        </NewProjectHeader>
        <NewProjectContainer>
          {this.state.redirect && <Redirect push to={this.state.redirect} />}
          <ProjectForm onSubmit={this.singleFileUploadHandler}>
            Project title:
            <ProjectHeader>
              <ProjectNameInput
                name="project_name"
                type="text"
                maxLength="48"
                placeholder="Project title"
                value={this.state.project_name}
                onChange={this.changeHandler}
                autoFocus
                required
              />
              <div style={{ width: '30%' }}>
                {/* // Not multi select !! */}
                <Select
                  value={this.state.categories}
                  onChange={this.handleSelect}
                  options={options}
                  placeholder="Select category"
                  style={{ fontSize: '1.6rem' }}
                  styles={selectorStyles}
                  required
                />
              </div>
            </ProjectHeader>
            <ImgWrapper>
              <Img
                src={
                  imagePreviewUrl ||
                  'https://sanitationsolutions.net/wp-content/uploads/2015/05/empty-image.png'
                }
                alt={
                  imagePreviewUrl ||
                  'https://sanitationsolutions.net/wp-content/uploads/2015/05/empty-image.png'
                }
              />
            </ImgWrapper>
            <ProjectImage
              type="file"
              id="myuniqueid"
              onChange={this.singleFileChangedHandler}
              disabled={this.props.addingProject}
            />
            <ProjectImageFlex>
              <label for="myuniqueid">
                <ProjectImageFile>
                  <ImageFileUpload>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                    >
                      <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
                    </svg>
                  </ImageFileUpload>
                  <h1>Choose an image...</h1>
                </ProjectImageFile>
              </label>
            </ProjectImageFlex>
            Project description:
            <TextArea
              name="text"
              rows="6"
              maxLength="1024"
              placeholder="Project description"
              value={this.state.text}
              onChange={this.changeHandler}
            />
            <ProjectButtonContainer>
              <CancelButton
                onClick={this.cancelHandler}
                disabled={this.props.addingProject}
              >
                Cancel Project
              </CancelButton>
              <SubmitInput
                type="submit"
                value="Add New Project"
                disabled={this.props.addingProject}
              />
            </ProjectButtonContainer>
            {this.props.addingProject && (
              <StatusMessage small>Adding new project...</StatusMessage>
            )}
            {this.props.addingProjectError && (
              <StatusMessage small error>
                {this.props.addingProjectError}
              </StatusMessage>
            )}
          </ProjectForm>

          {this.state.confirm && <ConfirmModal confirm={this.state.confirm} />}
        </NewProjectContainer>
      </NewProjectBody>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.loggedInReducer.userInfo,

    addingProject: state.projectReducer.addingProject,
    addingProjectError: state.projectReducer.addingProjectError
  };
};

export default connect(
  mapStateToProps,
  {
    addProject
  }
)(NewProject);
