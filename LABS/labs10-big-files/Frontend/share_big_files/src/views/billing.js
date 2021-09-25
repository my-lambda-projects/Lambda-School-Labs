import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components"; 
import Stripe from "../components/StripeFE";
import SignOut from "../components/signOut";
import Upgrade from "../components/upgradeButton" 

const BasicMembershipDiv = styled.div`
  height: fit-content;
  width: 40rem; 
  border-radius: 5px;
  background-color: white;
  margin-left: 4%;
  @media(max-width: 900px) {
    width: 90%
    max-width: 90%;
    margin: 0 auto;
    margin-top: 30px 
  }
  @media(max-width: 390px) {
    width: 95%;
    max-width: 95%;
    margin: 0 auto;
  
  }
`;

const ProMembershipDiv = styled.div`
  height: fit-content;
  width: 40rem; 
  border-radius: 5px;
  background-color: white;
  margin-left: 4%;
  @media(max-width: 900px) {
    width: 90%
    max-width: 90%;
    margin: 0 auto;
    margin-top: 30px 
  }
  @media(max-width: 390px) {
    width: 95%;
    max-width: 95%;
    margin: 0 auto;
  
  }
`;

const TextDiv = styled.div`
  width: 100%;
  margin-bottom: 5%
  @media(max-width: 390px) {
    max-width: 95%;
    margin: 0 auto;
  }
`;
const Header1 = styled.div` 
width: 100%;
 text-align: center
 margin-bottom: 0;
 line-height: 1; 
@media(max-width: 900px) {
 padding-top: 20px;

}
`;
 
const Header3 = styled.div`
  text-align: center;
@media(max-width: 390px) {
  margin-left: 0%;
}
`;

 
const StripeDiv = styled.div`
width: 100%; 
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
  @media(max-width: 390px) {
    0 auto;
  }
`;

const ListItem = styled.li`
font-size: 1.75rem;
line-height: 2;
list-style: none;
margin-left: 8%;
`;


const ListItem2 = styled.li`
font-size: 1.75rem;
line-height: 2;
list-style: none;
margin-left: 8%;
font-weight: bold;
`;

const SignoutDiv = styled.div`
 display: flex;
 width: 100%;
 justify-content: center
`;

const UpgradeDiv = styled.div`
height: fit-content;
width: fit-content;
margin: 0 auto; 
`;

const Billing = () => {
  const [billing, setBilling] = useState(null);
  const [isPro, setIsPro] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const fetchData = async () => {
    const profile = JSON.parse(localStorage.getItem("profile"));
 
    axios
      .get(`https://api.backendproxy.com/api/users/${profile.nickname}`)
      .then(response => {
        console.log(response);
        var promise = new Promise(function(resolve, reject) {
          resolve(setBilling(response.data[0].paid));
        });
        promise.then(
          setIsPro(billing), 
          setLoaded(true)
        );
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const profile = JSON.parse(localStorage.getItem("profile"));  
  if (loaded) {
    if (billing) {
      console.log(isPro);
      console.log("billing: " + billing);
      console.log("isPro: " + isPro);
      return (
        <ProMembershipDiv>
          <TextDiv>
            <Header1>
            <h1>Membership Level: Pro</h1> 
            </Header1>     
            <div>
              <ListItem2>{profile.nickname}</ListItem2>
	      <ListItem2>{profile.email}</ListItem2>
              <ListItem>Send files up to 4MB with 70 days of storage</ListItem>              
            </div>
            <SignoutDiv><SignOut/></SignoutDiv>
            
          </TextDiv>
          
        </ProMembershipDiv>
      );
    }
    return (
      <BasicMembershipDiv>
        <TextDiv>
          <Header1>
            <h1>Membership Level: Basic</h1>
            </Header1>
      
       
          <div>
            <ListItem2>{profile.nickname}</ListItem2>
	    <ListItem2>{profile.email}</ListItem2>
            <ListItem>Send files up to 2MB with 7 days of storage</ListItem>
          </div>
          <Header3> <h2>Upgrade to 70 day storage</h2> </Header3>
	  <ListItem>Send files up to 4MB with 90 days of storage</ListItem>
         <StripeDiv>
           <UpgradeDiv>
           <Stripe />
           <Upgrade/>

           </UpgradeDiv>
           
           <SignOut/>
           </StripeDiv>
          
        </TextDiv>
        
       
      </BasicMembershipDiv>
    );
  }
  return <></>;
};
export default Billing;
