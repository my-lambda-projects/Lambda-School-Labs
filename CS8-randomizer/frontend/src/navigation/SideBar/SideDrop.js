import React from 'react';
// import { NavLink } from 'react-router-dom';

import { Nav, NavItem, NavLink, Alert, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';


export default class DropBar extends React.Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        // this.toggleActive = this.toggleActive.bind(this);
        this.state = {
          dropdownOpen: false,
          active: false
        };
      }
    
      toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen,
          active: !this.state.active
        });
      }

    //   toggleActive(){
    //     //   const currentState = this.state.active;
    //       this.setState({active: !this.state.active});
    //   }
    


render(){
        return (
            <div className="SideDiv">
                <Dropdown direction="right" isOpen={this.state.btnDropright} toggle={() => { this.setState({ btnDropright: !this.state.btnDropright }); }} >
                        {/* <div className='bar' tpe='button' onMouseOver={this.toggle}> */}
                    <DropdownToggle id="dropdown-button" className='dropbutton' >
                    <div className='bar'>
                    {/* <div className={this.state.active ? 'bar:active' : 'bar'}> */}
                    {/* <button className='wrapper' onClick={this.toggle}> */}
                        {/* <div> */}
                            <div className='first'>
                            </div>
                             <div className='second'>
                            </div>
                            <div className='third'>
                            </div>   
                            {/* <div className='first'>
                            </div>
                            <div className='second'>
                            </div>
                            <div className='third'>
                            </div>    */}
                        {/* </button> */}
                    {/* </div> */}


                    </div>
                    </DropdownToggle>
                    <DropdownMenu id='dropmenu'>
                        <DropdownItem id='dropdownitem'>                     
                                 <NavItem>
                            </NavItem> 
                                    <NavLink className='side-link' href="/classes" active>Classes</NavLink>
                    </DropdownItem>
                        <DropdownItem id='dropdownitem'>                     
                            <NavItem>
                            </NavItem>
                                <NavLink className='side-link' href="/billing">Billing</NavLink>
                    </DropdownItem>
                    <DropdownItem id='dropdownitem'>                    
                        <NavItem>
                        </NavItem>
                            <NavLink className='side-link' href="/settings">Settings</NavLink>
                    </DropdownItem>
                    </DropdownMenu>
                        


        {/* </div> */}
                </Dropdown> 
        </div>

        )
    }
}
