// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import TextareaAutosize from 'react-autosize-textarea';
import UploadProjectPictureIcon from '../circleplus.png';

// Components
import { ConfirmModal } from '../../../components';

// Actions
import { updatePost } from '../../../actions';

// Styles
import styled from 'styled-components';

class EditPost extends Component {
  state = {
    img_url: null,
    text: '',
    selectedFile: null,
    uploadingProjectImage: false
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

  // Submit new post
  submitProjectChanges = event => {
    if (this.props.selectedFile && !this.state.uploadingProjectImage) {
      this.singleFileUploadHandler(event);
    }
    this.props.updatePost(
      this.props.post.post_id,
      {
        user_id: this.props.user_id,
        project_id: this.props.project_id,
        img_url: this.state.projectImage,
        text: this.state.text
      },
      () => this.props.willUpdatePost(false)
    );
  };

  // Discard changes (with confirmation prompt)
  cancelHandler = event => {
    event.preventDefault();

    if (
      this.state.img_url === this.props.post.img_url &&
      this.state.text === this.props.post.text
    ) {
      this.props.willUpdatePost(false);
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
            this.props.willUpdatePost(false);
          }
        }
      });
    }
  };

  componentDidMount() {
    this.setState({
      img_url: this.props.post.img_url,
      text: this.props.post.text
    });
  }

  render() {
    let {imagePreviewUrl} = this.state;
    return (
      <PostContainer>
        <PostForm onSubmit={this.singleFileUploadHandler}>
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
              src={imagePreviewUrl || this.props.post.img_url}
              alt={this.props.post.img_url || 'project image'}
            />
          </ImgContainer>
          <TextInput
            name="text"
            type="text"
            placeholder="optional text description"
            value={this.state.text}
            onChange={this.changeHandler}
            autoFocus
            required={!this.state.img_url}
          />
          <PostButtonContainer>
            <CancelButton
              onClick={this.cancelHandler}
              disabled={this.props.updatingPost || this.props.gettingProject}
            >
              cancel
            </CancelButton>
            <SubmitInput
              type="submit"
              value="submit"
              disabled={this.props.updatingPost || this.props.gettingProject}
            />
          </PostButtonContainer>
        </PostForm>

        {(this.props.updatingPost || this.props.gettingProject) && (
          <StatusMessage small>Updating post...</StatusMessage>
        )}
        {this.props.updatingPostError && (
          <StatusMessage small error>
            {this.props.addingPostError}
          </StatusMessage>
        )}

        {this.state.confirm && <ConfirmModal confirm={this.state.confirm} />}
      </PostContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    gettingProject: state.projectReducer.gettingProject,

    updatingPost: state.postReducer.updatingPost,
    updatingPostError: state.postReducer.updatingPostError
  };
};

export default connect(
  mapStateToProps,
  {
    updatePost
  }
)(EditPost);

// Styles
const PostContainer = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  width: 100%;
  background: #cbd6e7;
  border: 1px solid lightgray;
  padding: 18px 20px;
  margin: 0 0 30px 0;
`;

const PostForm = styled.form``;

const TextInput = styled(TextareaAutosize)`
  width: 100%;
  min-height: 4rem;
  background: #eef1f7;
  line-height: 1.6rem;
  border: none;
  padding: none;
  margin: -2px;
`;

const PostButtonContainer = styled.div`
  display: flex;
  margin: 8px 0 -6px 0;
  font-size: 1.4rem;
  width: auto;
  justify-content: flex-end;
`;

const CancelButton = styled.a`
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

const SubmitInput = styled.input`
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

const StatusMessage = styled.p``;
