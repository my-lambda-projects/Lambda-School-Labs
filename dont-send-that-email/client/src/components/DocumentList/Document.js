import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment-timezone";
import { Badge, Button, Card, CardBody, CardTitle, Row, Col } from "reactstrap";

class Document extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }
  navigate = () => {
    this.props.history.push(`/email/${this.props.email.id}`);
  };

  render() {
    let { title, addressee, updated, text } = this.props.email;
    updated = moment(updated).calendar();

    return (
      <Card onClick={this.navigate} className="documentCard">
        <CardBody>
          <CardTitle>
            <Row>
              <Col
                xs={12}
                style={{ marginBottom: 3 }}
                className="text-truncate"
              >
                <Badge className="titleBadge">Title</Badge> {title}
              </Col>
              <Col xs={12} className="text-truncate">
                <Badge className="addresseeBadge">Addressee</Badge> {addressee}
              </Col>
              {updated !== "No versions." && (
                <Col xs={12} style={{ marginTop: 3 }}>
                  <Badge className="updatedBadge">Updated</Badge> {updated}
                </Col>
              )}

              <Col
                xs={12}
                style={{ marginTop: 3, marginBottom: 3 }}
                className="text-truncate"
              >
                <Badge className="textBadge">Message</Badge> {text}
              </Col>
            </Row>
          </CardTitle>
          {this.props.param === "buttons" ? (
            <Row>
              <Col xs={12}>
                <Button
                  id="copy"
                  color="secondary"
                  onClick={e => {
                    e.stopPropagation();
                    this.props.copy();
                  }}
                >
                  <FontAwesomeIcon icon="copy" />
                </Button>
                <Button
                  color="danger"
                  onClick={e => {
                    e.stopPropagation();
                    this.props.delete();
                  }}
                  style={{ marginLeft: 7 }}
                >
                  <FontAwesomeIcon icon="trash" />
                </Button>
              </Col>
            </Row>
          ) : null}
        </CardBody>
      </Card>
    );
  }
}

export default withRouter(Document);
