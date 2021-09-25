import React, { useContext, useEffect, useState } from 'react';
import { useAuth } from '../../contexts/auth';
import { Context } from '../../contexts/Contexts';
import axiosWithAuth from '../../utils/axiosWithAuth';
import styled from 'styled-components';
import circleBtn from '../navigation/circle-plus.png';

const Contacts = ({ setShowAdminAddContact }) => {

    const { googleApi } = useAuth();
    const { currentUser } = googleApi;
    const { token } = currentUser;
    const { adminInfo, navState, setNavState, width, viewContacts, setViewContacts } = useContext(Context);

    //const [viewContacts, setViewContacts] = useState([]);


    const handleInvite = e => {
        setNavState(7);
    }

    const handleAddContact = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if(width < 768){
            // set navstate to show AdminAddContactForm
            setNavState(9);
        } else if (width >= 768){
            setShowAdminAddContact(true);
        }
    }

    // retrieves all contacts and sorts by first name
    const getAllContacts = () => {
        let sortAllContacts = []
        axiosWithAuth(token)
        .get(`/api/contacts/${adminInfo.adminId}`)
        .then(res => {
            // console.log(res.data.contacts)
            sortAllContacts = [...res.data.contacts]
            sortAllContacts.sort((a, b) => {
                let name1 = a.firstName.toUpperCase();
                let name2 = b.firstName.toUpperCase();
                if (name1 < name2) {
                    return -1;
                  }
                if (name1 > name2) {
                    return 1;
                  }
                  return 0;
            })
            setViewContacts([...sortAllContacts])
        })
        .catch(error => {
            console.log(error)
        })
    }


    useEffect(() => {
        getAllContacts()
    }, [navState])

    console.log('contacts: ', viewContacts)

    return(
        <ContactDiv className='contacts'>
            {viewContacts.map((contact, index) => {
                return(
                <Contact key={index} >
                    {/* Placeholder image */}
                    <i className="fas fa-user-alt" style={{ fontSize: '2.6rem', color: '#28807D', padding: '5px 2px 1px 2px', borderRadius: '0 9px 9px 9px' }}></i>
                    <div style={{ width: '100%', marginLeft: '15px', display: 'flex', flexWrap: 'wrap'}}>
                        <ContactNames>
                            {contact.firstName} {''}
                            {contact.lastName}
                        </ContactNames>
                        <IconDiv>
                            <Icons className="fas fa-phone"></Icons>
                            <Icons className="fas fa-comment-medical"></Icons>
                            <Icons className="fas fa-envelope"></Icons>
                            
                        </IconDiv>
                        {/* <input style={{width: '30%'}} type="radio" value={}/> */}
                    </div>
                </Contact>
                )
            })}
           {width < 768 && ( <BtnDiv>
                <img src={circleBtn} onClick={()=>{setNavState(5)}}></img>
                <Button>Add to group</Button>
            </BtnDiv>)}
            <BtnDiv>
                <BtnContact1 onClick={(e) => handleAddContact(e)} style={{ background: 'white', border: '2px solid #28807D', color: '#28807D' }}>Add Contact</BtnContact1>
                <BtnContact2 onClick = {handleInvite}>Invite Contact</BtnContact2>
            </BtnDiv>
            </ContactDiv>
    )
}

export default Contacts;

// styled components
const size = {
    tablet: '768px',
    desktop: '1024px'
  };
  
  const device = {
    desktop: `(min-width: ${size.desktop})`
  };

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    font-size: 1.2rem;
`;
const NavContainer = styled.div`
    width: 100%;
    display: flex; 
    flex-wrap: nowrap;
    justify-content: space-between;
    padding: 3% 2.5% 0 2.5%;
`;
const TabsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    font-size: 1rem;
    padding: 0 2.5% 0 0;
`;
const Tabs = styled.button`
    border: 1px solid #AFC9D9;
    border-radius: 10px 10px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 5px 10px;
`;
const IconDiv= styled.div`
    width: 70%;
    display: flex;
    flex-direction: row;
`;
const Icons = styled.i`
    font-size: 1.4rem;
    color: #AFC9D9;
    margin: 0 5%;
`;
const ContactDiv = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 2%;
    margin-bottom: 200px;
    @media ${device.desktop} {
        margin-bottom: 0;        
        }
`
const Contact = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 5% 2%;
`
const ContactTitle = styled.p`
    width: 48%;
    font-size: 20px;
    line-height: 27px;
    font-weight: bold;
`;
const BackBtn = styled.p`
  width: 48%;
  font-size: 1.2rem;
  text-align: right;
  line-height: 27px;
  color: #28807d;
`;
const ContactNames = styled.p`
    width: 100%;
    font-size: 1rem;
    color: #2E5780;
    padding-bottom: 2%;
`;
const Button = styled.button`
    background: white;
    color: #28807D;
    border-radius: 9px;
`;
const BtnDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding-top: 2%;
    font-size: 1.2rem;
    @media ${device.desktop} {
        flex-direction: column;        
        }
`;

const BtnContact1 = styled.button`
    border: 4px solid #28807D;
    padding: 3px 55px;
    border-radius: 9px;
    margin: 3% 0 0 1%;
    width: 50%;
    @media ${device.desktop} {
        margin: 0.5rem auto;
        cursor: pointer;
        width: 90%;
        color: #28807d;
        font-weight: bold;
        border: 2px solid  #28807d;
        border-radius: 0.5rem;
        text-align: center;
        padding: 0.25rem 1rem;   
        font-size: 1rem;   
        }
   
`;
const BtnContact2 = styled.button`
    border: 4px solid #28807D;
    background: #28807D;
    color: white;
    padding: 3px 55px;
    border-radius: 9px;
    margin: 3% 0 0 1%;
    width: 50%;
    @media ${device.desktop} {
        margin: 0.5rem auto;
        cursor: pointer;
        width: 90%;
        font-weight: bold;
        border: 2px solid  #28807d;
        border-radius: 0.5rem;
        text-align: center;
        padding: 0.25rem 1rem;      
        font-size: 1rem;
        }

`;

