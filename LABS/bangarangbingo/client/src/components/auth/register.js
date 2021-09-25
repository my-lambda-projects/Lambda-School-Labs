/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/auth.js';
import './auth.css';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  }
  handleError(message) {
    this.setState({
      error: message
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    if(this.state.email && this.state.password && this.state.confirmPassword) {
      this.props.registerUser(this.state.email, this.state.password, this.state.confirmPassword, this.props.history, (message) => this.handleError(message));
    }
  }
  handleChange(event, field) {
    this.setState({
      [field]: event.target.value
    });
  }
  render() {
    const { error } = this.state;
    return (
      <div className="auth">
        <header>
        <Link to="/"><img src="/images/logo.gif" alt="Bangarang Bingo"/></Link>        
          { error ? 
          <ul className="errors">
            <li>{error}</li>
          </ul> : null }
        </header>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label>Email:</label>
          <input type="email" name="email" placeholder="email" onChange={e => this.handleChange(e, 'email')} value={this.state.email}/>
          <label>Password:</label>
          <input type="password" name="password" placeholder="password" onChange={e => this.handleChange(e, 'password')} value={this.state.password}/>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" placeholder="confirm password" onChange={e => this.handleChange(e, 'confirmPassword')} value={this.state.confirmPassword}/>
          
          <button type="submit">Sign up!</button>
        </form>
        <section className="alternativeActions">
          <span>Already have an account, <Link to="/login">Login!</Link></span>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { registerUser })(SignUp);

