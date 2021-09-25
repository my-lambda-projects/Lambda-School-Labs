import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import landPic from './coins.jpg';
import logo from './giveMe.png';
import { autoLogin } from '../../actions/auth';
// import givme from './giveMe.png';

// const styles = {
// backgroundImage: `url(${landPic})`,
// backgroundSize: 'cover',
// };
class Landing extends Component {
  componentDidMount() {
    const token = localStorage.getItem('id');
    if (token) {
      this.props.autoLogin(token, this.props.history);
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="landing-container">
          {/* <img src={landPic} style={styles} alt="SideLogo" className="landing-image" /> */}
          {/* <img src={givme} className="landing-logo" alt="logo" /> */}
          <div className="landing-logo">
            {/* <p className="landing-title">
              giveMe
              <span style={{ color: '#22CFB1' }}>.</span>
              <h1 className="landing-slogan">myMoney</h1>
            </p> */}
            <img src={logo} alt="logo" className="landing-logo_pic" />
            <div className="landing-buttons">
              <Link to="/signin">
                <button className="landing-signin">Sign In</button>
              </Link>
              <Link to="/signup">
                <button className="landing-signup">Sign up</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { autoLogin },
)(Landing);
