import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SideBar.css';

class SideBar extends Component {
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
      <div className="side-bar">
        <div className="side-header">
          <h1 className="cat-title">Repositories</h1>
          <img src="https://image.flaticon.com/icons/svg/60/60758.svg"
            alt="dropdown"
            className={this.state.display ? 'dropdown-btn' : 'dropup-btn'}
            onClick={this.displayInfo}
          />
        </div>
        <ul className={this.state.display ? 'show-cats' : 'hide-cats'}>
          {[...new Set(this.props.prs.map(p => p.name))].map((name) => {
            return <li key={name} className="pr-name">{name}</li>;
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({ prs: state.prs });

export default connect(mapStateToProps)(SideBar);

//TODO
//When click on repository name all the prs under that repo are displayed

//Optional
//Move unique set computation server side
//move display state to redux
