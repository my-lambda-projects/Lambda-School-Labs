import React, { useState } from 'react';
import { Form, Input, Checkbox, Typography, Row, Col, Layout, Button } from 'antd';

const StudentContacts = props => {
  const [secondEmergencyContact, setSecondEmergencyContact] = useState(false);
  const [form] = Form.useForm();
  const { handleChange, next } = props;
  const { Title } = Typography;
  const { Content } = Layout;
  const {
    primary_emergency_contact_name,
    primary_emergency_phone,
    primary_emergency_relationship,
    emergency_contact_name,
    emergency_relationship,
    emergency_phone,
    notes } = props.studentForm;
  function onChange(e) {
    setSecondEmergencyContact(!secondEmergencyContact);
  }

  return (
    <Content style={{ margin: '1.8rem 0' }}>
      <Form
        layout={'vertical'}
        form={form}
        initialValues={'vertical'}
        onChange={handleChange}
        onFinish={next}
      >
        <Row>
          <Col span={24}>
            <Title level={3}>Emergency Contact</Title>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              name={'primary_emergency_contact_name'}
              label="Contact's Name"
              initialValue={primary_emergency_contact_name}
              rules={[
                {
                  required: true,
                  message: 'Please enter a contact',
                },
              ]}
            >
              <Input autoFocus={true} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              name={'primary_emergency_relationship'}
              label="Relation to Student"
              initialValue={primary_emergency_relationship}
              rules={[
                {
                  required: true,
                  message: 'Please enter relation',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name={'primary_emergency_phone'}
          label="Contact's Phone"
          initialValue={primary_emergency_phone}
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        {!secondEmergencyContact ? (
          <Checkbox onChange={onChange}>Second Emergency Contact</Checkbox>
        ) : (
          <>
            <Checkbox
              onChange={onChange}
              defaultChecked={secondEmergencyContact}
            >
              Second Emergency Contact
            </Checkbox>
            <br />
            <Form.Item
              name={'emergency_contact_name'}
              label="Contact's Name #2"
              initialValue={emergency_contact_name}
              rules={[
                {
                  required: secondEmergencyContact,
                  message: 'Please enter a contact',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={'emergency_relationship'}
              label="Relation to Student"
              initialValue={emergency_relationship}
              rules={[
                {
                  required: true,
                  message: 'Please enter a contact',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={'emergency_phone'}
              label="Contact's Phone"
              initialValue={emergency_phone}
              rules={[
                {
                  required: secondEmergencyContact,
                  message: 'Please input your phone number!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </>
        )}
        <br />
        <Form.Item name={'notes'} label="Notes about Student">
          <Input.TextArea
            style={{ width: 200 }}
            rows={3}
            placeholder={
              'Medical conditions, behaviors, and special considerations'
            }
            initialValue={notes}
          />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default StudentContacts;
