import React from "react";
import styled from "styled-components";
import ScrollableAnchor from "react-scrollable-anchor";

import device from "../../devices";
import Quad2 from "../../img/quad2.png";

function Quadrant2() {
  return (
    <ScrollableAnchor id={"mission"}>
      <Q2div>
        <SmallerDiv>
          <TwoImg src={Quad2} />
        </SmallerDiv>
        <BiggerDiv>
          <Half />
          <Half2>
            <H1>
              Pricing is tough.
              <br></br>Trust the experts.
            </H1>
            <Text>
              Our solution is the most advanced in the industry. We account for
              changes in demand nightly and ensure you’re never leaving money on
              the table. <br /> <br />
              We evaluate the competition, price your rentals effectively, and
              analyze local top properties in your market.
            </Text>
          </Half2>
        </BiggerDiv>
      </Q2div>
    </ScrollableAnchor>
  );
}

const Q2div = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #ecf9f8;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${device.mobile} {
    flex-direction: column;
    background-color: #056159;
    height: auto;
  }
`;

const QuadrantLimiter = styled.div`
  height: 100%;
  width: 80%;
`;

const SmallerDiv = styled.div`
  height: 80%;
  width: 40%;
  background-color: white;
  box-shadow: 5px;
  z-index: 2;
  position: relative;
  left: 10%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${device.mobile} {
    width: 100%;
    left: 0;
    height: 100%;
  }
`;

const TwoImg = styled.img`
  width: 80%;
  margin: auto;

  @media ${device.mobile} {
    width: 70%;
    margin: 5% 0;
  }
`;

const BiggerDiv = styled.div`
  height: 108%;
  width: 60%;
  background-color: #056159;
  z-index: 1;
  position: relative;
  right: 10%;
  display: flex;
  box-sizing: border-box;

  @media ${device.mobile} {
    width: 100%;
    right: 0;
  }
`;

const Half = styled.div`
  width: 45%;
  height: 100%;
  box-sizing: border-box;

  @media ${device.mobile} {
    display: none;
  }
`;

const Half2 = styled(Half)`
  width: 65%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;

  @media ${device.mobile} {
    display: flex;
    width: 100%;
    margin: 5% 2%;
    padding: 0 5%;
    align-items: center;
  }
`;

const H1 = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 26px;
  line-height: 1.2;
  margin-top: 30%;
  margin-bottom: 40px;
  color: white;

  @media ${device.desktop} {
    font-size: 32px;
    margin-top: 20%;
  }

  @media ${device.mobile} {
    font-size: 24px;
    margin: 5%;
    text-align: center;
    font-weight: 300;
  }
`;

const Text = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  font-weight: 300;
  line-height: 1.6;
  padding: 0px 100px 0px 0px;
  margin-bottom: 170px;
  width: 90%;
  color: white;

  @media ${device.desktop} {
    font-size: 26px;
    margin-bottom: 200px;
  }

  @media ${device.mobile} {
    font-size: 16px;
    width: 100%;
    padding: 0;
    margin: 5% 0;
    text-align: justify;
  }
`;

export default Quadrant2;

//======================================================

// import React from "react";
// import styled from 'styled-components';

// const Q2div = styled.div`
//     height: 77vh;
//     width: 100%;
//     background-color: #e8e8e8;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// `

//     const SmallerDiv = styled.div`
//         height: 75%;
//         width: 40%;
//         background-color: white;
//         box-shadow: 5px;
//         z-index: 2;
//         position: relative;
//         left: 10%

//     `
//     const BiggerDiv = styled.div`
//         height: 115%;
//         width: 60%;
//         background-color: #a6a6a6;
//         z-index: 1;
//         position: relative;
//         right: 10%;
//     `

// function Quadrant2() {
//   return (
//     <Q2div>
//         <SmallerDiv/>
//         <BiggerDiv/>
//     </Q2div>
//   );
// }

// export default Quadrant2;
