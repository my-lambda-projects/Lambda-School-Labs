import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { QuizInfo } from '../../Actions/createRace';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Col, Form, FormGroup, Label, Input, ListGroup, ListGroupItem, Badge, Modal, ModalFooter, Row } from 'reactstrap';
import { BlockPicker } from 'react-color';
import IoAndroidCreate from 'react-icons/lib/io/android-create';
import IoAndroidDelete from 'react-icons/lib/io/android-delete';
import UpdateTeamModal from './UpdateTeamModal';

// import Icon from '@material-ui/core/Icon';
// import DeleteIcon from '@material-ui/icons/Delete';




class QuizAndTeamsForm extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef()
    this.state = {
      name:"",
      teamName: "",
      mascot: "",
      color: "",
      teams: [],
      randomize_team: false,
      colorToggle: false,
      updateToggle: false
    }
  }
  componentDidMount() {
    if (this.props.quizAdded) {
      this.setState({
        name: this.props.quiz.name,
        teams: this.props.quiz.teams,
        randomize_team: this.props.quiz.randomize_team
      })
    }
  }

  colorToggle = event => {
    this.setState({
      colorToggle: !this.state.colorToggle
    })
  }

  updateToggle = event => {
    this.setState({
      updateToggle: !this.state.updateToggle
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

  handleChangeComplete = (color) => {
    this.setState({ color: color.hex, colorToggle: !this.state.colorToggle });

  };

  nextHandler = (event) => {
    console.log(this.state);
    let quiz = {name: this.state.name, teams: this.state.teams, randomize_team: this.state.randomize_team}
    this.props.QuizInfo(quiz)
    this.props.handleNext();
  }

  teamHandler = event => {
    if (!this.state.color || !this.state.mascot) {
      window.alert("You must include both a color and mascot")
    } else {
      let team = {
        name: this.state.teamName,
        color: this.state.color,
        mascot: this.state.mascot
      }
      this.state.teams.push(team);
      let quiz = {name: this.state.name, teams: this.state.teams, randomize_team: this.state.randomize_team}
      this.props.QuizInfo(quiz)
      this.setState({
        teamName: "",
        color: "",
        mascot: "",
        colorToggle: false
      })
    }
  }
  handleDelete = index => {
    console.log(index)
    this.state.teams.splice(index,1);
    console.log('teams', this.state.teams)
    let quiz = {name: this.state.name, teams: this.state.teams, randomize_team: this.state.randomize_team};
    this.props.QuizInfo(quiz);
  }

  handleUpdate = (index, data) => {
    this.state.teams.splice(index, 1, data)
    let quiz = {name: this.state.name, teams: this.state.teams, randomize_team: this.state.randomize_team};
    this.props.QuizInfo(quiz);
  }

  render() {
    return (
      <div>
        <Form>
          <FormGroup>
            {/* <Col> */}
            <Label>Race Name</Label>
            <Input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.changeHandler} />
            {/* </Col> */}
          </FormGroup>
          <br />
          <Label> Add a Team </Label>
          <FormGroup row >
            <Col sm={3}>
              <Input  sm="4" type="text" name="teamName" placeholder="Team Name" value={this.state.teamName} onChange={this.changeHandler}/>
            </Col>
            <Col sm={3}>
              <Input sm="3" name="mascot" onChange={this.changeHandler} value={this.state.mascot} type="select">
                <option>Pick Mascot</option>
                <option value="🐝">🐝</option>
                <option value="🐶">🐶</option>
                <option value="🐈">🐈</option>
                <option value="🐎">🐎</option>
                <option value="🐍">🐍</option>
                <option value="🐋">🐋</option>
                <option value="🐊">🐊</option>
                <option value="🐘">🐘</option>
                <option value="🦒">🦒</option>
                <option value="🦆">🦆</option>
                <option value="🐇">🐇</option>
              </Input>
            </Col>
            <Col sm={3}>
              <Input onClick={this.colorToggle} placeholder="Pick a Color" value={this.state.color}/>
              <br/>
              <Col sm={3} style={this.state.colorToggle ? null: {display: 'none'}}>
                <BlockPicker
                    color={ this.state.color }
                    onChangeComplete={ this.handleChangeComplete }
                />
              </Col>
            </Col>
            <br/>
            <Col sm={3}>
            <Button onClick={this.teamHandler} variant="contained" color="primary">Add</Button>
            </Col>
          </FormGroup>
          <FormGroup>
          <ListGroup>
          {this.props.quizAdded ? this.state.teams.map((team, index) => {
            return <ListGroupItem key={index}>{team.name} &emsp; {team.mascot} &emsp; {team.color}
              <span style={{float: "right"}} onClick={() => this.handleDelete(index)}><IoAndroidDelete size={23} color ="#792d86" /></span>
              <span style={{float: "right"}}><IoAndroidCreate size={23} color="#792d86" onClick={this.updateToggle}/> 
              <UpdateTeamModal   handleUpdate={this.handleUpdate} updateToggleFunc={this.updateToggle} updateToggle={this.state.updateToggle} team={team} index={index}/></span> 
            </ListGroupItem>
          }) : null}
          </ListGroup>
          </FormGroup>
          <FormGroup row>
            <Row>
              <Col>
                <Switch
                checked={this.state.randomize_team}
                onChange={this.handleChange('randomize_team')}
                value="randomize_team"
                color="primary"
                /> {' '} Randomize Teams
              </Col>
            </Row>
          </FormGroup>
          <br />
          <FormGroup>
          <Button
            disabled={this.props.activeStep === 0}
            onClick={this.props.handleBack}
            className={this.props.classes.backButton}
          >
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={this.nextHandler}>
            {this.props.activeStep === this.props.steps.length - 1 ? 'Start Race!' : 'Next'}
          </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    quizAdded: state.CreateRace.quizAdded,
    quiz: state.CreateRace.quiz
  }
}

export default connect(mapStateToProps, {QuizInfo}) (QuizAndTeamsForm);