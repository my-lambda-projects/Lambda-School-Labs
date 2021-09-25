import React, { Component } from 'react';
import CalendarComponent from './Calendar';





class ParentHome extends Component {
    render() {
      return (
        <>
            <CalendarComponent {...this.props}/>
            
        </>
      );
    }
  }
  
  export default ParentHome;