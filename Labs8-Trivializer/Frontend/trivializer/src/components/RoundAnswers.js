import React, { Component } from "react";
import Questions from "./Questions";
import "./styles/RoundAnswers.css";

class RoundAnswers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: this.props.questions
    };
  }

  render() {
    // The following are for React Drag N Drop functionality
    const questions = this.props.questions;

    return (
      <div>
        {/* Map over questions and display questions with highlighted correct answer*/}
        {questions.map((question, index) => {
          return (
            <div key={question.id}>
              {(index + 1) % 6 === 0 ? <div className="page-break" /> : null}
              <Questions index={index} question={question} userSheets={this.props.userSheets} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default RoundAnswers;
