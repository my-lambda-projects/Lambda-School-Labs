import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom";
//components
import SideMenu from './SideMenu';
import auth from '../utils/Auth.js';

class SchoolsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authProfile: [],
            authPassword: '',
            mySchoolsList: [],
            houseList: [],
            newSchool: false,
            newSchoolName: '',
            newSchoolCity: '',
            userId: null
        }
    }
    componentDidMount() {
        this.getUser();
        this.props.fetchSchools();
    }

    getUser = () => {
        const { getAccessToken } = auth;
        const headers = { Authorization: `Bearer ${getAccessToken()}` };
        axios.get('http://localhost:5000/users/userCredentials', { headers })
            .then(data => {
                let userId = Number(data.data.user.id)
                this.setState({
                    mySchoolsList: this.props.schoolsList.filter(school => Number(school.userId) === userId)
                });
            }).catch(err => {
                console.log(err);
            })
    }

    addSchool = (e) => {
        e.preventDefault();
        const { getAccessToken } = auth;
        const newSchool = {
            name: this.state.newSchoolName,
            city: this.state.newSchoolCity
        }

        if (newSchool.name && newSchool.city) {
            const headers = { Authorization: `Bearer ${getAccessToken()}` };
            axios.post('http://localhost:5000/schools', newSchool, { headers })
                .then(school => {
                    this.props.fetchSchools();
                    this.getUser();
                }).catch(err => {
                    console.log(err);
                });
        } else {
            console.log(`Please add newSchool`);
        }
        console.log(`school ${this.state.newSchoolName} added!`);

        this.setState({
            newSchoolName: '',
            newSchoolCity: ''
        });
    }

    handleSchoolInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    newSchoolToggle = e => {
        this.setState(preState => ({
            newSchool: !preState.newSchool
        }))
    }

    render() {
        return (
            <div className='schools-page'>
                <SideMenu {...this.props} />
                <div className='schools-container'>
                    <div className='schools-page-header'>
                        <div>
                            <h2 className='schools-page-welcome'>Welcome to your schools admin page</h2>
                        </div>
                        <div className={this.state.newSchool ? 'new-school new-school-expand' : 'new-school new-school-collapse'} onClick={this.newSchoolToggle.bind(this)}>
                            <h2 className='new-school-txt'>Add New School</h2>
                            <div className='add-school-inputs'>
                                <form
                                    className={this.state.newSchool ? 'new-school-form' : 'hidden'}
                                    onSubmit={this.addSchool}
                                    onClick={event => event.stopPropagation()}>
                                    <input
                                        className='new-school-input'
                                        placeholder='name' name='newSchoolName'
                                        value={this.state.newSchoolName}
                                        onChange={this.handleSchoolInput} />
                                    <input
                                        className='new-school-input'
                                        placeholder='city'
                                        name='newSchoolCity'
                                        value={this.state.newSchoolCity}
                                        onChange={this.handleSchoolInput}></input>
                                    {/* <input className='schoolDescription' placeholder='description' name='newSchoolDescription' onChange={this.handleSchoolInput}></input> */}
                                    <button className='new-school-button'>+</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='schools-list'>
                        {this.state.mySchoolsList.map((school) => {
                            return (
                                <NavLink to={`/admin/schools/${school.id}`} className='menu-button' activeClassName="activeMenu" style={{ textDecoration: "none", color: "inherit" }} key={school.id}>
                                    <div className='school-card'>
                                        <h2>{school.name}</h2>
                                        <h2 className='from'>from</h2>
                                        <h2>{school.city}</h2>
                                    </div>
                                </NavLink>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default SchoolsPage;