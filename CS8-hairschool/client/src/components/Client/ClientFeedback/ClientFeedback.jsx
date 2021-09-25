import React from "react";
import "./ClientFeedback.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import ClientNav from "../ClientNav/ClientNav";
import FeedbackForm from "./Formbody";
import { Panel, Button } from "react-bootstrap";

class ClientFeedback extends React.Component {


    render () {
        return (
            <div className="ClientFeedback">
                <nav className="App-header">
                        <Link className="link signin" to="/SignIn" style={{textDecoration: 'none'}}> Logout </Link>
                        <Link className="link DAsignin" to="/Admin/Feedback" style={{textDecoration: 'none'}}> Demo Admin </Link>
                </nav>
                <Row className="Container">
                    <Col sm="2">
                        <ClientNav />
                    </Col>
                    
                    <Col sm="9" className="fContainer" >
                        <div className="Title"> Feedback </div>
                        <Row className="FeedbackContainer">
                            <Col sm="12">
                                    <div className="FeedbackForm">
                                        <Panel className="FeedbackFormat">                                          
                                            <FeedbackForm/>                                        
                                        </Panel>
                                    </div>       
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ClientFeedback;
