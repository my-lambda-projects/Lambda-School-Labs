import React, { Component } from 'react';
import { Col, Container, Row, Nav, NavItem, NavLink } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import {Button} from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.css';
// import './LandingPage.css';
class Footer extends Component {
  render() {
    return (
      <footer className="Footer">
        <Container>
          <Row>
            <Col sm="11" xs="10">
              <p>&nbsp;</p>
            </Col>
            <Col sm="1" xs="2">
    {/*<-------------------anchor to bring back to top of the page------------------------------------->*/}
              <a href="#now" className="top-link">top</a>
            </Col>
          </Row>
          <Row>
            <Col sm="2" xs="3">
              <Nav className="footer-nav">
    {/*<-----------------can add social icon/link here like facebook instagram etc----------------------->*/}
                <NavItem>
                  <NavLink href="" target="_blank">
                  <div className="stripe">
                    <img  />
                    </div> 
                  </NavLink>
                </NavItem>
               {/*} <NavItem>                                            
                
                    <Button style={{height: '44px', marginBottom: '10px', backgroundColor: '#5b7bc2' }}>BUY NOW</Button>
                
    </NavItem>*/}
                <NavItem>
                
                </NavItem>
    
              </Nav>
            </Col>
            <Col sm="4" xs="9">
              <Row>
                <div className="wrapper">
                  <h6>Contact</h6>
                  <div className="left">
    {/*<------------------- add contact email later ----------->*/}
                    <p className="name">contact@somecontact.com</p>    
                  </div>
                
                </div>
              </Row>
              <Row>
    {/*<-------can add optional slogan here or some kind of hook ------------------->*/}
                <p className="race-responsibly"><em>Enter new info </em></p>
              </Row>
            </Col>
            <Col sm="5" xs="12">
              <h6>Optional"</h6>
              <p className="about-text">
    {/*<-------------add a brif description of game here or link or just take this out ----------*/}
               <h5>Optional<i>optional</i></h5>
               
            </p>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <p>Created by LambdaSchool CS6</p>
              <p className="copyright">Copyright 2018. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default Footer;
