import styled from "styled-components";


export const StyledCard = styled.div`
    width: 500px;
    background: #68659e;
    display: flex;
    flex-direction: column;
    overflow: auto;
    h2 {
      font-family: "Merriweather", sans-serif;
      font-size: 22px;
      color: white;
      margin: 30px 0 10px;
      line-height:1.5;
    }
    p{
      font-size:18px;
      color:white;
      margin:15px 25px;;
      line-height:1.5;
      text-align:left;
    }
    .button-box {
      width: 400px;
      margin: 0 auto;
      display: flex;
      justify-content:${ props=> props.spaceBetween ?'space-between':'center'};

      a {
        margin: 10px 0px 20px 10px;
        color: white;
        background: #68659e;
        border: 2px solid #ffffff;
       padding: 0 10px;
        height: 25px;
        text-decoration: none;
        :hover {
          border-color: #3985ac;
          color: #3985ac;
          cursor: pointer;
        }
      }
      button {
        margin: 10px 0px 20px 10px;
        color: white;
        background: #68659e;
        border: 2px solid #ffffff;
        min-width: 100px;
        height: 25px;

        :hover {
          border-color: #3985ac;
          color: #3985ac;
          cursor: pointer;
        }
      }
    }
  
`

export const StyledAlertWrapper = styled.div`
  height: 100%;
  z-index: 3001;
  width: 100vw;
  background: #00000080;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: scroll;

  .alert {
    width: 500px;
    background: #68659e;
    display: flex;
    flex-direction: column;
    overflow: auto;
    h2 {
      font-family: "Merriweather", sans-serif;
      font-size: 22px;
      color: white;
      margin: 30px 0 10px;
      line-height:1.5;
    }
    p{
      font-size:18px;
      color:white;
      margin:15px 25px;;
      line-height:1.5;
      text-align:left;
    }
    .button-box {
      width: 400px;
      margin: 0 auto;
      display: flex;
      justify-content:${ props=> props.spaceBetween ?'space-between':'center'};

      a {
        margin: 10px 0px 20px 10px;
        color: white;
        background: #68659e;
        border: 2px solid #ffffff;
       padding: 0 10px;
        height: 25px;
        text-decoration: none;
        :hover {
          border-color: #3985ac;
          color: #3985ac;
          cursor: pointer;
        }
      }
      button {
        margin: 10px 0px 20px 10px;
        color: white;
        background: #68659e;
        border: 2px solid #ffffff;
        min-width: 100px;
        height: 25px;

        :hover {
          border-color: #3985ac;
          color: #3985ac;
          cursor: pointer;
        }
      }
    }
  }
`;

export const StyledFormWrapper = styled.div`
  height: 100%;
  z-index: 300;
  width: 100vw;
  background: #00000080;
  position: fixed;
  top: 0;
  left: 0;
  display: ${props => (props.hide ? "none" : "flex")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    max-width: 500px;
    background: #68659e;
    display: flex;
    flex-direction: column;

    h2 {
      font-family: "Merriweather", sans-serif;
      font-size: 32px;
      color: white;
      margin: 90px;
    }
    input {
      cursor: text;
      width: 400px;
      margin: 10px auto;
      padding: 0 20px;
      height: 35px;
      color: white;
      ::placeholder {
        color: whitesmoke;
        opacity: 0.6;
      }
      border: 1px solid white;
      background-color: #68659e;
    }
    .participants-input {
      background-color: #68659e;
      width: 420px;
      margin: 10px auto;
      svg {
        color: white;
      }
      .css-xwjg1b,
      .css-12jo7m5 {
        background-color: inherit;
        color: inherit;
        margin: 0;
      }

      .css-1hwfws3 {
        /* event type location dropdown selected */

        max-width: 500px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: nowrap;
        cursor: text;
        .css-1g6gooi {
          color: white;
        }
      }
      .css-vj8t7z,
      .css-bl6clz,
      .css-2o5izw {
        /* event type location dropdown */

        border-style: inherit;
        background-color: inherit;
        width: 100%;
        height: 35px;
        color: white;
        padding: 0 20px;
        .css-xp4uvy {
          color: inherit;
        }
        .css-1492t68 {
          color: whitesmoke;
          opacity: 0.6;
        }
      }
    }
    .switchbox {
      width: 360px;
      margin: 8px auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: white;
    }
    .popper-end {
      .react-datepicker__month-container {
        display: none;
      }
      button {
        display: none;
      }
    }
    .button-box {
      width: 400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      button {
        margin: 10px 0px 20px 10px;
        color: white;
        background: #68659e;
        border: 2px solid #ffffff;
        min-width: 100px;
        height: 25px;
        margin-left: 5px;

        :hover {
          border-color: #3985ac;
          color: #3985ac;
          cursor: pointer;
        }
      }
    }
    svg {
      cursor: pointer;
    }
  }
`;

export const StyledFamilyForm = styled.form`
  max-width: 500px;
  margin: 0 auto;
  background: #68659e;
  display: flex;
  flex-direction: column;
  h2 {
    font-family: "Merriweather", sans-serif;
    font-size: 32px;
    color: white;
    margin: 30px;
  }
  input {
    background-color: #68659e;
    cursor: text;
    width: 400px;
    margin: 10px ;
    padding: 0 20px;
    height: 35px;
    color: white;
    border-style: none;
    border: 1px solid white;
    ::placeholder {
      color: whitesmoke;
      opacity: 0.6;
    }
    @media (max-width:460px){
      width:300px;
    }
  }
  .button-box {
    width: 400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    @media (max-width:460px){
      width:300px;
    }
    button {
      margin: 10px 0px 20px 10px;
      color: white;
      background: #68659e;
      border: 2px solid #ffffff;
      min-width: 100px;
      height: 25px;
      margin-left: 5px;

      :hover {
        border-color: #3985ac;
        color: #3985ac;
        cursor: pointer;
      }
    }
  }
`;
