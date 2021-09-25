import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addTeacher, deleteTeacher, getTeachers } from '../../../../actions';
import './CreateTeacher.css';
import DashboardNotification from '../../../DashboardNotification/DashboardNotification';

class CreateTeacher extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newTeacherFirstName: '',
      newTeacherLastName: '',
      newTeacherEmail: '',
      teacherAdded: false,
    };
  }

  handleInput = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    await this.setState({
      [name]: value,
    });
  };

  addTeacher = async (e) => {
    e.preventDefault();
    const teacher = {
      firstName: this.state.newTeacherFirstName,
      lastName: this.state.newTeacherLastName,
      email: this.state.newTeacherEmail,
    };
    await this.props.addTeacher(teacher, this.props.history);
    await this.setState({
      newTeacherFirstName: '',
      newTeacherLastName: '',
      newTeacherEmail: '',
      teacherAdded: true,
    });
  }

  renderTeacherAddedAlert = () => {
    if (!this.state.teacherAdded) return null;
    return (
      <DashboardNotification type="info">
        Added Teacher has been sent an email to Signup, he/she will be included in list after Signup
      </DashboardNotification>
    );
  };

  render() {
    return (
      <div className="CreateTeacher">
        {this.renderTeacherAddedAlert()}
        <form onSubmit={this.addTeacher}>
          <h3 className="form__title">Add New Teacher</h3>
          <label htmlFor="CreateTeacher__Firstname">First Name</label>
          <input
            id="CreateTeacher__Firstname"
            type="text"
            name="newTeacherFirstName"
            value={this.state.newTeacherFirstName}
            onChange={this.handleInput}
          />
          <label htmlFor="CreateTeacher__Lastname">Last Name</label>
          <input
            id="CreateTeacher__Lastname"
            type="text"
            name="newTeacherLastName"
            value={this.state.newTeacherLastName}
            onChange={this.handleInput}
          />
          <label htmlFor="CreateTeacher__Email">Email Address</label>
          <input
            id="CreateTeacher__Email"
            type="email"
            name="newTeacherEmail"
            value={this.state.newTeacherEmail}
            onChange={this.handleInput}
          />
          <button>
            Add Teacher
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    teachers: state.teachers,
  };
};

export default withRouter(connect(mapStateToProps, { addTeacher, deleteTeacher, getTeachers })(CreateTeacher));
