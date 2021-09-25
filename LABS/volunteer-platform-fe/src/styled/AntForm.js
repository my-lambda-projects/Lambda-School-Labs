import React from 'react';
import {Form, Icon, Tooltip, Button} from 'antd';
import {StyledButton, StyledCancelButton} from '../styled';
import moment from 'moment';
import PropTypes from 'prop-types';

export class AntForm extends React.Component{
  componentDidUpdate(prevProps){
    if (prevProps.autofill !== this.props.autofill){
      this.autoFill(this.props.autofill);
    }
  }
  
  componentDidMount(){
    this.autoFill(this.props.autofill);
  }
  
  autoFill = values => {
    for (let key in values){
      const field = this.props.form.getFieldInstance(key);
      if (field){
        if (key === 'startTime' || key === 'endTime'){
          const time = values[ key ] && moment.unix(values[ key ], 'HH:MM A');
          time && this.props.form.setFieldsValue({[ key ]: time});
        }else{
          this.props.form.setFieldsValue({[ key ]: values[ key ]});
        }
      }
    }
  };
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err){
        this.props.onSubmit(values);
      }
    });
  };
  
  getCamelCase = name => {
    let camelCase = name.split(' ');
    for (let i = 0; i < camelCase.length; i++){
      camelCase[ i ] = camelCase[ i ].toLowerCase();
      if (i > 0){
        camelCase[ i ] =
          camelCase[ i ].charAt(0).toUpperCase() + camelCase[ i ].slice(1);
      }
    }
    camelCase = camelCase.join('');
    
    return camelCase;
  };
  
  getRules = (type, required = true) => {
    const rules = [];
    
    if (type === 'email'){
      rules.push({type: 'email', message: 'Please enter a valid E-mail.'});
    }else if (type === 'url'){
      rules.push({type: 'url', message: 'Please enter a valid url.'});
    }
    
    if (required){
      rules.push({required: true, message: 'This field is required.'});
    }
    
    return rules;
  };
  
  getDecorator = child => {
    if (child.type && child.type.name && child.type.name !== 'POC'){
      const camelCase = this.getCamelCase(child.props.name);
      const required = !child.props.notRequired;
      const rules = this.getRules(child.props.type, required);
      let label = child.props.label || child.props.name;
      if (child.props.tooltipTitle){
        label = (
          <Tooltip title={child.props.tooltipTitle}>
            <span>
              {child.props.label ? child.props.label : child.props.name}
            </span>
          </Tooltip>
        );
      }
      const validateTrigger = child.props.trigger || 'onChange';
      return (
        <Form.Item
          label={child.props.noLabel || label}
          key={camelCase}
          {...child.props.layout}
        >
          {this.props.form.getFieldDecorator(
            camelCase,
            {rules, validateTrigger}
          )(child)}
        </Form.Item>
      );
    }
    return child;
  };
  
  wrapInDiv = (child, i = 0) => {
    return (
      <div
        className={child.props.className}
        key={`${child.props.className}${i}`}
      >
        {this.renderChildren(child.props.children)}
      </div>
    );
  };
  
  renderChildren = children => {
    if (!Array.isArray(children)){
      if (children.type === 'div'){
        return this.wrapInDiv(children);
      }
      return this.getDecorator(children);
    }
    return children.map((child, i) => {
      if (child.type === 'div'){
        return this.wrapInDiv(child, i);
      }
      if (Array.isArray(child)){
        return this.renderChildren(child);
      }
      return this.getDecorator(child);
    });
  };
  
  render(){
    return (
      <Form
        onSubmit={this.handleSubmit}
        layout={this.props.layout || 'horizontal'}
      >
        {this.renderChildren(this.props.children)}
        <div className={'buttonStyles'}>
          {this.props.cancelButton && (
            <StyledCancelButton //use different style for cancel button
              onClick={this.props.handleCancel} //fix: changed this to this.props.handleCancel
              type={this.props.buttonType}
            >
              {this.props.cancelButtonText}
            </StyledCancelButton>
          )}
          {this.props.submitButton && (
            <StyledButton
              onClick={this.handleSubmit}
              type={this.props.buttonType}
              loading={this.props.buttonLoading}
              disabled={this.props.buttonLoading}
            >
              {this.props.submitButtonText}
            </StyledButton>
          )}
        </div>
      </Form>
    );
  }
}

export const WrappedAntForm = Form.create({name: 'register'})(AntForm);

WrappedAntForm.propTypes = {
  submitButtonText: PropTypes.string.isRequired,
  buttonType: PropTypes.string,
  autofill: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  noButton: PropTypes.bool,
  cancelButton: PropTypes.bool,
  handleCancel: PropTypes.func,
  cancelButtonText: PropTypes.string,
  submitButton: PropTypes.bool,
  buttonLoading: PropTypes.bool,
};
