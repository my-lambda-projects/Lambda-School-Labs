import React, {Component} from 'react';
import Board from './scoreboard';
import QuestionBaord from './questionboard'
import './index.css'
import { connect } from 'react-redux';
import { gettingRace, sendingAnswer } from '../../Actions/adminDeliveryPage'

// TODO: Style and add ability to highlight answer.
class ScoreBoard extends Component {
  componentDidMount() {
    this.props.gettingRace(this.props.match.params.slug)
  }

  handleAnswer = (data) => {
    this.props.sendingAnswer(data);
  }

  render() {
    return (
      <div>
        ScoreBoard Page
        <div className="main">
          <Board race={this.props.race} gotRace={this.props.gotRace}/>
          <QuestionBaord index={this.props.race.index} race={this.props.race} gotRace={this.props.gotRace} slug={this.props.match.params.slug} handleAnswerFunc={this.handleAnswer}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      race: state.AdminDelivery.race,
      gotRace: state.AdminDelivery.gotRace,
  }
}
export default connect(mapStateToProps, { gettingRace, sendingAnswer }) (ScoreBoard);