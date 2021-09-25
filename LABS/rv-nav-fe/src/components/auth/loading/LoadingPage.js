import React, { Component, useState, useEffect } from "react";
import "../loading/LoadingPage.css"

import  {ReactComponent as OnboardLoad}  from '../../../assets/img/Onboarding-CreatingProfile-loading-SVG.svg';

const loadingPage = () => {

return(
    <div class="loading-wrapper">
        <div class="wrapper">
            {/* <OnboardLoad/> */}
            <h1>ARE U LOADING</h1>
        </div>        
    </div>
);
    
}






export default loadingPage;