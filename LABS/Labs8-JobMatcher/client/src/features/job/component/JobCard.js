import React, { Component } from "react";
import styled from "styled-components";
import { Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";

const CardContainer = styled(Card)`
  min-width: 200px;
`;

class JobCard extends Component {
  clickHandler = () => {
    let jobId = this.props.jobId || false;
    this.props.jobCardClickHandler(jobId);
  };

  render() {
    const { companyName, title } = this.props || false;
    return (
      <CardContainer onClick={this.clickHandler}>
        <CardBody>
          <CardTitle>{companyName ? companyName : "Add Job"}</CardTitle>
          <CardSubtitle>{title ? title : ""}</CardSubtitle>
          {this.props.companyName ? (
            <div>
              <Button>Archive</Button>
              <Button>Edit</Button>
            </div>
          ) : (
            <Button>+</Button>
          )}
        </CardBody>
      </CardContainer>
    );
  }
}
export default JobCard;
