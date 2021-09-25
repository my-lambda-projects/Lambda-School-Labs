import React, {Component} from 'react';
import {Modal, Header, Segment, Input, Button} from "semantic-ui-react";
import "./css/profile-settings.css";
// import Navbar from "../Navbar/Navbar"
import Axios from "axios";
import Closed from "./icons/closed.png";
import Open from "./icons/open.png";
import "./css/settings.css";
import { connect } from 'react-redux';
import { refreshUserState } from "../actions";

class ProfileSettings extends Component {
    constructor() {
        super();

        this.state = {
            firstName: "", //With redux defualt values will be user's info
            lastName: "",
            email: "",
            password: "",
            nickname: "",
            //Styling below
            closed: show,
            open: noshow,
            showPass: "password",
            modalOpen: false
        }
    }


    onEyeClick = () => {
        if(this.state.closed === show) { //Makes password visible and changes icon
            this.setState({
                closed: noshow,
                open: show,
                showPass: "text"
            })
        } else {
            this.setState({
                closed: show,
                open: noshow,
                showPass: "password"
            })
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const updatedUser = {currEmail: localStorage.email};
        // Adds only properties updated so values aren't overwritten with blanks
        if (this.state.firstName !== "") updatedUser.first_name = this.state.firstName;
        if (this.state.lastName !== "") updatedUser.last_name = this.state.lastName;
        if (this.state.email !== "") updatedUser.email = this.state.email;
        if (this.state.password !== "") updatedUser.password = this.state.password;
        if (this.state.nickname !== "") updatedUser.nick_names = this.state.nickname;
        if (Object.keys(updatedUser).length === 1) return;

        Axios.put(`${process.env.REACT_APP_API}/update`, updatedUser, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        .then(response => {
            this.setState({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                nickname: "",
                modalOpen: true
            });
            this.props.refreshUserState() //Refreshes state so name appears in nav
        }).catch(err => {
            console.log(err)
        })
    }

    handleClose = () => this.setState({ modalOpen: false })

    //Post method will be here, server needs work first
    // need a comment to update again


    render() {
        const modalStyle = {
            margin: 'auto',
            marginTop: '50% - 80px',
            height: '160px'
        };
        return(
            <div className="settings__nav">
                <Modal open={this.state.modalOpen} onClose={this.handleClose} size='small' style={modalStyle}>
                    <Modal.Content>
                        <Modal.Description>
                            <h4>Settings changed</h4>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button primary onClick={this.handleClose}>
                            OK
                        </Button>
                    </Modal.Actions>
                </Modal>
                <form onSubmit={this.onSubmit} className="settings">
                    <Header as='h3' content='Edit Profile' className="header-title" textAlign='center' style={{ color: 'white', fontFamily: 'Fjalla One' }} />
                    {/* <Container text> */}
                    <Segment.Group className="settings-container">
                        <Segment className="first-name-segment">First Name: <Input placeholder={`${this.props.first_name}`} name="firstName" className="first-name-input" onChange={this.onChange} value={this.state.firstName} type="text"/></Segment>
                        <Segment>Last Name: <Input placeholder={`${this.props.last_name}`} name="lastName" className="second-name-input" onChange={this.onChange} value={this.state.lastName} type="text"/></Segment>
                        <Segment>Email: <Input placeholder={`${this.props.email}`} name="email" className="email-input" onChange={this.onChange} value={this.state.email} type="text"/></Segment>
                        <Segment>Password: <Input placeholder={`Enter a new password...`} name="password" className="password-input" type={this.state.showPass} value={this.state.password} onChange={this.onChange}/>
                        <div className="settings__icon">
                            <img onClick={this.onEyeClick} style={this.state.closed} src={Closed} alt="Password hidden"/>
                            <img onClick={this.onEyeClick} style={this.state.open} src={Open} alt="Password hidden"/>
                        </div>
                        </Segment>
                        <Segment>Nickname: <Input placeholder={`Enter a nickname...`} name="nickname" className="nickname-input" onChange={this.onChange} value={this.state.nickname} type="text"/></Segment>
                    </Segment.Group>
                    <Button type="submit" content='Save' primary />
                    {/* </Container> */}
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        first_name: state.first_name,
        last_name: state.last_name,
        email: state.email,
        nicknames: state.nickname,
        credits: state.credits
    }
}


const show = {

}

const noshow = {
    display: "none"
}

export default connect(mapStateToProps, {refreshUserState})(ProfileSettings);
