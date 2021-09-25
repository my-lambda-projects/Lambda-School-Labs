import React from "react";
import styled from "styled-components";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import device from "../../devices";
import {setDemo} from "../../store/actions";

const Container = styled.div`
  width: 50%;
  height: 38%;
  position: relative;
  bottom: 40px;
  left: 50px;
  display: flex;
  flex-direction: column;
  color: white;

  @media ${device.desktop} {
    height: 35%;
  }

  @media ${device.mobile} {
    width: 90%;
    height: 35vh;
    margin: 5% auto 0 auto;
    bottom: 0;
    left: 0;
  }
`;

const H1 = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 40px;
  line-height: 1.4;
  font-weight: 500;

  @media ${device.mobile} {
    width: 60%;
  }
`;

const Text = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 35px;
  line-height: 1;
  font-weight: 300;
`;

const ButtonDiv = styled.div`
  width: 50%;
  height: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;

  @media ${device.desktop} {
    width: 40%;
  }

  @media ${device.mobile} {
    flex-direction: column;
    width: 100%;
    line-height: 1.5rem;
  }
`;

const Button = styled.button`
  background: none;
  border-radius: 5px;
  color: white;
  border: solid white 2px;
  font-family: "Varela Round", sans-serif;
  font-size: 18px;
  line-height: 1.4;
  width: 45%;
  height: 50px;
  font-family: "Montserrat", sans-serif;

  @media ${device.mobile} {
    width: 100%;
    margin: 2% 0;
    height: 55px;
  }
`;

const Button2 = styled(Button)`
  background-color: #ff5a5f;
  color: white;
  font-weight: bold;
  border: solid #ff5a5f 2px;

  @media ${device.mobile} {
    order: -1;
  }
`;

const Button2Text = styled.a`
  text-decoration: none;
  color: white;
`;

function Header(props) {

  const initDemo = () => {
    props.setDemo(true)
    props.history.push('/demo-search')
  }

  return (
    <Container>
      <H1>We value what you value.</H1>
      <Text>
        Stop undervaluing your rentals and start making the profit you deserve.
      </Text>
      <ButtonDiv>

        <Button onClick={initDemo}>Demo</Button>

        <Button2>
          <Button2Text href="https://dev-cz8-jv29.auth0.com/login?state=g6Fo2SBFSzVDam12dWtiZlZXa3VwZkQzZWZnYi1yVDNKZVRjdKN0aWTZIEoxa1hVNS03d3VlWHRKSjNjaHpGYVBMOFhlUjl1TjIwo2NpZNkgZmtBQmFFcjI4ZVo3bXJhNkRETnMzYUZCYldkcXJNUlc&client=fkABaEr28eZ7mra6DDNs3aFBbWdqrMRW&protocol=oauth2&redirect_uri=http%3A%2F%2Flocalhost%3A3000&audience=https%3A%2F%2Fairbnbupa&scope=openid%20profile%20email&response_type=code&response_mode=query&nonce=JNa86aT0xlDErdNmkH_A.onQC5pQvwEPR5YdERyjt1I&code_challenge=&code_challenge_method=S256&auth0Client=eyJuYW1lIjoiYXV0aDAtc3BhLWpzIiwidmVyc2lvbiI6IjEuMi4zIn0%3D">
            Join now
          </Button2Text>
        </Button2>

      </ButtonDiv>
    </Container>
  );
}


const mapStateToProps = (state) => {
  return {
      
  }
}

export default connect(mapStateToProps, { setDemo })(withRouter(Header));