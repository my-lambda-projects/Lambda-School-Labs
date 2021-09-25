import React from 'react';
import Logo from '../../designs/Logo/CookBookLogo.svg';
import { withRouter } from "react-router-dom";

const Footer = (props) => {
    const handleRedirect = (path) => {
        props.history.push(path);
    }

    if (props.location.pathname === '/') {
        return (
            <div className='footer-container'>
    
                <div className='footer'>
    
                    <div className='main'>
    
                        <div className='brand'>
                        
                            <img className='logo' src={Logo} alt='company logo'/>
                            
                            <div className='title'>COOKBOOK</div>
                        
                        </div>
                    
                    </div>
    
                    <img className='bigLogo' src={Logo} alt='company logo'/>
                    
                    <div className="info">
    
                        <div className="contact-container">
                            <p className="label">contact</p>
                            <p>cookbook_project@yahoo.com</p>
                        </div>
    
                        <div className="team-container">
                            <p className="label">team</p>
    
                            <div className='names'>
                                <p>vu cao</p>
                                <p>katie gorbell</p>
                                <p>arthur pisakhov</p>
                                <p>braden walker</p>
                            </div>
                        </div>
    
                    </div>
    
                </div>
    
            </div>
        )
    } else {
        return ( 
            <div className='footer-container'>
    
                <div className='footer'>
    
                    <div className='main'>
    
                        <div className='brand'>
                        
                            <img className='logo' src={Logo} alt='company logo'/>
                            
                            <div className='title'>COOKBOOK</div>
                        
                        </div>
                        
                        <div className='links'>
                            <div className='line1'>
                                <p onClick={() => handleRedirect('/home/create')}>CREATE</p>
                                <p onClick={() => handleRedirect('/home/recipes')}>RECIPES</p>
                                <p onClick={() => handleRedirect('/home/calendar')}>CALENDAR</p>
                            </div>
                            <div className='line2'>
                                <p onClick={() => handleRedirect('/home/dashboard')}>GROCERY LIST</p>
                                <p onClick={() => handleRedirect('/home/settings')}>SETTINGS</p>
                            </div>
                        </div>
                    
                    </div>
    
                    <img className='bigLogo' src={Logo} alt='company logo'/>
                    
                    <div className="info">
    
                        <div className="contact-container">
                            <p className="label">contact</p>
                            <p>cookbook_project@yahoo.com</p>
                        </div>
    
                        <div className="team-container">
                            <p className="label">team</p>
    
                            <div className='names'>
                                <p>vu cao</p>
                                <p>katie gorbell</p>
                                <p>arthur pisakhov</p>
                                <p>braden walker</p>
                            </div>
                        </div>
    
                    </div>
    
                </div>
    
            </div>
        );
    }
}
 
export default withRouter(Footer);