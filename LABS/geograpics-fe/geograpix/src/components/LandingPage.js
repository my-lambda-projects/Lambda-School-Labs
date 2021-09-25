import React from 'react';

import MapIcon from '../assets/map-gradient-icon.png';
import SearchIcon from '../assets/search.png'
import NetworkIcon from '../assets/network.png'
import Logo from '../assets/handwrittenlogo.svg'

const LandingPage = (props) => {

    const cta = (e) => {
        e.preventDefault();
        props.history.push('/register')
    }

    return(
        <div className="page">
            <div className="overlay"></div>
                <div className="container">
                    <img src={Logo} className="title" alt="Geograpics Logo" />
                    <h1 className="tagline">Snap. Post. Map.</h1>
                    {/* <h1 className="tagline">Your Destinations.<br/>Your Posts.<br/> Your Map.</h1> */}
                    <div className="tagline-details">
                        <div className="bullet-container"> 
                            <img src={NetworkIcon} style={{height: '30px'}} alt="Network Icon" />
                            <p className="tagline-bullet">Connect seamlessly to Instagram</p>
                        </div>
                        <div className="bullet-container">
                            <img src={MapIcon} style={{height: '35px'}} alt="Map Icon" />
                            <p className="tagline-bullet">Share your map with friends and family</p>
                        </div>
                        <div className="bullet-container">
                            <img src={SearchIcon} style={{height: '30px'}} alt="Filter Icon" />
                            <p className="tagline-bullet">Filter your photos to see memorable events</p>
                        </div>
                    </div>
                    <h3 className="cta">What does <strong>your</strong> map look like?</h3>
                    <button className="cta-button" onClick={cta}>Try It Now</button>
                </div>
            
        </div>
    )
}

export default LandingPage;