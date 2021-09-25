import React from 'react';
import { Form, Input, Typography, Row, Col, Layout, Button } from 'antd';

const StudentAddress = props => {
  const { handleChange, next } = props;
  const [form] = Form.useForm();
  const { Title } = Typography;
  const { Content } = Layout;
  const { address } = props.studentForm;

  return (
    <Content style={{ margin: '1.8rem 0' }}>
      <Form
        layout={'vertical'}
        form={form}
        onChange={handleChange}
        onFinish={next}
      >
        <Row justify={'center'}>
          <Col>
            <Title level={3}>Student Address</Title>
          </Col>
        </Row>

        <Row justify={'center'}>
          <Col>
            <Form.Item
              name={'address'}
              label="Current Address"
              initialValue={address}
              rules={[
                {
                  required: true,
                  message: "Please enter student's address",
                },
              ]}
            >
              <Input.TextArea
                style={{ width: 200 }}
                rows={3}
                initialValue={address}
                autoFocus={true}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default StudentAddress;
