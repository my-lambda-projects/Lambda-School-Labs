/* eslint-disable */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addSchool, getUserRoles } from '../../../actions';
import './CreateSchool.css';

class CreateSchool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      location: '',
      auth: props.auth,
    };
  }
  async componentWillMount() {
    await this.props.getUserRoles(this.props.history);
    const { isSuperAdmin, isSchoolAdmin, isTeacher } = this.props.auth;
  }

  handleInput = async (e) => {
    e.preventDefault();
    const { name } = e.target;
    await this.setState({
      [name]: e.target.value,
    });
  };

  addSchool = async (e) => {
    e.preventDefault();
    const school = {
      name: this.state.name,
      location: this.state.location,
    };
    await this.props.addSchool(school, this.props.history);
  }

  render() {
    return (
      <div className="CreateSchool">
        <form onSubmit={this.addSchool}>
          <h3 className="form__title">Create School</h3>
          <label htmlFor="CreateSchool__Name">Name of the School</label>
          <input
            id="CreateSchool__Name"
            type="text"
            name="name"
            placeholder="e.g. Lambda School"
            onChange={this.handleInput}
          />
          <label htmlFor="CreateSchool__Location">Location</label>
          <input
            id="CreateSchool__Location"
            type="text"
            name="location"
            placeholder="e.g. Online"
            onChange={this.handleInput}
          />
          <button>
            Create School
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default withRouter(connect(mapStateToProps, { addSchool, getUserRoles })(CreateSchool));