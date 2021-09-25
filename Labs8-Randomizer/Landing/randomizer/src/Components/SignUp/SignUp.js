// Libraries
import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import axios from  'axios';
import { withAlert } from "react-alert";

// Icons
import Backarrow from '@material-ui/icons/ArrowBack';

// Stylings
const FormStyling = styled.form`
display: block;
`
const InputStyling = styled.input`
display: block;
margin-bottom: 10px;
text-decoration: none;
background-color: none;
border: none;
width: 200px;
height: 30px;
border: 1px solid black;
:: placeholder {
  color: black;
}
padding-left: 10px;
`
const Signin = styled.button`
outline: 0;
width: 150px;
height: 40px;
background-color: #00E1F5;
cursor: pointer;
border: none;
text-decoration: none;
margin-left: 30px;
position: absolute;
color: black;
transition: .5s;

:hover {
    opacity: .9;
    color: white;
}
@media (max-width: 400px) {
    margin-left: 55px;
    width: 100px;
    height: 40px;
  }
`
const LabelStyling = styled.label`
    display: block;
`
const Homediv = styled.div`
width: 500px;
height: 350px;
flex-direction: column;
display: flex;
justify-content: center;
align-items: center;
background-color: rgba(255,255,255,.9);
border: 3px solid #dfece6;
@media (max-width: 400px) {
    height: 240px;
    background-color: none;
    border: none;
    margin-left: 75px;
    margin-top: 50px;
  }
`
const Welcomer = styled.h1`
font-size: 48px;
margin-bottom: 25px;
margin-right: 20px;
margin-top: 0px;
@media (max-width: 400px) {
    margin-bottom: 20px;
    margin-left: 20px;
  }
`

class SignUp extends Component {
 


  SignUpSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
   
    axios.post('https://labs8randomizer.herokuapp.com/api/registration', {
      "username": data.get('username'),
      "password1": data.get('password'),
      "password2": data.get('password-confirm'),
    })
    .then(res => {
      const token = res.data.key;
      
      localStorage.setItem('jwt', token);
    
      this.props.history.push('/ViewClasses');
    })
    .catch(error => {
      this.props.alert.error(error.response.data['error'])
    })
  }

  render() {
    return(
        <Homediv>
            <Link to='/'>
            <Backarrow style={{fontSize:'24px', color:'black'}}></Backarrow>
            </Link>
            <Welcomer> Sign Up</Welcomer>
            
            <FormStyling className="sign-up" onSubmit={this.SignUpSubmit}>
                <LabelStyling htmlFor='username'>  </LabelStyling>
                <InputStyling type='text' name='username' id='username' placeholder='Email' required='true'/>

                <LabelStyling htmlFor='password'> </LabelStyling>
                <InputStyling type='password' name='password' id='password' placeholder='Password' required='true'/>

                <LabelStyling htmlFor='password-confirm'> </LabelStyling>
                <InputStyling type='password' name='password-confirm' id='password-confirm' placeholder='Confirm Password' required='true'/>

                <Signin>Submit</Signin>
            </FormStyling>
        </Homediv>
)
    }
}

export default withAlert(SignUp);
