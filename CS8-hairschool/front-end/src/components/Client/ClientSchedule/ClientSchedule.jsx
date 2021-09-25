import React from 'react';
import './ClientSchedule.css';
import ClientNav from '../ClientNav/ClientNav';
import DatePicker from 'react-date-picker';
import { Link } from 'react-router-dom';
import {Button,Row, Col, Grid, Jumbotron, PanelTitle} from 'react-bootstrap';
import './ClientSchedule.css';
import Dropboxx from './Dropbox'; 
import Calendar from './Calendar';

require('react-datetime');



// require('react-datetime');

// const buttStyles = {maxWidth: 400, margin: '0 auto 10px'};

class ClientSchedule extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date (),
            
        }
       
    
    }

    onChange = date => this.setState({date})
    
   
    render () {
        return (
        
            <div className="ClientSchedule">
            
                <Row>

            <div className="ClientSchedule"> 

                <nav className="App-header">
                        <Link className="link signup" to="/SignUp" style={{textDecoration: 'none'}}> Sign Up </Link>
                        <Link className="link signin" to="/SignIn" style={{textDecoration: 'none'}}> Sign In </Link>
                        <Link className="link DAsignin" to="/Admin/Schedule" style={{textDecoration: 'none'}}> Demo Admin </Link>
                </nav>          
                <Row className="Container">  
                    <Col sm={2}  >
                        <ClientNav/>
                    </Col>
                    
                    <Col sm={9}>                
                        <div className="Title"> Schedule with Lambda School </div>
                    
                        <div className="Services">
                                <Row className="serviceContainer">
                                    <Col sm={4}>
                                        <ul className="Buttons">
                                            <li style={{listStyleType: "none"}}><Button div className= "Button" bsSize="large">Hair $20</Button></li>
                                            <li style={{listStyleType: "none"}}><Button div className="Button" bsSize="large">Cut & Color $30</Button></li>
                                            <li style={{listStyleType: "none"}}><Button div className= "Button" bsSize="large">Extensions $40</Button></li>
                                            <li style={{listStyleType: "none"}}><Button div className= "Button" bsSize="large">Color $20</Button></li>
                                            <li style={{listStyleType: "none"}}><Button div className= "Button" bsSize="large">Barbering $20</Button></li>
                                        </ul>
                                    </Col>                                         
                                    <Col sm={4}>
                                        <div className="Dropboxx"> 
                                            <Dropboxx/>
                                        </div>
                                    </Col>
                                    <Col sm={4}>
                                        <div classname="Calendar">
                                            <Calendar/>
                                        </div>
                                    </Col>
                                </Row>
                            </div> 

                        </Col> 
                </Row>
                           
                  
            </div>

            </Row>
          </div>  
        
            
        )
    }
}





export default ClientSchedule;