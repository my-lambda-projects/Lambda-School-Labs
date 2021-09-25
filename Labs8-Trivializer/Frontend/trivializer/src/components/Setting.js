import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import "./styles/Setting.css";
import axios from "axios";
import firebase from "./OAuth/firebase";

const ref = firebase.storage().ref();

class Setting extends React.Component {
  constructor() {
    super();
    this.state = {
      savedUser: "",
      file: "",
      imagePreviewUrl: "",
      pictureAdded: false,
      selectedFile: null,
      userName: "",
      password: "",
      email: ""
    };
  }
  componentDidMount() {
    // First Checks if the user logged in through google or not.
    if (!localStorage.getItem("guest")) {
      const auth = {
        headers: {
          Authorization: `${sessionStorage.getItem("jwt")}`
        }
      };
      if (sessionStorage.getItem("google")) {
        let savedUser = JSON.parse(localStorage.getItem("user"));
        this.setState({ savedUser: savedUser });
        // If not google login, there won't be a sessionStorage item to get
      } else {
        let normalUserId = JSON.parse(sessionStorage.getItem("userId"));
        axios
          .get(`https://testsdepl.herokuapp.com/users/users/${normalUserId}`, auth)
          .then(response => {
            this.setState({ savedUser: response.data });
            if (this.state.savedUser[0].logo) {
              this.setState({
                imagePreviewUrl: this.state.savedUser[0].logo.slice(1, -1),
                pictureAdded: true
              });
            }
          })
          .catch(err => {
            console.log("err is: ", err.message);
          });
      }
    }
  }
  logout = e => {
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    this.props.history.push("/");
  };
  fileChangedHandler = e => {
    const file = e.target.files[0];
    const name = +new Date() + "-" + file.name;
    const metadata = { contentType: file.type };

    const task = ref.child(name).put(file, metadata);
    task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => this.setState({ imagePreviewUrl: url, pictureAdded: true }));
  };

  upgradeButton = () => {
    this.props.history.push("/billing");
  };
  handleSubmit = () => {
    let userId = JSON.parse(sessionStorage.getItem("userId"));
    const auth = {
      headers: {
        Authorization: `${sessionStorage.getItem("jwt")}`
      }
    };
    const userName = this.state.userName;
    const email = this.state.email;
    const password = this.state.password;
    const changedInfo = {
      logo: JSON.stringify(this.state.imagePreviewUrl),
      userName: userName,
      email: email,
      password: password
    };
    axios
      .put(`https://testsdepl.herokuapp.com/users/edituser/${userId}`, changedInfo, auth)
      .then(response => {
        window.location.reload();
      })
      .catch(err => {
        console.log("err is: ", err.message);
      });
  };
  changeAccountInfo = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log("this.state is: ", this.state);
    const savedUser = this.state.savedUser;
    return (
      <div className="setting-page">
        <div className="top-content">
          <div className="top-leftside">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Settings
                </li>
              </ol>
            </nav>
          </div>
          {sessionStorage.getItem("jwt") && !localStorage.getItem("guest") ? (
            <div onClick={this.logout} className="top-rightside">
              <p>Log Out</p>
              <i class="fas fa-sign-out-alt" />
            </div>
          ) : null}
        </div>

        <div className="main-content">
          <Navbar />
          <div className="content-container setting-container">
            <div className="main-middle setting-content">
              <h1 className="main-middle">Setting</h1>

              {sessionStorage.getItem("google") ? (
                <div className="googleSetting">
                  <div className="google-photo">
                    {savedUser.photoURL ? (
                      <div className="picture">
                        <img
                          className="profile-picture"
                          src={savedUser.photoURL}
                          width="250px"
                          alt="profile-pic"
                        />
                      </div>
                    ) : null}
                  </div>

                  <div className="signinAccount">
                    <h2>Personal</h2>
                    <div className="signinName">
                      <p>Name: </p>
                      <div>{savedUser ? savedUser.displayName : null}</div>
                    </div>
                    <div className="signinEmail googleEmail">
                      <p>Email: </p>
                      <div>{savedUser ? savedUser.email : null}</div>
                    </div>
                  </div>
                  <div className="signinTier">
                    <h2>Account</h2>
                    <div className="signinFree">
                      <p>Account Tier</p>
                      <div>
                        {savedUser && sessionStorage.getItem("googlepaid") ? (
                          <div>Premium</div>
                        ) : (
                          <div>Free</div>
                        )}
                      </div>
                    </div>
                    <div className="signinType">
                      <p>Login Type</p>
                      <div>Google Login</div>
                    </div>
                    <div className="signinUpgrade googleUpgrade">
                      <p>Upgrade Account</p>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={this.upgradeButton}
                      >
                        Upgrade Now
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="signinSetting">
                  {this.state.pictureAdded ? (
                    <div className="upload">
                      {this.state.imagePreviewUrl ? (
                        <img
                          className="uploaded-picture"
                          width="250px"
                          src={this.state.imagePreviewUrl}
                          alt="prof"
                        />
                      ) : null}
                    </div>
                  ) : null}
                  <div className="signinAccount">
                    <h2>Personal</h2>
                    <div className="signinUserName">
                      <p>Username</p>
                      <input
                        placeholder={savedUser ? savedUser[0].userName : "Please Log In"}
                        name="userName"
                        onChange={this.changeAccountInfo}
                        value={this.state.userName}
                      />
                    </div>
                    <div className="signinEmail">
                      <p>Email </p>
                      <input
                        placeholder={savedUser ? savedUser[0].email : "Please Log In"}
                        name="email"
                        onChange={this.changeAccountInfo}
                        value={this.state.email}
                      />
                    </div>
                    <div className="signinPassword">
                      <p>Change Password</p>
                      <input
                        type="password"
                        name="password"
                        onChange={this.changeAccountInfo}
                        placeholder="Enter new password"
                      />
                    </div>
                  </div>
                  <div className="signinTier">
                    <h2>Account</h2>
                    <div className="signinFree">
                      <p>Account Tier</p>
                      <div>
                        {savedUser ? (
                          <div>{savedUser[0].paid === 0 ? "Free" : "Premium"}</div>
                        ) : (
                          "None"
                        )}
                      </div>
                    </div>
                    {savedUser && savedUser[0].paid === 0 ? (
                      <div className="signinUpgrade">
                        <p>Upgrade Account</p>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={this.upgradeButton}
                        >
                          Upgrade Now
                        </button>
                      </div>
                    ) : null}

                    <div className="signinPicture">
                      <p>Add/Change Picture</p>

                      <input
                        className="addPicture"
                        type="file"
                        onChange={this.fileChangedHandler}
                      />
                    </div>
                  </div>

                  <button
                    type="btn"
                    className="btn btn-success save-button"
                    onClick={this.handleSubmit}
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Setting;
