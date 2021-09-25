import React from 'react';
// import Navbar from './components/Navbar';
import Services from './components/Services';
// import Features from './components/Features';
import Descriptions from './components/Descriptions';
import Pricing from './components/Pricing';
import Team from './components/Team';
import Process from './components/Process';
// import Testi from './components/Testi';
import Started from './components/Started';
// import Blog from './components/Blog';
// import Contact from './components/Contact';
// import SocialMedia from './components/SocialMedia';
// import Footer from './components/Footer';
// import FooterLinks from './components/FooterLinks';

import Aux from './components/hoc/Aux_';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// assets
import { landingPageImage1 } from './assets/index.js';

const Wrapper = styled.div`
    width: 100%;
`;

class HomeFive extends React.Component {
    render() {

    var bkg1 = {
        backgroundImage: 'url(images/img-2.jpg)',
        backgroundSize : 'cover',
        backgroundPosition : 'center',
    };

    const { toggleRegisterModal } = this.props;

    return (
        <Aux>
            <Wrapper>
                {/* Navbar Component*/}
                {/* <Navbar /> */}

                <section className="home-padding-t-150 position-relative" id="home"  style={bkg1}>
                    <div className="bg-overlay"></div>
                        <div className="display-table">
                            <div className="home-cell-bottom">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-8 offset-lg-2 text-white text-center">
                                            <h1 className="home-title">We help people connect with each other.</h1>
                                            <p className="padding-t-15 home-desc">Symposium is a place where like-minded people can come together to share and discuss ideas.</p>
                                            <span onClick = { toggleRegisterModal }>
                                                <Link to="" className="btn btn-custom margin-t-20">Get Started</Link>
                                            </span>
                                            <img src={ landingPageImage1 } alt="all-posts-view" className="img-fluid center-block margin-t-20" />  
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Component*/}
                <Services />

                {/* Features Component*/}
                {/* <Features /> */}

                {/* Descriptions Component*/}
                <Descriptions />

                {/* Pricing Component*/}
                <Pricing />

                {/* Process Component*/}
                <Process toggleRegisterModal = { toggleRegisterModal } />

                {/* Team Component*/}
                <Team />

                {/* Testi Component*/}
                {/* <Testi /> */}

                {/* Started Component*/}
                <Started toggleRegisterModal = { toggleRegisterModal } />

                {/* Blog Component*/}
                {/* <Blog /> */}

                {/* Contact Component*/}
                {/* <Contact /> */}

                {/* SocialMedia Component*/}
                {/* <SocialMedia /> */}

                {/* Footer Component*/}
                {/* <Footer /> */}

                {/* FooterLinks Component*/}
                {/* <FooterLinks /> */}

                {/* Switcher Component */}
                {/* <Switcher />  */}
            </Wrapper>
        </Aux>
  	);
  }
}

export default HomeFive;