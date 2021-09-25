import React from 'react';
import styled from 'styled-components';
import github from '../assets/github.svg';

const FooterStyles = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;
  background: #142e41;
  color: white;

  span {
    // padding-right: 300px;
  }
  a {
    color: white;
    text-decoration: none;
    padding: 10px;
  }

  .meetTheTeam {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .github {
    filter: invert(1) sepia(0) saturate(0) hue-rotate(175deg);
    margin-right: 0.6rem;
  }
`;

function Footer() {
  return (
    <FooterStyles>
      <span>© 2019 Bonafind</span>
      <div className='meetTheTeam'>
        <img className='github' src={github} alt='' />
        <a href='https://github.com/Lambda-School-Labs/labs9-business-reviews'>
          Meet the Team
        </a>
      </div>
    </FooterStyles>
  );
}

export default Footer;
