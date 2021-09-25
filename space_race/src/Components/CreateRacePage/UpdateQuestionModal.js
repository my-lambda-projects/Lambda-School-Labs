import React , {Component} from 'react';
import { FormGroup, Col, Input, Modal, ModalHeader, ModalFooter, ModalBody, Label, Row} from 'reactstrap';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import IoAndroidDelete from 'react-icons/lib/io/android-delete';


class UpdateQuestionModal extends Component {

  constructor(props) {
    super(props);
    this.state ={
      question: "",
      shuffle_answers: false,
      answer: "",
      is_correct: false,
      answers: [],
    }
  }

  componentDidMount() {
    this.setState({
      question: this.props.question.question,
      shuffle_answers: this.props.question.shuffle_answers,
      answers: this.props.question.answers
    })
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

  handleAnswerDelete = index => {
    this.props.handleAnswerDelete(this.props.index, index)

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

  updateQuestion = event => {
    let question = {
      question: this.state.question,
      shuffle_answers: this.state.shuffle_answers,
      answers: this.state.answers
    }
    this.props.handleQuestionUpdate(this.props.index, question)
    this.props.updateToggleFunc()
  }
  render() {
    return (
      <Modal isOpen={this.props.updateToggle} toggle={this.props.updateToggleFunc}>
        <ModalHeader> Update Question</ModalHeader>
        <ModalBody>
        <FormGroup>
            <Label>Question</Label>
            <Row>
            <Col>
            <Input type="text" name="question" placeholder="Question" defaultValue={this.state.question} onChange={this.changeHandler}/>
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
            return <div key={index}>{answer.answer} {answer.is_correct ? "✅" : "❌"}  <span onClick={() => this.handleAnswerDelete(index)}><IoAndroidDelete size={23} color ="#792d86" /></span></div>
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
        </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button variant="contained" color="secondary" onClick={this.updateQuestion}>Save</Button>
          <Button variant="contained" color="secondary" onClick={() => this.props.handleQuestionDelete(this.props.index)}> Delete </Button>
        </ModalFooter>
      </Modal>
    );

  }
}


export default UpdateQuestionModal;