/* eslint-disable */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { updateUserPassword } from '../../actions';
import './protectedComponent.css';

class UpdatePassword extends Component {
  handleFormSubmit({ username, password, confirmPassword, newPassword, confirmNewPassword }) {
    this.props.updateUserPassword(username, password, confirmPassword, newPassword, confirmNewPassword);
  }

  renderAlert() {
    if (!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="reduxForm">
          <h3 className="formTitle">Update Password</h3>
          <div className="formInput">
            <div className="formInput__item">
              <label>Email:</label>
              <Field name="username" component="input" type="text" className="inputField" />
            </div>
            <div className="formInput__item">
              <label>Old Password:</label>
              <Field name="password" component="input" type="password" className="inputField" />
            </div>
            <div className="formInput__item">
              <label>Confirm Old Password:</label>
              <Field name="confirmPassword" component="input" type="password" className="inputField" />
            </div>
            <div className="formInput__item">
              <label>New Password:</label>
              <Field name="newPassword" component="input" type="password" className="inputField" />
            </div>
            <div className="formInput__item">
              <label>Confirm New Password:</label>
              <Field name="confirmNewPassword" component="input" type="password" className="inputField" />
            </div>
          </div>
          <button type="submit" className="formButton">Save</button>
          {this.renderAlert()}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
  };
};

UpdatePassword = connect(mapStateToProps, { updateUserPassword })(UpdatePassword);

export default reduxForm({
  form: 'updatePassword',
  fields: ['username', 'password', 'confirmPassword', 'newPassword', 'confirmNewPassword']
})(UpdatePassword);