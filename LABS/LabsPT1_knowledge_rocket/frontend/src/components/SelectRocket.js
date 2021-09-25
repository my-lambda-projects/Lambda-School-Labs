import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu,
         DropdownItem } from 'reactstrap';
import "../css/CreateClass.css";

class SelectRocket extends Component {
    state = {
        dropdownOpen: false,
        selectedRocket: ""
    }

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        const { rockets, handleSelectRocket, rocketName } = this.props;

        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                <div className="select-class-dd-txt">
                    { rocketName === "" || rocketName === undefined ? "" : rocketName }
                </div>
                
              </DropdownToggle>
              <DropdownMenu>

              {rockets.map((rockts, id) => {
                return (
                    <DropdownItem key={id} onClick={() => handleSelectRocket(rockts.rocketname)}>
                        { rockts.rocketname }
                    </DropdownItem>
                )
                })}
              </DropdownMenu>
            </Dropdown>
          );
    }
}

export default SelectRocket;