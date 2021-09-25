import React from "react";

import device from "../../devices";
import styled from "styled-components";

function Footer() {
  const date = new Date();
  const currentYear = date.getFullYear()

  return (
    <Container>
      {/* Footer may change for release canvas 2 */}
      {/* <TopFooter>
        <TopLeft>
          <FooterP>Price My Airbnb</FooterP>
          <FooterP>
            PMA helps you manage your short-term rentals as professionally and
            efficiently as major hotels—from understanding performance to better
            nightly pricing.
          </FooterP>
        </TopLeft>
        <TopRight>
          <FooterP>COMPANY</FooterP>
          <FooterP>Who we are</FooterP>
          <FooterP>Mission</FooterP>
          <FooterP>Blog</FooterP>
        </TopRight>
        <TopRight>
          <FooterP>Terms</FooterP>
          <FooterP>Privacy</FooterP>
          <FooterP>Site Map</FooterP>
        </TopRight>
      </TopFooter> */}
      <BottomFooter>
        © {currentYear} Price My Airbnb, Inc. All rights reserved.
      </BottomFooter>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 10vh;
  background-color: #fff;
`;

const TopFooter = styled.div`
  width: 80%;
  height: auto;
  margin: auto;
  border-top: 1px solid #ededed;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: baseline;
`;

const TopLeft = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  color: #484848;
  margin: 3% 10% 3% 0;
`;

const TopRight = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  color: #484848;
`;

const FooterP = styled.p`
  margin: 0.5% 0;
  font-size: 18px;
  color: #484848;

  @media ${device.desktop} {
    font-size: 22px;
  }
`;

const BottomFooter = styled.div`
  width: 80%;
  height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: auto;
  font-size: 20px;
  font-weight: 600;
  color: #767676;
  border-top: 1px solid #ededed;

  @media ${device.mobile} {
    font-size: 14px;
  }
`;

export default Footer;
