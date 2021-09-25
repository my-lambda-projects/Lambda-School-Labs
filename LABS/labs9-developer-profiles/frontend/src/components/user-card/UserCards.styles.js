import styled from "styled-components";
import { centerFlex } from "../../global-styles/Mixins";

export const UserCardsDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding-left: 300px; 
    padding-top: 80px;
    border-left: solid 0.5px #dbdee2;

    @media (max-width: 1440px) {
      ${centerFlex('column')}; 
    }
    @media (max-width: 839px) {
    margin: 20px auto;
    padding: 75px 20px 0;
    width: 100%;
    @media (max-width: 480px) {
      flex-wrap: nowrap;
      padding: 0;
      padding-top: 50px;
    }
  }
`;

export const LoaderContainer = styled.div`
  padding-top: 130px;
  margin-left: 300px;
  h1 {
    font-size: 5rem;
  }
  @media (max-width: 839px) {
    margin: auto;
    @media (max-width: 480px) {
    }
  }
  .loading {
    color: var(--accent-color);
  }
`;
