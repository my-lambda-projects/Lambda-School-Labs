// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-autosize-textarea';
// Components
import { ConfirmModal } from '../../components';
import UploadProjectPictureIcon from './circleplus.png';
// Actions
import { updateProject, updateProjectImage } from '../../actions';

// Styles
import styled from 'styled-components';

class EditProject extends Component {
  state = {
    projectName: '',
    projectImage: '',
    projectDescriptionText: '',
    categories: [],
    selectedFile: null,
    uploadingProjectImage: false
  };

  componentDidMount() {
    this.setState({
      projectName: this.props.project.project_name,
      projectImage: this.props.project.img_url,
      projectDescriptionText: this.props.project.text,
      categories: this.props.project.categories
    });
    document.addEventListener('keydown', this.escCancelHandler, false);
  }

  // This stores the project image file recieved in the ReactFileReader form data
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
    console.log(this.state);
  };

  // updates the project with the edited data
  submitProjectChanges = event => {
    if (this.props.selectedFile && !this.state.uploadingProjectImage) {
      this.singleFileUploadHandler(event);
    }
    this.props.updateProject(
      this.props.project.project_id,
      {
        user_id: this.props.user_id,
        project_name: this.state.projectName,
        img_url: this.state.projectImage,
        text: this.state.projectDescriptionText,
        categories: this.state.categories
      },
      () => this.props.willUpdateProject(false)
    );
  };

  // Discard changes (with confirmation prompt)
  cancelHandler = event => {
    event.preventDefault();

    if (
      this.state.projectName === this.props.project.project_name &&
      this.state.projectImage === this.props.project.img_url &&
      this.state.projectDescriptionText === this.props.project.text
    ) {
      this.props.willUpdateProject(false);
      this.setState(prevState => ({ toggle: !prevState.toggle }));
    } else {
      this.setState({
        confirm: {
          text: ['Do you want to discard these changes?'],
          cancel: event => {
            event.preventDefault();
            this.setState({ confirm: undefined });
          },
          submit: event => {
            event.preventDefault();
            this.props.willUpdateProject(false);
          }
        }
      });
    }
  };

  render() {
	let {imagePreviewUrl} = this.state;
    return (
      <EditProjectContainer onSubmit={this.singleFileUploadHandler}>
        <ProjectHeader>
          <ProjectNameAndAuthorContainer>
            <ProjectName>
              <ProjectNameInput
                name="projectName"
                type="text"
                placeholder="Project Title"
                value={this.state.projectName}
                onChange={this.changeHandler}
                required
              />
            </ProjectName>
            <ProjectAuthor>by {this.props.project.username}</ProjectAuthor>
            <CategoryContainer>
              {/* Any categories? */}
              {this.props.project.categories &&
                // Display categories
                this.props.project.categories.map(
                  ({ category_id, category_name }) => (
                    // Needs category search!
                    <Category
                      to={`/make/search/queries/for/categories/please/${category_id}`}
                      key={category_id}
                    >
                      {category_name}
                    </Category>
                  )
                )}
            </CategoryContainer>
          </ProjectNameAndAuthorContainer>

          <ReviewsLink onClick={this.cancelHandler}>
            {this.props.project.project_rating && (
              <ProjectRatingTool
                rating={Number(this.props.project.project_rating)}
                starEmptyColor="#bfbfbf"
                starRatedColor="#cc0000"
                starDimension="24px"
                starSpacing="3px"
                numberOfStars={5}
              />
            )}
            <ReviewsLinkText>View Reviews</ReviewsLinkText>
          </ReviewsLink>
        </ProjectHeader>
        <ImgContainer>
          <ProjectPictureHiddenInput
            type="file"
            id="project_picture_input"
            onChange={this.singleFileChangedHandler}
          />
          <ProjectPictureUploadLabel
            htmlFor="project_picture_input"
            disabled={this.props.updatingProject || this.props.gettingProject}
          >
            <UploadProjectPictureIconStyle
              className="upload-icon"
              src={UploadProjectPictureIcon}
            />
          </ProjectPictureUploadLabel>
          <ProjectImage
            src={imagePreviewUrl || this.state.projectImage }
            alt={this.state.projectImage || 'project image'}
          />
        </ImgContainer>
        {/* HiddenProfilePictureInput is hidden */}
        <DescriptionInput
          name="projectDescriptionText"
          type="text"
          placeholder="project description"
          value={this.state.projectDescriptionText}
          onChange={this.changeHandler}
          autoFocus
          required
        />
        <EditProjectOptionsContainer>
          <CancelLink
            onClick={this.cancelHandler}
            disabled={this.props.updatingProject || this.props.gettingProject}
            onKeyDown={this.escCancelHandler}
            tabIndex="0"
          >
            cancel
          </CancelLink>
          <SubmitLink
            type="submit"
            value="Submit Changes"
            disabled={this.props.updatingProject || this.props.gettingProject}
          >
            submit
          </SubmitLink>
        </EditProjectOptionsContainer>

        {(this.props.updatingProject ||
          this.props.gettingProject ||
          this.state.uploadingProjectImage) && (
          <StatusMessage small>Updating project...</StatusMessage>
        )}
        {this.props.updatingProjectError && (
          <StatusMessage small error>
            {this.props.updatingProjectError}
          </StatusMessage>
        )}

        {this.state.confirm && <ConfirmModal confirm={this.state.confirm} />}
      </EditProjectContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    gettingProject: state.projectReducer.gettingProject,
    updatingProject: state.projectReducer.updatingProject,
    updatingProjectError: state.projectReducer.updatingProjectError
  };
};

export default connect(
  mapStateToProps,
  {
    updateProject,
    updateProjectImage
  }
)(EditProject);

// Styled-components

const EditProjectContainer = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  width: 100%;
  background: #cbd6e7;
  border: 1px solid lightgray;
  padding: 18px 20px;
  margin: 0 0 30px 0;
`;

const ProjectHeader = styled.div`
  display: flex;
  /* position: 50%; */
  /* flex-direction: row; */
  justify-content: space-between;
  align-items: center;
`;

const ProjectNameAndAuthorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectName = styled.h2`
  margin: 0 0 0 -2px;
`;

const ProjectNameInput = styled(TextareaAutosize)`
  border: 0;
  margin: -2px 0 -4px -2px;
  width: 100%;
  background: #eef1f7;
  font-size: 32px;
  font-weight: bold;
`;

const ProjectAuthor = styled.div`
  padding: 4px 0 0;
  font-size: 1.6rem;
`;

const ReviewsLink = styled.div`
  margin: -10px 0 0 0;
  display: flex;
  flex-direction: column;
  /* align-self: flex-end; */
  align-items: flex-end;
  min-width: 160px;
  &:hover {
    text-decoration: none;
    background: none;
  }
`;

const ProjectRatingTool = styled(StarRatings)``;

const ReviewsLinkText = styled.p`
  color: #808080;
  padding: 6px 0 0;
`;

const CategoryContainer = styled.div`
  font-size: 1.6rem;
  margin: 12px 0 0;
  display: flex;
`;

const Category = styled(Link)`
  min-width: 54px;
  margin: 0 4px 0 0;
  text-align: center;
  letter-spacing: 0.05rem;
  color: white;
  background: #254f8d;
  padding: 4px 5px 2px;
  border-radius: 4px;
  font-size: 12px;
  &:hover {
    text-decoration: none;
    color: white;
    background: #1c293b;
  }
`;

const ProjectPictureHiddenInput = styled.input`
  opacity: 0;
  position: absolute;
  pointer-events: none;
  // alternative to pointer-events, compatible with all browsers, just make it impossible to find
  width: 1px;
  height: 1px;
`;

const ProjectPictureUploadLabel = styled.label`
  text-align: center;
`;

const ImgContainer = styled.div`
  position: relative;
  /* display: flex; */
  /* height: auto;
	margin: 0 auto;
	max-height: 600px !important;
	width: auto;
	margin: 0 auto; */
  width: 100%;
  margin: 20px 0 18px;
  transition: 0.5s ease;
  :hover {
    opacity: 0.9;
  }
`;

const UploadProjectPictureIconStyle = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 35%;
  opacity: 0.4;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  /* margin: auto;
	padding: auto; */
  transition: 0.5s ease;
  z-index: 1;
  :hover {
    opacity: 0.9;
  }
`;

const ProjectImage = styled.img`
  background: #f6f6f6;
  max-height: 600px;
  width: 100%;
  /* margin: 20px 0 18px; */
  object-fit: contain;
  transition: 0.5s ease;
`;

const DescriptionInput = styled(TextareaAutosize)`
  width: 100%;
  min-height: 4rem;
  background: #eef1f7;
  line-height: 1.6rem;
  border: none;
  padding: none;
  margin: -2px;
`;

const CancelLink = styled.a`
  cursor: pointer;
  margin-right: 12px;
  text-decoration: none;
  color: black;
  position: relative;
  z-index: 10;
  :hover {
    background: none;
    text-decoration: none;
    color: #33393f;
  }
`;

const SubmitLink = styled.button`
  border: 0;
  margin: 0;
  padding: 0;
  background: none;
  cursor: pointer;
  color: black;
  :hover {
    background: none;
    text-decoration: none;
    color: #33393f;
  }
`;

// const ReviewsButton = styled.button``;

const EditProjectOptionsContainer = styled.div`
  display: flex;
  margin: 8px 0 -6px 0;
  font-size: 1.4rem;
  width: auto;
  justify-content: flex-end;
`;

const StatusMessage = styled.p``;
