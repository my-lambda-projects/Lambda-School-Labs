import React, {Component} from 'react';
import Select from 'react-select';


const stylists = [
    {value: 'maria', label:'Maria'},
    {value: 'wyatt',label:'Wyatt'},
    {value: 'isabella',label:'Isabella'},
    {value: 'vanessa',label:'Vanessa'},
    {value: 'harmony',label:'Harmony'},
    {value: 'naomi',label:'Naomi'},
    {value: 'deidre',label:'Deidre'},
    {value: 'teayana',label:'Teayana'},
    {value: 'lara',label:'Lara'},
    {value: 'seun',label:'Seun'},
    {value: 'divya',label:'Divya'},
    {value: 'savannah',label:'Savannah'},
    {value: 'troy',label:'Troy'},
    {value: 'kimberly',label:'Kimberly'}
]



class StylistDropbox extends Component {
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
            <div className="StylistDropbox">
            <Select placeholder="Choose A Stylist"
            value={selectedOption}
            onChange={this.handleChange}
            options={stylists}
            />
            </div>
        );
    }
}

export default StylistDropbox;


