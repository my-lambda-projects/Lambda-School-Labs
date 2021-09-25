import React from 'react';
import auth from '../utils/Auth';
import axios from 'axios';

class PublicPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            houseList: [],
            schoolInfo: {},
        }
    }
    componentDidMount() {
        this.fetchSchoolInfo();
        this.fetchHouses();
    }
    //fetch school
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

    render() {
        return (
            <div className='public-page'>
                <h2 className='houses-page-welcome'>Welcome to the school of {this.state.schoolInfo.name} at {this.state.schoolInfo.city}</h2>
                <h2 className='sign-in' onClick={auth.login} >Sign In</h2>
                <div className='house-list'>
                    {this.state.houseList.map((eachHouse) => {
                        console.log(eachHouse);
                        return (
                            <div
                                className='housecard-front'
                                style={{ backgroundColor: eachHouse.color }}
                                key={eachHouse.id}
                            >
                                <h2 className='house-name'>{eachHouse.name}</h2>
                                <h3 className='point-total'>{eachHouse.points}</h3>
                                <h2 className='points-txt'>Points</h2>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default PublicPage;