import React, { useContext, useState } from 'react';
import { Context } from '../../contexts/Contexts';
import styled from 'styled-components';
import Groups from './Groups';
import Contacts from '../contacts/Contacts';

const Groups_Contacts = () => {

    const { setNavState } = useContext(Context);

    // control display: true = contacts, false = groups
    const [navToggle, setNavToggle] = useState(false);


    const handleBack = () => {
        setNavState(0);
    }

    return(
        <Container>
            <NavContainer>
                <Title className='contacts' style={{ alignContent: 'flex-start'}}>
                    {navToggle ? <div>Contacts</div> : <div>Groups</div>}
                </Title>             
                <BackBtn onClick={handleBack}>Back</BackBtn>
            </NavContainer>
            <TabsContainer style={{ justifyContent: 'flex-end'}}>
                <Tabs className='buttons' onClick={() => setNavToggle(false)}>Groups</Tabs>
                <Tabs className='buttons' onClick={() => setNavToggle(true)}>Contacts</Tabs>
            </TabsContainer>
            <ContentContainer>
                {navToggle ? <Contacts /> : <Groups />}
            </ContentContainer>
        </Container>
    )
}

export default Groups_Contacts;

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

const Title = styled.p`
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
  cursor: pointer;
`;

const ContentContainer = styled.div`
    width: 90%;
`;
