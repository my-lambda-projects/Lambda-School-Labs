import React, { Component } from 'react';
import{ Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import BillingInfo from './BillingInfo';
import { connect } from 'react-redux';

class SettingsForm extends Component {


    render() {
        return (
            <Form>
                <FormGroup >
                    <Label> Email:</Label>
                    <Input type="email" placeholder="Youremail@something.com" value={this.props.loggedIn ? this.props.user.email : ""}/>
                </FormGroup>
                <FormGroup>
                    <Label> Old-Password:</Label>
                    <Input type="password" placeholder="********"/>
                </FormGroup>
                <FormGroup>
                    <Label> New-Password:</Label>
                    <Input type="password" placeholder="********"/>
                </FormGroup>
                <BillingInfo/>
                <Button > Save </Button>
            </Form>
            // Need to handleSumbit on the Save button
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.LogIn.loggedIn,
        user: state.LogIn.user
    }
}
export default connect(mapStateToProps, {}) (SettingsForm);