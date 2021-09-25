import React, { Component } from 'react';
import Mailchimp from 'react-mailchimp-form'
import "./css/ContactUs.css";

class ContactUs extends Component {
    render() {
      return (
          <div className="contact-us-wrapper">
          <div className="contact-heading">
            <span className="heading-main"><h1>Stay up to date!</h1></span> 
            <span className="heading-sub"><h3>Subscribe to our mailing list!</h3></span>
          </div>
            <Mailchimp
            className="mail-chimp-form"
            action='https://netlify.us19.list-manage.com/subscribe/post?u=c3b0bfb01c78335549adae42f&amp;id=0f070ed2db'
            fields={[
                {
                name: 'EMAIL',
                placeholder: 'Email',
                type: 'email',
                required: true
                }
            ]}
            />

            <h6 className="alternate-contact">Please email us with any questions or concerns: <b>picmelabs@gmail.com</b></h6>
          </div>
      );
    }
  }

  export default ContactUs;