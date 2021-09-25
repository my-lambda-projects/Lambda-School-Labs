import React from "react";
import { TweenMax, Power2, TimelineLite } from "gsap/TweenMax";
import styled, { keyframes } from "styled-components";
import { Button, Form } from "reactstrap";
import connect from "react-redux/es/connect/connect";
import { login } from "../../features/auth/store/action";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import LinkedIn from "../../features/auth/linkedIn/linkedIn";
const zoomIn = keyframes`
  0%{
    opacity: 0;
    transform: scale(0.9) translate(-50%, -50%);
  }
  100%{
    opacity: 1;
    transform: scale(1) translate(-50%, -50%); 
  }
`;
const expandWidth = keyframes`
  0%{
    opacity: 0;
    width: 0;
  }
  90%{
     opacity: 0;
    width: 0;
  }
  100%{
    opacity: 1;
    width: 80%;
  }
`;
const Menu = styled.div`
  width: 400px;
  // height: 450px;
  padding: 20px;
  margin: auto;
  z-index: 10;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 10px;
  border: 1px solid white;
  transform: translate(-50%, -50%);
  animation: ${zoomIn} .6s;
  
  border: 0;
  box-shadow: 0 1px 20px 0 rgba(0,0,0,.1);
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  color: black;
  input {
    display: block;
    font-size: 14px;
    margin: 10px auto;
    width: 80%;
    line-height: 1.42857;
    background-color: initial;
    background-clip: padding-box;
    border: 1px solid #cad1d7;
    box-shadow: none;
    padding: 10px 18px    
    border-color: #2b3553;
    border-radius: .4285rem;
    font-size: 12px;
    transition: color .3s ease-in-out,border-color .3s ease-in-out,background-color .3s ease-in-out;
    // opacity: ${props => (props.is_menuOpen ? "1" : "0")};
    // animation: ${expandWidth} 1s;
    // animation-delay: .4s;
  }
  label{
    font-size: .75rem;
    margin-bottom: 5px;
    display: inline-block;
    width: 70px;
    text-transform: capitalize;
    // opacity: ${props => (props.is_menuOpen ? "1" : "0")};
    // animation: ${expandWidth} 1s;
  }
  form{
    padding: 20px;
    border-radius: 10px;
  }
  .header{
    font-size: 18px;
    color: black;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
   }
  p{
    color: black;
  }
  .divisor{
    position: relative;
    &_1{
        border-top: 1px solid #DFDFDF;
        position: absolute;
        top: 10px;
        width: 34%;
        left: 0;
    }
    &_2{
        border-top: 1px solid #DFDFDF;
        position: absolute;
        top: 10px;
        width: 34%;
        right: 0;
    }
  }
  .form-group{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }
    @media (max-width: 450px) {
      margin: 10px auto;
      width: 91%;
    }
`;
class MenuLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      move: false,
      email: "",
      password: "",
      password2: ""
    };
  }

  componentWillEnter(cb) {
    this.gsapAnimeIn(cb);
  }

  componentWillLeave(cb) {
    this.gsapAnimeOut(cb);
  }
  onSubmitHandler = e => {
    e.preventDefault();
    console.log("onsubmit clicked");
    this.props.login({
      username: this.state.email,
      password: this.state.password
    });
  };
  onChangeHanlder = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  gsapAnimeIn = cb => {
    let el = document.getElementById("card");

    // var tl = new TweenMax();
    console.log(this);
    TweenMax.from(el, 2, {
      rotation: "-40deg",
      right: "100%",
      opacity: 1,
      onComplete: () => cb()
    });
  };
  gsapAnimeOut = cb => {
    let el = document.getElementById("card");
    TweenMax.to(el, 1, {
      left: "100%",
      rotation: "40deg",
      opacity: 1,
      onComplete: () => cb()
    });
  };

  render() {
    if (this.props.authenticatoin_succeed) return <Redirect to="/seek" />;
    return (
      <Menu is_menuOpen={this.props.is_menuOpen}>
        <div className="header">
          <p>Login with</p>
          <i
            className="tim-icons icon-simple-remove"
            onClick={this.props.onClick}
          />
        </div>
        <div className="menu_social_login">
          <LinkedIn actionType={"Login"} login={true} />
        </div>
        <div className="divisor">
          <span className="divisor_1" />
          or
          <span className="divisor_2" />
        </div>
        <Form onSubmit={this.onSubmitHandler}>
          <div className="form-group">
            <label htmlFor="email">email</label>
            <input
              type="text"
              value={this.state.email}
              onChange={this.onChangeHanlder}
              placeholder={"Username"}
              name={"email"}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={this.state.password}
              onChange={this.onChangeHanlder}
              placeholder={"password"}
              name={"password"}
            />
          </div>
          <Button color="info" id="login" size={"lg"}>
            Login
          </Button>
        </Form>
        <p>
          {" "}
          Looking to <Link to={"/auth/register"}>create an account?</Link>{" "}
        </p>
      </Menu>
    );
  }
}

const MapPropsToState = state => ({
  authenticatoin_succeed: state.user.authenticatoin_succeed
});
export default connect(
  MapPropsToState,
  { login }
)(MenuLogin);
