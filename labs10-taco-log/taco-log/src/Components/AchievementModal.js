import React, { Component } from "react";
import AchievementCard from "./AchievementCard";

class AchievementModal extends Component {
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
          return true;
        }
        return false;
      }
    }
  }

  render() {
    return (
      <div className="achievement-list-owrap">
        Achievements:
        <div onClick={this.toggleModal}>All Achievements</div>
        {this.state.modal ? (
          <div>
            {this.props.achievements.map(achievement => (
              <AchievementCard
                imgsrc={
                  this.achievementCheck(achievement.id)
                    ? `../img/achievement-${achievement.id}-color`
                    : `../img/achievement-${achievement.id}-grey`
                }
                key={achievement.id}
                id = {achievement.id}
                title={achievement.title}
                description={achievement.description}
              />
            ))}
          </div>
        ) : (
          <div />
        )}
        {this.props.userInfo.achievements &&
        this.props.userInfo.achievements.length > 0 ? (
          <div>
            {this.props.userInfo.achievements.map(achievement => (
              <AchievementCard
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
              />
            ))}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default AchievementModal;
