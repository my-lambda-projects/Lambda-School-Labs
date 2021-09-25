import React, { Component } from "react";
import "../css/AchievementCard.css";

class AchievementCard extends Component {
  achievementCheck(id) {
    const userAchevements = this.props.userInfo.achievements;
    let result = require(`../img/achievement-${id}-grey.png`);
    for (let i = 0; i < userAchevements.length; i++) {
      if (userAchevements[i].id === id) {
        result = require(`../img/achievement-${id}-color.png`);
      }
    }
    return result;
  }

  render() {
    return (
      <div className="achievement-card">
        <img
          src={this.achievementCheck(this.props.id)}
          className="achievement-icon"
          id={this.props.id}
          alt="achievment"
        />
        <div className = "achievement-card-info">
          <div className="achievement-title">{this.props.title}</div>
          <div className="achievement-description">
            {this.props.description}
          </div>
        </div>
      </div>
    );
  }
}

export default AchievementCard;
