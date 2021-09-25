import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' //need this for history.push
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Container, Dropdown, Menu, } from 'semantic-ui-react'

import { refreshUserState } from '../actions';

let windowSize;

class TopNavBarLayout extends Component {
  constructor(){
    super()
    this.state = {
      windowSize: window.innerWidth
    }
  }


  componentDidMount() {
    // in case the page gets reloaded, need to load in user state from db again
    this.props.refreshUserState();
    window.addEventListener("resize", this.resize)
  }

  resize = () => {
    windowSize = window.innerWidth;
    this.setState({
      windowSize: windowSize
    })
  }

  handleClickSignOut = e => {
    localStorage.clear();
    this.props.history.push('/');
  }

  render() {
    const black = { color: 'black', margin: "0" }

    return (this.state.windowSize > 620) ? (
      <div>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item header>
              <Link to='/friends'>Friends</Link>
            </Menu.Item>
            <Dropdown item openOnFocus simple text='Pictures'>
              <Dropdown.Menu>
                <Dropdown.Item><Link style={black} to='/upload'>Upload</Link></Dropdown.Item>
                <Dropdown.Item><Link style={black} to='/browse'>Browse</Link></Dropdown.Item>
                <Dropdown.Item><Link style={black} to='/collection'>My Collection</Link></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item header>
              <Link to='/billing'>Billing</Link>
            </Menu.Item>
            <Menu.Item position="right" header>
              Credits: {this.props.credits} 
            </Menu.Item>
            {/* Can't use an onClick event as it triggers for any selected element*/}
            <Dropdown item openOnFocus simple text={`Hi, ${this.props.first_name + ' ' + this.props.last_name}`}>
              <Dropdown.Menu>
              <Dropdown.Item><Link style={black} to='/uploads'>My Uploads</Link></Dropdown.Item>
                <Dropdown.Item><Link style={black} to='/settings'>Edit Profile</Link></Dropdown.Item>
                <Dropdown.Item><Link to="#" style={black} onClick={this.handleClickSignOut}>Sign Out</Link></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Menu>

        <Container textAlign='left' style={{ marginTop: '7em' }}>
          {this.props.children}
        </Container>
      </div>
    ) : 
    (
      <div>
        <Menu fixed='top' inverted>
          <Container>
            <Dropdown item openOnFocus simple text='Pictures'>
              <Dropdown.Menu>
                <Dropdown.Item><Link style={black} to='/upload'>Upload</Link></Dropdown.Item>
                <Dropdown.Item><Link style={black} to='/browse'>Browse</Link></Dropdown.Item>
                <Dropdown.Item><Link style={black} to='/collection'>My Collection</Link></Dropdown.Item>
                <Dropdown.Item><Link style={black} to='/billing'>Billing</Link></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item>
              Credits: {this.props.credits} 
            </Menu.Item>
            <Dropdown item openOnFocus simple text={`Hi, ${this.props.first_name + ' ' + this.props.last_name}`}>
              <Dropdown.Menu>
              <Dropdown.Item><Link style={black} to='/uploads'>My Uploads</Link></Dropdown.Item>
                <Dropdown.Item><Link style={black} to='/settings'>Edit Profile</Link></Dropdown.Item>
                <Dropdown.Item><Link to="#" style={black} onClick={this.handleClickSignOut}>Sign Out</Link></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Menu>

        <Container textAlign='left' style={{ marginTop: '7em' }}>
          {this.props.children}
        </Container>
      </div>
    )
  }
}

// export default withRouter(TopNavBarLayout);

const mapStateToProps = state => {
  return {
    first_name: state.first_name,
    last_name: state.last_name,
    email: state.email,
    nicknames: state.nickname,
    credits: state.credits
  }
}

export default connect(mapStateToProps, { refreshUserState })(withRouter(TopNavBarLayout));
