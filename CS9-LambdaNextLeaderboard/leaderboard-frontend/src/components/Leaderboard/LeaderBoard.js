import React, { Component } from "react";

import "../LeaderboardComponents/ActivityFeed";
import ActivityFeed from "../LeaderboardComponents/ActivityFeed";
import WeeklyData from "../LeaderboardComponents/WeeklyData";
import OverallData from "../LeaderboardComponents/OverallData";
import { connectAsync } from "iguazu";
import { queryGithub } from "../../actions";
// import { queryGithub, queryStudents } from "../../actions";

class LeaderBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // students: [
      //     { name: "Maria Martinez", gitScore: 11, huntrScore: 13, Total: 72 },
      //     { name: "Jane Doe", gitScore: 10, huntrScore: 11, Total: 56 },
      //     { name: "John Smith", gitScore: 9, huntrScore: 10, Total: 44 },
      //     { name: "Joe Chan", gitScore: 8, huntrScore: 9, Total: 43 },
      //     { name: "Mike Moo", gitScore: 7, huntrScore: 10, Total: 41 },
      // ]
    };
  }
  render() {
    if (localStorage.getItem("invalid")) {
    }

    if (this.props.isLoading()) {
      return <div>Loading...</div>;
    }

    if (this.props.loadedWithErrors()) {
      return <div>Oh no! Something went wrong</div>;
    }

    const gitObject = [];
    this.props.data.gitData.forEach((git, x) => {
      this.props.data.huntr.forEach(huntr => {
        if (git !== null) {
          if (git.FullName === huntr.firstname + " " + huntr.familyName) {
            gitObject.push({ Git: git, Huntr: huntr });
          }
        }
      });
    });
    const notHiredStudents = [];
    this.props.students.forEach((each, i) => {
      if (each.hired === false) {
        notHiredStudents.push(each)
      }
    })
    const filteredGit = []
    gitObject.forEach((git, x) => {
      notHiredStudents.forEach((student, i) => {
        if (student.firstname + ' ' + student.lastname === git.Git.FullName) {
          filteredGit.push(git)
        }
      })
    })



    return (
      <div className="App">
        <p />
        <div>
          <ActivityFeed />
        </div>
        <div>
          <WeeklyData
            data={filteredGit}
          />
        </div>
        <div class="ui horizontal divider" />
        <div>
          <OverallData
            data={filteredGit}
          />
        </div>
      </div>
    );
  }
}
export function loadDataAsProps({ store }) {
  const { dispatch } = store;
  return {
    data: () => dispatch(queryGithub())
  };
}

export default connectAsync({ loadDataAsProps })(LeaderBoard);
