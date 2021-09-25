import styled from "styled-components";

// STYLES FOR SIGNIN & SIGNUP PAGE

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #bfd4ea;
`;

export const Header = styled.h1`
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  margin: 10%;
  background-color: lightgray;
  padding: 13px;
  border: 1px solid black;
`;

export const RegisterForm = styled.form`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
`;

export const FormItem = styled.div`
  min-width: 250px;
  padding: 5% 0;
`;

export const BillingContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
