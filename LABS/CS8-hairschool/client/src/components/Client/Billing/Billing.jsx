import React, {Component} from 'react';
import './Billing.css';
import ClientNav from '../ClientNav/ClientNav';
import { Link } from 'react-router-dom';
import { Row, Col,} from 'reactstrap';
import {Button, Panel, PanelHeader} from 'react-bootstrap';
import Billing2 from './Billingform';

class Billing extends Component {


    render () {
        return (
            <div className="Billing">

                <nav className="App-header">
                        <Link className="link signin" to="/SignIn" style={{textDecoration: 'none'}}> Logout </Link>
                        <Link className="link DAsignin" to="/Admin/Schedule" style={{textDecoration: 'none'}}> Demo Admin </Link>
                </nav> 
                <Row className="Container">
                    <Col sm="2">
                        <ClientNav/>
                    </Col>
                    <Col sm="9">
                        <div className="Title"> Billing </div>
                        <div className="PaymentInfo">
                        <Panel>
                            <Panel.Heading>
                                Payment Info 
                            </Panel.Heading>
                            <Panel.Body>
                                <Billing2/>
                            </Panel.Body>
                        </Panel>
                        </div>
                        
                    </Col>
                </Row>               
            </div>
        )
    }
}

export default Billing;