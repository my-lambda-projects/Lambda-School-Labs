import React from 'react';
import SideMenu from './SideMenu';
import axios from 'axios';
import Select from 'react-select';
import chroma from 'chroma-js';
import colorOptions from './ColorOptions';
import auth from '../utils/Auth.js';
import { ReactComponent as IconBin } from '../images/bin.svg';

class HousesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newHouse: false,
            editSchool: false,
            incrementTicker: 0,
            houseList: [],
            newHouseName: '',
            newHouseColor: '',
            points: '',
            selectedColor: '#E2592D',
            schoolInfo: {},
            newSchoolName: '',
            newSchoolCity: '',            
        }
    }
    //new house classname toggle
    newHouseToggle = e => {
        this.setState(preState => ({
            newHouse: !preState.newHouse
        }))
    }
    //edit school classname toggle
    editSchoolToggle = e => {
        this.setState(preState => ({
            editSchool: !preState.editSchool
        }))
    }

    componentDidMount() {
        this.fetchSchoolInfo();
        this.fetchHouses();
    }

    fetchSchoolInfo = e => {
        const id = this.props.match.params.id;
        axios.get(`http://localhost:5000/schools/${id}`)
            .then(response => {
                this.setState({
                    schoolInfo: response.data.data.school,
                    newSchoolName: response.data.data.school.name,
                    newSchoolCity: response.data.data.school.city
                })
            })
            .catch(err => console.log(err));
    }

    //fetch houses
    fetchHouses = e => {
        const id = this.props.match.params.id;
        axios.get(`http://localhost:5000/schools/${id}/houses`)
            .then(response => {
                if (response) {
                    this.setState({ houseList: response.data });
                } else {
                    console.log(`There is no houses data from the db`);
                }

            })
            .catch(err => console.log(err))
    }

    //update school info
    putSchool = school => {
        const id = this.props.match.params.id;
        const { getAccessToken } = auth;
        const headers = { Authorization: `Bearer ${getAccessToken()}` };
        axios
            .put(`http://localhost:5000/schools/${id}`, school, { headers })
            .then(response => {
                console.log(response);
                this.fetchSchoolInfo();
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    message: 'You are not Authorized to Edit this School'
                })
            
            });
    };

    handleUpdate = e => {
        e.preventDefault();
        const newSchool = {
            name: this.state.newSchoolName,
            city: this.state.newSchoolCity,
        };
        this.putSchool(newSchool);
        this.editSchoolToggle();
    };

    //delete this school
    deleteSchool = id => {
        const { getAccessToken } = auth;
        const headers = { Authorization: `Bearer ${getAccessToken()}` };
        axios.delete(`http://localhost:5000/schools/${id}`, { headers })
            .then(response => {
                console.log('success', response);
                this.props.fetchSchools();
            })
            .catch(err => {
                console.log(err)
            })
    }
    handleDelete = () => {
        const id = this.props.match.params.id;
        this.deleteSchool(id);
        this.props.history.push("/admin/schools");
    };

    //Add House
    addHouse = (e) => {
        e.preventDefault();
        const { getAccessToken } = auth;
        const headers = { Authorization: `Bearer ${getAccessToken()}` }
        const newHouse = {
            name: this.state.newHouseName,
            color: this.state.selectedColor,
            points: this.state.points
        }

        if (newHouse.name && newHouse.points) {
            axios.post(`http://localhost:5000/schools/${this.props.match.params.id}/houses`,
                newHouse, { headers })
                .then(house => {
                    console.log(`Line 48 house from db`, house.data);
                    this.setState({
                        houseList: [...this.state.houseList, house.data]
                    })
                })
                .catch(err => {
                    console.log(err);
                });

            this.setState({
                newHouseName: '',
                color: '',
                points: ''
            });
        }
        console.log(`House ${this.state.newHouseName} added!`);
    }

    //delete house
    deleteHouse = id => {
        const { getAccessToken } = auth;
        const headers = { Authorization: `Bearer ${getAccessToken()}` };
        console.log(id);
        axios.delete(`http://localhost:5000/${id}`, { headers })
            .then(response => {
                console.log('success', response);
                this.fetchHouses();
            })
            .catch(err => {
                console.log(err)
            })
    }

    //Handle-Input
    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    //House point system
    pickTicker = e => {
        var activeNum = document.getElementsByClassName(`active-number`);
        if (activeNum.length > 0) {
            activeNum[0].classList.toggle('active-number');
        }
        e.target.classList.toggle('active-number');
        this.setState({
            incrementTicker: Number(e.target.id)
        })
    }

    addPoint = id => {
        let pos = this.state.houseList.map(function (e) { return e.id; }).indexOf(id);
        let newPointTotal = this.state.houseList[pos].points + this.state.incrementTicker;
        this.setState((prevState) => {
            prevState.houseList[pos].points = newPointTotal;
        })
        var elements = document.getElementsByClassName(`active-number`);
        elements[0].classList.toggle('active-number');
        this.putHouse(this.state.houseList[pos]);
    };

    dropPoint = id => {
        let pos = this.state.houseList.map(function (e) { return e.id; }).indexOf(id);
        let newPointTotal = this.state.houseList[pos].points - this.state.incrementTicker;
        this.setState((prevState) => {
            prevState.houseList[pos].points = newPointTotal;
        })
        var elements = document.getElementsByClassName(`active-number`);
        elements[0].classList.toggle('active-number');
        this.putHouse(this.state.houseList[pos]);
    };

    //update house point
    putHouse = house => {
        const { getAccessToken } = auth;
        const headers = { Authorization: `Bearer ${getAccessToken()}` };
        console.log(house);
        axios
            .put(`http://localhost:5000/${house.id}`, house, { headers })
            .then(response => {
                this.fetchHouses();
            })
            .catch(err => console.log(err));
    };

    // flip card
    toggleFlip = id => {
        var element = document.getElementById(`housecard-${id}`);
        element.classList.toggle("flip");
    }

    //react select vars
    dot = (color = '#ccc') => ({
        alignItems: 'center',
        display: 'flex',

        ':before': {
            backgroundColor: color,
            borderRadius: 10,
            content: '" "',
            display: 'block',
            marginRight: 8,
            height: 10,
            width: 10,
        },
    });

    //color styles
    colorStyles = {
        control: styles => ({ ...styles, backgroundColor: '#f9f7f6' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: isSelected
                    ? data.color
                    : isFocused
                        ? color.alpha(0.1).css() : null,
                color: isSelected
                    ? chroma.contrast(color, 'white') > 2 ? 'white' : 'black'
                    : data.color,
            };
        },
        input: styles => ({ ...styles, ...this.dot() }),
        placeholder: styles => ({ ...styles, ...this.dot() }),
        singleValue: (styles, { data }) => ({ ...styles, ...this.dot(data.color) }),
    };

    handlePickColor = selectedColor => {
        this.setState({
            selectedColor: selectedColor.color
        });
    }

    render() {
        return (
            <div className='houses-page'>
                <SideMenu {...this.props} />
                <div className='houses-container'>
                    <div className='houses-page-header'>
                        <div>
                            <h2 className='houses-page-welcome'>Welcome to the school of {this.state.schoolInfo.name} at {this.state.schoolInfo.city}</h2>
                        </div>
                        <div
                            className={this.state.editSchool ? 'new-house new-house-expand' : 'new-house new-house-collapse'}
                            id='edit-school'
                            onClick={this.editSchoolToggle.bind(this)}
                        >
                            <h2 className={this.state.editSchool ? 'hidden' : "'new-house-txt'"}>Edit School Detail</h2>
                            <form
                                className={this.state.editSchool ? "edit-school-form" : "hidden"}
                                onClick={event => event.stopPropagation()}
                            >
                                <div className='input-container'>
                                    <h2 className="input-title">Name:</h2>
                                    <input
                                        className="edit-school-input"
                                        type="text"
                                        value={this.state.newSchoolName}
                                        name="newSchoolName"
                                        onChange={this.handleInput.bind(this)}
                                    />
                                    <h2
                                        className="input-title"
                                    >
                                        City:
                                </h2>
                                    <input
                                        className="edit-school-input"
                                        type="text"
                                        value={this.state.newSchoolCity}
                                        name="newSchoolCity"
                                        onChange={this.handleInput.bind(this)}
                                    />
                                </div>
                                <button className='edit-school-button' onClick={this.handleUpdate}>Save</button>
                                <button className='edit-school-button delete-button' onClick={this.handleDelete}>Delete School</button>
                            </form>
                        </div>
                        <div className={this.state.newHouse ? 'new-house new-house-expand' : 'new-house new-house-collapse'} onClick={this.newHouseToggle.bind(this)} >
                            <h2 className='new-house-txt'>Add New House</h2>
                            <div className='add-house-inputs'>
                                <div
                                    className={this.state.newHouse ? 'new-house-form' : 'hidden'}
                                    onClick={event => event.stopPropagation()}
                                >
                                    <input type="text"
                                        className='new-house-input'
                                        placeholder='name'
                                        name='newHouseName'
                                        value={this.state.newHouseName}
                                        onChange={this.handleInput} />
                                    <input
                                        className='new-house-input'
                                        id='points'
                                        type='number'
                                        placeholder='points'
                                        name='points'
                                        value={this.state.points}
                                        onChange={this.handleInput} />
                                    <Select
                                        defaultValue={colorOptions[5]}
                                        label="Single select"
                                        name="color"
                                        options={colorOptions}
                                        styles={this.colorStyles}
                                        className='react-select'
                                        onChange={this.handlePickColor}
                                    />
                                    <button className='new-house-button' onClick={this.addHouse.bind(this)}>+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='houses-list'>
                        {this.state.houseList.map((eachHouse) => {
                            return (

                                <div className='housecard'
                                    id={`housecard-${eachHouse.id}`}
                                    key={eachHouse.id}>
                                    {/* console.log(`house page line 132:`,{eachHouse}); */}
                                    <div className='housecard-inner'>
                                        <div
                                            className='housecard-front'
                                            style={{ backgroundColor: eachHouse.color }}
                                            id={`housecard-front-${eachHouse.id}`}
                                            onClick={this.toggleFlip.bind(this, eachHouse.id)}>
                                            <h2 className='house-name'>{eachHouse.name}</h2>
                                            <h3 className='point-total'>{eachHouse.points}</h3>
                                            <h2 className='points-txt'>Points</h2>
                                        </div>
                                        <div className='housecard-back'>
                                            <div className='point-increment-area'>
                                                <span className='choose'>Choose Point</span>
                                                <div className='increment-number-container'>
                                                    <div className='row-1'>
                                                        <span className='increment-number' id='1' onClick={this.pickTicker.bind(this)}>1</span>
                                                        <span className='increment-number' id='2' onClick={this.pickTicker.bind(this)}>2</span>
                                                        <span className='increment-number' id='3' onClick={this.pickTicker.bind(this)}>3</span>
                                                        <span className='increment-number' id='4' onClick={this.pickTicker.bind(this)}>4</span>
                                                        <span className='increment-number' id='5' onClick={this.pickTicker.bind(this)}>5</span>
                                                    </div>
                                                    <div className='row-2'>
                                                        <span className='increment-number' id='6' onClick={this.pickTicker.bind(this)}>6</span>
                                                        <span className='increment-number' id='7' onClick={this.pickTicker.bind(this)}>7</span>
                                                        <span className='increment-number' id='8' onClick={this.pickTicker.bind(this)}>8</span>
                                                        <span className='increment-number' id='9' onClick={this.pickTicker.bind(this)}>9</span>
                                                        <span className='increment-number' id='10' onClick={this.pickTicker.bind(this)}>10</span>
                                                    </div>
                                                </div>
                                                <div className='points-button-container'>
                                                    <button className='add-points-button points-button' onClick={this.addPoint.bind(this, eachHouse.id)}>Add</button>
                                                    <button className='minus-points-button points-button' onClick={this.dropPoint.bind(this, eachHouse.id)}>Drop</button>
                                                </div>
                                            </div>
                                            <div className='text-area' onClick={this.toggleFlip.bind(this, eachHouse.id)}
                                            >
                                                <h3
                                                    className='point-total'
                                                >
                                                    {eachHouse.points}
                                                </h3>
                                                <h2 className='points-txt' onClick={this.putHouse.bind(this, eachHouse)}>Points</h2>
                                                <IconBin className='bin' onClick={this.deleteHouse.bind(this, eachHouse.id)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        )
    }
}

export default HousesPage;