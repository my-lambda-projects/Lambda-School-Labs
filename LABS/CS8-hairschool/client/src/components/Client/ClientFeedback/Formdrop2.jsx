import React, {Component} from 'react';
import Select from 'react-select';
import { Row, Col } from 'reactstrap';
import './ClientFeedback.css'

const services = [
    {value: 'haircut', label:'Haircut'},
    {value: 'cut & color', label:'Cut & Color'},
    {value: 'extensions', label:'Extensions'},
    {value: 'color', label:'Color'},
    {value: 'barbering', label:'Barbering'},
]



class FormDrop2 extends Component {
    
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
            <div className="FormDrop-Services">

                 <Select placeholder="Services"
                     onChange={this.handleChange}
                     value={selectedService}
                     isMulti
                     options={services}
                     className="multiServices" />
            </div>

            )
    }
}

export default FormDrop2;