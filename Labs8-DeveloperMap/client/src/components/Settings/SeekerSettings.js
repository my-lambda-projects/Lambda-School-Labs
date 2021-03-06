import React, { Component, Fragment } from 'react';
import axios from 'axios';
import firebase, { auth, storage } from '../../firebase/firebase';
import { Route, NavLink } from 'react-router-dom';
import profile from '../../images/avatar-icon.jpg';
import {
  EditButtons,
  Label,
  Social,
  ProfileInfo,
  Location,
  Input,
  TextArea,
  CheckBox,
  Navigation,
  Security,
  LeftColumn,
  RightColumn,
  ContactInfo,
} from '../../styles/SettingsStyle';

class SeekerSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: '',
      profilePictureInput: '',
      resume: '',
      resumeInput: '',
      currentPassword: '',
      newPassword: '',
      rePassword: '',
      firstName: '',
      lastName: '',
      email: '',
      jobTitle: '',
      phone: '',
      bio: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      phoneNumber: '',
      github: '',
      twitter: '',
      linkedIn: '',
      portfolio: '',
      remote: false,
      relocation: false,
      editing: false,
    };
  }

  // Toggles whether or not the input fields are disabled or not.
  editSettings = e => {
    e.preventDefault();
    this.setState({ editing: !this.state.editing });
  };

  // Updates state when a field is changed.
  changeHandler = e => {
    let targetValue = e.currentTarget.value;
    this.setState({ [e.currentTarget.name]: targetValue });
  };

  // Updates state when a file is selected for upload.
  handleFiles = e => {
    const file = e.currentTarget.files[0];
    this.setState({ [e.currentTarget.name]: file });
    console.log(file);
  };

  // Updates state when a checkbox is changed.
  handleCheckboxes = e => {
    const checked = e.currentTarget.checked;
    this.setState({ [e.currentTarget.name]: checked });
  };

  // Reauthentication Abstraction
  reauthenticate = currentPassword => {
    var user = auth.currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };

  // Change Password (Firebase)
  changePassword = (currentPassword, newPassword) => {
    this.reauthenticate(currentPassword)
      .then(() => {
        var user = auth.currentUser;
        user
          .updatePassword(newPassword)
          .then(() => {
            this.props.toggleModal('Password updated!');
          })
          .catch(error => {
            console.log(error);
            this.props.toggleModal(error.message);
          });
      })
      .catch(error => {
        console.log(error);
        this.props.toggleModal(error.message);
      });
  };

  // Change Email (Firebase)
  changeEmail = (currentPassword, newEmail) => {
    this.reauthenticate(currentPassword)
      .then(() => {
        var user = auth.currentUser;
        user
          .updateEmail(newEmail)
          .then(() => {
            this.props.toggleModal('Email updated!');
          })
          .catch(error => {
            console.log(error);
            this.props.toggleModal(error.message);
          });
      })
      .catch(error => {
        console.log(error);
        this.props.toggleModal(error.message);
      });
  };

  // Handle Any Settings Update
  submitHandler = e => {
    e.preventDefault();

    // Disable Editing After Update Begins
    this.setState({
      editing: false,
    });

    // Variables that reference state
    const currentPassword = this.state.currentPassword;
    const newPassword = this.state.newPassword;
    const rePassword = this.state.rePassword;
    const email = this.state.email;
    const emailCheck = this.state.emailCheck;
    const profilePictureInput = this.state.profilePictureInput;
    const resumeInput = this.state.resumeInput;

    // Regular Expressions for Validation
    const emailRegex = RegExp(
      '^[a-zA-Z0-9.!#$%&???*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$'
    );
    const passwordRegex = RegExp(
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})'
    );
    const fileRegex = RegExp('\\.[0-9a-z]+$', 'g');

    // Check to make sure that the fields are being edited. This shouldn't be needed, but is an extra check
    if (this.state.editing) {
      // Check to see if the user attempted to change the password
      if (newPassword !== '' || rePassword !== '') {
        // Check to make sure that all of the password fields have been implemented
        if (currentPassword && newPassword && rePassword) {
          // Check to make sure that the newPassword matches the rePassword.
          if (newPassword !== rePassword) {
            return alert(
              'Your new password does not match the reentered password'
            );
          }
          // Validate Password Strength (Medium Strength Test)
          if (passwordRegex.test(newPassword)) {
            // --- Change The Password ---
            this.changePassword(currentPassword, newPassword);
          } else {
            return alert(
              'Your password must contain six characters or more and must have at least one lowercase and one uppercase alphabetical character ',
              'or at least one lowercase and one numeric character ',
              'or at least one uppercase and one numeric character.'
            );
          }
        } else {
          return alert(
            'All password fields must be filled out in order to change your password.'
          );
        }
      }

      // Check to see if the email was edited
      if (email !== emailCheck) {
        // Check to make sure that user has entered their password
        if (currentPassword !== '') {
          if (emailRegex.test(email)) {
            this.changeEmail(currentPassword, email);
          } else {
            return alert(
              'We could not understand the format of your email address. Please enter a valid email address.'
            );
          }
        } else {
          return alert(
            'Please enter your current password in the current password field in order to change your email address.'
          );
        }
      }

      // Check to see if a file is being uploaded.
      if (profilePictureInput !== '' || resumeInput !== '') {
        //// MAKE THIS MORE DRY. THIS SHOULD BE ABSTRACTED
        // ---------- PROFILE PICTURES ----------
        // Check to make sure that the stored profile picture is a file
        if (profilePictureInput instanceof File) {
          const metadata = {
            contentType: profilePictureInput.type,
          };
          const upload = storage
            .child(
              `profilePics/${
                this.props.currentSignedInUser.uid
              }/profilePicture${profilePictureInput.name.match(fileRegex)[0]}`
            )
            .put(profilePictureInput, metadata);

          // Firebase Upload State Tracking
          upload.on(
            firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            snapshot => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log('Upload is paused');
                  break;

                case firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log('Upload is running');
                  break;

                default:
                  console.log('Upload Initiated');
              }
            },
            error => {
              // IMPLEMENT CASES FOR ERRORS AT THIS URL LATER:
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  this.props.toggleModal(
                    'Unauthorized. Please contact technical support.'
                  );
                  break;

                case 'storage/canceled':
                  // User canceled the upload
                  this.props.toggleModal('Upload cancelled');
                  break;

                case 'storage/unknown':
                  // Unknown error occurred, inspect error.serverResponse
                  this.props.toggleModal(
                    'An unknown error occurred. Please contact technical support.'
                  );
                  break;

                default:
                  this.props.toggleModal(
                    'An unknown error occurred. Please contact technical support.'
                  );
              }
            },
            () => {
              // Upload completed successfully, now we can get the download URL
              upload.snapshot.ref.getDownloadURL().then(downloadURL => {
                console.log('File available at', downloadURL);
                axios
                  .put(
                    `https://intense-stream-29923.herokuapp.com/api/database/seekers/userInfo`,
                    { profilePicture: downloadURL, uid: this.state.uid }
                  )
                  .then(() => {
                    this.setState({ profilePicture: downloadURL });
                  })
                  .catch(error => console.log(error));
              });
            }
          );
        }

        // ---------- RESUMES ----------
        // Check to make sure that the stored resume is a file
        if (resumeInput instanceof File) {
          // Define Metadata
          const metadata = {
            contentType: resumeInput.type,
          };

          // Instantiate Upload
          const upload = storage
            .child(
              `resumes/${this.props.currentSignedInUser.uid}/resume${
                resumeInput.name.match(fileRegex)[0]
              }`
            )
            .put(resumeInput, metadata);

          // Firebase Upload State Tracking
          upload.on(
            firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            snapshot => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log('Upload is paused');
                  break;

                case firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log('Upload is running');
                  break;

                default:
                  console.log('Upload Initiated');
              }
            },
            error => {
              // IMPLEMENT CASES FOR ERRORS AT THIS URL LATER:
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  this.props.toggleModal(
                    'Unauthorized. Please contact technical support.'
                  );
                  break;

                case 'storage/canceled':
                  // User canceled the upload
                  this.props.toggleModal('Upload cancelled');
                  break;

                case 'storage/unknown':
                  // Unknown error occurred, inspect error.serverResponse
                  this.props.toggleModal(
                    'An unknown error occurred. Please contact technical support.'
                  );
                  break;

                default:
                  this.props.toggleModal(
                    'An unknown error occurred. Please contact technical support.'
                  );
              }
            },
            () => {
              // Upload completed successfully, now we can get the download URL
              upload.snapshot.ref.getDownloadURL().then(downloadURL => {
                console.log('File available at', downloadURL);
                axios
                  .put(
                    `https://intense-stream-29923.herokuapp.com/api/database/seekers/userInfo`,
                    { resume: downloadURL, uid: this.state.uid }
                  )
                  .then(() => {
                    this.setState({ resume: downloadURL });
                  })
                  .catch(error => console.log(error));
              });
            }
          );
        }
      }

      // Construct User Object By Extracting From State
      // ...Do this in a better way!
      const contactInfo = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        jobTitle: this.state.jobTitle,
        bio: this.state.bio,
      };

      let location = {
        street: this.state.street,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
      };

      let locationOptions = {
        remote: this.state.remote,
        relocation: this.state.relocation,
      };

      const socialLinks = {
        linkedIn: this.state.linkedIn,
        github: this.state.github,
        twitter: this.state.twitter,
        portfolio: this.state.portfolio,
      };

      let accessToken =
        'pk.eyJ1IjoibG5kdWJvc2UiLCJhIjoiY2pvNmF1ZnowMGo3MDNrbmw4ZTVmb2txMyJ9.UpxjYyEOBnCJjw_qE_N8Kw';
      let addressString = location.street.concat(
        ' ',
        location.city,
        ' ',
        location.state,
        ' ',
        location.zipCode
      );
      let mapboxGeocodingAPIURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressString}.json?access_token=${accessToken}`;

      // Get Location Coordinates and Return Promise
      axios
        .get(mapboxGeocodingAPIURL)
        .then(response => {
          // Add Coordinates to Location Object
          location = {
            ...location,
            coordinates: response.data.features[0].geometry.coordinates,
          };

          // Construct newUserInfo Object
          const newUserInfo = {
            ...contactInfo,
            location,
            ...locationOptions,
            ...socialLinks,
          };

          // Update User with newUserInfo Object
          axios
            .put(
              `https://intense-stream-29923.herokuapp.com/api/database/seekers/userInfo`,
              { ...newUserInfo, uid: this.state.uid }
            )
            .then(() => {
              const marker = {
                uid: this.state.uid,
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: location.coordinates,
                },
                properties: {
                  jobTitle: this.state.jobTitle,
                  uid: this.state.uid,
                  title: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                  },
                  profilePicture: this.state.profilePicture,
                  role: 'seeker',
                },
              };
              console.log(marker);
              axios
                .put(`https://intense-stream-29923.herokuapp.com/api/markers`, {
                  ...marker,
                })
                .then(response => {
                  console.log(response);
                  this.props.toggleModal(
                    'Your information has been successfully updated!'
                  );
                })
                .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    } else {
      return this.props.toggleModal('Unable to Make Changes');
    }

    // Reset Password Fields After Update
    this.setState({
      newPassword: '',
      currentPassword: '',
      rePassword: '',
    });
  };

  componentDidMount = () => {
    const user = this.props.currentSignedInUser;
    const userAuth = firebase.auth().currentUser;

    if (user != null) {
      if (user) {
        this.setState({
          ...this.state,
          ...user,
          ...user.location,
          emailCheck: user.email,
          uid: userAuth.uid,
        });
      }
    } else {
      this.props.history.push('/signin');
    }
  };

  render() {
    return (
      <Fragment>
        {/* ----- LEFT COLUMN ----- */}
        <LeftColumn>
          <Navigation>
            <div>
              <img
                alt="Profile Pic"
                src={
                  this.state.profilePicture !== ''
                    ? this.state.profilePicture
                    : profile
                }
              />
            </div>
            <NavLink exact to="/settings">
              Uploads
            </NavLink>
            <NavLink to="/settings/security">Security</NavLink>
            <NavLink to="/settings/contact-information">Profile</NavLink>
            <NavLink to="/settings/location">Location</NavLink>
            <NavLink to="/settings/social">Social</NavLink>
          </Navigation>
        </LeftColumn>

        {/* ----- RIGHT COLUMN ----- */}
        <RightColumn>
          {/* Profile Information Section */}
          <Route
            exact
            path="/settings"
            render={props => (
              <ProfileInfo justify="space-around">
                <Label>
                  <h3>Profile Picture</h3>
                  Upload New Profile Picture <br />
                  (.png, .jpg, .jpeg)
                  <Input
                    name="profilePictureInput"
                    onChange={e => this.handleFiles(e)}
                    disabled={!this.state.editing}
                    type="file"
                    accept=".png,.jpg,.jpeg"
                  />
                </Label>

                {this.state.resume && (
                  <a href={this.state.resume}>Download Resume</a>
                )}
                <Label>
                  <h3>Resume</h3>
                  Upload New Resume
                  <br />
                  (.pdf, .doc, .docx)
                  <Input
                    name="resumeInput"
                    onChange={e => this.handleFiles(e)}
                    disabled={!this.state.editing}
                    type="file"
                    accept=".pdf,.doc,.docx"
                  />
                </Label>
              </ProfileInfo>
            )}
          />

          {/* Security Section */}
          <Route
            path="/settings/Security"
            render={props => (
              <Security>
                <h3>Update Email Address</h3>
                <Label width="100%">
                  Email{' '}
                  {/*Put this in a styled component later*/

                  this.state.editing ? (
                    <span style={{ color: 'red', fontSize: '12px' }}>
                      <br />
                      Please additionally enter your current password in the
                      "Current Password Field"
                    </span>
                  ) : (
                    ''
                  )}
                  <Input
                    name="email"
                    value={this.state.email}
                    onChange={this.changeHandler}
                    disabled={!this.state.editing}
                    type="email"
                  />
                </Label>

                <h3>Update Password</h3>
                <Label>
                  Current Password
                  <Input
                    name="currentPassword"
                    value={this.state.currentPassword}
                    onChange={this.changeHandler}
                    disabled={!this.state.editing}
                    type="password"
                  />
                </Label>
                <Label>
                  New Password
                  <Input
                    name="newPassword"
                    value={this.state.newPassword}
                    onChange={this.changeHandler}
                    disabled={!this.state.editing}
                    type="password"
                  />
                </Label>
                <Label>
                  Retype New Password
                  <Input
                    name="rePassword"
                    value={this.state.rePassword}
                    onChange={this.changeHandler}
                    disabled={!this.state.editing}
                    type="password"
                  />
                </Label>
              </Security>
            )}
          />

          {/* Contact Information Section */}
          <Route
            path="/settings/contact-information"
            render={props => (
              <ContactInfo>
                <h3>Profile Information</h3>
                <Label width="48%">
                  First Name
                  <Input
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.changeHandler}
                    disabled={!this.state.editing}
                    type="text"
                  />
                </Label>
                <Label width="48%">
                  Last Name
                  <Input
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.changeHandler}
                    disabled={!this.state.editing}
                    type="text"
                  />
                </Label>
                <Label width="48%">
                  Phone
                  <Input
                    name="phoneNumber"
                    value={this.state.phoneNumber}
                    onChange={this.changeHandler}
                    disabled={!this.state.editing}
                    type="phone"
                  />
                </Label>
                <Label width="48%">
                  Job Title
                  <Input
                    name="jobTitle"
                    value={this.state.jobTitle}
                    onChange={this.changeHandler}
                    disabled={!this.state.editing}
                    type="text"
                  />
                </Label>
                <Label width="100%">
                  Bio
                  <TextArea
                    name="bio"
                    value={this.state.bio}
                    onChange={this.changeHandler}
                    disabled={!this.state.editing}
                  />
                </Label>
              </ContactInfo>
            )}
          />

          {/* Location Information Section*/}
          <Route
            path="/settings/location"
            render={props => (
              <Location>
                <h3>Location</h3>
                <Label width="100%">
                  Street
                  <Input
                    name="street"
                    value={this.state.street}
                    onChange={this.changeHandler}
                    disabled={!this.state.editing}
                    type="text"
                  />
                </Label>
                <Label width="100%">
                  City
                  <Input
                    name="city"
                    value={this.state.city}
                    onChange={this.changeHandler}
                    disabled={!this.state.editing}
                    type="text"
                  />
                </Label>
                <Label width="100%">
                  State
                  <Input
                    name="state"
                    value={this.state.state}
                    onChange={this.changeHandler}
                    disabled={!this.state.editing}
                    type="text"
                  />
                </Label>
                <Label width="100%">
                  Zip Code
                  <Input
                    name="zip"
                    value={this.state.zip}
                    onChange={this.changeHandler}
                    disabled={!this.state.editing}
                    type="text"
                  />
                </Label>
                {/* Remote Jobs and Relocation Checkboxes  */}
                <div className="location-options">
                  <Label>
                    <CheckBox
                      disabled={!this.state.editing}
                      checked={this.state.remote}
                      type="checkbox"
                      name="remote"
                      value="Open to Remote Bobs"
                      onChange={this.handleCheckboxes}
                    />{' '}
                    <span>Open to Remote Jobs</span>
                  </Label>
                  <Label>
                    <CheckBox
                      disabled={!this.state.editing}
                      checked={this.state.relocation}
                      type="checkbox"
                      name="relocation"
                      value="Open to Relocation"
                      onChange={this.handleCheckboxes}
                    />{' '}
                    <span>Open to Relocation</span>
                  </Label>
                </div>
              </Location>
            )}
          />

          {/* Social Media + Porfolio Links Section */}
          <Route
            path="/settings/social"
            render={props => (
              <Social>
                <h3>Social Links</h3>
                <Label width="100%">
                  LinkedIn
                  <Input
                    name="linkedIn"
                    value={this.state.linkedIn}
                    onChange={this.changeHandler}
                    disabled={!this.state.editing}
                    type="url"
                  />
                </Label>
                <Label width="100%">
                  GitHub
                  <Input
                    name="github"
                    value={this.state.github}
                    onChange={this.changeHandler}
                    disabled={!this.state.editing}
                    type="url"
                  />
                </Label>
                <Label width="100%">
                  Twitter
                  <Input
                    name="twitter"
                    value={this.state.twitter}
                    onChange={this.changeHandler}
                    disabled={!this.state.editing}
                    type="url"
                  />
                </Label>
                <Label width="100%">
                  Personal Portfolio
                  <Input
                    name="portfolio"
                    value={this.state.portfolio}
                    onChange={this.changeHandler}
                    disabled={!this.state.editing}
                    type="url"
                  />
                </Label>
              </Social>
            )}
          />
        </RightColumn>
        <EditButtons right="20px" onClick={this.editSettings}>
          {this.state.editing ? 'Cancel' : 'Edit '}
        </EditButtons>
        {this.state.editing ? (
          <EditButtons right="120px" onClick={this.submitHandler}>
            Save
          </EditButtons>
        ) : (
          ''
        )}
      </Fragment>
    );
  }
}

export default SeekerSettings;
