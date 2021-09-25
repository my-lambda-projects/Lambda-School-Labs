import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import tacoFiller from '../img/taco-filler.jpg';
import tacoFiller2 from '../img/taco-filler2.jpg';
import "../css/LandingPageFiller.css";

export default class LandingPageFiller extends React.Component {
  render() {
    return(
    <Container className= "filler-container">
      <Row className="row1">
          <div className='image-container' >
            <img className="taco-image" src={tacoFiller} alt="taco" /> 
          </div>
          <Col  className="text-box">
            <h2 className="headliner">Simply put, tacos are delicious.</h2>
            <span className ="taco-text"> But how many tacos have you've eaten? What was your taco journey really like?</span>
            <span className="taco-text"> With Taco Logs, you can start keeping track of your tacoventures in the world.</span>
            <span className="taco-text"> Simply put in where you had it and what was in your taco, name it, and presto, you have a taco logged!</span>
          </Col>
      </Row>
      <Row className="row2">
          <Col className="text-box">
            <h2 className="headliner">About</h2>
            <span className="taco-text"> This was a Lambda Labs project. </span>
            <span className="taco-text"> We're still learning as we go on so if you'd like to take a look at our <a href='https://github.com/Lambda-School-Labs/labs10-taco-log'>Github repo</a> and give feedback or make your own from it, feel free! We appreciate any insight or help.</span>
          </Col>
          <div className="image-container2" >
            <img className="taco-image" src={tacoFiller2} alt="another"/>
          </div>
      </Row>
    </Container>
    );
  }
}