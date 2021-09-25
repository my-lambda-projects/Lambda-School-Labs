import React, {Component} from 'react';
import Select from 'react-select';
import { Row, Col } from 'reactstrap';
import './ClientFeedback.css'

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


class FormDrop1 extends Component {

    constructor (props){
        super(props);

        this.state = {
            stylist:""
        }
    }
    
    state ={
        selectedStylist: null,

    }

    handleChange = selectedStylist => {
        this.setState({selectedStylist});
        console.log('Stylist selected:', selectedStylist)
        this.props.updateStylistCallback(this.state.selectedStylist)

    }


    render(){

        const {selectedStylist} = this.state;

        return(
            <div className="FormDrop-Stylists">            
                <Select placeholder="Stylists"                              
                    onChange={this.handleChange}
                    value={selectedStylist}
                    options={stylists}/>
                          
            </div>

            )
    }
}

export default FormDrop1;