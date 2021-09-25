import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Notifications, {notify} from 'react-notify-toast';
import Employee from './Employee';
import Loading from './Loading';
import '../css/employeesList.css';
let myColor = { background: '#0E1717', text: "#FFFFFF"}; 


const id = localStorage.getItem('id');
const authToken = localStorage.getItem('authToken');
const config = {
        headers: {
            'Authorization': "Bearer " + authToken            
        },
};

class EmployeesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: '',
            deletMsg: ''
        };

        this.handleDelete = this.handleDelete.bind(this);
    }


    handleDelete(id){
        axios.delete(`https://ishiftr-db.herokuapp.com/api/deleteEmployee/${id}`, config)
        .then((res) => {          
            this.setState({
                deletMsg: res.data.Message
            })
            notify.show(this.state.deletMsg, myColor);
            this.componentDidMount();    
        })
        .catch(function (error) {
            console.log('there was an error deleting employee', error);
        });
        
    }

    componentWillMount() {  
        axios.get(`https://ishiftr-db.herokuapp.com/api/${id}/employees`, config)
        .then((res) => {
            this.setState({
                employees : res.data
            })
        })
        .catch(function (error) {
            console.log('there is an error', error);
        });
    }

    render() {
        console.log(this.state.employees)
        return (
            <div className = 'pl-5'>

            { this.state.deletMsg? (

                    <div className='main mt-4'>
                        <Notifications />
                    </div>
                ) : (
                    ''
                )
            }          
                {
                    this.state.employees ? (           
                    <div className = 'row'>
                        {this.state.employees.map(employee => {
                            return (
                                <Employee key={employee._id} employee={employee} onEdit={this.handleEdit} onDelete={this.handleDelete} />
                            )
                        })}
                        
                        <Link to="/admin-dashboard/AddEmployee">
                            <div className ='addBtn'>
                                <span className = 'center'>
                                    <i style={{fontSize: "2em"}} className="fas fa-plus-circle"> </i> 
                                    Add Employee
                                </span>
                            </div>
                        </Link>                     
                    </div>
                    ) : (
                        <Loading />
                    )
                }                                   
            </div>
        );
    }
}

export default EmployeesList;
