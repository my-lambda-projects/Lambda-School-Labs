import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../actions';

// import './users.css';

class Users extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return <ul>{this.props.users.map((user, i) => <li key={i}>{user.username}</li>)}</ul>;
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

export default connect(mapStateToProps, { getUsers })(Users);
