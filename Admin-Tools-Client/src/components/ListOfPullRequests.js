import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PullRequestItem from './PullRequestItem';
import { fetchPrs, deletePr, clearClosedPrs } from '../actions';
import './ListOfPullRequest.css';

class ListOfPullRequests extends Component {

  constructor() {
    super();
    this.modalHandle = this.modalHandle.bind(this);
    this.removeClosed = this.removeClosed.bind(this);
  }

  componentDidMount = () => {
    this.props.fetchPrs();
  }

  componentDidUpdate = () => {
    if (this.props.prRemoved) this.props.fetchPrs();
  }

  removeClosed() {
    this.modal.style = 'display: block;';
  }

  modalHandle(e) {
    if (e.target.id) this.props.clearClosedPrs();
    this.modal.style = 'display: none;';
  }

  render() {
    if (this.props.prError) return <p>Sorry, there was an error fetching data</p>;
    return (
      <div className="list-pr">
        <div style={{ display: 'none' }} className="delete-modal" ref={(e) => { this.modal = e; }}>
          <h2 className="modal-question">Are you sure you want to delete closed pull requests?</h2>
          <h2 id={true} className="modal-option" onClick={this.modalHandle}>Yes</h2>
          <h2 className="modal-option" onClick={this.modalHandle}>Cancel</h2>
        </div>
        <div className="pr-header">
          <h1>Pull Requests</h1>
          <img src="https://cdn0.iconfinder.com/data/icons/large-glossy-icons/512/No.png"
            alt="remove closed"
            className="rem-closed-icon"
            onClick={this.removeClosed}
          />
        </div>
        <p className={this.props.prRemoved ? 'show-rem-status' : 'hide-rem-status'}>Item(s) have been removed</p>
        {this.props.prs.map((pr, i) => {
          return <PullRequestItem key={i} prBody={pr} fetchPrs={this.props.fetchPrs} deletePr={this.props.deletePr} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    prs: state.prs,
    prError: state.prError,
    prRemoved: state.prRemoved
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({ fetchPrs, deletePr, clearClosedPrs },
   dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListOfPullRequests);
