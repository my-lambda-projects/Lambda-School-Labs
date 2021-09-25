//Libraries
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// Images
import Random from '../Img/hd.png';

// Components
import Login from '../Login/Login';
import GoogleApi from '../GoogleApi/GoogleApi';

// Stylings
const Homediv = styled.div`
width: 500px;
height: 600px;
background-color: rgba(255,255,255,.9);
border: 3px solid #dfece6;
display: flex;
justify-content: center;
flex-wrap: wrap;
border-radius: 5px;

@media (max-width: 400px) {
  height: 350px;
    margin-left: 35px;
    background-color: none;
    border: none;
  }
`
const Signup = styled.button`
outline: 0;
color: black;
width: 200px;
height: 60px;
background-color: #00E1F5;
cursor: pointer;
border: none;
border-radius: 3px;
margin-right: 5px;
transition: .5s;
text-decoration: none;
font-size: 24px;

:hover {
    opacity: .9;
    color: white;
}
@media (max-width: 400px) {
    font-size: 18px;
    width: 100px;
  }
`
const Signin = styled.button`
outline: 0;
color: black;
width: 200px;
height: 60px;
background-color: #00E1F5;
cursor: pointer;
border: none;
border-radius: 3px;
text-decoration: none;
transition: .5s;
font-size: 24px;

:hover {
    opacity: .9;
    color: white;
}

@media (max-width: 400px) {
    font-size: 18px;
    width: 100px;
    margin-bottom: 25px;
  }
`
const Welcomer = styled.h1`
font-size: 60px;
font-weight: 800;
color: black;
margin-bottom: 0px;
text-align: center;

@media (max-width: 400px) {
    font-size: 36px;
  }
`
const Welcomer2 = styled.h1`
display: flex;
text-align: center;
font-size: 30px;
margin-top: 0px;
color: #FF6A00;

@media (max-width: 400px) {
    font-size: 18px;
    width: 270px;
  }
`
const Logo = styled.img`
`

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {isCool: false}
      }
      toggleCoolness = () => {
        this.setState({ isCool: !this.state.isCool })
      }
   responseGoogle = response => {
       const username = response.profileObj.name
       const email = response.profileObj.email
       axios.post('https://labs8randomizer.herokuapp.com/api/tokenregister', {username:username, email:email})

       .then (res => {
         const token = res.data.key;

             localStorage.setItem('jwt', token);
             this.props.history.push('/ViewClasses');
           })
       .catch(err => {
            
           })
     }

      componentDidMount(){
          if (localStorage.getItem('jwt')){
            this.props.history.push('/ViewClasses')
          }
      }

    render() {
        const {isCool} = this.state;
        return (
            <Homediv>

                <Welcomer >Welcome to Randomizer </Welcomer>
                <Logo src={Random}></Logo>
                <Welcomer2>The modern way to track classroom participation</Welcomer2>

               <Link to='/Signup'>
                <Signup>Sign Up

                </Signup>
                </Link>

                <Link to='/Login'>
                <Signin onClick={this.toggleCoolness}>Login
                    {isCool ? (
                        <Login/>
                    ) : (
                        <div></div>
                    )}
                </Signin>
                </Link>
                <div>
                  <GoogleApi  responseGoogle={this.responseGoogle} theme='dark'/>
                </div>

            </Homediv>
        )
    }
}

export default Home;
