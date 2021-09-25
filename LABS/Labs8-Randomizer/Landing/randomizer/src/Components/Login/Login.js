// Libraries
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { withAlert } from "react-alert";

//Icons
import Backarrow from '@material-ui/icons/ArrowBack';

// Stylings
const Homediv = styled.div`
border: 3px solid #dfece6;
width: 500px;
height: 100%;
background-color: rgba(255,255,255,.9);
display: flex;
justify-content: center;
border-radius: 4px;
font-size: 26px;

@media (max-width: 400px) {
    flex-direction: column;
    width: 500px;
    justify-content: center;
    height: 20px;
    background-color: none;
    border: none;
    margin-top: 100px;
}
`
const Welcomer = styled.h1`
margin-left: 10px;
position: absolute

@media (max-width: 400px) {
    font-size: 48px;
    position: static;
    margin-left: 95px;
  }`
const Userenter = styled.input`
text-decoration: none;
width: 200px;
height: 30px;
position: absolute;
margin-top: 150px;
padding-left: 10px;
border: 1px solid grey;
transition: .4s;
color: black;

@media (max-width: 400px) {
   margin-top: 0px;
    position: static;
    margin-left: 50px;
  }
:: placeholder {
    color: black;
}
`
const Passenter = styled.input`
padding-left: 10px;
text-decoration: none;
width: 200px;
height: 30px;
position: absolute;
margin-top: 200px;
border: 1px solid grey;
transition: .4s;

@media (max-width: 400px) {
    position: static;
    margin-top: 5px;
    margin-left: 50px;
  }
:: placeholder {
    color: black;
}
`

const Signin = styled.button`
width: 150px;
height: 40px;
background-color: #00E1F5;
cursor: pointer;
border: none;
text-decoration: none;
margin-top: 250px;
position: absolute;
color: black;
transition: .5s;

:hover {
    opacity: .9;
    color: white;
}

@media (max-width: 400px) {
    margin-top: 50px;
    width: 100px;
    height: 40px;
    margin-left: 25px;
  }
`

const Former = styled.form`
display: flex;
flex-direction: column;
align-items: center;
`

const Sider = styled.button`
text-decoration: none;
background-color: none;
border: none;
cursor: pointer;
height: 25px;
background: none;
width: 30px;

@media (max-width: 400px) {
    margin-left: 150px;
}
`
class Login extends Component {
    constructor() {
        super();
        this.state={
            username:"",
            password: "",

        }
    }

 handleSubmit = e => {
    e.preventDefault();

    axios
      .post('https://labs8randomizer.herokuapp.com/api/login', this.state)
      .then(res => {
        if (!res.data.key){
            alert('No user exists with those credentials - Sign up?')
        }
        else{
        const token = res.data.key;

        localStorage.setItem('jwt', token);
        this.props.history.push('/ViewClasses');
      }})
      .catch(err => {
        this.props.alert.error("No user exists with those credentials, sign up?")
      });
    this.setState({ username: '', password: '' });
  };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

    render() {
        return (

            <Homediv>



                <Link to='/' style={{width: '30px'}}>
                <Sider>
                <Backarrow style={{fontSize:'24px', color:'black'}}></Backarrow>
                </Sider>
                </Link>

                <Welcomer>Sign In</Welcomer>



                <Former onSubmit={this.handleSubmit}>
               <Userenter name="username" placeholder="Email"
               value={this.state.username} onChange={this.handleInput}></Userenter>

               <Passenter name="password" placeholder="Password" type="password"
               value={this.state.password} onChange={this.handleInput}></Passenter>
           
            
          <Signin onSubmit={this.handleSubmit}> Login </Signin>      
          
               </Former>


            </Homediv>
        )
    }
}
export default withAlert(Login);
