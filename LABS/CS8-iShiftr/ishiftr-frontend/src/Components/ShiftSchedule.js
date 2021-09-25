import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../css/ShiftSchedule.css';
import Schedule from './TestCal';
import Pagination from './Pagination';


const id = localStorage.getItem('id');
const authToken = localStorage.getItem('authToken');
const config = {
        headers: {
            'Authorization': "Bearer " + authToken            
        },
};

class ShiftSchedule extends React.Component {

    constructor() {
        super();
 
            this.state = {
            exampleItems: [],
            pageOfItems: []
        };
 
        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);
    }
 
    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    componentDidMount(){

        axios.get(`https://ishiftr-db.herokuapp.com/api/schedule/${id}`, config)
                .then((res) => {
                    console.log(res.data);
                    this.setState({
                        exampleItems : res.data
                    })
                })
                .catch(function (error) {
                    console.log('there is an error', error);
        });
    }


    render() {
        console.log(this.state.exampleItems);
        return (                        
                <div className = 'row justify-content-center'>
                    <h3><strong>Weekly Schedule</strong></h3>
                    {this.state.exampleItems.length > 0 ? (
                    <React.Fragment> 
                     
                        <div className = 'col col-12 mt-3 editShift'>
                            <div>
                            <div className="text-center">
                            
                            <Pagination items={this.state.exampleItems} onChangePage={this.onChangePage} />
                            </div>
                            </div>
                            <Link to = '/admin-dashboard/editShift'><button className='border'>
                                <span>Edit Shift</span>
                                <i className="fas fa-pencil-alt"></i>
                            </button> </Link>
                        </div>
                        <div className ='row col-12 mt-3'>            
                                
                                {this.state.pageOfItems.map(item =>
                                    <Schedule key = {item._id} schedule = {item} />
                                )}
                        </div>
                    </React.Fragment>
                    ) : (
                        <div className="col col-12 mt-5">
                            <h4 className="text-align-center">Your Calendar Schedule is Empty. Please Go to the Create Schedule Section</h4>
                        </div>
                    )}
                
                </div>                                    
        );
    }
}

export default ShiftSchedule;
