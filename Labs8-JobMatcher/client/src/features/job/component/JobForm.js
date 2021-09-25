import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Col } from "reactstrap";
import styled from "styled-components";

const StyledInput = styled(Input)`
  display: inline-block !important;
  opacity: 1 !important;
  visibility: visible !important;
`;

class JobForm extends Component {
  render() {
    //Destructure the entire props.jobData object and also check for existence:
    const {
      title,
      salary_min,
      salary_max,
      top_skills,
      extra_skills,
      familiar_with,
      description,
      requirements,
      is_active
    } = this.props.jobData ? this.props.jobData : "";

    return (
      <Form>
        {/* Title */}
        <FormGroup row>
          <Label for="title" sm={2}>
            Job Title{" "}
          </Label>
          <Col sm={10}>
            <Input
              onChange={this.props.onFormChange}
              type="text"
              name="title"
              id="title"
              defaultValue={title || ""}
            />
          </Col>
        </FormGroup>

        {/* Salary Min */}
        <FormGroup row>
          <Label for="salary_min" sm={2}>
            Salary Min{" "}
          </Label>
          <Col sm={10}>
            <Input
              onChange={this.props.onFormChange}
              type="number"
              name="salary_min"
              id="salary_min"
              defaultValue={salary_min || ""}
            />
          </Col>
        </FormGroup>

        {/* Salary Max */}
        <FormGroup row>
          <Label for="salary_max" sm={2}>
            Salary Max
          </Label>
          <Col sm={10}>
            <Input
              onChange={this.props.onFormChange}
              type="number"
              name="salary_max"
              id="salary_max"
              defaultValue={salary_max || ""}
            />
          </Col>
        </FormGroup>

        {/* Top Skills */}
        <FormGroup row>
          <Label for="top_skills" sm={2}>
            Top Skills
          </Label>
          <Col sm={10}>
            <Input
              onChange={this.props.onFormChange}
              type="text"
              name="top_skills"
              id="top_skills"
              defaultValue={top_skills || ""}
            />
          </Col>
        </FormGroup>

        {/* Extra Skills */}
        <FormGroup row>
          <Label for="extra_skills" sm={2}>
            Extra Skills
          </Label>
          <Col sm={10}>
            <Input
              onChange={this.props.onFormChange}
              type="text"
              name="extra_skills"
              id="extra_skills"
              multiple
              defaultValue={extra_skills || ""}
            />
          </Col>
        </FormGroup>

        {/* Familiar With */}
        <FormGroup row>
          <Label for="familiar_with" sm={2}>
            Familiar With
          </Label>
          <Col sm={10}>
            <Input
              onChange={this.props.onFormChange}
              type="text"
              name="familiar_with"
              id="familiar_with"
              multiple
              defaultValue={familiar_with || ""}
            />
          </Col>
        </FormGroup>

        {/* Description */}
        <FormGroup row>
          <Label for="description" sm={2}>
            Description
          </Label>
          <Col sm={10}>
            <Input
              onChange={this.props.onFormChange}
              type="textarea"
              name="description"
              id="description"
              multiple
              defaultValue={description || ""}
            />
          </Col>
        </FormGroup>

        {/* Requirements */}
        <FormGroup row>
          <Label for="requirements" sm={2}>
            Requirements
          </Label>
          <Col sm={10}>
            <Input
              onChange={this.props.onFormChange}
              type="textarea"
              name="requirements"
              id="requirements"
              multiple
              defaultValue={requirements || ""}
            />
          </Col>
        </FormGroup>

        {/* Set if Job is active */}
        <FormGroup check>
          <Label for="is_active">
            <StyledInput
              onChange={this.props.onFormChange}
              type="checkbox"
              name="is_active"
              id="is_active"
              defaultChecked={is_active}
            />
            This job is active
          </Label>
        </FormGroup>
      </Form>
    );
  }
}

export default JobForm;
