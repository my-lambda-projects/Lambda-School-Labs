import React from 'react';
import { Nav, NavItem, NavLink, Button, ButtonGroup, Dropdown, DropdownMenu, DropdownToggle, Modal, ModalHeader, ModalFooter, ModalBody, } from 'reactstrap';
import './index.css';

export default class BottomMenu extends React.Component {

    constructor (props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.abToggle = this.abToggle.bind(this);
        this.state = { cSelected: [], dropdownOpen: false, abModal: false };
    
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
      }
    
      onRadioBtnClick(rSelected) {
        this.setState({ rSelected });
      }

      toggle() {
          this.setState({
              dropdownOpen: !this.state.dropdownOpen
          });
      }

      abToggle() {
        this.setState({
          abModal: !this.state.abModal
        });
      }
    

    render(){
        return (
            <div className='bottomDiv'>
                <Nav>
                    <ButtonGroup id='buttonGroup'>
                        <Button id='sideBarButtonA' onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1}>
                            <NavItem >
                                <NavLink href="/classes" active>Classes</NavLink>
                            </NavItem>
                        </Button >
                        <Button id='sideBarButtonB' onClick={() => this.onRadioBtnClick(2)} active={this.state.rSelected === 2}>
                            <NavItem >
                                <NavLink href="/billing">Billing</NavLink>
                            </NavItem>
                        </Button>
                        <Button id='sideBarButtonC' onClick={() => this.onRadioBtnClick(3)} active={this.state.rSelected === 3}>
                            <NavItem >
                                <NavLink href="/settings">Settings</NavLink>
                            </NavItem>
                        </Button>
                        {/* <Button id='sideBarButtonD' onClick={() => this.onRadioBtnClick(4)} active={this.state.rSelected === 4}>
                            <Dropdown direction="up" size="lg" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle
                                    
                                    tag="span"
                                    onClick={this.toggle}
                                    data-toggle="dropdown"
                                    aria-expanded={this.state.dropdownOpen}
                                >
                                    <Button>Logout</Button>
                                </DropdownToggle>
                                <DropdownMenu id='logoutToggleBottom'>
                                    <div id='buttomButton'><a href="/">Confirm</a></div>
                                    <div id='buttomButton' onClick={this.toggle}>Cancel</div>
                                </DropdownMenu>
                            </Dropdown>
                        </Button> */}
                        <NavItem id='sideBarButtonD'>
                            <NavLink>
                                <Button onClick={this.abToggle}>
                                    Logout
                                </Button>
                            </NavLink>
                        </NavItem>
                        <NavItem className="nav-signup">
                            <Modal
                            isOpen={this.state.abModal}
                            toggle={this.abToggle}
                            className={this.props.className}
                            >
                            <ModalHeader className = 'modalHeader' toggle={this.abToggle}>Logout</ModalHeader>
                            <ModalFooter className = 'modalFooter'>
                                <Button id='buttonConfirm'><a href="/">Confirm</a></Button>
                                <Button id="nav-button" onClick={this.abToggle}>
                                Cancel
                                </Button>{" "}
                            </ModalFooter>
                        </Modal>
                        </NavItem>
                    </ButtonGroup>
                </Nav>
                </div>
        )
    }
}