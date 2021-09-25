import React, { Component } from "react";
import { firebase } from "../firebase/firebase";
import { Form, Input, Button, FormGroup, Container, Row, Col } from "reactstrap";
import tacoColor from "../img/taco-color.png"
import tacoGrey from "../img/taco-grey.png"
import "../css/logTaco.css";

class FirstTaco extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: ""
        }
    }

render() {
    return(
        <Container>
        <div>{console.log(this.props.userInfo)}</div>
        <Row className="ingredient-tab-wrap">
        <img src={(this.state.selectedTab === "1")?tacoColor:tacoGrey} onClick={e => this.props.toggleIngredientTab(e)} id="1" />
          {this.state.selectedTab === "1" ? this.state.tortilla.map(data => (
            <Col xs="1"
              onClick={this.propsselectTortilla}
              className={
                this.props.selectedTortilla.indexOf(data) > -1
                  ? "ingredient-tab ingredient-tab-selected"
                  : "ingredient-tab"
              }
              id={data}
            >
              {data}
            </Col>
          )) : <p>Test: tortilla unselected</p> }
        </Row>

        <Row className="ingredient-tab-wrap">
        <img src={(this.state.selectedTab === "2")?tacoColor:tacoGrey} onClick={e => this.props.toggleIngredientTab(e)} id="2" />
          {this.state.selectedTab === "2" ? this.props.meat.map(data => (
            <Col xs="1"
              onClick={this.props.selectMeat}
              className={
                this.props.selectedMeat.indexOf(data) > -1
                  ? "ingredient-tab ingredient-tab-selected"
                  : "ingredient-tab"
              }
              id={data}
            >
              {data}
            </Col>
          )): <p> Test: meats unselcted </p>}
        </Row>
        <Row className="ingredient-tab-wrap">
        <img src={(this.props.selectedTab === "3")?tacoColor:tacoGrey} onClick={e => this.props.toggleIngredientTab(e)} id="3" />
          {this.props.selectedTab === "3" ? this.props.cheese.map(data => (
            <Col xs="1"
              onClick={this.props.selectCheese}
              id="cheese"
              className={
                this.props.selectedCheese.indexOf(data) > -1
                  ? "ingredient-tab ingredient-tab-selected"
                  : "ingredient-tab"
              }
              id={data}
            >
              {data}
            </Col>
          )) : <p>Test: cheese unselected</p>}
        </Row>

        <Row className="ingredient-tab-wrap">
        <img src={(this.props.selectedTab === "4") ? tacoColor:tacoGrey} onClick={e => this.props.toggleIngredientTab(e)} id="4" />
          {this.props.selectedTab === "4" ? this.props.salsa.map(data => (
            <Col xs="1"
              onClick={this.propsselectSalsa}
              className={
                this.props.selectedSalsa.indexOf(data) > -1
                  ? "ingredient-tab ingredient-tab-selected"
                  : "ingredient-tab"
              }
              id={data}
            >
              {data}
            </Col>
          )): <p>Test: salsa unselected</p>}
        </Row>
        
        </Container>
    )
}
}

export default FirstTaco;