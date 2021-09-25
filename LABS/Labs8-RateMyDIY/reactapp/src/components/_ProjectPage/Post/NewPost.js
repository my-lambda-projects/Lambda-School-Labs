// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import TextareaAutosize from 'react-autosize-textarea';

// Components
import { ConfirmModal } from '../../../components';

// Actions
import { addPost } from '../../../actions';

// Styles
import styled from 'styled-components';

const StatusMessage = styled.p``;

class NewPost extends Component {
  state = {
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
    this.props.addPost(
      {
        user_id: this.props.user_id,
        project_id: this.props.project_id,
        img_url: this.state.projectImage,
        text: this.state.text
      },
      () => this.props.willAddPost(false)
    );
  };

  // Cancel new post (with confirmation prompt)
  cancelHandler = event => {
    event.preventDefault();

    if (this.state.img_url || this.state.text) {
      this.setState({
        confirm: {
          text: ['Do you want to discard these changes?'],
          cancel: event => {
            event.preventDefault();
            this.setState({ confirm: undefined });
          },
          submit: event => {
            event.preventDefault();
            this.props.willAddPost(false);
          }
        }
      });
    } else {
      this.props.willAddPost(false);
    }
  };

  render() {
    let { imagePreviewUrl } = this.state;
    return (
      <PostContainer>
        {/* I can probably combine these */}
        {this.props.postType === 'text' ? (
          <PostForm onSubmit={this.singleFileUploadHandler}>
            <ImageReminder>
              You can add an image to this post at a later time
            </ImageReminder>
            <TextInput
              name="text"
              type="text"
              placeholder="new text field"
              value={this.state.text}
              onChange={this.changeHandler}
              required
              autoFocus
            />
            <PostButtonContainer>
              <CancelButton
                onClick={this.cancelHandler}
                disabled={this.props.addingPost || this.props.gettingProject}
              >
                cancel
              </CancelButton>
              <SubmitInput
                type="submit"
                value="submit"
                disabled={this.props.addingPost || this.props.gettingProject}
              />
            </PostButtonContainer>
          </PostForm>
        ) : (
          <PostForm onSubmit={this.singleFileUploadHandler}>
            <form>
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
              <input
                type="file"
                onChange={this.singleFileChangedHandler}
                disabled={this.props.addingPost || this.props.gettingProject}
              />
            </form>
            <TextInput
              name="text"
              type="text"
              placeholder="optional text description"
              value={this.state.text}
              autoFocus
              onChange={this.changeHandler}
            />
            <PostButtonContainer>
              <CancelButton
                onClick={this.cancelHandler}
                disabled={this.props.addingPost || this.props.gettingProject}
              >
                cancel
              </CancelButton>
              <SubmitInput
                type="submit"
                value="submit"
                disabled={this.props.addingPost || this.props.gettingProject}
              />
            </PostButtonContainer>
          </PostForm>
        )}
        {(this.props.addingPost || this.props.gettingProject) && (
          <StatusMessage small>Adding new post...</StatusMessage>
        )}
        {this.props.addingPostError && (
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

    addingPost: state.postReducer.addingPost,
    addingPostError: state.postReducer.addingPostError
  };
};

export default connect(
  mapStateToProps,
  {
    addPost
  }
)(NewPost);

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

const Img = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 380px;
  width: 100%;
  background: #cceeee;
  margin-bottom: 20px;
  object-fit: contain;
`;

const ImageReminder = styled.p`
  color: #666666;
  margin: 0 0 12px;
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
