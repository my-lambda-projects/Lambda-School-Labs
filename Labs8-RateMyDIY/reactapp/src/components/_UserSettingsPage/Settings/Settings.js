// Dependencies
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getUsername, getProfilePic } from '../../../actions/settingActions';
import axios from 'axios';
import { Nav, Twillio } from '../../../components';
import { Header } from '../../../components';
import { fetchSearchResults } from '../../../actions';
//Styles
const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 550px;
  width: 100%;
  background: #bbb;
  margin-top: 98px;
`;

class UserSettingSettings extends Component {
  state = {
    username: '',
	img_url: null,
	input:''
  };

  handleChange = e => {
    this.setState({ ...this.state, input: e.target.value });
  };

  handleSearch = e => {
    e.preventDefault();
    const searchTerm = this.state.input;
    console.log(searchTerm);
    //call featch search results action
    //push to search page
    this.props.fetchSearchResults(searchTerm);
    this.props.history.push(`/search?query=${searchTerm}`);
  };

  singleFileChangedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  singleFileUploadHandler = event => {
    event.preventDefault();
    const data = new FormData();
    // If file selected
    if (this.state.selectedFile) {
      data.append(
        'image',
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      axios
        .post(
          (process.env.REACT_APP_BACKEND || 'http://localhost:5000') +
            `/api/projects/image-upload`,
          data,
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
              } else {
                console.log(response.data.location);
                // If not the given file type
                // this.ocShowAlert(response.data.error, "red");
              }
            } else {
              // Success
              let fileName = response.data;

              let photo = response.data.location;
              this.setState({
                img_url: photo
              });
              console.log('filedata', fileName);

              console.log('photo', photo);

              this.props.getProfilePic(this.state.img_url);

              //   this.ocShowAlert("File Uploaded", "#3089cf");
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

  submitHandler = event => {
    event.preventDefault();
    this.props.getUsername(this.state.username);
    this.setState({
      username: ''
    });
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <Header
          handleChange={this.handleChange}
          handleSearch={this.handleSearch}
        />

        <SettingsContainer>
          <Nav />
          <Twillio />
          <form onSubmit={this.submitHandler}>
            <input
              type="text"
              value={this.state.username}
              name="username"
              onChange={this.changeHandler}
            />
            <input type="submit" value="Change Username" />
          </form>
          Current Username: {this.props.userInfo.username}{' '}
          {this.props.username_error ? this.props.username_error : null}
          <form>
            <input type="file" onChange={this.singleFileChangedHandler} />
            <div>
              <button onClick={this.singleFileUploadHandler}>Upload!</button>
            </div>
          </form>
          {this.props.img_url
            ? this.props.img_url
            : this.props.profilepic_error}
        </SettingsContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gettingUsername: state.settingsReducer.gettingUsername,
  username: state.settingsReducer.username,
  username_error: state.settingsReducer.username_error,
  gettingProfilePic: state.settingsReducer.gettingProfilePic,
  img_url: state.settingsReducer.img_url,
  profilepic_error: state.settingsReducer.profilepic_error,
  userInfo: state.loggedInReducer.userInfo
});

export default connect(
  mapStateToProps,
  { getUsername, getProfilePic, fetchSearchResults }
)(UserSettingSettings);
