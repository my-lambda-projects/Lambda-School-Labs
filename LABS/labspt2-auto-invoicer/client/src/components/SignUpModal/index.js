import React from "react";
import PropTypes from "prop-types";

//import css here
import "./SignUpModal.css";

// import components here
import SignUpForm from "../SignUpForm";
import Modal from "../reusableComponents/Modal";

const SignUpModal = props => {
  return (
    <Modal close={props.click}>
      <h1 className="modal-title">Auto-Invoicer Register Account</h1>
      <SignUpForm welcome={props.welcome} />
    </Modal>
  );
};

SignUpModal.propTypes = {
  click: PropTypes.func
};

export default SignUpModal;
