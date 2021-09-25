import React, { Component } from "react";

import { Container, Row, Col } from "reactstrap";
import { Button, Form, Input, FormGroup, Label } from "reactstrap";
import { connect } from "react-redux";
import { get_2_Week } from "../actions";
import "../css/Quiz.css";

class Quiz2W extends Component {
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
    getRocket2W = () => {
        const request = {
            className: this.state.className,
            rocketName: this.state.rocketName
        }
        this.props.get_2_Week(request);
    };
    handleRadioSelect = e => {
        this.setState({ selectedAnser: e.target.value });
    };
    onButtonClick = e => {
        e.preventDefault();
        alert(`The correct answer is ${this.props.state.question.question[0].week2CorrectAnswer}`)
    };
    componentDidMount() {
        this.getRocket2W();
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
                                { this.props.state.question ? (
                                    <div>
                                        <h3>{ this.props.state.question.class }</h3>
                                        <h3>{ this.props.state.question.rocket } - Two Week Boost</h3>
                                        <p>
                                            { this.props.state.question.question[0].week2ReviewText }
                                        </p>
                                    </div>
                                ) : null }
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <h3>Question:</h3>
                                { this.props.state.question ? (
                                    <p>
                                        { this.props.state.question.question[0].week2QuestionText }
                                    </p>
                                ) : null }
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup tag="fieldset">
                                { this.props.state.question ? (
                                    <div>
                                        <FormGroup check>
                                            <Label check>
                                                <Input
                                                    type="radio"
                                                    name="radio1"
                                                    value="week2AnswerA"
                                                    onChange={ this.handleRadioSelect }
                                                />
                                                { this.props.state.question.question[0].week2AnswerA }
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input
                                                    type="radio"
                                                    name="radio1"
                                                    value="week2AnswerB"
                                                    onChange={ this.handleRadioSelect }
                                                />
                                                { this.props.state.question.question[0].week2AnswerB }
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check disabled>
                                            <Label check>
                                                <Input
                                                    type="radio"
                                                    name="radio1"
                                                    value="week2AnswerC"
                                                    onChange={ this.handleRadioSelect }
                                                />
                                                { this.props.state.question.question[0].week2AnswerC }
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check disabled>
                                            <Label check>
                                                <Input
                                                    type="radio"
                                                    name="radio1"
                                                    value="week2AnswerD"
                                                    onChange={ this.handleRadioSelect }
                                                />
                                                { this.props.state.question.question[0].week2AnswerD }
                                            </Label>
                                        </FormGroup>
                                    </div>
                                ) : null }
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button onClick={ this.onButtonClick }>Submit</Button>
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
    { get_2_Week }
)(Quiz2W);
