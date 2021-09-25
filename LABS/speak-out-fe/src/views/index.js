import React from 'react';
import { Redirect } from "react-router-dom";
import AdminDashboard from './adminDashboard/components/index';
import UserDashboard from './userDashboard/components/index';
import StaffDashboard from './staffDashboard/components/index';

function Index() {
    // USER TYPE THAT WAS SAVED WHEN USER LOGGED IN

    let token = localStorage.getItem("token");
    let tokenData = JSON.parse(atob(token.split('.')[1]));;
    
    const userType = tokenData.user_type;

    if (userType === 'admin') {
      return <AdminDashboard />;
    } else if (userType === 'parent') {
      return <UserDashboard />;
    } else if (userType === 'staff') {
      return <StaffDashboard />;
    } else {
      return <Redirect to="/login" />;
    }
}

export default Index;
