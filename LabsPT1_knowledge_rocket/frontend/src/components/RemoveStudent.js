import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu,
         DropdownItem } from 'reactstrap';
import "../css/CreateClass.css";

class RemoveStudent extends Component {
    state = {
        dropdownOpen: false
    }

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        const { student, handleRemoveStudent } = this.props;

        return (
            <Dropdown style={{margin: "0 auto", fontSize: "1rem"}}isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                <div className="remove-student-name">{student.studentName}</div>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={ ()=>handleRemoveStudent(student) }>
                    Remove Student
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );
    }
}

export default RemoveStudent;