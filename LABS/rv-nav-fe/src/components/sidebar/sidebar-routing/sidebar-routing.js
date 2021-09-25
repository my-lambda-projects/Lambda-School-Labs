import React, { useState } from 'react';
import { ReactComponent as ToggleShowArrow } from '../../../assets/img/show-sidebar.svg'
import { ReactComponent as ToggleHideArrow } from '../../../assets/img/hide-sidebar.svg'
import { NavLink } from 'react-router-dom';
import Loader from 'react-loader-spinner';

//SVG IMAGES FOR ROUTING
import { ReactComponent as StartingPoint } from '../../../assets/img/lightIcons/location (1).svg'
import { ReactComponent as EndingPoint } from '../../../assets/img/lightIcons/marker (1).svg'
import { ReactComponent as BackArrow } from '../../../assets/img/back.svg'

//Brings React loaders styles
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

//SCSS Styles
import './sidebar-routing.scss'
import Directions from './Directions.js';

const RoutingSidebar = (props) => {

    const [state, setState] = useState({ // state to toggles sidebar in and out
        sidebar: true
    })

    const toggleSidebar = () => { //functions that implements animation for sidebar toggle
        setState({ ...state, sidebar: !state.sidebar })

        if (state.sidebar === false) {
            let div = document.getElementsByClassName('mainSidebarContainer')[0]
            div.style.animation = 'slideLeft .5s';
            div.style.left = '0px';
        }
        else {
            let div = document.getElementsByClassName('mainSidebarContainer')[0]
            div.style.animation = 'slideRight .5s'
            div.style.left = '-375px';
        }
    }

    console.log('SIDEBARROUTING STATE', props.textDirections)

    //function that dynamically changes the sidebar styles
    const sidebarAnchor = () => { 
        let div = document.getElementsByClassName('mainSidebarContainer')[0]
        div.style.margin = '0px';
        div.style.height = '100%';
    }

    const revertChanges = () => { //changes state to go back to the initial form and changes styles of the sidebar dynamically

        props.setState({
            ...props.state,
            vehicleForm: "off",
            routing: "on",
            vehicles: "off",
            directions: "off",
        })

        let div = document.getElementsByClassName('mainSidebarContainer')[0]
        let mq = window.matchMedia( "(max-width: 415px)" );
        let menu = document.getElementsByClassName('dropdown')[0]

        if(mq.matches){
            div.style.background = '#2A2E43'
            menu.style.background = 'white'
            div.style.margin = '0px';
            div.style.height =  '400px';
            menu.style.width = '100%';
        } else {
            div.style.background = '#2A2E43'
            menu.style.background = 'white'
            div.style.margin = '25px';
            div.style.height =  '400px';
            menu.style.width = '100%';
        }
    }

    let mobileView = () => { //function that checks if the width of the users screen matches with media query, if it does, changes styles of sidebar.
        let mq = window.matchMedia( "(max-width: 415px)" );
        let div = document.getElementsByClassName('mainSidebarContainer')[0]
        let menu = document.getElementsByClassName('dropdown')[0]

        if(mq.matches){
            div.style.background = 'transparent'
            menu.style.width = '377px'
        }
    }


    return (
        !localStorage.token ? //Checks if there's a token,if there's one, renders form, if not renders message. -Jerry
            <NavLink to='/auth'>
            <p>Sign in or create an account to be able to create a route.</p>
            </NavLink>
        :
        <div className='containerWithArrow'>
            {props.loading !== 'Routing successful' ?
                <div className='loadingStatus'>
                    <div className="route-loading">{props.loading}
                    <Loader
                        type="Rings"
                        color="#00B2D9"
                        height={100}
                        width={100}
                    />
                    </div>
                </div> 
                :
                <>
                    {mobileView()}
                    <div className='arrowContainer' onClick={toggleSidebar}>
                        {state.sidebar === true ?
                            <ToggleHideArrow /> :
                            <ToggleShowArrow />
                        }
                    </div>
                    <div className='sidebarContainer'>
                        {/* <SidebarMenu /> */}
                        <div className='backbuttonContainer'>
                            <BackArrow />
                            <h6
                                className='routingBackButton'
                                onClick={revertChanges}
                            >Back</h6>
                        </div>
                        <div className='startEndContainer'>
                            <div className='startingPoint'>
                                <StartingPoint />
                                {/* <h3 id='estimatedTime'>17 mins (4 miles)</h3> */}
                                <div id='startPointContainer'>
                                    <p className='startAndEnd'>STARTING POINT</p>
                                    <p>{props.start}</p>
                                </div>
                            </div>
                            <div className='endingPoint'>
                                <EndingPoint />
                                <div id='destinationPointContainer'>
                                    <p className='startAndEnd'>DESTINATION</p>
                                    <p>{props.end}</p>
                                </div>
                            </div>
                        </div>
                        {/* <div className='sidebarOptions'>
                        <p>THIS ROUTE AVOIDS</p>
                    </div> */}
                        <h3 id='directionsTitle'>Directions</h3>
                        <div className="directions">
                            <Directions props={props.textDirections} />
                        </div>
                        <div className='sidebarFooterContainer'>
                            <p id='sidebarFooter'>These directions are for planning purposes only. You may find that construction projects, traffic, weather, or other events may cause conditions to differ from the map results, and you should plan your route accordingly. You must obey all signs or notices regarding your route.</p>
                        </div>
                    </div>
                    {sidebarAnchor()}
                </>
            }
        </div>
    )
};

export default RoutingSidebar;