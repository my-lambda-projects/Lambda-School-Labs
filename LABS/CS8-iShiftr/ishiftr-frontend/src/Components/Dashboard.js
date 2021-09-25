  import React, { Component } from "react";
  import { Route, withRouter, Link} from 'react-router-dom';
  import moment from 'moment'
  import axios from 'axios';
  import EmployeeMenu from "../Components/employeeMenu";
  import { Form, FormGroup } from "reactstrap";
  import "../css/Dashboard.css";
  import SignOut from './Signout';
  import employeeSettings from './employeeSettings';



  const id = localStorage.getItem('id');
  const authToken = localStorage.getItem('authToken');
  const config = {
          headers: {
              'Authorization': "Bearer " + authToken            
          },
  };

  class Dashboard extends Component {
    constructor(props) {
      super(props)
      this.state = {
        employee: [],
        timeOffDate: null,
        timeOffReason: '',
      }

      this.handleClick = this.handleClick.bind(this)
    }

    componentWillMount(){
      axios.get(`https://ishiftr-db.herokuapp.com/api/employee/${id}`, config)
          .then((res) => {
              console.log("schedule from res: ", res.data.schedules);
              this.setState({
                  employee : res.data,
              })
              
          })
          .catch(function (error) {
              console.log('there is an error', error);
          });
    }


    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleClick = (e) => {
      axios.put(`https://ishiftr-db.herokuapp.com/api/employee/${id}/editEmployee`, {
        timeOffDate: this.state.timeOffDate,
        timeOffReason: this.state.timeOffReason
      }, config)
          .then((res) => {
              //console.log(res.data);
              this.setState({
                  employee : res.data
              })
          })
          .catch(function (error) {
              console.log('there is an error', error);
      });
      console.log('time off', this.state.timeOffDate);

    }
    render() {
      //console.log(this.state.employee.timeOffApproved
    
      let path = this.props.location.pathname.split('/');
      let firstName = this.state.employee.firstName;
      let lastName = this.state.employee.lastName;
      return (
        // A wrapper for all the contains of the dashboard 
        
        <div className = 'mx-5'>



        {/* A row for the breadcrumb and signout button*/}
          <div className='row mt-4'>
              <div className='col col-11'>
                  <div className = 'breadcrumb bg-white px-0'>
                      <Link to ='/Dashboard' className = 'breadcrumb-item'>Dashboard</Link>
                      <li className = 'breadcrumb-item active'>{path[2]}</li>
                  </div>
              </div>
              <div className="col col-1">
                  <SignOut />
              </div>
          </div>
      
          {/*a row for the menu and main content*/}
          <div className="row mt-4">

            <div className="col col-2 border-right"> {/*************a col for menu*/}         
                <EmployeeMenu />          
            </div>


          <div className='col col-10'>    {/*************a col for main content*/}
              <Route exact path = '/dashboard' 
                  render={() => {
                    return ( 
                      <div className = 'row justify-content-center py-5 col-11 empWelcome '>
                        <h1>Welcome to your dashboard, <span className = 'capitalText'>{firstName} {lastName}</span>!</h1><br />                                        
                                                  
                        <div className="assignedShift">

                          <div className="shiftBox">
                              <fieldset className="p-5 fieldset">
                                  <legend className="border p-2 legend ">Assigned Shifts</legend>
                                  
                                    
                                  <div>
                                  {/*{this.state.employee.forEach(emp => {
                                              Object.keys(emp).forEach(key => {
                                                  if(key === 'schedules'){
                                                      emp.schedules.map(empl=>{
                                                          <p>{empl.day}</p>
                                                      })
                                                  }
                                              }
                                              )}
                                  )}
                                */}
                                schedule here
                                    
                                  </div>


                                </fieldset>
                          </div>

                          <div className="timeOff">
                            <fieldset className="p-5 fieldset">                        
                              <legend className="border p-2 legend">Time Off Approved</legend>
                              <p>{this.state.employee.timeOffApproved? <span>{moment(this.state.employee.timeOffDate).format('LL')}</span>: ""} </p>
                            </fieldset>
                          </div>


                        <div className="submitTime">
                            <fieldset className="p-5 fieldset">
                              <legend className="border p-2 legend">Submit Time Off Request</legend>

                              <Form onChange = {this.handleChange} onSubmit={this.handleClick}>
                              <FormGroup>
                                <label htmlFor="timeOffDate">Date</label>
                                <input type="date" name="timeOffDate" id="date" placeholder="date" value = {this.state.timeOffDate} />
                              </FormGroup>
                              <FormGroup>
                                <label htmlFor="timeOffReason">List Your Reason:</label>
                                <input
                                  type="text"
                                  name="timeOffReason"
                                  id="reason"
                                  placeholder="reason"
                                  value ={this.state.timeOffReason}
                                />
                              </FormGroup>
                              <button className="py-3 submitBtn" type="submit">Submit</button>
                            </Form>
                          </fieldset>
                        </div>
                      </div>
                    </div>
                        
                        )}}/>
                      <Route path = "/Dashboard/Settings" component = {employeeSettings} /> 
                </div>
            </div>
                      
          </div>
          );
      }  
  }
  export default withRouter(Dashboard);
