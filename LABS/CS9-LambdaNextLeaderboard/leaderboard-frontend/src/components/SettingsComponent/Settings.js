
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Input, Button } from 'semantic-ui-react';

// import {updateUserAction} from '../../actions'
import  {setSettingsAction} from '../../actions'
import {updateAdminAction, logoutAdminAction} from '../../actions/adminActions'
// import {Link} from 'react-router-dom'
import './Settings.css'

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      message: ''
    }
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  handleSave = () => {
    // const organization = localStorage.getItem("organization")
    const updateAdmin = {
      "username": this.state.username,
      "oldPassword": this.state.oldPassword,
      "password": this.state.newPassword,
      "email": this.state.email,
    }
    console.log('Saved', this.state)
    this.props.updateAdminAction(updateAdmin)
    this.props.setSettingsAction(false)

  }
  checkCredentials = () => {

    if (this.state.newPassword === this.state.confirmPassword &&  this.state.confirmPassword !== '') {
      this.handleSave();
    } else {
      this.setState({email: '', oldPassword: '', newPassword: '', confirmPassword: '', message: "Update Failed, due to mismatch password, try again" });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateAdmin !== this.props.updateAdmin && nextProps.updateAdmin !== null) {
      this.props.logoutAdminAction()
      this.props.history.push("/")
    }
  }

  render() {
    return (
      <div className="InputWrapper">
        {this.state.message ? <h1>{this.state.message}</h1> : <div></div>}
        <div>
          <div>
            <div>
              <h3 className="headerField">Username:</h3>
              <Input
                focus
                placeholder='Username'
                type="text"
                name="username"
                className="inputVal"
                value={this.state.username}
                onChange={this.handleInput}
                align="right"
              />
            </div>
          </div>
          <div>
            <div>
              <h3 className="headerField">Old Password:</h3>
              <Input
                focus
                type="password"
                name="oldPassword"
                className="inputVal"
                placeholder="******"
                value={this.state.oldPassword}
                onChange={this.handleInput}
                align="right"
              />
            </div>
          </div>
          <div>
            <div>
              <h3 className="headerField">New Password:</h3>
              <Input
                focus
                type="password"
                name="newPassword"
                className="inputVal"
                placeholder="*******"
                value={this.state.newPassword}
                onChange={this.handleInput}
                align="right"
              />
            </div>
          </div>
          <div>
            <div>
              <h3 className="headerField">Confirm Password:</h3>
              <Input
                focus
                type="password"
                name="confirmPassword"
                className="inputVal"
                placeholder="*******"
                value={this.state.confirmPassword}
                onChange={this.handleInput}
                align="right"
              />
            </div>
          </div>
          <div>
            <div>
              <h3 className="headerField">Email:</h3>
              <Input
                focus
                placeholder="user@gmail.com"
                type="text"
                name="email"
                className="inputVal"
                value={this.state.email}
                onChange={this.handleInput}
                align="right"
              />
            </div>
          </div>

        </div>
        <div className="BtnDiv">
          <Button className="BtnSave" onClick={this.checkCredentials} secondary>Save</Button>
        </div>
      </div>
    );
  }
}
const maptStateToProps = state => {
  return {
    updateAdmin: state.updateAdmin,
  }
}
export default connect(maptStateToProps, {setSettingsAction, updateAdminAction, logoutAdminAction})(Settings)
