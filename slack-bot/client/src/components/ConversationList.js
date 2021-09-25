import React, { Component } from "react";
import SearchBar from "./SearchBar";

class ConversationList extends Component {
  render() {
    return (
      <div className="conversation-list">
        <SearchBar />
      </div>
    );
  }
}

export default ConversationList;
