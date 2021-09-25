import React, { Component } from 'react'
import { Route, withRouter, Link} from 'react-router-dom';
import axios  from 'axios';
import ShiftSchedule from './ShiftSchedule';
import EmployeesList from './EmployeesList';
import CreateSchedule from './CreateSchedule';
import Billing from './Billing';
import Settings from './Settings';
import AddEmployee from './AddEmployee';
import SignOut from './Signout';
import '../css/employerDashboard.css';
import Menu from './Menu';
import EditShift from './EditShift';
import EditEmployee from './EditEmployee';


class EmployerDashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            employer: ''
        }
    }


    componentDidMount(){
        const id = localStorage.getItem('id');
        const authToken = localStorage.getItem('authToken');
        const config = {
            headers: {
                'Authorization': "Bearer " + authToken            
            },
        };
        axios
            .get(`https://ishiftr-db.herokuapp.com/api/employer/${id}`, config)
            .then(response => {
                this.setState({ employer: response.data });   
            })
            .catch(error => {
                console.log("There was an error fetching the employer's data", error);
            });
            
    }


  render() {
    let path = this.props.location.pathname.split('/');
    let firstName = this.state.employer.firstName
    let lastName = this.state.employer.lastName
    return (

        // A wrapper for all the contains of the dashboard 
        <div className = 'mx-5'>

            {/* A row for the breadcrumb and signout button*/}
            <div className='row mt-1'>
                <div className='col col-11'>
                    <div className = 'breadcrumb bg-white px-0'>
                        <Link to ='/admin-dashboard' className = 'breadcrumb-item'>Dashboard</Link>
                        <li className = 'breadcrumb-item active'>{path[2]}</li>
                    </div>
                </div>
                <div className="col col-1">
                    <SignOut />
                </div>
            </div>

            {/* A row for the breadcrumb and signout button*/}
            <div className='row mt-4'>
                <div className='col col-2 border-right'>
                    <Menu />  
                </div>
                <div className='col col-10'>
                    <Route exact path = '/admin-dashboard' 
                        render={() => 
                        <div className = 'py-5 centeredDash border'>
                            <div className = 'traspBackground'>
                                <h1>Welcome to your dashboard, <span className = 'capitalText'>{firstName} {lastName}</span>!</h1>
                                <p className="selection">Make a selection from the menu items on the left.</p>
                                <p className="selection"> To start, click the <span className="empText">Employees</span> section to begin adding your employees.</p>
                            </div>
                        </div>

                     }
                     />
                    <Route path="/admin-dashboard/ShiftSchedule" component={ShiftSchedule} />
                    <Route path="/admin-dashboard/Employees" component={EmployeesList} />
                    <Route path="/admin-dashboard/Create" component={CreateSchedule} />
                    <Route path="/admin-dashboard/Billing" component={Billing} />
                    <Route path="/admin-dashboard/Settings" component={Settings} />
                    <Route path="/admin-dashboard/AddEmployee" component={AddEmployee} />
                    <Route path = "/admin-dashboard/editShift" component = {EditShift} />
                    <Route path = "/admin-dashboard/editEmployee/:id" component = {EditEmployee} />                    
                </div>

            </div>
        </div>
    );
  }
}

export default withRouter(EmployerDashboard);
