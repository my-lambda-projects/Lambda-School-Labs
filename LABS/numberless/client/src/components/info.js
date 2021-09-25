// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// // import { Carousel } from 'react-responsive-carousel';
// // import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
// import Carousel from 'nuka-carousel';
// import './styles/info.css';

// class Info extends Component {
// 	render() {
// 		return(
// 			<Carousel vertical="true" swiping={true} dragging={true}>
// 				<img src={require('./static/artboard1.jpg')}/>
// 				<img src={require('./static/artboard2.jpg')}/>
// 				<img src={require('./static/artboard3.jpg')}/>
// 				<img src={require('./static/artboard4.jpg')}/>
// 				<img src={require('./static/artboard5.jpg')}/>
// 			</Carousel>
// 		)
// 	}
// }

// export default Info;

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/info.css';
//import HamburgerMenu from 'react-hamburger-menu';
import InfoNavBar from './info-navbar';
class Info extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  handleClick() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    return (
      <div>
        {/* <HamburgerMenu isOpen={this.state.open} menuClicked={this.handleClick.bind(this)}>
					<a id="home" className="menu-item" href="/">Home</a>
					<a id="login" className="menu-item" href="/login">Login</a>
					<a id="newuser" className="menu-item" href="/newuser">Sign Up</a>
					<a id="pledge" className="menu-item" href="/pledge">Pledge</a>
				</HamburgerMenu> */}
        <div>
          <InfoNavBar />
        </div>
        <div>
          <img width="100%" src={require('./static/artboard1.jpg')} />
          <img width="100%" src={require('./static/artboard2.jpg')} />
          <img width="100%" src={require('./static/artboard3.jpg')} />
          <img width="100%" src={require('./static/artboard4.jpg')} />
          <img width="100%" src={require('./static/artboard5.jpg')} />
        </div>
      </div>
    );
  }
}

export default Info;

// <HamburgerMenu
// 					isOpen={this.state.open}
// 					menuClicked={this.handleClick.bind(this)}
// 				/>
