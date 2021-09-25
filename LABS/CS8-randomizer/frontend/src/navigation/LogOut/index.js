import React, {Component} from 'react';
import { Nav, NavItem, NavLink, Dropdown, DropdownMenu, DropdownToggle, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { logOut } from "../../actions";
import './index.css';

class LogOut extends React.Component{

    constructor(props){
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render(){
        return(
            <Dropdown direction="left" id="logout-toggle" size="lg" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle
                    
                    tag="span"
                    onClick={this.toggle}
                    data-toggle="dropdown"
                    aria-expanded={this.state.dropdownOpen}
                >
                    <Button id="logout-button" onClick={this.props.logOut}>Logout</Button>
                    {/* TODO: Add onClick(this.props.toggleAuth) - to set authed: false; */}
                </DropdownToggle>
                <DropdownMenu id="logout-dropdown">
                    <div className="logout-link"><a href="/">Confirm</a></div>
                    <div className="logout-link" onClick={this.toggle}>Cancel</div>
                </DropdownMenu>
            </Dropdown>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      users: state.users,
      authed: state.authed
    };
  };
  
  export default connect(mapStateToProps, {logOut})(LogOut);