import React, { Component } from "react";
import AchievementCard from "./AchievementCard";
import "../css/AchievementList.css";

class AchievementList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }
  componentDidMount() {
    this.props.fetchAchievements();
  }

  toggleModal() {
    this.setState({ modal: !this.state.modal });
  }

  achievementCheck(id) {
    const userAchevements = this.props.userInfo.achievements;
    if (userAchevements.length > 0) {
      for (let i = 0; i <= userAchevements.length; i++) {
        if (userAchevements[i].id === id) {
          console.log("true");
          return true;
        }
        console.log("false");
        return false;
      }
    }
  }

  logLink(){
    this.props.locationChange();
    this.props.history.push("/home");
  }

  render() {
    return (
      <div className="achievement-list-owrap">
        <div className="achievement-list-title-btn-wrap">
          <div className="achievement-list-title">My Badges</div>
          <div className="all-toggle" onClick={() => this.toggleModal()}>
            View All Badges
          </div>
        </div>
        <div
          className={
            this.state.modal ? "achievement-modal display" : "achievement-modal"
          }
        >
          <div className="content">
            <img
              className="exit-icon"
              alt="bruh"
              src={require("../img/exit-icon.png")}
              onClick={() => this.toggleModal()}
            />
            <div className="inner-wrap">
              {this.props.achievements.map(achievement => (
                <AchievementCard
                  {...this.props}
                  key={achievement.id}
                  id={achievement.id}
                  title={achievement.title}
                  description={achievement.description}
                />
              ))}
            </div>
          </div>
        </div>
        {this.props.userInfo.achievements &&
        this.props.userInfo.achievements.length > 0 ? (
          <div className="personal-achievement-wrap">
            {this.props.userInfo.achievements.map(achievement => (
              <AchievementCard
                {...this.props}
                id={achievement.id}
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
              />
            ))}
          </div>
        ) : (
          <div>
            <p>You do not have any badges yet.</p>
            <div className = "btn-p-wrap">
              <p>Start logging tacos to earn badges!</p>
              <div onClick = {()=>this.logLink()} className = "taco-log-link">Log a Taco</div>
            </div>
          </div>
          
        )}
      </div>
    );
  }
}

export default AchievementList;
