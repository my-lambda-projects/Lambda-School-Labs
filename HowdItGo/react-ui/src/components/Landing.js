import React from 'react';
import './landing.css';
import 'font-awesome/css/font-awesome.min.css';
import {Col, Container, Row} from "reactstrap";
import * as routes from "../constants/routes";
import {Link} from "react-router-dom";



const LandingPage = () =>
<Row className="landing-content">

    <Col sm="12" md={{ size: 6, offset: 6 }} className="landing-info">
        <h4>Are you struggling to get customers to leave reviews? Looking for a way to easily provide customers your review sites?</h4>
        <h2>Perhaps you should try...</h2>
        <h1>Howd It Go</h1>
        <h4>Customer Review Management</h4>
        <Link to={routes.SIGN_UP}>
        <div className="Fbutton">
            <p className="Fclic">Lets Get Started!</p>
            <div className="Fhover">
                <p className="Fsure"><i className="fa fa-thumbs-up"></i></p>
            </div>
        </div>
        </Link>
    </Col>
</Row>
;

export default LandingPage;