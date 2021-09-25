import React, {Component} from 'react';
import Select from 'react-select';


const time = [
    {value: '9:00am', label:'9:00AM'},
    {value: '9:30am', label:'9:30AM'},
    {value: '10:00am', label:'10:00AM'},
    {value: '10:30am', label:'10:30AM'},
    {value: '11:00am', label:'11:00AM'},
    {value: '9:00am', label:'9:00AM'},
    {value: '9:00am', label:'9:00AM'},
    {value: '9:00am', label:'9:00AM'},
    {value: '9:00am', label:'9:00AM'},
    {value: '9:00am', label:'9:00AM'},
    {value: '9:00am', label:'9:00AM'},
    {value: '9:00am', label:'9:00AM'},
    {value: '9:00am', label:'9:00AM'},
    {value: '9:00am', label:'9:00AM'},
    {value: '9:00am', label:'9:00AM'},
    {value: '9:00am', label:'9:00AM'},
    {value: '9:00am', label:'9:00AM'},
    {value: '9:00am', label:'9:00AM'},
    
]



class TimeDropbox extends Component {
    state = {
        selectedOption: null,
        isSearchable: true,
    }
    
    handleChange = (selectedOption) => {
        this.setState({selectedOption});
        console.log('Option selected:', selectedOption)
    }

    render(){

        const { selectedOption } = this.state;

        return(
            <div className="TimeDropbox">
            <Select placeholder="Select A Time"
            value={selectedOption}
            onChange={this.handleChange}
            options={time}
            />
            </div>
        );
    }
}

export default TimeDropbox;


