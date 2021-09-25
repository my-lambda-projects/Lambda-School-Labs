import styled from 'styled-components';
import { centerFlex } from '../../../global-styles/Mixins';


export const MainFormContainer = styled.main`
  width: calc(100% - 300px);
  margin-left: 300px;
  padding-top: 130px;
  @media (max-width: 1400px) {
    width: calc(100% - 80px);
    margin-left: 80px;
  }
  @media (max-width: 650px) {
    width: 100%;
    padding-top: 200px;
    margin-left: 0px;
  }
  @media (max-width: 600px) {
    padding-top: 300px;
  }
  @media (max-width: 400px) {
    padding-top: 350px;
  }
  .main-heading {
    font-size: 5rem;
    color: rgb(42,42,42);
    margin-bottom: 50px;
    text-align: center;
    @media (max-width: 1150px) {
      text-align: left;
      padding-left: 20px;
      font-size: 4rem;
    }
    @media (max-width: 600px) {
      font-size: 3.5rem;
    }
    @media (max-width: 450px) {
      padding-left: 10px;
    }
    @media (max-width: 400px) {
      font-size: 3.2rem;
      padding-left: 5px;
    }
  }
  .container {
    padding-left: 50px;
    padding-right: 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    @media (max-width: 1550px) {
      justify-content: flex-start;
    }
    @media (max-width: 1150px) {
      padding-left: 20px;
      padding-right: 20px;
    }
    @media (max-width: 450px) {
    padding-left: 10px;
    padding-right: 10px;
    }
    @media (max-width: 400px) {
      padding-left: 5px;
      padding-right: 5px;
    }
    section {
      width: 45%;
      @media (max-width: 1100px) {
        width: 80%;
      }
      @media (max-width: 1000px) {
        width: 90%;
      }
      @media (max-width: 850px) {
        width: 100%;
      }
    }
  }
`;

export const FormSection = styled.section`
  
  .text-input-container,
  .select-input-container {
    margin-bottom: 30px;
  }

  .text-input-container {
    /****SKILLS BUTTONS****/
    .skills-btn {
      width: 100px;
      height: 40px;
      color: white;
      padding: 8px;
      margin-top: 10px;
      font-size: 1.4rem;
      letter-spacing: 1.5px;
      background-color: var(--accent-color);
      border: none;
      border-radius: 100px;
      ${centerFlex()};
      &:hover {
        color: var(--lp_btn_color);
        transform: scale(1.1);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        cursor: pointer;
      }
      &:active {
        transform: scale(1);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      }
      .success {
        color: var(--lp_btn_color);
      }
    }
  }

  .skillbank {
    display: flex;
    flex-wrap: wrap;
  }
  .skill {
    cursor: pointer;
    margin: 5px 5px 5px 0;
    padding: 0 5px;
    border: solid grey 1px;
    border-radius: 5px;
  }
  .text-input,
  #userAreaOfWork,
  #usercurrentLocation,
  #userPlacesInterested {
    width: 85%;
    @media (max-width: 750px) {
      width: 95%;
    }
    @media (max-width: 650px) {
      width: 100%;
    }

  }
  .showing-places {
    width: 83%;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-bottom: solid 1px lightgrey;
    max-height: 200px;
    overflow-y: scroll;
    @media (max-width: 750px) {
      width: 93%;
    }
    @media (max-width: 650px) {
      width: 97%;
    }
    .delete {
      color: var(--accent-color);
      &:hover {
        cursor: pointer;
      }
    }
    .places {
      margin: 15px 20px;
      padding: 5px;
      font-size: 1.6rem;
      font-weight: bold;
      &:hover {
        background-color: lightgrey;
      }
    }
    ::-webkit-scrollbar {
      width: 3px;
      border-bottom: none;
    }
    ::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: lightgrey;
      width: 50%;
    }
    ::-webkit-scrollbar-thumb {
      background: var(--lp_btn_color);
      border-radius: 10px;
      width: 50%;
    }
  }
`;

export const CardPreviewSection = styled.section`
  @media (max-width: 1100px) {
    display: none;
  }
`;


export const MobileCardPreviewSection = styled.section`
  display: none;
  @media (max-width: 1100px) {
    display: block;
    padding: 20px;
    width: 99%;
    ${centerFlex('column')};
  }
  @media (max-width: 450px) {
    padding: 20px;
    margin-top: 50px;
  }
`;

export const Validator = styled.div`
  width: 85%;
  border: solid;
  border-color: ${props => (props.validated ? "rgba(0,0,0,.33)" : "red")};
  border-width: ${props => (props.validated ? "1px" : "2px")};
  border-radius: 4px;
  @media (max-width: 750px) {
    width: 95%;
  }
  @media (max-width: 650px) {
    width: 100%;
  }
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: baseline;
  .success {
    color: var(--accent-color);
  }
  label {
    color: rgba(42,42,42,.8);
    font-size: 1.7rem;
    margin-bottom: 8px;
    font-weight: bold;
    line-height: 23px;
    letter-spacing: 1px;
    margin-right: 5px;
  }
`;

export const ImageContainer = styled.div`
  margin-bottom: 30px;
  .img-input-sub-container {
    width: 85%;
    border: solid 1px rgba(0,0,0,.33);
    border-radius: 4px;
    @media (max-width: 750px) {
      width: 95%;
    }
    @media (max-width: 650px) {
      width: 100%;
    }
    .img-input-overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      ${centerFlex()};
    }
    .success {
      color: var(--accent-color);
    }
    .upload {
      color: var(--lp_btn_color);
    }
    input[type=file] {
      padding: 11px 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .validate {
    width: 100%;
    border: none;
  }
`;


export const ButtonContainer = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 45px;
  margin-bottom: 50px;
  @media (max-width: 500px) {
    width: 95%;
  }
  @media (max-width: 450px) {
    margin-top: 20px;
    margin-bottom: 20px;
    flex-direction: column;
  }

  .success {
    color: var(--lp_btn_color);
  }
  .loading {
    color: var(--lp_btn_color);
  }

  /****ALL OTHER BUTTONS****/
  button {
    width: 330px;
    height: 80px;
    color: white;
    padding: 20px 30px;
    font-size: 2rem;
    letter-spacing: 1.5px;
    background-color: var(--accent-color);
    border: none;
    border-radius: 100px;
    ${centerFlex()};
    margin-left: 25px;
    margin-right: 25px;
    @media (max-width: 450px) {
      margin-left: 0;
      margin-right: 0;
      margin-bottom: 25px;
      width: 245px;
      height: 50;
      padding: 5px 10px;
    }
    &:hover {
      color: var(--lp_btn_color);
      transform: scale(1.1);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      cursor: pointer;
    }
    &:active {
      transform: scale(1);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }
  }

  a {
    width: 230px;
    height: 55px;
    display: block;
    margin: auto;
    text-decoration: none;
    color: white;
    padding: 20px 30px;
    font-size: 2rem;
    letter-spacing: 1.5px;
    background-color: var(--lp_btn_color);
    border: none;
    border-radius: 100px;
    @media (max-width: 450px) {
      margin-bottom: 25px;
      width: 220px;
      height: 40;
      padding: 5px 10px;
    }
    ${centerFlex()};
    &:hover {
      color:var(--accent-color);
      transform: scale(1.1);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      cursor: pointer;
    }
    &:active {
      transform: scale(1);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    }
  }
`;
