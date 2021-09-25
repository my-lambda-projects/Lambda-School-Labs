import React from "react";
import PropTypes from "prop-types";

// import components here
import Modal from "../reusableComponents/Modal";

// import css here
import "./ForgotPassModal.css";

class ForgotPassModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };
  }
  changeHandler = e => {
    return this.setState({ [e.target.name]: e.target.value });
  };
  createResetObject = e => {
    e.preventDefault();
    const reset = this.state.email;
    this.props.passwordReset({ email: reset });
    this.props.click()
  };
  render() {
    return (
      <Modal close={this.props.click} className="password-container">
        <h1 className="modal-title">Reset Password</h1>
        <form onSubmit={this.createResetObject} className="password-form">
          <input
            className="signin-input"
            type="email"
            placeholder="email"
            required
            name="email"
            onChange={this.changeHandler}
            value={this.state.email}
          />
          <button className="password-btn" type="submit">
            Reset password
          </button>
        </form>
      </Modal>
    );
  }
}

ForgotPassModal.propTypes = {
  click: PropTypes.func.isRequired
};

export default ForgotPassModal;
