import React from 'react';
import LeftNavigation from './LeftNav';
import axios from 'axios';
import './Stat.css';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import {Button, Card, CardBody, CardHeader, CardText, CardTitle, Container, Form, Input} from "reactstrap";

class InvitePage extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    messageContent: ''
  };

  validatePhoneNumber(phoneNumber) {
    try {
      const phoneUtil = PhoneNumberUtil.getInstance();

      if (phoneUtil.isValidNumber(phoneUtil.parse(phoneNumber))) {
        return phoneUtil.format(
          phoneUtil.parse(phoneNumber),
          PhoneNumberFormat.E164
        );
      }
    } catch (e) {
      return e;
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSend = async () => {
    const email = await localStorage.getItem('email');
    const { firstName, lastName, phoneNumber, messageContent } = this.state;
    const messageDetails = {
      firstName,
      lastName,
      phoneNumber: this.validatePhoneNumber(`+1${phoneNumber}`),
      messageContent,
      email
    };
    if (!messageContent.length) {
      alert('Go to Settings and add a nice message to your customers!');
      return;
    }
    axios
      .post('/message-user', messageDetails)
      .then(response => {
        alert('Message Sent!');
        this.setState({ firstName: '', lastName: '', phoneNumber: '' });
      })
      .catch(err => console.log(err));
  };

  async componentDidMount() {
    const sessionCookie = await localStorage.getItem('sessionCookie');
    const email = await localStorage.getItem('email');
    if (!sessionCookie) {
      this.props.history.push('/signin');
      return;
    }
    await axios
      .post(`/settings/user_settings`, { email })
      .then(response => {
        this.setState({
          ...this.state,
          messageContent: response.data.messageContent || ''
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (

       <Container>
         <Card>
           <CardHeader>
             Invite customers to leave a review by sending them a link.
           </CardHeader>
           <CardBody>
             <Form>
               <Input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder="Customer First Name" />
               <Input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} placeholder="Customer Last Name" />
               <Input type="text" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange} placeholder="Customer Phone Number" />

               <Button className="short" onClick={this.handleSend}>
                 Send
               </Button>
             </Form>
           </CardBody>
         </Card>
       </Container>

    );
  }
}

export default InvitePage;
export { InvitePage };
