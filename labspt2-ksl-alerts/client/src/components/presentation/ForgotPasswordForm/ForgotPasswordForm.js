// ForgotPassword.js -- Let's the user reset their password
import React from 'react';
import { Segment, Form, Input, Label, Button, Divider, Icon, } from 'semantic-ui-react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { style, } from './style/inline/inline.js';


const ForgotPasswordForm = props => {

		return (
			<Segment style={ style.segment }>
				<Form>
					{ /* Form Header */ }
					<h2 style={ style.formHeader }>Forgot Password?</h2>
						<Form.Field
							style={ style.inputContainer }
							error="ERROR"
						>
							<label>
								Enter your email to continue<br/>
								<span style={ style.error }>
									Send recovery Email
								</span>
							</label>
							
							{/* Email Input Box */}
							<Input
								id='forgot-password-email-input'
								name='forgotPasswordEmailInput'
								fluid
								placeholder='Enter your email'
								type='email'
								/*
								icon=...
								value=...
								onChange=...
								onBlur=...
								loading=...
								*/
								
							/>
							
						</Form.Field>
						
						{/* Email Send Button */}
						<Form.Field
							style={ style.buttonContainer }
						>
							<Button
								id='alertifi-forgot-password-button'
								name='alertifiForgotPasswordButton'
								content='Send Verification Email'
								fluid
								positive
								icon='forgot-password'
								labelPosition='left'
								onClick='replaceme'
								
							/>
						</Form.Field>
				</Form>
			</Segment>
		);
	
};

ForgotPasswordForm.propTypes = {

};

export default ForgotPasswordForm;

