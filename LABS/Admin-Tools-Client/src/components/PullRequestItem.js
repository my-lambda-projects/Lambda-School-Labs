import React, { Component } from 'react';
import './PullRequestItem.css';

export default class PullRequestItem extends Component {
  constructor() {
    super();
    this.deleteHandle = this.deleteHandle.bind(this);
    this.modalHandle = this.modalHandle.bind(this);
  }

  deleteHandle() {
    this.modal.style = 'display: block;';
  }

  modalHandle(e) {
    const { _id } = this.props.prBody;
    if (e.target.id) this.props.deletePr(_id);
    this.modal.style = 'display: none;';
  }

  render() {
    const { user, name, state } = this.props.prBody;
    return (
      <div className="pr-item">
        <div style={{ display: 'none' }} className="delete-modal" ref={(e) => { this.modal = e; }}>
          <h2 className="modal-question">Are you sure you want to delete this pull request?</h2>
          <h2 id={true} className="modal-option" onClick={this.modalHandle}>Yes</h2>
          <h2 className="modal-option" onClick={this.modalHandle}>Cancel</h2>
        </div>
        <div >
          <div className="user-info">
            <img className={state === 'open' ? 'avatar' : 'avatar-closed' }alt="avatar" src={user.avatar_url} />
            <p className="user-name">{user.login}</p>
          </div>
          <strong>{name}</strong>
          <img src="https://d30y9cdsu7xlg0.cloudfront.net/png/3058-200.png" alt="delete" className="trash-can" onClick={this.deleteHandle}/>
          </div>
      </div>
    );
  }
}

//For stylistic reasons instead of making the whole pull request background for closed items red
//I instead set a red border around the avatar
//TODO
//When click on pr takes you to seperate page with more info on that pr
//Include prop types
