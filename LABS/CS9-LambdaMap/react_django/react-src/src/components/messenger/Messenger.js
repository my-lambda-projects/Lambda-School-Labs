import React, { Component } from "react";
import chatbubble from "./chatopposite.png";
import newmsg from "./newmessage.png";
import "./messenger.css";

class Messenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      jobListing: [],
      tab: "tab-inactive"
    };
  }

  tabOpen = () => {
    if (this.state.tab === "tab-inactive") {
      this.setState({ tab: "tab-active" });
    } else {
      this.setState({ tab: "tab-inactive" });
    }
  };
  render() {
    console.log(this.state.tab);
    return (
      <div className={this.state.tab}>
        <div className="messenger-container">
          <div className="side-messenger">
            <div className="chat-tab" onClick={this.tabOpen}>
              <img src={chatbubble} className="chat-icon" alt="chat-icon" />
            </div>
            <div className="messages">
              <div className="msg-header">
                <h2>Messages</h2>
                <img src={newmsg} className="new-msg" alt="new-message" />
              </div>
              <div className="inbox" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Messenger;
