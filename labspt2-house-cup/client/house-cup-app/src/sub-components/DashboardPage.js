import React, { Component } from 'react';
import schoolsTestData from '../mockdata/schools';

class DashboardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolsList: [],
            houseList: []
        }
    }
    componentDidMount() {
        this.setState({
            schoolsList: schoolsTestData
        })
    }

    render() {
        return (
            <div>
                {this.state.schoolsList.map((school) => {
                    return (
                        <h2>{school.name}</h2>
                    )
                })}

            </div>
        )
    }
}

export default DashboardPage;