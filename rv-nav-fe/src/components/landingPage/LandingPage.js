import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions";
import { ReactComponent as Heroback } from '../../assets/img/heroback.svg';
import { ReactComponent as MapLocation } from '../../assets/img/Map-Location.svg';
import { ReactComponent as Vehicles } from '../../assets/img/Vehicles.svg';
import { ReactComponent as OffRoad } from '../../assets/img/Off-Road.svg';
import { ReactComponent as Map } from '../../assets/img/Map.svg';
import { ReactComponent as Navigation2 } from '../../assets/img/navigation2.svg';

//CSS STYLES
import "./LandingPage.scss"; 

class LandingPage extends Component {

    render() {
        return (
            <div className='landing-page-container'>
                <div className="hero">
                    <div id="hero-back">
                        <Heroback className='heroback-img' />
                    </div>
                    <div className="hero-content">
                        <div id="login">
                            <Link to='/login'><button className="btn outline">Login</button></Link>
                        </div>
                        <div className='lp-uvp-wrapper'>
                            <div class="uvp">
                                <h1 id="rvway">RV WAY</h1>
                                <p id="blurb">Home is all around you</p>
                                <div id="signup">
                                    <div className='lp-signup-link'><Link to='/register'><button className="btn solid">Get Started</button></Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='lp-middle-content-wrapper'>
                    <div className='lp-middle-content'>
                        <div className="top">
                            <div className="image">
                                <MapLocation className='lp-middle-content-img' />
                            </div>
                            <div className="text">
                                <h2 className='middle-content-label'>Low Clearance Routing</h2>
                                <p className='lp-middle-content-p'>Low bridges got you down? RV Way automatically routes around bridges and tunnels with low clearances.</p>
                            </div>
                        </div>
                        <div className="right">
                            <div className="image">
                                <Vehicles className='lp-middle-content-img' />
                            </div>
                            <div class="text">
                                <h2 className='middle-content-label'>Vehicle Profiles</h2>
                                <p className='lp-middle-content-p'>People are unique, and RV’s are no different! Create a profile for your vehicle to get customized routing.</p>
                            </div>
                        </div>
                        <div className="left">
                            <div className="image">
                                <OffRoad className='lp-middle-content-img' />
                            </div>
                            <div className="text">
                                <h2 className='middle-content-label'>Dirt Road Warnings</h2>
                                <p className='lp-middle-content-p'>Dirt roads leaving you in the dust? We’ll warn you when there’s more than 2 miles of dirt roads on your route.</p>
                            </div>
                        </div>
                    </div>
                    <div className="cta">
                        <div className="image">
                            <Map className='lp-bottom-map-img' />
                        </div>
                        <div className="text">
                            <h1 className='lp-cta-h1'>Adventure awaits!</h1>
                            <div className="letsgo">
                                <Navigation2 className='lp-letsgo-img' />
                                <div className='lp-letsgo-link'><Link to='/register'>Let's Go!</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='lp-footer'>
                    <div className="copyright">
                        <p className='lp-footer-p'>© 2019 RV Way</p>
                    </div>
                    <div className="info">
                        <p className='lp-footer-p'>A Lambda School student project.</p>
                        <p className='lp-footer-p'>Want to learn more? <span className="bold">Meet our team</span></p>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        selected_id: state.selected_id,
        vehicles: state.vehicles
    }
}

export default connect(
    mapStateToProps, { logout }
)(LandingPage)
