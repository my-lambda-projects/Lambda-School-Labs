import React from 'react';
import SideMenu from './SideMenu';
import axios from 'axios';
import auth from '../utils/Auth.js';

class ModifySchoolPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            school: [],
            name: '',
            city: '',
            newName: '',
            newCity: '',
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        // console.log(id);
        axios.get(`http://localhost:5000/schools/${id}`)
            .then(response => {
                this.setState({ school: response.data.data.school })
                // this.setState({name: response.data.data.school.name })
                // this.setState({city: response.data.data.school.city})
            })
            .catch(err => {
                console.log('error line 22', err)
            })
    }

    deleteSchool = e => {
        // e.preventDefault();
        const { getAccessToken } = auth;
        const headers = { Authorization: `Bearer ${getAccessToken()}` };
        const id = this.props.match.params.id;
        console.log(id);
        console.log(headers);
        axios.delete(`http://localhost:5000/schools/${id}`, { headers })
            .then(response => {
                console.log('success', response)
                this.props.history.goBack();
            })
            .catch(err => {
                console.log(`error`, err)
            })
    }

    render() {
        return (
            <div className='modify-school-page'>
                <SideMenu />
                <div className='school-card'>
                    <h2>{this.state.school.name}</h2>
                    <h4>{this.state.school.city}</h4>
                </div>
                <div className='modify-functions'>
                    <button className='update-button'>Update</button>
                    <button className='delete-button' onClick={this.deleteSchool}>Delete</button>
                </div>
            </div>
        )
    }
}

export default ModifySchoolPage;