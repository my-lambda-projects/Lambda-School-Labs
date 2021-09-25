import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu,
         DropdownItem } from 'reactstrap';
import "../css/CreateClass.css";

class RemoveRocket extends Component {
    state = {
        dropdownOpen: false
    }

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        const { rocket, handleRemoveRocket } = this.props;

        return (
            <Dropdown style={{margin: "0 auto", fontSize: ".85rem"}}isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                <div className="remove-rocket-name">Delete</div>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={ () => handleRemoveRocket(rocket) }>
                    Delete Rocket
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );
    }
}

export default RemoveRocket;