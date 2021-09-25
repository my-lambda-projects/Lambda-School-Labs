import React from "react";
import styled, { css } from "styled-components";
import device from "../../devices";

const Card = ({ gangster }) => {
  return (
    <Container>
      <Picture src={gangster.picture} />
      <Content>
        <QuoteContainer>
          <QuoteMark src="https://static.thenounproject.com/png/433486-200.png" />
          <Quote>{gangster.quote}</Quote>
          <QuoteMark
            flipped
            src="https://static.thenounproject.com/png/433486-200.png"
          />
        </QuoteContainer>
        <Credit>
          <p>- {gangster.name},</p>
          <p>{gangster.role}</p>
        </Credit>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 0 100px;

  @media ${device.desktop} {
    width: 80%;
    margin: 0;
  }

  @media ${device.mobile} {
    flex-direction: column;
    padding: 0;
    margin: 0 auto;
    width: 90%;
  }
`;

const Picture = styled.img`
  height: 100%;

  @media ${device.mobile} {
    height: 157px;
    width: 122px;
    display: inline;
    // margin: 0 auto;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 400px;

  @media ${device.mobile} {
    order: -1;
    width: 100%;
  }
`;

const QuoteContainer = styled.div`
  display: flex;
  height: 90%;
  padding: 20px 0 20px 20px;

  @media ${device.mobile} {
    flex-direction: column;
    padding: 0;
    width: 100%;
  }
`;

const QuoteMark = styled.img`
  height: 35px;
  width: 35px;
  opacity: 0.2;

  ${props =>
    props.flipped &&
    css`
      transform: rotate(180deg);
      align-self: flex-end;
    `}
`;

const Quote = styled.p`
  margin: 0;
  font-size: 1.25rem;
  align-self: center;
  padding: 0 20px;
  line-height: 27px;
  font-weight: 200;

  @media ${device.mobile} {
    padding: 0;
    width: 90%;
  }
`;

const Credit = styled.div`
  text-align: right;

  p {
    margin: 0;
    font-size: 0.8rem;
  }
`;

export default Card;
