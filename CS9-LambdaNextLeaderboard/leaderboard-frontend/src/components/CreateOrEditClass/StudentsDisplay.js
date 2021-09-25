import React, {Component} from 'react';

import {Dropdown, Menu, Button, Modal} from 'semantic-ui-react'
import {connect} from 'react-redux';
import {editStudentAction, removeStudentAction} from '../../actions'

class StudentsDisplay extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            modal_remove: false,
            modal_hired: false,
            openHired: false,
            removeStudent: false

            // students: [
            //     {name :"ASmith"}, {name :"BSmith"}, {name :"CSmit"}, {name :"DSmith"}, {name :"ESmith"}, {name :"FSmith"}, {name :"GSmith"}, {name :"HSmith"}, {name :"ISmith"}, {name :"JSmit"}
            // ]
        };
    }
    closeConfigShowHire = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, openHired: true })
    }

    close = () => this.setState({ openHired: false })

    closeConfigShowRemove = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, removeStudent: true })
    }

    closeHired = () => {
        this.setState({ openHired: false })
    }
    closeRemoved = () => this.setState({ removeStudent: false })

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    delete = () => {

        console.log('delete ', this.props.student.firstname)
        console.log(this.props.student._id, this.props)
        const idObject = {
            _id: this.props.student._id
        }
        this.props.removeStudentAction(this.props.student.classname, idObject)
        this.closeRemoved()
        // this.setState({
        //     modal_remove: !this.state.modal_remove
        // });
    }

    hired = () => {

        console.log('hired ', this.props.student.firstname)
        this.closeHired()
        // this.setState({
        //     modal_remove: !this.state.modal_hired
        // });
    }
    handleEdit = () => {
        this.props.editStudentAction(this.props.student)
    }

    render() {
        // const { open, closeOnEscape, closeOnDimmerClick } = this.state
        const { closeOnEscape, closeOnDimmerClick } = this.state
        return (
            <div className="Toggle">
                {/*<h5>Class: {this.props.class}</h5>*/}

                <Menu style={{marginTop: "10%",background: "#eeee", padding: "2%"}} >
                    <Dropdown text={this.props.student.firstname + ' ' + this.props.student.lastname}>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={this.closeConfigShowHire(true, false)} text="Student Hired" />
                            <Dropdown.Item onClick={this.closeConfigShowRemove(true, false)} text="Remove Student" />
                            <Dropdown.Item onClick={this.handleEdit} text="Edit Student" />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu>
                {/**/}
                {/*<Button onClick={this.closeConfigShow(false, true)}>No Close on Escape</Button>*/}
                {/*<Button onClick={this.closeConfigShow(true, false)}>No Close on Dimmer Click</Button>*/}
                <Modal
                    open={this.state.openHired}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}
                    onClose={this.closeHired}
                >
                    <Modal.Header>Student update to HIRED and removed from list</Modal.Header>
                    <Modal.Content>
                        {/*<p>THIS STUDENT HAS BEEN HIRED?</p>*/}
                        <h3>github: {this.props.student.github}</h3>
                        <h3>huntr: {this.props.student.huntr}</h3>
                        <h3>email: {this.props.student.email}</h3>
                        <h3>hired: {this.props.student.hired.toString() }</h3>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.closeHired} negative>
                            No: CANCEL
                        </Button>
                        <Button
                            onClick={this.hired}
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Yes: HIRED, REMOVE from LIST'
                        />
                    </Modal.Actions>
                </Modal>

                <Modal
                    open={this.state.removeStudent}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}
                    onClose={this.closeRemoved}
                >
                    <Modal.Header>Remove student from list, the student WAS NOT HIRED.</Modal.Header>
                    <Modal.Content>
                        <h3>
                            student name: {this.props.student.firstname} {this.props.student.lastname}
                        </h3>
                        <h3>github: {this.props.student.github}</h3>
                        <h3>huntr: {this.props.student.huntr}</h3>
                        <h3>email: {this.props.student.email}</h3>
                        <h3>hired: {this.props.student.hired.toString() }</h3>




                        {/*<p>THIS STUDENT WILL BE REMOVED  ?</p>*/}
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.closeRemoved} negative>
                            No: CANCEL
                        </Button>
                        <Button
                            onClick={this.delete}
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Yes: REMOVE STUDENT'
                        />
                    </Modal.Actions>
                </Modal>

            </div>
        );
    }
}

export const mapStateToProps = state => {
    return {
        editStudent: state.editStudent
    }
}

export default connect(mapStateToProps, {editStudentAction, removeStudentAction})(StudentsDisplay)

