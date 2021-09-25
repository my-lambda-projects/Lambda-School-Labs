import React, {Component} from 'react';
import FormDrop1 from './Formdrop1';
import FormDrop2 from './Formdrop2';
import axios from 'axios';
import Stars from './Stars';
import {Button, ButtonGroup, Glyphicon, Row, Col, Form, FormGroup, Panel, FormControl, ButtonToolbar, ToggleButtonGroup, ToggleButton, ControlLabel} from 'react-bootstrap'


class FeedbackForm extends Component {
    constructor(props) {
        super (props);
        this.state = {
            stylist:"",
            service:"",

            consultationRating:"",
            consultationFeedback:"",
            customerServiceRating:"",
            customerServiceFeedback:"",
            timeRating:"",
            timeFeedback:"",
            stylingRating:"",
            stylingFeedback:"",
            overallRating:"",
            overallFeedback:""
        }

        this.addFeedbackCard = this.addFeedbackCard.bind(this);
        this.updateStylist = this.updateStylist.bind(this);
        this.updateService = this.updateService.bind(this);
        this.updateConsultationRating = this.updateConsultationRating.bind(this);
        
        this.updateCustomerServiceRating = this.updateCustomerServiceRating.bind(this);
        
        this.updateTimeRating = this.updateTimeRating.bind(this);
        
        this.updateStylingRating = this.updateStylingRating.bind(this);
       
        this.updateOverallRating = this.updateOverallRating.bind(this);
        this.updateOverallFeedback = this.updateOverallFeedback.bind(this);
    };

    addFeedbackCard = (event) => {
        event.preventDefault();
        //add code to create the feedback card using the api
        axios
            .post('http://localhost:3000/Admin/Feedback', this.state)
    

        this.setState({
            stylist:"",
            service:"",
            
            consultationRating:"",
            
            customerServiceRating:"",
            
            timeRating:"",
           
            stylingRating:"",
            
            overallRating:"",
            overallFeedback:""            
        });
    };


    updateStylist(data) {
        this.setState({
            stylist: data
        });
    }

    updateService(event) {
        this.setState({
            service: event.target.value
        })
    }

    //Consultation rating & feedback
    updateConsultationRating(event) {
        this.setState({
            consultationRating: event.target.value
        })
    }
    
    //Customer Service rating & feedback
    updateCustomerServiceRating(event) {
        this.setState({
            customerServiceRating: event.target.value
        })
    }
   
    //Time rating & feedback
    updateTimeRating(event) {
        this.setState({
            timeRating: event.target.value
        })
    }
    
    //Styling rating & feedback
    updateStylingRating(event) {
        this.setState({
            stylingRating: event.target.value
        })
    }
    
    //Overall rating & feedback
    updateOverallRating(event) {
        this.setState({
            overallRating: event.target.value
        })
    }
    updateOverallFeedback(event) {
        this.setState({
            overallFeedback: event.target.value
        })
    }
    
    

    render(){

        return(
            <div className="Formheader">
           
            <Form>
                <div className="AppointmentInfo"> 
                    <Row>
                        <Col sm="6">
                            <FormDrop1 
                                updateStylistCallback={this.updateStylist.bind(this)}
                            />
                        </Col>
                        <Col sm="6">
                            <FormDrop2
                                updateServiceCallback={this.updateService.bind(this)}    
                             />
                        </Col>
                    </Row>
                </div>
                               
                <Row className="StarGuide">     
                    <div>
                        <div className="StarItem">
                            <div className="StarColor">
                                <Glyphicon  glyph="star"/>
                            </div>
                        </div> 
                       = Poor Service
                    </div>
                     
                    <div>
                        <div className="StarItem">
                            <div className="StarColor">
                                <Glyphicon  glyph="star"/><Glyphicon  glyph="star"/><Glyphicon  glyph="star"/><Glyphicon  glyph="star"/><Glyphicon  glyph="star"/>
                            </div>
                        </div> 
                       = Great Service
                    </div>
                </Row>
                <Panel className="PanelSize">
                <Row className="FeedbackForm">
                    <Col sm="6" className="FormStars">

                        <FormGroup className="Consultation">

                            <Row>                               
                            <ControlLabel className="Label consult"> Consultation: </ControlLabel>
                            
                            <Stars/>
                            
                            </Row>

                        </FormGroup>

                        <FormGroup className="CustomerService">
                            <Row>                           
                            <ControlLabel className="Label cservice">Customer Serivce: </ControlLabel>
                            <Stars/> 
                            </Row>
                        </FormGroup>
                    
                        <FormGroup className="Time">
                            <Row>
                            <ControlLabel className="Label time">On Time?: </ControlLabel>
                            <Stars/>
                            </Row>
                        </FormGroup>
                        
                        <FormGroup className="Styling"> 
                            <Row>
                            <ControlLabel className="Label sstyling">Styling: </ControlLabel>
                            <Stars/> 
                            </Row>
                        </FormGroup> 
                   </Col>
                   <Col sm="6">
                        <FormGroup className="OverallScore">
                            
                            <ControlLabel className="Label">Overall Score </ControlLabel>
                            <Stars/> 
                            <FormControl 
                                componentClass="textarea"
                                onChange={this.updateOverallFeedback}
                                value={this.state.overallFeedback}
                                placeholder="Overall Feedback"                               
                            />
                        </FormGroup> 
                        </Col>

                        <button className="FeedbackButton"> Submit </button>         
                </Row>
                </Panel>
            </Form>
            </div>
        )
    }


    }
    
    export default FeedbackForm