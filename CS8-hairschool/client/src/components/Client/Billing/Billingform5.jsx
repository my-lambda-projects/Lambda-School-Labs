import React, {Component} from 'react';
import {Form, FormGroup, FormControl, HelpBlock, ControlLabel} from 'react-bootstrap';
class Billing2 extends Component {
    constructor(props){
        super(props);
            this.state={
               cc:'', 
               exp:'',
               cvv:'',
            };
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        handleChange(key) {
            return function (e) {
                let state = {};
                state[key] = e.target.value;
                this.setState(state);
            }.bind(this);
        }
        handleSubmit(event) {
            let data = {
                cc: this.state.cc,
                exp: this.state.exp,
                cvv: this.state.cvv
            }
            alert('thanks for your purchase');
            event.preventDefualt();
        }
       
        getValidationState() {
            const length = this.state.value;
            if (length > 14 ) return 'success';
            else if (length < 0) return 'error';
            return null;
        }
    
     
        
    render(){
        return(
            
            <form onSubmit={this.handleSubmit}>
            <Form>
            <label>
                CC# <br/>
            <input type="text" value={this.state.cc} onChange={this.handleChange('cc')}/>
            </label>
            
            
            <label>
                EXP <br/>
            <input type="text" value={this.state.exp} onChange={this.handleChange('exp')}/>
            </label>
            
            
            <label>
                CCV <br/>
            <input type="text" value={this.state.ccv} onChange={this.handleChange('ccv')}/>
            </label>
            </Form>
            </form>
            
           
        )
    }
}
export default Billing2;