import React from 'react';
import WhatsApp from '../../../assets/whatsapp-peacock.png'
import Email from '../../../assets/email-peacock.png'
import Pin from '../../../assets/pin-peacock.png'
import Instagram from '../../../assets/instagram-peacock.png'
import Facebook from '../../../assets/facebook-peacock.png'
import Twitter from '../../../assets/twitter-peacock.png'
import phone from '../../../assets/phone-peacock.png'

import children from '../../../assets/about-pic.jpg'

function AboutAndContact() {

    return (
        <>
            <div className="wrapper">

                <section className="about-container" >
                    <h1>About Us</h1>
                    <section className="about-content">
                        <p>Since 2014, The Garden of Knowledge has always had the local community at heart. We have a passion for providing the highest standards to students and parents. Our staff are the cornerstone of our business and we strive to provide a positive and productive work environment.</p>
                    
                            <h3>Our Vision</h3>
                            <p>Making interactive language learning a possibility for all.</p>
                        
                            <h3>Our Mission</h3>
                            <p>We provide the highest standards of language learning, adapting to people's wants and needs. Our students will have a measurable output, both in the center and at school or work.</p>
                    </section>
                    <img className="children" src={children} />
                </section>
                 
                <section className="contact-container">
                    <div id="contact-us">
                        <h1>Contact Us</h1>        
                        <section className="contact-section">
                            <img src = {WhatsApp} alt="whatsapp"/>
                            <div classname="info">         
                            <a href="https://api.whatsapp.com/send?phone=97335617635&text=Hello,%20Garden%20of%20Knowledge,%20I%20was%20browsing%20your%20website.%20I%20am%20interested%20in%20your%20courses." target="_blank" rel="noopener noreferrer" >  
                                <p>WhatsApp: </p> 
                                <p>+973 3561 7635</p>
                            </a>       
                            </div>
                        </section>
                        <section className="contact-section">
                        <img src = {phone} alt="phone"/>
                        <div className="info">
                            <a href="tel:+973 3561 7635">
                            <p>Telephone:</p>
                            <p>+973 3561 7635</p>
                            </a>
                        </div>
                        </section>
                        <section className="contact-section">
                            <img src = {Email} alt="email"/> 
                            <div classname="info"> 
                            <a href="mailto:speakout.info.bh@gmail.com?subject=Hello&body=Hello%20Garden%20of%20Knowledge,%0D%0A%0D%0AI%20was%20browsing%20your%20website.%20I%20am%20interested%20in%20your%20courses.%20">
                                <p>Email: </p>
                                <p>speakout.info.bh@gmail.com</p>
                                </a>    
                            </div>
                        </section>               
                        <section className="contact-section">
                            <img src ={Pin} alt="address"/> 
                            <div classname="info">
                            <a href="https://goo.gl/maps/iJX8iSdev6ohXKVc8" target="_blank" rel="noopener noreferrer" >
                                <p>Street Address:</p> 
                                <address>Rd No 3949<br/>
                                Bani Jamra, Bahrain</address>
                            </a>    
                            </div>
                        </section>
                    
                        <section className="contact-section">
                        
                            <img src ={Instagram} alt="Instagram" /> 
                            <div >
                            <a href="https://www.instagram.com/the_garden_of_knowledge/" target="_blank" rel="noopener noreferrer" >
                                <p>Instagram: </p>
                                <p>the_garden_of_knowledge</p>
                                </a>
                            </div>
                        
                        </section>
                        <section className="contact-section">
                            <img src ={Facebook} alt="Facebook"/> 
                            <div classname="info">
                            <a href="https://www.facebook.com/thegardenofknowledgeedu" target="_blank" >               
                                <p>Facebook:</p>
                                <p>thegardenofknowledgeedu</p>
                            </a>
                            </div>
                        </section>
                        <section className="contact-section">
                            <img src ={Twitter} alt="Twitter" /> 
                            <div classname="info">
                            <a href="https://twitter.com/thegardenedu" target="_blank" rel="noopener noreferrer" >
                                <p>Twitter:</p>
                                <p>thegardenedu</p>
                            </a>    
                            </div>
                        </section>
                    </div>
                </section>
            </div>
        </>
    )
}

export default AboutAndContact;