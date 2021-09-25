/* eslint-disable */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { updateUserEmail } from '../../actions';
import './protectedComponent.css';

class UpdateEmail extends Component {
  handleFormSubmit({ username, newUsername, password, confirmPassword }) {
    this.props.updateUserEmail(username, newUsername, password, confirmPassword, this.props.history);
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
          <h3 className="formTitle">Update Email</h3>
          <div className="formInput">
            <div className="formInput__item">
              <label>Old Email:</label>
              <Field name="username" component="input" type="text" className="inputField" />
            </div>
            <div className="formInput__item">
              <label>New Email:</label>
              <Field name="newUsername" component="input" type="text" className="inputField" />
            </div>
            <div className="formInput__item">
              <label>Password:</label>
              <Field name="password" component="input" type="password" className="inputField" />
            </div>
            <div className="formInput__item">
              <label>Confirm Password:</label>
              <Field name="confirmPassword" component="input" type="password" className="inputField" />
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

UpdateEmail = connect(mapStateToProps, { updateUserEmail })(UpdateEmail);

export default reduxForm({
  form: 'updateEmail',
  fields: ['username', 'newUsername', 'password', 'confirmPassword']
})(UpdateEmail);