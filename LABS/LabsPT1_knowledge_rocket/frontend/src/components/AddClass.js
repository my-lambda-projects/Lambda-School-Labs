import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody,
         ModalFooter, Button, Input } from 'reactstrap';
import "../css/CreateClass.css";
import "../css/Classes.css";

class AddClass extends Component {
    
    state = {
        modal: false,
        clsName: ""
    }
    
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value });
    }

    handleAddClass = (clsName) => {
        this.setState({clsName: ""});
        this.toggle();
        this.props.handleAddClass(clsName);
    }

    render() {
        return (
            <div>
                <div className="text-center">
                    <i className="fas fa-plus-circle" onClick={this.toggle}/>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Add New Class</ModalHeader>
                <ModalBody>
                    <Input className="m-input" placeholder="Class Name" 
                        onChange={this.handleChange}
                        name="clsName"
                        value={this.state.clsName}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button  className="modal-btn" onClick={() => this.handleAddClass(this.state.clsName)}>Add</Button>{' '}
                    <Button  className="modal-btn" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
                </Modal>
            </div>
          );
    }
}

export default AddClass;