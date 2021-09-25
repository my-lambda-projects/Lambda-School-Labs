/* eslint-disable jsx-a11y/label-has-for, react/prop-types, object-curly-newline, no-console */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';


// const { DOM: { input /* select, textarea */ } } = React;

import { TextField /* , Checkbox */ } from 'material-ui';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  // faArrowRight,
  faUser,
  faKey,
  faAt,
  faPhone,
} from '@fortawesome/fontawesome-free-solid';

import { Navbar, NavbarBrand } from 'mdbreact';

import normalizePhone from './normalizers/normalizePhone';
import { register } from '../actions';
import './css/register.css';

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

class Register extends Component {
  handleFormSubmit = ({
    username = 'x',
    email = 'x@gmail',
    phoneNumber = '9999999999',
    password = 'p',
    confirmPassword = 'p',
    byPhone = false,
    byEmail = false,
    ...extraProps
  }) => {
    console.log(`byPhone: ${byPhone}  byEmail: ${byEmail} ${JSON.stringify(extraProps, null, 2)}`);
    this.props.register(
      {
        username,
        email,
        phoneNumber,
        password,
        confirmPassword,
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
    // const renderField = ({
    //   input,
    //   label,
    //   type,
    //   meta: { touched, error, warning },
    // }) => (
    //   <div>
    //     <label>{label}</label>
    //     <div>
    //       <input {...input} placeholder={label} type={type} />
    //       {touched &&
    //         ((error && <span>{error}</span>) ||
    //           (warning && <span>{warning}</span>))}
    //     </div>
    //   </div>
    // );
    const email = value =>
      (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined);

    const aol = value =>
      (value && /.+@aol\.com/.test(value)
        ? 'Really? You still use AOL for your email?'
        : undefined);
    return (
      <div className="register--container">
        <div className="register--form_container">
          <Navbar className="register--box_navbar" dark>
            <NavbarBrand tag="span">Sign Up</NavbarBrand>
          </Navbar>

          <div className="register--form">
            <form
              onSubmit={handleSubmit(this.handleFormSubmit)}
              id="submit-button"
            >
              <fieldset>
                <FontAwesomeIcon icon={faUser} /> <Field
                  className="register--form_field"
                  name="username"
                  component={renderTextField}
                  type="text"
                  placeholder="User Name"
                />
              </fieldset>
              <fieldset>
                <FontAwesomeIcon icon={faAt} /> <Field
                  className="register--form_field"
                  name="email"
                  component={renderTextField}
                  validate={email}
                  warn={aol}
                  placeholder="Email"
                />
              </fieldset>
              <fieldset>
                <FontAwesomeIcon icon={faPhone} /> <Field
                  className="register--form_field"
                  name="phoneNumber"
                  component={renderTextField}
                  type="text"
                  placeholder="Phone Number"
                  normalize={normalizePhone}
                />
              </fieldset>
              <fieldset>
                <FontAwesomeIcon icon={faKey} /> <Field
                  className="register--form_field"
                  name="password"
                  component={renderTextField}
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <fieldset>
                <FontAwesomeIcon icon={faKey} /> <Field
                  className="register--form_field"
                  name="confirmPassword"
                  component={renderTextField}
                  type="password"
                  placeholder="Confirm Password"
                />
              </fieldset>

              <div className="register--contact">
                How would you like to be contacted?
                <fieldset>
                  <Field
                    className="register--form_field checkbox"
                    name="byPhone"
                    id="byPhone"
                    component="input"
                    type="checkbox"
                  />
                  <span>Texts? </span>
                  <Field
                    className="register--form_field checkbox"
                    name="byEmail"
                    id="byEmail"
                    component="input"
                    type="checkbox"
                  />
                  <span>Email?</span>
                </fieldset>
              </div>

              <div className="register--form_buttons">
                <button type="submit" disabled={pristine || submitting}>
                  Sign Up
                </button>
                <button
                  type="button"
                  disabled={pristine || submitting}
                  onClick={reset}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
});

export default reduxForm({
  form: 'newUser',
  touchOnBlur: true,
  fields: [
    'username',
    'email',
    'phoneNumber',
    'password',
    'confirmPassword',
    'byPhone',
    'byEmail',
  ],
})(connect(mapStateToProps, { register })(Register));
