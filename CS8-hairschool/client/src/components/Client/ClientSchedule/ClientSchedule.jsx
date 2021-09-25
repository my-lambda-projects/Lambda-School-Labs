import React from 'react';
import './ClientSchedule.css';
import ClientNav from '../ClientNav/ClientNav';
import { Link } from 'react-router-dom';
import {Row, Col, Grid, Jumbotron, PanelTitle, Form, FormGroup, ButtonToolbar, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import { Button } from 'reactstrap';
import './ClientSchedule.css';
import StylistDropbox from './Dropbox'; 
import TimeDropbox from './Dropbox2';
import InfiniteCalendar from 'react-infinite-calendar';
import Checkbox from './Checkbox';
import GetUser from './getUser';


let today = new Date();
let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

class ClientSchedule extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date (),
            
        }
       
    
    }

    onChange = date => this.setState({date})

    myClick = () =>  {
        alert("Appointment Set!");
    }
    
   
    render () {
        return (
        
            <div className="ClientSchedule"> 
                <div className="GetUser" > <GetUser /> </div>
                <nav className="App-header">
                        <Link className="link signin" to="/SignIn" style={{textDecoration: 'none'}}> Logout </Link>
                        <Link className="link DAsignin" to="/Admin/Schedule" style={{textDecoration: 'none'}}> Demo Admin </Link>
                </nav>        
                
                <Row className="Container">
                
                    <Col sm="2" className="cNav"  >
                        <ClientNav/>
                    </Col>
                    
                    <Col sm="9" className="sContainer">                
                        <div className="Title"> Schedule with Lambda School </div>
                    
                        <div className="Services">
                            <Form>
                                <Row className="serviceContainer">

                                    <Col sm="2">
                                        <FormGroup>
                                        <Checkbox>Hair Cut $20</Checkbox>
                                        <Checkbox>Cut & Color $30</Checkbox>
                                        <Checkbox>Extensions $40</Checkbox>
                                        <Checkbox>Color $20</Checkbox>
                                        <Checkbox>Barbering $20</Checkbox>
                                        </FormGroup>
                                    </Col>                                         
                                    <Col sm="3">
                                    <FormGroup>
                                        <div className="Dropboxes"> 
                                            <StylistDropbox/>
                                            <TimeDropbox/>
                                        </div>
                                        </FormGroup>
                                    </Col>
                                    <Col sm="6" className="CalendarStyle">
                                    <FormGroup>
                                        <div classname="Calendar">
                                            <InfiniteCalendar
                                              className='iCalendar'
                                              width={500}
                                              height={300}
                                              selected={today}
                                              disabledDays={[0,6]}
                                              displayOptions={{
                                                layout: 'landscape',
                                                showOverlay: false,
                                                shouldHeaderAnimate: false
                                                }}
                                              minDate={lastWeek}
                                              min={new Date(2017, 0, 1)}
                                              max={new Date(2019, 0, 1)}
                                              theme={{
                                                  accentColor: '#448AFF',
                                                  floatingNav: {
                                                    background: '#9A94BC',
                                                    chevron: '#FFA726',
                                                    color: '#FFF',
                                                  },
                                                  headerColor: '#6d2e46',
                                                  selectionColor: '#9A94BC',
                                                  textColor: {
                                                    active: '#FFF',
                                                    default: '#333',
                                                  },
                                                  todayColor: '#894962',
                                                  weekdayColor: '#894962',

                                              }}
                                            />
                                        </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <button className="SubmitSchedule" color="purple" size="lg" style={{color: 'white'}} onClick={this.myClick}> Submit</button>
                            </Form>
                            </div> 

                        </Col> 
                </Row>
                           
                  

            </div>
        
            
        )
    }
}





export default ClientSchedule;