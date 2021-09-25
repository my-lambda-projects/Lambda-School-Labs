import React, {Component} from 'react';
import Select from 'react-select';
import { Row, Col } from 'reactstrap';


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




class SettingDrop1 extends Component {
    
    state ={
        selectedService: null,
    }

    handleChange = selectedService => {
        this.setState({selectedService});
        console.log('Service selected:', selectedService)

    }


    render(){

        
        const {selectedService} = this.state;

        return(
            <div className="SettingDrop-Services">

                 <Select placeholder="Stylists"
                     onChange={this.handleChange}
                     value={selectedService}
                     isMulti
                     options={stylists}
                     className="multiServices" />
            </div>

            )
    }
}

export default SettingDrop1;