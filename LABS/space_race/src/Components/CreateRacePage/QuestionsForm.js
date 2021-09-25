import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { questionAdded, StartRace, getQuizInfo } from '../../Actions/createRace'
import Switch from '@material-ui/core/Switch';
import { Col, Form, FormGroup, Label, Input, ListGroup, ListGroupItem, Badge, Modal, ModalFooter, Row } from 'reactstrap';
import { FormControlLabel } from '@material-ui/core';
import IoAndroidCreate from 'react-icons/lib/io/android-create';
import UpdateQuestionModal from './UpdateQuestionModal';


class QuizAndTeamsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      shuffle_answers: false,
      answer: "",
      is_correct: false,
      answers: [],
      questions: [],
      updateToggle: false
    }
  }

  componentDidMount() {
    if (this.props.questions) {
      this.setState({
        questions: this.props.questions
      })
    }
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  updateToggle = event => {
    this.setState({
      updateToggle: !this.state.updateToggle
    })
  }
  nextHandler = (event) => {
    console.log(this.state);
    if (this.state.question && this.state.answers.length > 0) {
      let question = {
        question: this.state.question,
        shuffle_answers: this.state.shuffle_answers,
        answers: this.state.answers
      }
      this.state.questions.push(question)
      this.props.StartRace(this.state.questions);
    } else {
      this.props.StartRace(false)
    }
    
    this.props.handleNext();
  }

  backHandler = event => {
    this.props.getQuizInfo()
    this.props.handleBack()
  }

  questionHandler = event => {
    let question = {
      question: this.state.question,
      shuffle_answers: this.state.shuffle_answers,
      answers: this.state.answers
    }
    this.state.questions.push(question)
    this.props.questionAdded(this.state.questions)
    this.setState({
      question: "",
      shuffle_answers: false,
      answer: "",
      is_correct: false,
      answers: [],
    })
  }


  handleAnswerDelete = (qID, index) => {
    this.state.questions[qID].answers.splice(index, 1);
    this.props.questionAdded(this.state.questions) 
  }

  AnswerHandler = event => {
    let answer = {
      answer: this.state.answer,
      is_correct: this.state.is_correct
    }
    this.state.answers.push(answer);
    this.setState({
      answer: "",
      is_correct: false
    })
  }

  handleQuestionDelete = index => {
    this.state.questions.splice(index,1);
    this.props.questionAdded(this.state.questions);
    this.updateToggle();
  }

  handleQuestionUpdate = (index, data) => {
    this.state.questions.splice(index, 1, data);
    this.props.questionAdded(this.state.questions);
  }

  render() {
    return (
      <div>
        <Form>
          <FormGroup>
            <Label>Question</Label>
            <Row>
            <Col>
            <Input type="text" name="question" placeholder="Question" value={this.state.question} onChange={this.changeHandler}/>
            </Col>
            </Row>
          </FormGroup>
            <Label> Add an Answer </Label>
          <FormGroup row>
            <Col>
            <Input type="text" name="answer" placeholder="Answer" value={this.state.answer} onChange={this.changeHandler}/>
            </Col>
            <Col>
              <Switch
              checked={this.state.is_correct}
              onChange={this.handleChange('is_correct')}
              value="is_correct"
              color="primary"
              /> {' '} Correct
            </Col>
            <Col >
              <Button onClick={this.AnswerHandler} variant="contained" color="primary">Add Answer</Button>
            </Col>
          </FormGroup>
          {this.state.answers.map((answer, index) => {
            return <div key={index}>{answer.answer}</div>
          })}
        <FormGroup row>
          <Row>
          <Col >
          <Switch
          checked={this.state.shuffle_answers}
          onChange={this.handleChange('shuffle_answers')}
          value="shuffle_answers"
          color="primary"
          /> {' '} Shuffle Answers
          </Col>
          </Row>
          <Col>
          <Button style={{float: "right"}} onClick={this.questionHandler} variant="contained" color="primary">Save</Button>
          </Col>
        </FormGroup>
        <ListGroup style={{ height: 150, overflow: "scroll"}}>
          {this.props.questionsAdded ? this.props.questions.map((question, index) => {
            return <ListGroupItem key={index}>
            Question: {question.question} <span style={{ float: "right"}}><IoAndroidCreate size={23} color="#792d86" onClick={this.updateToggle}/> <UpdateQuestionModal handleAnswerDelete={this.handleAnswerDelete} updateToggle={this.state.updateToggle} updateToggleFunc={this.updateToggle} question={question} index={index} handleQuestionDelete={this.handleQuestionDelete} handleQuestionUpdate={this.handleQuestionUpdate} /> </span>
            <br/>
            {question.answers.map(answer => {
              if(answer.is_correct === true) {
                return <div>Answer: {answer.answer}</div>
              }
            })} 
            </ListGroupItem>
          }): null}
        </ListGroup>
        <br />
        <FormGroup>
          <Button
            disabled={this.props.activeStep === 0}
            onClick={this.backHandler}
            className={this.props.classes.backButton}
          >
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={this.nextHandler}>
            {this.props.activeStep === this.props.steps.length - 2 ? 'Start Race!' : 'Next'}
          </Button>
        </FormGroup>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    questionsAdded: state.CreateRace.questionsAdded,
    questions: state.CreateRace.questions
  }
}
export default connect(mapStateToProps, { questionAdded, StartRace, getQuizInfo })(QuizAndTeamsForm);