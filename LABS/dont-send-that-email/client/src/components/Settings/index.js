import React from "react";
import {
  Col,
  Container,
  Row,
  Badge,
  Card,
  CardBody,
  CardHeader
} from "reactstrap";
import "./settings.css";
import moment from "moment-timezone";

const dateFormat = date => {
  return moment(date).calendar();
};
const Settings = props => {
  return (
    <Container className="settings-component">
      <Row>
        <Col xs={12}>
          <Card className="no-transition">
            <CardHeader>User Info</CardHeader>
            <CardBody>
              <Row>
                <Col xs={12} style={{ marginBottom: 3 }}>
                  <Badge className="userBadge">Name</Badge>{" "}
                  {props.user.username}
                </Col>
                <Col xs={12} style={{ marginBottom: 3 }}>
                  <Badge className="tierBadge">Tier</Badge>{" "}
                  {props.user.subscribed ? "Premium" : "Free"}
                </Col>
                {props.user.subscribed ? (
                  <Col xs={12} style={{ marginBottom: 3 }}>
                    <Badge className="expireBadge">Ends</Badge>
                    {" " + dateFormat(props.user.subscriptionEnd)}
                  </Col>
                ) : null}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
