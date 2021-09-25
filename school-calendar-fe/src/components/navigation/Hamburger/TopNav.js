import React, {useState, useEffect} from 'react'
import "./TopNav.css"
import {Image} from '@chakra-ui/core';

import { useAuth } from '../../../contexts/auth';
import styled from "styled-components"


const Hamburger = () => {
  const { googleApi } = useAuth();
  const { currentUser, handleSignOut } = googleApi;

  //state to hold current profile image
  const [img, setImg] = useState(currentUser.photoUrl);

  //attempt to fix issue where profile image url would be undefined
  useEffect(()=>{
    setImg(currentUser.photoUrl)
  },[])



  return (
    <div>
     
      <input type="checkbox" className="blue" id="menu" defaultChecked/>
      
        {/* <Label htmlFor="menu" className="icon">
        
          <div className="menu"></div>
        </Label> */}
       
        <nav className = "burger-container">
        <Image
              rounded="full"
              size="45px"
              src={img}
              alt="avatar"
              style={{marginTop: '0px', marginLeft: "20px", marginBottom: "0px"}}
            />
          <ul >
            <li onClick={() => {
              handleSignOut();
              window.location.reload();
              console.log("sign out")
            }}>
              <SignOut href="#">Sign Out</SignOut>
            </li>
          </ul>
        </nav>
    </div>
  )
}

export default Hamburger;

const SignOut = styled.a`
  background: #FC8181;
  padding: 6%;
  border-radius: 5px;
  margin-right: 35px;
  color: white;
`;

//stops checkbox highlighting blue when triggered
const Label = styled.label`
-webkit-tap-highlight-color: rgba(0,0,0,0) !important;
`;