import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import config from '../../config/config';
import './accountlogin.css';

class Accountlogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      username: '',
      password: ''
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeText = this.changeText.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    axios
      .post(
        `${config.serverUrl}/user/login`,
        {
          username: this.state.username,
          password: this.state.password
        },
      )
      .then(response => {
        this.props.handleLogin();
        this.changeText();
        setTimeout(() => {
          this.props.history.push('/jobs');
        }, 2000);
      })
      .catch(error => {
        if (error.response) {
          document.getElementById('loginWarning').innerHTML =
          error.response.data.error;
        } else document.getElementById('loginWarning').innerHTML =
            error.message;
        console.error(error);
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

  changeText() {
    document.getElementById('btn').value = 'Logging In...';
    document.getElementById('btn').style =
      'background-color: #c6c6c650; color: #ffffff90';
  }

  render() {
    return (
      <div className="Accountlogin">
        <button className="openLogin" onClick={this.openModal}>
          Login
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          overlayClassName="Overlay"
          className="hello"
        >
          <div className="signinmodal">
            <h2 className="signinheader">Sign In</h2>
            <form onSubmit={this.handleSubmit} className="inputform">
              <input
                placeholder="Username"
                className="inputField"
                id="startFocus"
                type="username"
                required="true"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
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
              <div id="loginWarning" />
              <input
                type="submit"
                value="Submit"
                id="btn"
                onClick={this.changeText}
              />
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Accountlogin;
