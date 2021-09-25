import React from 'react';
import NavHeader from "./navheader";
import LeftMenu from "./leftmenu";
import Settings from "./settings";
import styled from 'styled-components';

const SettingsContainer = styled.div`
    width: 100%;
    height: auto;
    min-height: 100vh;
    margin: 0 auto;
    background-image: url("http://get.addonreviews.com/cmsimages/lp/fileshare/cloudbackground.jpg");
    background-size: 100% 100%;
`;
const MenuSettingsHolder = styled.div`
    display: flex;
    
`;

const SettingsHolder = props => {
    return (
        <SettingsContainer>
            <NavHeader {...props}/>
            <MenuSettingsHolder>
            <LeftMenu {...props}/>
            <Settings {...props}/>
            </MenuSettingsHolder>
        </SettingsContainer>
    )
}


export default SettingsHolder;