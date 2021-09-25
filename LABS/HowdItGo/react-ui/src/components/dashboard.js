import React from 'react';

import * as routes from '../constants/routes';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import {Col, Container, Row} from "reactstrap";
import Navigation from './Navigation';
import { InvitePage } from './invite';
import { SettingsPage } from "./Settings";
import StatsPage from "./Stat";



const Dashboard = () =>
    <body id="dashboard-page">
    <Container>
        <Row className="dashboardHead">
        <h3>Welcome to your Dashboard</h3>
        <p>From here, you can send a new invitation to a customer, see which invitiations have been clicked, and change your message settings.</p>
        </Row>

            <Container>
                <Row>

            <Col md={{ size: 9 }}>
             <InvitePage />
            </Col>
                <Col md={{ size: 3}}>
                    <StatsPage/>
                </Col>
                </Row>
            </Container>

        <hr />
        <Row>
                <SettingsPage/>
        </Row>

    </Container>

    </body>;


export default Dashboard;