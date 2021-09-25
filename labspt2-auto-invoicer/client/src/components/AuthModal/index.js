import React from "react";
import PropTypes from "prop-types";
//import css here
import "./AuthModal.css";

import AuthForm from "../AuthForm";
import Modal from "../reusableComponents/Modal";

const AuthModal = props => {
  return (
    <Modal close={props.click}>
      <h1 className="modal-title">Auth Modal</h1>
      <AuthForm />
    </Modal>
  );
};

AuthModal.propTypes = {
  click: PropTypes.func
};

export default AuthModal;
