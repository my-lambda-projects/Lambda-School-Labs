import React from 'react';
import axios from 'axios';
import EmployeeOnShift from './EmployeeOnShift';
import '../css/schedule.css';

const id = localStorage.getItem('id');
const authToken = localStorage.getItem('authToken');
const config = {
        headers: {
            'Authorization': "Bearer " + authToken            
        },
};


class Schedule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            schedules: [],
            employees: [],
        }
    }

    componentDidMount(){
        axios.get(`https://ishiftr-db.herokuapp.com/api/${id}/employees`, config)
            .then((res) => {
                console.log("response in testCal", res.data);
                this.setState({
                    employees : res.data,
                    schedules: this.props.schedule
                })
            })
            .catch(function (error) {
                console.log('there is an error', error);
            });
   
    }



    render() {
        console.log("employees from testCal", this.state.employees);
        return (
                        <div className = 'col px-4 mx-1 border-right border-dark' >
                            <div className='schedule-element-header mb-4'>
                                <div><strong>{this.state.schedules.day}</strong></div>
                                <div>{this.state.schedules.date}</div> 
                            </div>
                            <EmployeeOnShift day={this.state.schedules.day} employees={this.state.employees}/>
                        </div>       
        );
    }
}

export default Schedule;