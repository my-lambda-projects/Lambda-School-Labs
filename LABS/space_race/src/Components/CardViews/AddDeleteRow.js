import { Form, Input, Icon, Button } from 'antd';
import './Ap.css'; //use styling at bootom of page for this
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const FormItem = Form.Item;

let uuid = 0;
export class DynamicFieldSet extends React.Component {
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? 'Teams' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`names[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "Please input team's name or delete this field.",
            }],
          })(
            <Input placeholder="Team name" style={{ width: '60%', marginRight: 8 }} />
          )}
          {keys.length > 0 ? (
           <Button className="dynamic-delete-button" 
              
              onClick={() => this.remove(k)}
              disabled={keys.length === 1}> <Icon  type="minus-circle-o"
              
            /></Button>
          ) : null}
        </FormItem>
      );
    });
    return (
      <Form onSubmit={this.handleSubmit}>
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '15%' }}>
            <Icon type="plus" /> Add 
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel}>
     <Button type="primary" onClick={() => this.remove} htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    );
  }
}
const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet);
export default WrappedDynamicFieldSet;
// .dynamic-delete-button {
//   cursor: pointer;
//   position: relative;
//   top: 4px;
//   font-size: 24px;
//   color: #999;
//   transition: all .3s;
// }
// .dynamic-delete-button:hover {
//   color: #777;
// }
// .dynamic-delete-button[disabled] {
//   cursor: not-allowed;
//   opacity: 0.5;
// }