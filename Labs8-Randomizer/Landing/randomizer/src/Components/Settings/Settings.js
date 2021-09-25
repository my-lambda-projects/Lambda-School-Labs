// Libraries
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {withAlert} from 'react-alert'

//Components
import Billing from '../Billing/billing';

// Stylings
const FormStyling = styled.form`
display: block;
`
const VerifyStylingForm = styled.form`
display: ${(props) => props.display ? "block" : "none"};
`
const InputStyling = styled.input`
padding-left: 10px;
display: block;
margin-bottom: 10px;
text-decoration: none;
border: 1px solid grey;
width: 200px;
height: 25px;

:: placeholder {
  color: black;
}
`
const VerifyStyling = styled.input`
display: block;
margin-bottom: 10px;
text-decoration: none;
background-color: white;
border: none;
width: 175px;
height: 25px;
transition: .4s;
:hover {
    background-color: #bf4068;
    color: white;
}
`

const Homediv = styled.div`
width: 500px;
height: 600px;
border: 1px solid #dfece6;
background-color: rgba(255,255,255,.9);
border: 3px solid #dfece6;
display: flex;
margin-top: 25px;
align-items: center;
flex-direction: column;

@media (max-width: 400px) {
  width: 300px;
  height: 370px;
  border: none;
  background-color: none;
  margin-left: 100px;
}
`

const Welcomer = styled.h1`
color: black;
font-size: 36px;

@media (max-width: 400px) {
  font-size: 30px;
}
`

class Settings extends React.Component {
constructor(){
  super()
  this.state = {
    display: false
  }
}

AddNumber = (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  axios.post(`${'https://cors-anywhere.herokuapp.com/'}https://api.authy.com/protected/json/phones/verification/start`, {
    "api_key":"IkZeWLzSDR7fxTh3JYLX3xv7T62G51nN",
    "via":"sms",
    "phone_number": data.get('telephone'),
    "country_code":"1"
  })
  this.setState({display: true, phone_number: data.get('telephone')})
}

verifNumber = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.authy.com/protected/json/phones/verification/check`, {
      "api_key":"IkZeWLzSDR7fxTh3JYLX3xv7T62G51nN",
      "verification_code": data.get('verify'),
      "phone_number": this.state.phone_number,
      "country_code":"1"
    })
    .then(this.setState({display: false}))
    .catch(err => {})
  }

submitHandler = (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  const token =localStorage.getItem('jwt').toString();
  axios.post('https://labs8randomizer.herokuapp.com/api/updateuser',{"email": data.get('username'), "password1": data.get('password'), "password2": data.get('password-confirm')},{headers:{'Authorization':'Token '.concat(token)}})
  .then(res => {
    this.props.alert.success('User information has changed! YAY!')
    document.getElementById("userSettings").reset();
  })

  .catch(err => {}
    
  )
}

  render(){
    return(
      <Homediv>
        <Welcomer>Enter new Email/Password</Welcomer>

        <FormStyling id="userSettings" className="sign-up" onSubmit={(event) => this.submitHandler(event)}>

         
          <InputStyling placeholder="New Email" type='email' name='username' id='username' required='true'/>

          
          <InputStyling placeholder="Old Password" type='password' name='password' id='password' required='true'/>

          
          <InputStyling placeholder="New Password" type='password' name='password-confirm' id='password-confirm' required='true'/>

          <InputStyling type="submit" value="Save" style={{backgroundColor:'#00E1F5', marginLeft: '5px', border: 'none'}} />

        </FormStyling>
        <VerifyStylingForm display={!this.state.display} onSubmit={event => {
            this.AddNumber(event)}}>
            <div className="telephoneNumber">
           
              <InputStyling id='telephone' type="tel" name="telephone" placeholder="Telephone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
              <InputStyling type="submit" value="Save" style={{backgroundColor:'#00E1F5', marginLeft: '5px', border: 'none'}} />
            </div>
          </VerifyStylingForm>
          <VerifyStylingForm display={this.state.display}  onSubmit={event => {
              this.verifNumber(event)}}>
            <VerifyStyling id='verify'  name='verify' placeholder="Verify Number"/>
            <InputStyling type="submit" value="Save" style={{backgroundColor:'#00E1F5', marginLeft: '5px', border:"none"}}  />
          </VerifyStylingForm>

          <Billing></Billing>
        </Homediv>
      )
    }
  }

export default withAlert(Settings);
