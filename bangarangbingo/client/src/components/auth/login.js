/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import './auth.css';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',      
      email: '',
      password: ''
    }
  }
  handleError(message) {
    this.setState({
      error: message
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    if(this.state.email && this.state.password) {
      this.props.login(this.state.email, this.state.password, this.props.history, (message) => this.handleError(message));
    }
  }
  handleChange(event, field) {
    this.setState({
      [field]: event.target.value
    });
  }
  renderAlert() {
    if (!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
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
          <input type="email" name="email" placeholder="email" value={this.state.email} onChange={e => this.handleChange(e, 'email')}/>
          <label>Password:</label>
          <input type="password" name="password" placeholder="password" value={this.state.password} onChange={e => this.handleChange(e, 'password')}/>
          <button type="submit">Login</button>
        </form>
        <section className="alternativeActions">
          <span>If you do not already have an account, <Link to="/register">Sign up!</Link></span>
          <Link to="/forgot-password">Forgot Password?</Link>
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

export default connect(mapStateToProps, { login })(SignIn);