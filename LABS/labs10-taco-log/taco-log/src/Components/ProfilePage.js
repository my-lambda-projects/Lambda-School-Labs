import React, { Component } from "react";
import ProfileInfoDisplay from "./ProfileInfoDisplay";
import TacoList from "./TacoList";
import AchievementList from "./AchievementList";
import { connect } from "react-redux";
import "../css/ProfilePage.css";
// import tacoGrey from "../img/taco-grey.png";
import medalGrey from "../img/achievement-3-grey.png"

class ProfilePage extends Component {
  state = {
    selectedTab: "logs",
    user: null
  };

  handleToggle = e => {
    this.setState({
      selectedTab: e.target.id
    });
  };
  loginPush() {
    this.props.history.push("/");
    this.props.locationChange();
  }

  // componentWillMount () {
  //   this.setState({user:localStorage})
  // }

  render() {
    return (
      <div>
        {this.props.userInfo.length !== 0 ? (
          <div className="profile-page">
            <ProfileInfoDisplay {...this.props} />
            <div className="profile-inner-wrap">
              <div className="log-badges-switch-wrap">
                <div className = "switch-title">
                  {this.props.userInfo.name}'s Profile
                </div>
                <div className="log-badges-switch">
                  <div
                  onClick={this.handleToggle}
                  id="logs"
                  className={
                    this.state.selectedTab === "logs"
                      ? "profile-tab selected-tab"
                      : "profile-tab"
                  }
                >
                  <img id="logs" className = "switch-img" src = {require('../img/taco-grey.png')} alt="swit" />My Log
                </div>
                <div
                  onClick={this.handleToggle}
                  id="badges"
                  className={
                    this.state.selectedTab === "badges"
                      ? "profile-tab selected-tab"
                      : "profile-tab"
                  }
                >
                  <img id="badges" className = "switch-img" src = {medalGrey} alt="bad"/>My Badges
                </div>
                </div>
                
              </div>
              <div className = "p-content-wrap">
                {this.state.selectedTab === "logs" ? (
                <TacoList {...this.props} />
              ) : (
                <AchievementList {...this.props} />
              )}
              </div>
              
            </div>
          </div>
        ) : (
          // this.loginPush()
          <div />
        )}
      </div>
    );
  }
}

export default connect()(ProfilePage);
