import React, {Component} from 'react';
import Select from 'react-select';
import { Row, Col } from 'reactstrap';


const services = [
    {value: 'haircut', label:'Haircut'},
    {value: 'cut & color', label:'Cut & Color'},
    {value: 'extensions', label:'Extensions'},
    {value: 'color', label:'Color'},
    {value: 'barbering', label:'Barbering'},
]



class SettingDrop2 extends Component {
    
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

export default SettingDrop2;