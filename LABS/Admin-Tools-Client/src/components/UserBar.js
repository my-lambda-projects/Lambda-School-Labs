import React, { Component } from 'react';
import { connect } from 'react-redux';

import './UserBar.css';

class UserBar extends Component {
  constructor() {
    super();
    this.state = {
      display: false,
    };
    this.displayInfo = this.displayInfo.bind(this);
  }

  displayInfo() {
    this.setState({ display: !this.state.display });
  }

  render() {
    return (
      <div className="user-bar">
        <div className="side-header">
          <h1 className="cat-title">Users</h1>
          <img src="https://image.flaticon.com/icons/svg/60/60758.svg"
            alt="dropdown"
            className={this.state.display ? 'dropdown-btn' : 'dropup-btn'}
            onClick={this.displayInfo}
          />
        </div>
        <ul className={this.state.display ? 'show-cats' : 'hide-cats'}>
          {[...new Set(this.props.prs.map(p => p.user.login))].map((user) => {
            return <li key={user} className="user">{user}</li>;
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    prs: state.prs,
    prError: state.prError,
    prRemoved: state.prRemoved,
  };
};

export default connect(mapStateToProps)(UserBar);

//TODO
//Click on user and return that users pull requests

//Optional
//Move unique set computation server side
//move display state to redux
