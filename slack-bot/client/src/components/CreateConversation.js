import React, { Component } from "react";
import SearchBar from "./SearchBar";
import './CreateConversation.css';
class CreateConversation extends Component {
  state={
    question:'',
    searchText:''
  }
  handlesearchResult = event => {
    this.setState({
      searchText: event.target.value,
      question: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      searchText: '',
      question: ''
    });
  };
  render() {
    return <div className="create-conversation">
        <h1>CreateConversation</h1>
        <div className="conver-name">
          <div className="col-xs-12">
            <div className="right-inner-addon" />
            <input type="text" placeholder="Enter Name for this conversation" onFocus={e => (e.target.placeholder = "")} />
          </div>
        </div>
        <div>
          <input value={new Date().toLocaleTimeString()} readOnly />
        </div>
        <div className="question">
          <h4>Question</h4>
          <div className="col-xs-12">
            <div className="right-inner-addon" />
            <input type="text" placeholder="Type a question" onFocus={e => (e.target.placeholder = "")} />
            <button className="btn btn-sm btn-default btn-circle">
              <i className="fa fa-plus" />
            </button>
          </div>
        </div>
        <div className="participant">
          <h4>Participants</h4>
          <div className="col-xs-12">
            <div className="right-inner-addon">
              <i className="icon-search" />
              <input type="search" className="form-control" placeholder="Search" />
            </div>
          </div>
        </div>
        <div className="post-location">
          <div className="col-xs-12">
            <input type="text" placeholder="Where should we post answers?" onFocus={e => (e.target.placeholder = "")} />
          </div>
        </div>
      </div>;
  }
}

export default CreateConversation;
