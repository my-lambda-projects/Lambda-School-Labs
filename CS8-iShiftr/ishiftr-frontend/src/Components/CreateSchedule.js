import React, { Component } from 'react';
import { Button} from 'reactstrap';
import Notifications, {notify} from 'react-notify-toast';
import '../css/CreateSchedule.css';
import axios from 'axios';

const id = localStorage.getItem('id');
const authToken = localStorage.getItem('authToken');
const config = {
        headers: {
            'Authorization': "Bearer " + authToken            
        },
};

class CreateSchedule extends Component {
    constructor (props) {
        super(props)
        this.state = {
          date: '',
          startTime: '',
          endTime: '',
          duplicate: '',
          autoAsign: '',
          day: '',
        };
      }
    

    handleFormChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    
    }

    onSubmit = (e) => {
        e.preventDefault();
        let formData = this.state;
        let newDate = new Date(formData.date);
        let day = newDate.getDate() + 1;
        let month= newDate.getMonth() + 1;
        let year = newDate.getFullYear()
        formData.date = `${month}-${day}-${year}`;
        console.log(formData.day, formData.date);
        axios.post(`https://ishiftr-db.herokuapp.com/api/createSchedule/${id}`, {
                day: formData.day,
                date: formData.date,
                startTime: formData.startTime,
                endTime: formData.endTime,
                //duplicate: formData.duplicate,
                //autoAsign: formData.autoAsign,
            }, config)
            .then(response => {
                notify.show("Success! You made a schedule for one day.");
                this.setState({
                    date: '',
                    startTime: '',
                    endTime: '',
                    duplicate: '',
                    autoAsign: '',
                    day: '',          
                  });
            })
            .catch(error => { console.log('Error: could not save data to db') });         
    }
    

    render() {
        return (               
            <div className = 'row justify-content-center'>
                <Notifications />
                <div className='main mt-4'>                    
                </div>              
                <div className = 'col col-6 justify-content-center border rounded p-4'>
                   <h5 className = 'font-weight-bold centered'>Fill out the form below to create your schedule:</h5>
                   <p className ='mb-5 centered'>Notice that the schedule can only be created for one day at a time.</p>
                    <form className = 'mb-2' onChange = {this.handleFormChange} onSubmit={this.onSubmit} required>
                        <span className = 'mr-3'>Date: </span>
                        <input className = 'px-3' type="date" name="date" required/><br />
{/*                     
                    <form className = 'mb-3' onChange = {this.handleFormChange}> */}
                            <span className = 'mr-2'>Time: </span>  
                        <input type="time" name="startTime" value = {this.state.startTime} required/>
                            <span>To </span> 
                        <input type="time" name="endTime" value = {this.state.endTime} required/>
                    {/* </form> */}
                        {/* <form className = 'mb-3' onChange = {this.handleFormChange} onSubmit = {this.onSubmit}> */}
                           <div className = 'mb-4 flexBox'>
                                <span className ='mr-2'>Day: </span>
                                <div>
                                    <input type="radio" name="day" value="Monday" required/>Mon
                                    <input type="radio" name="day" value="Tuesday"/>Tues
                                    <input type="radio" name="day" value="Wednesday"/>Wed 
                                    <input type="radio" name="day" value="Thursday"/>Thu<br/>
                                    <input type="radio" name="day" value="Friday"/>Fri
                                    <input type="radio" name="day" value="Saturday"/>Sat
                                    <input type="radio" name="day" value="Sunday"/>Sun<br/>
                                </div>
                            </div>

                            <div className = 'mb-3'>
                                <input type="checkbox" name="duplicate" value="duplicate"/> Duplicate Previous week Schedule<br/>
                                <input type="checkbox" name="autoAsign" value="autoAsign"/> Auto Asign Shifts
                            </div>
                            <Button className='btnGen px-5' type="submit">Generate Schedule</Button>
                    </form>  
                </div>   
            </div>                                
        );
    }
}

export default CreateSchedule;
