import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { Navbar, NavbarBrand } from 'mdbreact';

import { TextField } from 'material-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faKey,
  faAt,
  faPhone,
} from '@fortawesome/fontawesome-free-solid';

import './css/userSettings.css';
import { updateUser, getUser } from '../actions';
import normalizePhone from './normalizers/normalizePhone';

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    floatingLabelText={label}
    floatingLabelFocusStyle={{
      color: 'black',
    }}
    underlineFocusStyle={{
      borderColor: 'white',
    }}
    underlineStyle={{
      borderColor: 'grey',
    }}
    errorText={touched && error}
    {...input}
    {...custom}
    style={{
      color: 'red',
    }}
  />
);

/* eslint-disable no-console, no-class-assign, jsx-a11y/label-has-for,
               react/prop-types, object-curly-newline */
class Settings extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   initialValues: { ...this.props.initialValues },
    // };
    this.props.load();
  }
  handleFormSubmit = ({
    email,
    phoneNumber,
    updateP,
    updateNP,
    byPhone,
    byEmail,
  }) => {
    const p = (updateP && updateP.trim().length > 0);
    const np = (updateNP && updateNP.trim().length > 0);
    let P = updateP;
    let nP = updateNP;
    if (!p && !np) {
      P = undefined;
      nP = undefined;
    }
    this.props.updateUser(
      {
        email,
        phoneNumber,
        password: P,
        newPassword: nP,
        byPhone,
        byEmail,
      },
      this.props.history,
    );
  };

  renderAlert = () => {
    if (!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    // this.initialValues = {
    //   username: 'mark',
    //   email: 'mark@gmail',
    //   phoneNumber: '9999999999',
    //   password: 'p',
    //   confirmPassword: 'p',
    //   byPhone: true,
    //   byEmail: false };
    // console.log(`initialValues: ${this.props.initialValues.username}`);

    const email = value =>
      (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined);
    const aol = value =>
      (value && /.+@aol\.com/.test(value)
        ? 'Really? You still use AOL for your email?'
        : undefined);
    return (
      <div className="userSettings--container">
        <div className="userSettings--form_container">
          <Navbar className="userSettings--box_navbar" dark>
            <NavbarBrand tag="span">Account Settings</NavbarBrand>
          </Navbar>

          <form
            onSubmit={handleSubmit(this.handleFormSubmit)}
            id="new-user-form"
          >
            {/* <div className="flex-center-div">
          <label className="new-user-label">Username:</label>
          <Field
            name="username"
            component="input"
            type="text"
            className="new-user-inputText"
            placeholder="User Name"
            id="new-user-username"
          />
        </div> */}
            <div className="flex-center-div">
              <FontAwesomeIcon icon={faAt} />{' '}
              <Field
                name="email"
                component={renderTextField}
                validate={email}
                warn={aol}
                placeholder="Email"
                className="new-user-inputText"
                id="new-user-email"
              />
            </div>
            <div className="flex-center-div">
              <FontAwesomeIcon icon={faPhone} />{' '}
              <Field
                name="phoneNumber"
                className="new-user-inputText"
                component={renderTextField}
                type="text"
                placeholder="Phone Number"
                normalize={normalizePhone}
                id="new-user-phone"
              />
            </div>
            <div className="flex-center-div">
              <FontAwesomeIcon icon={faKey} />{' '}
              <Field
                name="updateP"
                component={renderTextField}
                type="password"
                className="new-user-inputText new-user-password"
                placeholder="Password"
              />
            </div>
            <div className="flex-center-div">
              <FontAwesomeIcon icon={faKey} />{' '}
              <Field
                name="updateNP"
                component={renderTextField}
                type="password"
                className="new-user-inputText new-user-password"
                placeholder="New Password"
              />
            </div>
            <p id="new-user-contacted">How would you like to be contacted?</p>
            <div className="flex-center-div" id="new-user-checkboxes">
              <div id="new-user-texts">
                <Field
                  className="register--form_field checkbox"
                  name="byPhone"
                  id="byPhone"
                  component="input"
                  type="checkbox"
                />
                <span>Texts?</span>
              </div>
              <div id="new-user-emails">
                <Field
                  className="register--form_field checkbox"
                  name="byEmail"
                  id="byEmail"
                  component="input"
                  type="checkbox"
                />
                <span>Email?</span>
              </div>
            </div>

            <div className="userSettings--form_buttons">
              <button
                type="submit"
                disabled={pristine || submitting}
              >
                Save
              </button>
              <button
                type="button"
                disabled={pristine || submitting}
                onClick={reset}
              >
                Clear Values
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
// const mapStateToProps = state => ({
//   error: state.auth.error,
//   user: state.users[0],
// });

// export default reduxForm({
//   touchOnBlur: true,
//   form: 'settings',
//   fields: ['originalUsername', 'originalPassword', 'username',
//     'email', 'phoneNumber', 'password',
//     'confirmPassword', 'byPhone', 'byEmail'],
// })(connect(mapStateToProps, { updateUser })(Settings));

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
Settings = reduxForm({
  form: 'settings', // a unique identifier for this form
  touchOnBlur: true,
})(Settings);

// You have to connect() to any reducers that you wish to connect to yourself
Settings = connect(
  state => ({
    initialValues: state.users[0],
  }),
  { load: getUser, updateUser }, // bind account loading action creator
)(Settings);

export default Settings;
