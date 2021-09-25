import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 57%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Body = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
`;

const Image = styled.div`
  height: 100%;
  width: 40%;
  background-color: #c7c7c7;
  border-radius: 8px;
`;

const QuoteBox = styled.div`
  width: 10%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;
const QuoteBox2 = styled(QuoteBox)`
  justify-content: flex-end;
`;

const Quote = styled.img`
  height: 40px;
`;

const Quote2 = styled(Quote)`
  transform: rotate(180deg);
`;

const Text = styled.div`
  width: 80%;
  box-sizing: border-box;
  height: 100%;
  font-family: "Montserrat", sans-serif;
  font-size: 23px;
  line-height: 1.4;
  padding: 0px 20px;
  margin-top: 20px;
`;

const Author = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const AuthorName = styled.div`
  height: 20%;
  margin: 0px 20px 20px 0px;
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  font-weight: bold;
`;

function QuoteContainer() {
  return (
    <Container>
      <Body>
        <QuoteBox>
          <Quote src="https://static.thenounproject.com/png/433486-200.png" />
        </QuoteBox>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna
          elit, aliquam eget ornare vitae, scelerisque quis dui. Curabitur
          rhoncus urna ut bibendum viverra.
        </Text>
        <QuoteBox2>
          <Quote2 src="https://static.thenounproject.com/png/433486-200.png" />
        </QuoteBox2>
      </Body>
      <Author>
        <AuthorName>- Name person</AuthorName>
      </Author>
    </Container>
  );
}

export default QuoteContainer;
