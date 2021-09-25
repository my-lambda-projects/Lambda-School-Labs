import styled from "styled-components";

export const RCardWrapper = styled.div`
   display: flex;
    flex-direction: column;
    justify-content: center;
    border: solid black;
    border-radius: 4%;
    font-size: 2rem;
    width: 300px;
    height: auto;
    margin: 10px;
`;

export const LabelWrapper = styled.div`
  padding-top: 1.5rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;

export const Button = styled.button`
  border-radius: 1%;
  height: 30px;
  width: 90%;
`;

export const Label = styled.label`
  font-weight: 900;
  font-size: 1rem;
  color: white;
`;

export const TitleLabel = styled.label`
  font-weight: 900;
  font-size: 2rem;
  color: white;
  position: relative;
  top: 15px;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  color: white;
`;

export const Select = styled.select`
  width: 80%;
  /* padding: 12px; */
  border-radius: 4px;
  resize: vertical;
`

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  resize: vertical;
`

export const IconContainer = styled.div`
 display: flex;
 align-items: flex-end;
 justify-content: center;
 height: 30%;
 align-self: flex-end;
`

export const ViewIconWrapper = styled.div`

`;

export const TrashIconWrapper = styled.div`

`;

export const TrashIcon = styled.img`
 width: 80%;
 height: auto;
 position: relative;
 left: 5px;
`
export const ViewIcon = styled.img`
 width: 15%;
 height: auto;
 position: relative;
 top: 6px;
 
`
export const RedoIcon = styled.img`
 width: 30%;
 height: auto;
 position: relative;
 top: 6px;
 left: 45px;
 /* padding-right: 8px; */
 padding-bottom: 5px;
`

export const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  left: 25px;
  /* resize: vertical;
  height: auto; */
`