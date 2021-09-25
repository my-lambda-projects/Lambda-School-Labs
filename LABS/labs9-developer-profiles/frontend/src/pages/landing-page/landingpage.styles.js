import styled from "styled-components";
import bg_img from "./img/agreement.jpg";
export const LandingPageDiv = styled.div``;

export const Pagewrap = styled.div`
  background: url(${bg_img}) no-repeat center center fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  position: relative;
  text-align: center;
  margin: auto;
`;

export const Moreinfo = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
  margin: 50px auto;
  padding-top: 50px;
  a {
    text-decoration: none;
  }
  img {
    width: 55%;
  }
  img.dev {
      width: 45%
  }

  @media all and (max-width: 1000px) {
    padding-left: 50px;
    padding-right: 50px;
  }

  @media all and (max-width: 580px) {
    padding: 2em;
    margin-top: 50px;
    img {
      width: 100%;
      justify-content: center;
      align-items: center;
    }
    img.dev {
      width: 100%;
    }
  }
`;

export const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  @media all and (max-width: 580px) {
    width: 100%;
  }
  h2 {
    font-size: 48px;
    line-height: 75px;
    font-weight: bolder;
  }
`;

export const RecruiterText = styled.div`
  color: var(--lp_btn_color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* text-align: left; */
  @media all and (max-width: 580px) {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
  }
`;
export const DevText = styled.div`
  color: var(--lp_btn_color);
  display: flex;
  align-items: center;
  flex-flow: row-reverse;
  justify-content: space-between;
  margin-top: 50px;
  /* text-align: right; */
  @media all and (max-width: 839px) {
  }

  @media all and (max-width: 580px) {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    padding-top: 50px;
  }
`;
export const Btn = styled.div`
  color: white;
  border-radius: 100px;
  width: 200px;
  margin-top: 20px;
  text-align: center;
  font-weight: bold;
  font-size: 2rem;
  text-decoration: none;
  padding: 15px 20px;
  background-color: var(--lp_btn_color);
  transition: transform 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55),
    box-shadow 500ms linear;
  background-size: contain;
  background-position: -200px center;
  background-repeat: no-repeat;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  &:hover {
    color: var(--accent-color);
    transform: scale(1.1);
    background-position: -60px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    cursor: pointer;
  }
  &:active {
    transform: scale(1);
    background-position: 500px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  @media all and (max-width: 580px) {
    width: 100%;
  }
`;
