import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

//Basic Skeleton of SideMenu
//TODO: 
// add dropdown to races link
//figure out what schools links to


const SideMenu = (props) => {
    const url = window.location.href;
    if(url.includes('/adminrace')) {
        return (
            <div>
        <Nav vertical>
          <NavLink href="/adminrace">Races</NavLink> 
          <NavLink href="/admindelivery">Scoreboard</NavLink> 
          <NavLink href="/settings">Settings</NavLink> 
        </Nav>
      </div> )

    } else if(url.includes('/createrace') || url.includes('/showrace')) {
        return (
            <div>
        <Nav vertical>
          <NavLink href="/races">Races</NavLink> 
          <NavLink href="/admindelivery">Scoreboard</NavLink> 
          <NavLink href="/settings">Settings</NavLink> 
        </Nav>
      </div>)

    }else if(url.includes('/admindeliverypage')) {
        return (
             <div className="Menu">
        <Nav vertical>
          <NavLink href="/adminrace">Schools</NavLink> 
          <NavLink href="/admindelivery">Scoreboard</NavLink> 
          <NavLink href="/settings">Settings</NavLink> 
        </Nav>
      </div>)

    } else if(url.includes('/settings')) {
        return (
            <div className="Menu" >
        <Nav vertical>
          <NavLink href="/races">Races</NavLink> 
          <NavLink href="/admindelivery">Scoreboard</NavLink> 
          <NavLink href="/settings">Settings</NavLink> 
        </Nav>
      </div> )
    } else {
        return null;
    }

};

export default SideMenu;