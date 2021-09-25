import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import './navigation.css';
//Breadcrumbs are set up and working 
//TODO: update the includes statments based on pages urls-
//lines 10, and 28  will need to be updated when ruting is updated to reflect any changes

const Breadcrumbs = (props) => {
    const url = window.location.href;
    if(url.includes('/adminrace')) {
        return (
            <div>
                <Breadcrumb tag="nav">
                    <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
                    <BreadcrumbItem active tag="span">Races</BreadcrumbItem>
                </Breadcrumb>
            </div> )

    } else if(url.includes("/showrace") || url.includes("/createrace")) {
        return (
            <div >
                <Breadcrumb tag="nav">
                    <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
                    <BreadcrumbItem active tag="span">Race New</BreadcrumbItem>
                </Breadcrumb>
            </div> )

    }else if(url.includes('/admindelivery')) {
        return (
            <div >
                <Breadcrumb tag="nav">
                    <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
                    <BreadcrumbItem active tag="span">Scoreboard</BreadcrumbItem>
                </Breadcrumb>
            </div> )

    } else if(url.includes('/settings')) {
        return (
            <div className="Breadcrumb">
                <Breadcrumb tag="nav">
                    <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
                    <BreadcrumbItem active tag="span">Settings</BreadcrumbItem>
                </Breadcrumb>
            </div> )
    } else {
        return null;
    }

};

export default Breadcrumbs;