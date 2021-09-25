import React from 'react';
// import { NavLink } from 'react-router-dom';

import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import './index.css';

export default class TopBar extends React.Component{

    
    render(){
        return(
            <div className='TopBar'>
                {/* <Breadcrumb className="Bread">
                    <BreadcrumbItem tag="a" href="#" active className="TopBreadcrumbItem">Home</BreadcrumbItem>
                    <BreadcrumbItem tag="a" href="#">Link</BreadcrumbItem>
                    <BreadcrumbItem tag="a" href="#">Link</BreadcrumbItem>
                </Breadcrumb> */}

                <Breadcrumb id='BreadCrumb'>
                    <BreadcrumbItem active>Home</BreadcrumbItem>
                </Breadcrumb>
                <Breadcrumb id='BreadCrumb'>
                    <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
                    <BreadcrumbItem active>Classes</BreadcrumbItem>
                </Breadcrumb>
                <Breadcrumb id='BreadCrumb'>
                    <BreadcrumbItem><a href="/"></a></BreadcrumbItem>
                    <BreadcrumbItem><a href=""></a></BreadcrumbItem>
                    <BreadcrumbItem active>Current Page</BreadcrumbItem>
                </Breadcrumb>
            </div>
        )
    }
}