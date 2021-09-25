import React from 'react';
import './Settings.css';
import ClientNav from '../ClientNav/ClientNav';
import { Link } from 'react-router-dom';
import SettingDrop1 from './SettingDrop1';
import SettingDrop2 from './SettingDrop2';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

class Settings extends React.Component {
    
    render() {
        return (
            <div className="Settings">
                <nav className="App-header">
                        <Link className="link signin" to="/SignIn" style={{textDecoration: 'none'}}> Logout </Link>
                        <Link className="link DAsignin" to="/Admin/Schedule" style={{textDecoration: 'none'}}> Demo Admin </Link>
                </nav> 
                <Row className="Container">
                    <Col sm="2">
                        <ClientNav/>
                    </Col>
                    <Col sm="9"> 
                    <div className="Title"> Settings </div>
                        <Row className="SettingsFormContainer">
                        
                            <Col sm="5">                            
                                <Form>
                                    <FormGroup className="FormLeft">
                                        <FormGroup>
                                            <Label for="email">Email: </Label>
                                            <Input type="text" name="email" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Phone: </Label>
                                            <Input type="text" name="phone" />
                                        </FormGroup>
                                       
                                        <FormGroup>
                                            <Label>Old Password: </Label>
                                            <Input type="text" name="phone" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>New Password: </Label>
                                            <Input type="text" name="phone" />
                                        </FormGroup>
                                        <Button>Save</Button>
                                    </FormGroup>
                                </Form>
                            </Col>
            
                            <Col sm="5">
                                <Form>
                                    <FormGroup className="FormRight">
                                        <FormGroup>
                                            <SettingDrop1 />
                                        </FormGroup>
                                        <FormGroup>
                                            <SettingDrop2 />
                                        </FormGroup>
                                    </FormGroup>
                                </Form>
                            </Col>
                    
                        </Row>
                    </Col>
                </Row>
            </div>
        
        )
    }
}

export default Settings;
