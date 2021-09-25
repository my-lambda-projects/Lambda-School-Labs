import React from 'react';
import { Typography, Layout, Col, Row } from 'antd';

const StudentReview = props => {
  const {
    cpr,
    first_name,
    additional_names,
    birthdate,
    gender,
    school_name,
    school_grade,
    email,
    address,
    phone_number,
    primary_emergency_contact_name,
    primary_emergency_phone,
    primary_emergency_relationship,
    notes,
  } = props.studentForm;
  const { Title, Text } = Typography;
  const { Content } = Layout;

  return (
    <Content style={{ margin: '1.8rem 0' }}>
      <Title level={3}>Review Registration</Title>
      <Row style={{ margin: '1.6rem 0' }}>
        <Col span={12}>
          <Text type="secondary">cpr</Text>
        </Col>
        <Col span={12}>
          <Text>{cpr}</Text>
        </Col>
      </Row>

      <Row style={{ margin: '1.8rem 0' }}>
        <Col span={12}>
          <Text type="secondary">First Name</Text>
        </Col>
        <Col span={12}>
          <Text>{first_name}</Text>
        </Col>
      </Row>

      <Row style={{ margin: '1.8rem 0' }}>
        <Col span={12}>
          <Text type="secondary">Additional Names</Text>
        </Col>
        <Col span={12}>
          <Text>{additional_names}</Text>
        </Col>
      </Row>

      <Row style={{ margin: '1.8rem 0' }}>
        <Col span={12}>
          <Text type="secondary">Birthday</Text>
        </Col>
        <Col span={12}>
          <Text>{birthdate}</Text>
        </Col>
      </Row>

      <Row style={{ margin: '1.8rem 0' }}>
        <Col span={12}>
          <Text type="secondary">Gender</Text>
        </Col>
        <Col span={12}>
          <Text>{gender}</Text>
        </Col>
      </Row>

      <Row style={{ margin: '1.8rem 0' }}>
        <Col span={12}>
          <Text type="secondary">School Name</Text>
        </Col>
        <Col span={12}>
          <Text>{school_name}</Text>
        </Col>
      </Row>

      <Row style={{ margin: '1.8rem 0' }}>
        <Col span={12}>
          <Text type="secondary">School Grade</Text>
        </Col>
        <Col span={12}>
          <Text>{school_grade}</Text>
        </Col>
      </Row>

      <Row style={{ margin: '1.8rem 0' }}>
        <Col span={12}>
          <Text type="secondary">Email</Text>
        </Col>
        <Col span={12}>
          <Text>{email}</Text>
        </Col>
      </Row>

      <Row style={{ margin: '1.8rem 0' }}>
        <Col span={12}>
          <Text type="secondary">Address</Text>
        </Col>
        <Col span={12}>
          <Text>{address}</Text>
        </Col>
      </Row>

      <Row style={{ margin: '1.8rem 0' }}>
        <Col span={12}>
          <Text type="secondary">Phone Number</Text>
        </Col>
        <Col span={12}>
          <Text>{phone_number}</Text>
        </Col>
      </Row>

      <Row style={{ margin: '1.8rem 0' }}>
        <Col>
          <Text type="secondary">Primary Emergency Contact</Text>
        </Col>
        <Col span={12}>
          <Text>{primary_emergency_contact_name}</Text>
        </Col>
      </Row>

      <Row style={{ margin: '1.8rem 0' }}>
        <Col>
          <Text type="secondary">Primary Emergency Relationship</Text>
        </Col>
        <Col span={12}>
          <Text>{primary_emergency_relationship}</Text>
        </Col>
      </Row>

      <Row style={{ margin: '1.8rem 0' }}>
        <Col>
          <Text type="secondary">Primary Emergency Phone Number</Text>
        </Col>
        <Col span={12}>
          <Text>{primary_emergency_phone}</Text>
        </Col>
      </Row>

      <Row style={{ margin: '1.8rem 0' }}>
        <Col span={12}>
          <Text type="secondary">Notes</Text>
        </Col>
        <Col span={12}>
          <Text>{notes}</Text>
        </Col>
      </Row>
    </Content>
  );
};

export default StudentReview;
