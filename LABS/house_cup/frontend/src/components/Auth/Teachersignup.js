import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTeacher } from '../../actions';
import backgroundimage from '../../static/trophy.png';
import DashboardNotification from '../DashboardNotification/DashboardNotification';

class Teachersignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username : '',
      password: '',
      confirmPassword: '',
      error: undefined,
      teacherSignUpsuccess  : false,
    };
  }
  componentDidMount() {
    const token = this.props.location.search.substr(1);
    localStorage.setItem('token', token);
  }
  componentWillReceiveProps(props) {
    this.setState({
      error: props.error,
      teacherSignUpsuccess: props.teacherSignUpsuccess,
    });
  }
  // Rather than having individual input functions.
  handleInput = async (e, type) => {
    e.preventDefault();
    await this.setState({
      [type]: e.target.value,
    });
  };
  createTeacher = async (e) => {
    e.preventDefault();
    await this.props.createTeacher(this.state, this.props.history);
    this.setState({
      email: '',
      password: '',
      confirmPassword: '',
      error: this.props.error,
      settingsChanged: this.props.changedSettings,
    });
  };
  renderAlert() {
    if (!this.state.error) return null;
    return (
      <DashboardNotification type="warn">
        {this.state.error}
      </DashboardNotification>
    );
  }
  render() {
    return (
      <div>
        <div className="Auth__Body">
          <div className="Auth__Body__Imageholder" />
          <div className="Auth__Body__Container" style={{ marginTop: '80px' }}>
            {this.renderAlert()}
            <form onSubmit={this.createTeacher}>
              <label htmlFor="TeacherSignUpForm__Email">Username</label>
              <input
                id="TeacherSignUpForm__Email"
                onChange={e => this.handleInput(e, 'username')}
                value={this.state.email}
                type="text"
              />
              <label htmlFor="TeacherSignUpForm__Password">New Password</label>
              <input
                id="TeacherSignUpForm__Password"
                onChange={e => this.handleInput(e, 'password')}
                value={this.state.password}
                type="password"
              />
              <label htmlFor="TeacherSignUpForm__ConfirmPassword">Confirm New Password</label>
              <input
                id="TeacherSignUpForm__ConfirmPassword"
                onChange={e => this.handleInput(e, 'confirmPassword')}
                value={this.state.confirmPassword}
                type="password"
              />
              <button
                style={{
                  marginTop: 20,
                }}
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="Auth__Body__Imageholder">
            <img src={backgroundimage} alt="Album" style={{ opacity: 0.1 }} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    changedSettings: state.auth.changedSettings,
  };
};

export default connect(mapStateToProps, { createTeacher })(Teachersignup);
