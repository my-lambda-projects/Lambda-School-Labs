import React from 'react';
import LeftNavigation from './LeftNav';

import PasswordChange from './PasswordChange';
import Billing from './Billing'; // Work in Progress

import './account.css';
import {Col, Container, Row} from "reactstrap";
import Navigation from "./Navigation";

export default class AccountPage extends React.Component {
  render() {
    return (
        <body id="account-page">
        <Container>
            <Navigation/>
          <Row className="dashboardHead">

            <Col>
              <PasswordChange />
            </Col>
        <Col/>

          </Row>
        </Container>
        </body>
    );
  }
}
