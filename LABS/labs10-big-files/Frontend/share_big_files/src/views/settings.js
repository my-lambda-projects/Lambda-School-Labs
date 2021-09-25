
import React, { useState, useEffect } from 'react'; 
import styled from 'styled-components';
// import { userInfo } from 'os';


const SettingsDiv = styled.div`
border:1px solid red;
display: flex;
flex-direction: column;
flex-wrap: wrap;
height: auto;
width: 25%;
min-width: 459px;
padding: 10px; 
line-height: 3;
border-radius: 10px;
background-color: white;
@media (max-width: 768px) {
    min-width: 300px;
}
// @media (max-width: 390px) {
//     min-width: 300px;
// }
`;

const Title = styled.h3`
 margin: 0 auto;
`;

const InputDivs = styled.input`
  width: 100%;
  height: 3rem;
  margin: 3% 0;
  border: none;
  box-shadow: 0 0 0;
  border-bottom: 1px solid black;
  &:placeholder:
  color: black;
`;

const Button = styled.button`
width: 25%;
margin: 0 auto;
cursor: pointer;
border-radius: 10px;
`;


///going to need hooks for input state
const Settings = () =>{
  const [name, setName] = useState(null);
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [newPassword2, setNewPassword2] = useState(null);
  const [user, setUser] = useState(null);
  console.log(user);
  useEffect(()=>{
    const profile = JSON.parse(localStorage.getItem('profile'));  
    setUser(profile)
 
  } ,[])
  console.log("INSIDE SETTINGS", name, oldPassword, newPassword);
    
        function handleChange(e) {
            if ( e.target.name === "name") {
                setName(e.target.value)
                console.log("NAME" + name)
            } 
                else if  ( e.target.name === "oldPassword") {
            setOldPassword(e.target.value)
            console.log("OLDP" + oldPassword)
            } 
                else if ( e.target.name === "newPassword") {
            setNewPassword(e.target.value)
            console.log("NEWP" + newPassword)
            } 
                else if ( e.target.name === "newPassword2") {
            setNewPassword2(e.target.value)
            console.log("NEWP2" + newPassword2)
            }
        }

        

        function handleConfirmPassword() {

           console.log("INSIDE HANDLECONFIRM", name, oldPassword, newPassword, newPassword2);
            // const [user, setUser] = useState(null);
            // useEffect(()=>{
            //   const profile = JSON.parse(localStorage.getItem('profile'));  
            //   setUser(profile)
           
            // } ,[])

            // if ( oldPassword === newPassword ) {
            //     alert("New password and Old password must be different")
            // }

            // if ( newPassword !== newPassword2 ) {
            //     alert("New passwords must match");
            //     } else {
            //         const updatedUser = {
            //             ...user,
            //             password: newPassword
            //         }

            //         axios
            //             .put(`http://lambdafiles.us-east-2.elasticbeanstalk.com/api/users/users/tjkisner`, updatedUser)
            //             .then(response => {
            //                 console.log(response);
            //                 setNewPassword(response.handleConfirmPassword)
            //             })
            //             .catch(e => console.log(e));
            //     }
           
            
        }
        
    return(
        <SettingsDiv>
            <Title>
            Change Your Password
            </Title>
                <InputDivs
                type="text"
                placeholder="Name"
                name="setFileName"
                onChange={handleChange}
                />
                <InputDivs
                type="text"
                placeholder="Old Password"
                onChange={handleChange}
                />
                <InputDivs
                type="text"
                placeholder="New Password"
                onChange={handleChange}
                />
                <InputDivs
                type="text"
                placeholder="New Password Again"
                onChange={handleChange}
                />
            
            <Button onClick={() => handleConfirmPassword()}>Save</Button>
        </SettingsDiv>
    )

    
}

export default Settings;
