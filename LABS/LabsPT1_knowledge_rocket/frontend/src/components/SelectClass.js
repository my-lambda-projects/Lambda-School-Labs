import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu,
         DropdownItem } from 'reactstrap';
import "../css/CreateClass.css";

class SelectClass extends Component {
    state = {
        dropdownOpen: false,
        selectedClass: ""
    }

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        const { classes, handleSelectClass, clsName } = this.props;

        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="select-class-dropdown">
              <DropdownToggle caret>
                <div className="select-class-dd-txt">
                    { clsName === "" || clsName === undefined ? "" : clsName }
                </div>
                
              </DropdownToggle>
              <DropdownMenu>

              {classes.map((clss, id) => {
                return (
                    <DropdownItem key={id} onClick={() => handleSelectClass(clss.className)}>
                        { clss.className }
                    </DropdownItem>
                )
                })}
              </DropdownMenu>
            </Dropdown>
          );
    }
}

export default SelectClass;