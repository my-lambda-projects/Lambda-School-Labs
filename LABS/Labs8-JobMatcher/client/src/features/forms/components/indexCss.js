import styled from "styled-components";
import { Nav, Row, Button } from "react-bootstrap";
export const SaveButton = styled(Button)`
	margin-top 20px;
`;
export const StyledRow = styled(Row)`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  width: 100%;
`;
export const StyledNav = styled(Nav)`
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  li {
    height: 30px;
  }
`;

export const FormDiv = styled.div`
  width: 100%;
  min-height: 60vh;
  margin: 60px auto;
  font-size: 14px;
  padding: 50px;
  border: 1px solid #80808047;
  background-color: #ffffff;
  z-index: 2000;
  color: #0079ff;
`;
export const Title = styled.h1`
  font-size: 20px;
  color: #000000 !important;
`;
export const FormGroup = styled.div`
  width: 100%;
  padding: 10px 0;
  position: relative;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 63px;
  text-align: start;
`;

export const StyledInput = styled.input`
  display: block;
  margin: 10px 0;
  width: 100%;
  box-sizing: border-box;
  height: 50px;
  padding: 10px 7.5px;
  font-size: 14px;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  border: none;
  border-bottom: 1px solid #ced4da;
  border-radius: 2.5px;
  overflow: visible;
  transition: border-color 0.15s ease-in-out, 0.15s ease-in-out;

  &:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);

    &:-webkit-input-placeholder,
    &::-webkit-input-placeholder {
      transform: translateY(-200%);
      text-transform: capitalize;
      opacity: 0;
      transition: all 0.3s;
    }
  }
`;

export const StyledLabel = styled.label`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 20px;
  color: transparent;
  color: #495057;
  transition: all 0.4s;
  opacity: 0;
  ${StyledInput}:focus ~ & {
    opacity: 1;
    top: 0px;
  }
`;

// justify-content: space-between;
//     margin-top: 0;
//     margin-bottom: 1rem;
//     display: flex;
//     width: 100%;
