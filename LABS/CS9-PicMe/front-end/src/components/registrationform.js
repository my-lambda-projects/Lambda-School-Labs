import React, { Component } from 'react'
import { Button, Form, Grid, Header, Segment, Modal } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom' //need this for history.push
import { connect } from 'react-redux';
import axios from 'axios';
import './css/registrationform.css';

import { signIn } from '../actions';

class RegistrationForm extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: '',
    modalOpen: false,
    show: noshow
  }

  handleInput = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();


    //Checks if a field is blank and passwords match
    if((this.state.password !== this.state.password_confirm) || this.state.password.length === 0 || this.state.email.length === 0 || this.state.password_confirm.length === 0 || this.state.first_name.length === 0 || this.state.last_name.length === 0) {
      this.setState({
        show: show //Shows error message
      })
      return; //Stop submission process
    }

    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    }


    axios.post(`${process.env.REACT_APP_API}/signup`, newUser)
      .then(response => {
        this.props.signIn(newUser.email, newUser.password)
          .then(response => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', this.state.email);
            this.props.history.push('/upload')
          })
      }).catch(err => {
        this.setState({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          modalOpen: true
        })
    })
  }
    
  handleClose = () => this.setState({ modalOpen: false })

  render() {
    const modalStyle = {
      margin: 'auto',
      marginTop: 'auto !important',
      height: '160px'
    };
    return (
      <div>
        <Modal open={this.state.modalOpen} onClose={this.handleClose} size='small' style={modalStyle}>
          <Modal.Content>
            <Modal.Description>
                <h4>Error registering, please try again</h4>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button primary onClick={this.handleClose}>
                OK
            </Button>
          </Modal.Actions>
        </Modal>
        <div className='login-form'>
          <style>{`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
              height: 100%;
            }
          `}</style>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 650 }}>
              <Header as='h2' color='teal' textAlign='center' style={{ marginTop: '15px' }}>
                Register for a new account  
              </Header>
              <p style={this.state.show}>All fields required &amp; passwords should match</p>
              <Form size='large' onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                    onChange={this.handleInput}
                    name="first_name"
                    value={this.state.first_name}
                    fluid icon='user'
                    iconPosition='left'
                    placeholder='First Name'
                  />
                  <Form.Input
                    onChange={this.handleInput}
                    name="last_name"
                    value={this.state.last_name}
                    fluid icon='user'
                    iconPosition='left'
                    placeholder='Last Name'
                  />
                  <Form.Input
                    onChange={this.handleInput}
                    name="email"
                    value={this.state.email}
                    fluid icon='mail'
                    iconPosition='left'
                    placeholder='E-mail address'
                  />
                  <Form.Input
                    onChange={this.handleInput}
                    name="password"
                    value={this.state.password}
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                  />
                  <Form.Input
                    onChange={this.handleInput}
                    name="password_confirm"
                    value={this.state.password_confirm}
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password Confirm'
                    type='password'
                  />

                  <Button color='teal' fluid size='large'>
                    Register
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

const noshow = {
  display: "none",
}

const show = {

}

const ModalContainer = props => (
  <Modal dimmer="blurring" style={{height: '34em', marginTop: '10em'}} size="small" open={props.openLogin} onClose={props.closeLogin} centered={false}>
      <RegistrationForm {...props} history={props.history} />
  </Modal>
)

const mapStateToProps = state => state;

export default connect(mapStateToProps, { signIn })(withRouter(ModalContainer));
