import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../css/employee.css';

const authToken = localStorage.getItem('authToken');
const config = {
  headers: {
    'Authorization': "Bearer " + authToken
  }
};

class Employee extends Component {
  constructor(props) {
    super(props)
    this.state = {
      employee: '',
      isDisabled: false,
      isChecked: false
    }
  }

  onDelete = () => {
    this
      .props
      .onDelete(this.props.employee._id)
  }

  handleInputChange = (event) => {
    event.preventDefault();
    const id = this.props.employee._id
    if (this.state.employee.timeOffApproved) {
      axios.put(`https://ishiftr-db.herokuapp.com/api/employee/${id}/editEmployee`, {
        timeOffApproved: false
      }, config).then(res => {
        this.setState({isChecked: false, employee: res.data})
      })

    } else {

      axios.put(`https://ishiftr-db.herokuapp.com/api/employee/${id}/editEmployee`, {
        timeOffApproved: true
      }, config).then(res => {
        this.setState({isChecked: true, employee: res.data})
      })
    }
  }

  componentDidMount() {
    this.setState({employee: this.props.employee})
  }

  render() {
    let startTimeFormat = this.props.employee.availableHours.startTime.split(":")[0] < 12 ? 'AM' : 'PM';
    let endTimeFormat = this.props.employee.availableHours.endTime.split(":")[0] > 12 ? 'PM' : 'AM';

    let timeOffDate


    if(this.state.employee.timeOffDate){
      let newDate = new Date(this.state.employee.timeOffDate);
      let day = newDate.getDate() + 1;
      let month = newDate.getMonth() + 1;
      let year = newDate.getFullYear()
      timeOffDate = `${month}-${day}-${year}`;
    }

    const id = this.props.employee._id;
    return (
      <div className='px-2'>
        <div color="primary" className='card p-4 border border-dark rounded'>
          <div className='icons'>
            <Link to={`/admin-dashboard/editEmployee/${id}`}>
              <div onClick={this.onEdit}>
                <i className="fas fa-pencil-alt"></i>
              </div>
            </Link>
            <div onClick={this.onDelete}>
              <i className="far fa-trash-alt "></i>
            </div>
          </div>
          <div>
            <form>
              <p className='font-weight-bold my-0'>{this.props.employee.firstName} {this.props.employee.lastName}</p>
              <p className='my-0'>{this.props.employee.email}</p>
              <p className='my-0'>{this.props.employee.phoneNumber}</p>
            </form>
          </div>
          <form>
            <fieldset className='fieldset px-2'>
              <legend className='legend legend-1'>Availability:</legend>
              <p>{this.props.employee.availability}</p>
              <p>{this.props.employee.availableHours.startTime} {startTimeFormat} - {this.props.employee.availableHours.endTime} {endTimeFormat}</p>
            </fieldset>
            <fieldset className='fieldset px-2'>
              <legend className='legend'>Requested Time Off:</legend>
              <div>

                {(timeOffDate)
                  ? <span>
                      {timeOffDate}
                      <input
                        className='ml-2'
                        type="checkbox"
                        name="isChecked"
                        checked={this.state.employee.timeOffApproved}
                        onChange={this.handleInputChange}/>
                      <span className='ml-2'>Approved</span><br/>
                    </span>
                  : ('')
                }
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }
}

export default Employee;
