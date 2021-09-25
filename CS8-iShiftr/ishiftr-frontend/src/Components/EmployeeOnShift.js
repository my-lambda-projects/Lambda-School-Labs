import React, { Component } from 'react'


class EmployeeOnShift extends Component {

  
  render(){
    console.log("from onshift", this.props.employees, this.props.day);
    let filteredEmployees = this.props.employees.filter(employee =>{
        return employee.availability === this.props.day;
    })

    
      return (
        <div>
            {filteredEmployees.map((employee, index) =>{
                return(
                    <div key = {index} className = 'employee border rounded'>
                        <div className = 'employee-name'>{employee.firstName}</div>
                        <div>{employee.availability}</div>
                        <div>{employee.availableHours.startTime} - {employee.availableHours.endTime}</div>
                    </div>
                ) 
            })} 
        </div>
      );

    }

}


export default EmployeeOnShift;