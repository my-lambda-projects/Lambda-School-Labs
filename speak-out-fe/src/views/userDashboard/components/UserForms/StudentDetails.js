import React from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Typography,
  Row,
  Col,
  Layout,
} from 'antd';
import moment from 'moment-timezone';

const StudentDetails = props => {
  const { Title } = Typography;
  const { handleChange, formHelper, gradeHelper, next } = props;
  const { Option } = Select;
  const { Content } = Layout;
  const dateFormat = 'DD/MM/YYYY';
  const {
    cpr,
    first_name,
    additional_names,
    birthdate,
    gender,
    school_name,
    email,
    phone_number,
  } = props.studentForm;

  const defaultGender = val => {
    if (val === 'M') {
      return 'Male';
    } else if (val === 'F') {
      return 'Female';
    } else {
      return 'Female';
    }
  };

  return (
    <Content style={{ margin: '1.8rem 0' }}>
      <Form
        layout={'vertical'}
        onChange={handleChange}
        onFinish={next}
        scrollToFirstError
      >
        <Title level={3}>Student Details</Title>
        <Form.Item
          name="first_name"
          label="First Name"
          initialValue={first_name}
          rules={[
            {
              required: true,
              message: "Please enter student's name",
            },
          ]}
        >
          <Input autoFocus={true} />
        </Form.Item>
        <Form.Item
          name="additional_names"
          label="Additional Name"
          initialValue={additional_names}
          rules={[
            {
              required: true,
              message: "Please enter student's additional name(s)",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="cpr"
          label="Government ID"
          initialValue={cpr}
          rules={[
            {
              required: true,
              message: "Please enter student's CPR number",
            },
            { min: 9, max: 9, message: 'Gov ID must be exactly 9 characters' },
          ]}
        >
          <Input />
        </Form.Item>

        <Row justify="center">
          <Col>
            <Form.Item
              name="birthdate"
              label="Date of Birth"
              rules={[
                {
                  required: true,
                  message: "Please enter student's date of birth",
                },
              ]}
            >
              <DatePicker
                defaultValue={moment(birthdate, dateFormat)}
                format={dateFormat}
                style={{ width: 120 }}
                onChange={value =>
                  formHelper({ value: moment(value).format('l') })
                }
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="gender"
              label="Gender"
              initialValue={gender}
              rules={[
                {
                  required: true,
                  message: "Please enter student's gender",
                },
              ]}
            >
              <Select
                style={{ width: 80 }}
                labelInValue
                onChange={value => formHelper(value)}
                defaultValue={defaultGender(gender)}
              >
                <Option value="M">Male</Option>
                <Option value="F">Female</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="phone_number"
          label="Phone"
          initialValue={phone_number}
          rules={[
            {
              required: true,
              message: "Please enter student's contact phone number",
            },
          ]}
        >
          <Input placeholder={'332-32-1234'} />
        </Form.Item>
        <Form.Item name="email" label="Email" initialValue={email}>
          <Input />
        </Form.Item>
        <Form.Item
          name="school_name"
          label="Name of School"
          initialValue={school_name}
        >
          <Input />
        </Form.Item>

        <Row justify="space-between">
          <Col>
            <Form.Item name="school_grade" label="Grade Level">
              <Select
                labelInValue
                name="school_grade"
                style={{ width: 100 }}
                onChange={value => gradeHelper(value)}
              >
                <Option value="None">None</Option>
                <Option value="KG 1">KG 1</Option>
                <Option value="KG 2">KG 2</Option>
                <Option value="KG 3">KG 3</Option>
                <Option value="Pri 1">Pri 1</Option>
                <Option value="Pri 2">Pri 2</Option>
                <Option value="Pri 3">Pri 3</Option>
                <Option value="Pri 4">Pri 4</Option>
                <Option value="Pri 5">Pri 5</Option>
                <Option value="Pri 6">Pri 6</Option>
                <Option value="Sec 1">Sec 1</Option>
                <Option value="Sec 2">Sec 2</Option>
                <Option value="Sec 3">Sec 3</Option>
                <Option value="Sec 4">Sec 4</Option>
                <Option value="Sec 5">Sec 5</Option>
                <Option value="Sec 6">Sec 6</Option>
              </Select>
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

export default StudentDetails;
