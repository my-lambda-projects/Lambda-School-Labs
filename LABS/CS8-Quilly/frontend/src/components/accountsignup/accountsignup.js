import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import config from '../../config/config';
import './accountsignup.css';

class Accountsignup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      username: '',
      password: '',
      email: '',
      firstname: '',
      lastname: ''
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    //this.setState({ serverData: fakeServerData });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });

    console.log(this.state);
  }

  handleSubmit(event) {
    axios
      .post(`${config.serverUrl}/user/register`, {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        firstname: this.state.firstname,
        lastname: this.state.lastname
      })
      .then(response => {
        console.log(response);
        // Now that the user is created. Login the user
        axios
        .post(`${config.serverUrl}/user/login`, {
          username: this.state.username,
          password: this.state.password
        })
        .then((response) => {
          this.props.history.push('/jobs');
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      })
      .catch(function(error) {
        console.log(error);
        document.getElementById("signupWarning").innerHTML = error.response.data.error;
      });

    event.preventDefault();
  }

  openModal() {
    this.setState({ modalIsOpen: true });
    setTimeout(() => this.setFocus(), 100);
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  setFocus() {
    document.getElementById('startFocus').focus();
  }

  render() {
    return (
      <div className="Accountsignup">
        <button className="openSignup" onClick={this.openModal}>
          Register
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          overlayClassName="Overlay"
          className="hello"
        >
          <div className="signupmodal">
            <h2 className="signupHeader">Register</h2>
            <form onSubmit={this.handleSubmit} className="inputform">
              <input
                placeholder="Username"
                className="inputField"
                type="text"
                required="true"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                id="startFocus"
              />
              <input
                placeholder="Password"
                className="inputField"
                type="password"
                required="true"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <input
                placeholder="Email"
                className="inputField"
                type="email"
                required="true"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <input
                placeholder="Firstname"
                className="inputField"
                type="text"
                required="true"
                name="firstname"
                value={this.state.firstname}
                onChange={this.handleChange}
              />
              <input
                placeholder="Lastname"
                className="inputField"
                type="text"
                required="true"
                name="lastname"
                value={this.state.lastname}
                onChange={this.handleChange}
              />
              <div id="signupWarning"></div>
              <input type="submit" value="Create New Account" className="btn"></input>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Accountsignup;
