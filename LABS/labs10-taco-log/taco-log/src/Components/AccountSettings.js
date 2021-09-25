import React, { Component } from 'react';
import { InputGroup, Input, Button }  from 'reactstrap';
class AccountSettings extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: ""
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitChanges = id => {    
    const changes = {
      username: this.state.username
    } 
    this.props.updateUser(id, changes)
    this.setState({username: ""})
  }

  render() {console.log(this.props)
    return (
    <div>
      Adjust your display name here!
      <InputGroup>
      <Input onChange={this.handleInputChange}
            placeholder="Username"
            value={this.state.username}
            name="username" />
            <Button onClick = {()=>this.submitChanges(this.props.userInfo.internal_id)}>Submit Changes</Button>
      </InputGroup>
    </div>
    )
  }
}

export default AccountSettings;