import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Questions } from '../ScoreBoardPage/questionboard';
import { CreateRaceCard } from '../CardViews/CreateRaceCard';
import { gettingRace, nextQuestion } from '../../Actions/adminDeliveryPage';
import ScoreBoard from '../ScoreBoardPage/index';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Jumbotron, Button } from 'reactstrap';
import { Progress } from 'react-sweet-progress';
import SideBar from '../Navigation/SideBar';
import 'react-sweet-progress/lib/style.css';
import './AdminDeliveryPage.css';

/* Progress bar will get data from this.props.race.questions[this.props.index] DIVIDED BY this.props.race.number_of_participants
*/

/* Admin Delivery Page, to see the current question, answer choices, correct answer(initially hidden) */
class QuestionCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastQuestion: false,
            error: null,
            isHidden: true
        }
    }
    toggleHidden () {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }
    /* render () { 
        return (
            
        )
    } */ 

     /*componentDidMount() {
          this.props.gettingRace(this.props.match.params.slug)
     } */

     revealAnswerToggle = () => {
        const active = !this.state.show
        this.setState({show: active});
    } 

    nextQuestion = event => {
        event.preventDefault();
        let index = this.props.index + 1
        let qlength = this.props.race.questions.length

        if (index >= qlength) {
            this.setState({
                lastQuestion: true
            })
        } else {
            this.props.nextQuestion();
        }

    }

    render() {
        const { question, isLoading, error, isHidden } = this.state;
        
        if (error) {
            return <p>{error.message}</p>;
        }

        return (
            <div>
                                    <div  className="sidebar"> 
                        <SideBar />
                    </div>
                <Jumbotron className="jumbotron">
                {!this.props.gotRace ? null : 
                <div>
                    {<div key={this.props.race.questions[this.props.index].id}>
                        <h3>{this.props.race.questions[this.props.index].question}</h3>
                        <ol>
                        {this.props.race.questions[this.props.index].answers.map(answer => {
                            return <li key={answer.id}>{answer.answer}</li>
                        })}
                        </ol>          
                    </div>

                    }
                </div>}
                <h1 className="display-3">Question</h1>
                <p className="lead">A Place Holder For The Question</p>
                <hr className="my-2" />
                <p>A Place Holder For The Answers:
                </p>
                <Button color="info" size="sm" active className="float-left" onClick={this.toggleHidden}> Show Answer</Button>
                <p>
                    <li>A</li>
                    <li>B</li>
                    <li>C</li>
                    <li>D</li>
                </p>
                <Button color="info" size="sm" active className="float-right" onClick={this.nextQuestion}> Next Question</Button>
                {this.state.lastQuestion ? <div>You're all done!</div> : null}
            </Jumbotron>
           { /* ------- Websocket showing how many have answered question ------- */ }
            <Progress
            percent={100}
            theme={{
                success: {
                    symbol: '🚀',
                    color: 'rgb(223, 105, 180)'
                },
                active: {
                    symbol: '😀',
                    color: '#fbc630'
                },
                default: {
                    symbol: '😱',
                    color: '#fbc630'
                }
            }}
        />

            </div>
            // Potential setup for questions/answers? Need opinions
            // This is based from React-II Instagram Clone during Week 4
            /*<div className="question-panel">
                    {this.state.question ? this.state.question.map((question, i) => (
                        <div className="question__wrapper" key={i}>
                            <div className="question__user">{question.question}</div>
                            <div className="question__text">{question.answer}</div>
                            <div className="question__text">{question.answer}</div>
                            <div className="question__text">{question.answer}</div>
                            <div className="question__text">{question.answer}</div>
                        </div>
                    )) : "question failed to load"}
                </div> */
        );
    }
 
    /* Next Question Button Options Start Here */

  /* <button onClick={ this.nextQuestion }> Next Question </button>
    
     -------- This Section Allows for going to the next or previous section --------
    nextQuestion: function(e) {
        e.preventDefault()
        this.props.nextStep()
    } 
    
    nextStep: function() {
        this.setSTate({
            step : this.state.step + 1
        })
    },

    previousStep: function() {
        this.setState({
            step : this.state.step - 1
        })
    }
    
    */
   // -------- This section will just go to the next question --------
    nextQuestion = event => {
        event.preventDefault();
        const id = this.props.question.id;
        this.props.nextQuestion(id + 1);
    }

    /* Next Question Button Options End Here */
}




const mapStateToProps = state => {
    return {
        race: state.AdminDelivery.race,
        gotRace: state.AdminDelivery.gotRace,
        index: state.AdminDelivery.index
    }
}
export default connect(mapStateToProps, { gettingRace, nextQuestion }) (QuestionCard);