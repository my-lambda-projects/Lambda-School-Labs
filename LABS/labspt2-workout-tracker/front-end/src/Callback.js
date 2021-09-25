import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  postUser,
  getCategories,
  getExercises,
  getUserInfo,
  getNotes
} from './actions/actions';
import auth from './Auth';

class Callback extends Component {
  async componentDidMount() {
    try {
      await auth.handleAuthentication();
      await this.props.postUser();
      await this.props.getUserInfo();
      this.props.getCategories();
      this.props.getExercises();
      this.props.getNotes();
      this.props.history.push('/schedule');
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return <p>Loading app...</p>;
  }
}

export default withRouter(
  connect(
    null,
    { postUser, getCategories, getExercises, getUserInfo, getNotes }
  )(Callback)
);
