import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logIn } from '../actions/authenticationActions.js';
import { familyRegister } from '../actions/registrationActions';
import { useForm } from 'react-hook-form';

import Header from '../views/marketing/components/Header'
import Footer from '../views/marketing/components/Footer'

import './loginAndRegister.scss';

function Register(props) {
  const { register, errors, handleSubmit, watch } = useForm();
  const password = useRef({});
  password.current = watch('password', '');
  const formSubmit = async user => {
    // only parents will register through this form (no admin or staff)
    // can change "parent" to another category later
    user.user_type = 'parent';

    // use old familyRegister action creator to register (for now)
    await props.familyRegister(user, props.history);
  };

  return (
    <div className="form-container">
      <Header />
      <form onSubmit={handleSubmit(formSubmit)} className='formz'>
         <h1>Register</h1>
        <fieldset>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            ref={register({ required: true, minLength: 1 })}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            ref={register({ required: true, minLength: 1 })}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            ref={register({ required: true, minLength: 1 })}
          />

          <label>Confirm Password</label>
          <input
            name="confirm_pass"
            type="password"
            ref={register({
              validate: value =>
                value === password.current || 'Passwords do not match',
            })}
          />
          {errors.confirm_pass && <p>{errors.confirm_pass.message}</p>}

          <button type="submit" className={errors.name ? 'disabled' : ''}>
            Register
          </button>
        </fieldset>
        <div className="register">
          <p>Have an account?</p>
          <Link className="reg-link" to="/login">
            Login here
          </Link>
        </div>
        <div className="register-errors">
          {(errors.name || errors.email || errors.password) && (
            <p>All fields are required.</p>
          )}

          {/* if the backend returned an error because the username or email already exists, display that error */}
          {props.state &&
            props.state.registrationReducer &&
            props.state.registrationReducer.familyRegister &&
            props.state.registrationReducer.familyRegister.error && (
              <p>{props.state.registrationReducer.familyRegister.error}</p>
            )}
        </div>
      </form>
      <Footer />
    </div>
  );
}

const mapStateToProps = state => {
  return { state: state };
};

export default withRouter(
  connect(mapStateToProps, { logIn, familyRegister })(Register)
);
