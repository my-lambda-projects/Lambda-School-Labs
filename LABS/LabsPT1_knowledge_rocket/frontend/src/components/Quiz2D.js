import React, { Component } from "react";

import { Container, Row, Col } from "reactstrap";
import { Button, Form, Input, FormGroup, Label } from "reactstrap";
import { connect } from "react-redux";
import { get_2_Day } from "../actions";
import "../css/Quiz.css";

class Quiz2D extends Component {
  state = {
    className: "",
    rocketName: "",
    selectedRadio: ""
  };
  addParams = () => {
    this.setState({
      className: this.props.match.params.className
    });
    this.setState({
      rocketName: this.props.match.params.rocketName
    });
  };
  getRocket2D = () => {
    const request = {
      className: this.state.className,
      rocketName: this.state.rocketName
    }
    this.props.get_2_Day(request);
  };

  handleRadioSelect = e => {
    this.setState({ selectedAnser: e.target.value });
    this.setState({ selectedRadio: e.target.id });
  };
  onButtonClick = e => {
    e.preventDefault();
    alert(`The correct answer is ${this.props.state.question.question[0].day2CorrectAnswer}`)
  };
  componentDidMount() {
    this.getRocket2D();
  }
  componentWillMount() {
    this.addParams();
  }
  
  render() {
    return (
      <Container className="recap">
        <Form>
          <Row>
            <Col>
              <FormGroup>
                {this.props.state.question ? (
                  <div>
                    <h3>{this.props.state.question.class}</h3>
                    <h3>{this.props.state.question.rocket} - Two Day Boost</h3>
                    <p className = "review">
                      {this.props.state.question.question[0].day2ReviewText}
                    </p>
                  </div>
                ) : null}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <h3>Question:</h3>
                {this.props.state.question ? (
                  <p className="review">
                    {this.props.state.question.question[0].day2QuestionText}
                  </p>
                ) : null}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup tag="fieldset">
                {this.props.state.question ? (
                  <div>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          name="radio1"
                          value="day2AnswerA"
                          id="A"
                          onChange={this.handleRadioSelect}
                        />{" "}
                        {this.props.state.question.question[0].day2AnswerA}
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          name="radio1"
                          value="day2AnswerB"
                          id="B"
                          onChange={this.handleRadioSelect}
                        />{" "}
                        {this.props.state.question.question[0].day2AnswerB}
                      </Label>
                    </FormGroup>
                    <FormGroup check disabled>
                      <Label check>
                        <Input
                          type="radio"
                          name="radio1"
                          id="C"
                          value="day2AnswerC"
                          onChange={this.handleRadioSelect}
                        />{" "}
                        {this.props.state.question.question[0].day2AnswerC}
                      </Label>
                    </FormGroup>
                    <FormGroup check disabled>
                      <Label check>
                        <Input
                          type="radio"
                          name="radio1"
                          value="day2AnswerD"
                          id="D"
                          onChange={this.handleRadioSelect}
                        />{" "}
                        {this.props.state.question.question[0].day2AnswerD}
                      </Label>
                    </FormGroup>
                  </div>
                ) : null}
              </FormGroup>
            </Col>
          </Row>
          <Button onClick={this.onButtonClick}>Submit</Button>
        </Form>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    state: state
  };
};

export default connect(
  mapStateToProps,
  { get_2_Day }
)(Quiz2D);
