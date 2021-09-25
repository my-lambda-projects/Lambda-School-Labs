import React, { useState } from 'react'
import VehicleForm from '../../vehicleForm/VehicleForm.js';
import Vehicles from '../../vehicleForm/Vehicles';
import RoutingForm from '../../map/routingForm.js';
import RoutingSidebar from '../sidebar-routing/sidebar-routing';
import SidebarMenu from '../SidebarMenu';

//SCSS Styles
import './Sidebar-new.scss'

const Sidebar = (props) => {
    console.log("sidebarnewprops", props)
    const [state, setState] = useState({
        vehicleForm: "off",
        routing: "on",
        vehicles: "off",
        directions: "off" //<-- for routing side bar component -Jerry
    })
    console.log('props on Sidebar', props)

    
    const buttonSelect = (event) => { //gives the ability to the user to go to the directions sidebar 
        console.log("event", event.target);
        setState({
            ...state,
            vehicleForm: "off",
            routing: "off",
            vehicles: "off",
            directions: "on",
            [event.target.id]: "on"
        })

        var mq = window.matchMedia( "(max-width: 415px)" );

        if(mq.matches){ //checks if user's screen matches size, if it does it runs the if statement
            let div = document.getElementsByClassName('mainSidebarContainer')[0]
            div.style.height = '100%'
            div.style.margin = '0px'
            div.style.width = '100%'
        }
        
    }

    const selectVehicles = () => { //This have the user able to return from vehicle form to the initial form
        setState({
            ...state, 
            vehicleForm: "off",
            routing: "on",
            vehicles: "off",
            directions: "off", 
        })

        var mq = window.matchMedia( "(max-width: 415px)" );

        if(!mq.matches){ //checks if user's screen matches size, if it does it runs the if statement
            let div = document.getElementsByClassName('mainSidebarContainer')[0]
            div.style.margin = '25px';
            div.style.height =  '335px';

            let menu = document.querySelector('.btn-group-vertical > .btn, .btn-group > .btn')
            menu.style.backgroundColor = 'white'

        } else {

            let div = document.getElementsByClassName('mainSidebarContainer')[0]
            div.style.margin = '0px';
            div.style.height =  '335px';

            let menu = document.querySelector('.btn-group-vertical > .btn, .btn-group > .btn')
            menu.style.backgroundColor = 'white'
        }
        
    }

    const addAVehicleForm = () => { //This have the user able to go the form to add their vehicle
        setState({
            ...state,
            vehicleForm: "on",
            routing: "off",
            vehicles: "off",
            directions: "off", 
        })

        let div = document.getElementsByClassName('mainSidebarContainer')[0]
            div.style.margin = '0px';
            div.style.height =  '100%';
        
        let menu = document.querySelector('.btn-group-vertical > .btn, .btn-group > .btn')
        menu.style.backgroundColor = '#2A2E43'
    } 

    return (
        <div className='mainSidebarContainer'>
            <SidebarMenu/>
                <div className={`${state.routing}`}>
                    <RoutingForm
                        addAVehicleForm={addAVehicleForm}
                        state={state}
                        setState={setState}
                        buttonSelect={buttonSelect}
                        textDirections={props.textDirections}
                        toggle={props.toggle}
                        walmartSelected={props.walmartSelected}
                        campsiteSelected={props.campsiteSelected}
                        pointOfInterestDistance={props.pointOfInterestDistance}
                        loading={props.loading}
                        arcRoute={props.arcRoute}
                        onChangeHandler={props.onChangeHandler}
                        routeChangeHandler={props.routeChangeHandler}
                        start={props.start}
                        end={props.end}
                    />
                </div>

                {state.vehicles === 'on' ?  //List of vehicles
                    <Vehicles /> : null
                }

                {state.vehicleForm === 'on' ?
                    <VehicleForm //Form to add a vehicle
                        selectVehicles={selectVehicles}
                        state={state} 
                        setState={setState} 
                        buttonSelect={buttonSelect} 
                    />
                    : null
                }

            {/* vv Neccesary to render routing sidebar for directions vv -Jerry */}
            {state.directions === 'on' ?
                <RoutingSidebar //Sidebar that render's routing information
                    state={state}
                    setState={setState}
                    toggleSidebar={props.toggleSidebar}
                    textDirections={props.textDirections}
                    toggle={props.toggle}
                    walmartSelected={props.walmartSelected}
                    campsiteSelected={props.campsiteSelected}
                    pointOfInterestDistance={props.pointOfInterestDistance}
                    loading={props.loading}
                    arcRoute={props.arcRoute}
                    onChangeHandler={props.onChangeHandler}
                    routeChangeHandler={props.routeChangeHandler}
                    start={props.start}
                    end={props.end}
                />
                : null
            }
        </div>

    )
}



export default Sidebar;