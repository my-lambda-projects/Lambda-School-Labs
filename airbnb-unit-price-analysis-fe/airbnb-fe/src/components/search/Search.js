import React from "react";
import styled from "styled-components";

import SearchBar from "./SearchBar";
import Message from "./Message";

const S = {};

S.Container = styled.div`
  width: 100%;
  height: 91vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 9vh;
  box-sizing: border-box;
`;

S.Message = styled.div`
  width: 42%;
  box-sizing: border-box;
  height: 15%;
  margin-top: 130px;
  font-family: "Montserrat", sans-serif;
  font-size: 27px;
  text-align: center;
`;

S.Image = styled.img``;

function Search() {
  return (
    <S.Container>
      <SearchBar />
      <S.Message>
        No listings yet. Add a listing by entering the URL above.
      </S.Message>
      <S.Image />
    </S.Container>
  );
}

export default Search;
