import styled from 'styled-components';

export const FormWrap = styled.form`
  border: 0px transparant;
  border-radius: 3px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  transition: all 200ms ease;
  background-color: #E0EBF0;
  margin: 30px 10px 20px;
`

export const FormWrap2 = styled.form`
  border: 0px transparant;
  border-radius: 3px;
  font-size: 12px;
  transition: all 200ms ease;
  background-color: #E0EBF0;
  display: grid;
  text-align: right;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
  padding: 30px 0 30px 60px;
  margin: 30px auto 20px;
`

export const RowFlex = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px;
`

export const RowFlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`

export const Column = styled.div`
  width: 100%;
  text-align: left;
  padding: 5px;
`

export const FormSet = styled.div`
 border: 1px solid transparent; 
 margin: 10px 5px 0px 5px;
 background-color: #E0EBF0;
 padding: 0 3px 0 20px;
`

export const FormSet2 = styled.div`
  border:  1px solid transparent;
  margin: 20px;
  background-color: #d1dfe6;
  padding: 20px;
  width: 90%;
`

export const Div = styled.div`
  display: grid;
  text-align: left;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 15px;
  margin: 10px;
`

export const Div2 = styled.div`
  display: grid;
  text-align: left;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 15px;
  margin: 10px;
`

export const Div3 = styled.div`
  display: flex;
`
export const Div4 = styled.div`
  display: grid;
  text-align: left;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 15px;
  margin: 10px;
  padding: 30px;
`

export const Div5 = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
`

export const HR = styled.hr`
  border: .25px solid #26ABBD;
`

export const Input = styled.input`
  outline: none;
  border-radius: 3px;
  border:  ${props => props.border ||'1px inset transparent'};
  background: white;
  width: 100%;
  padding: 6px;
  margin: 5px;
`
export const Textarea = styled.textarea`
  outline: none;
  border-radius: 3px;
  border: 1px solid transparent;
  background: white;
  width: 97%;
  padding: 10px;
  margin: 5px auto;
`

export const Select = styled.select`
  outline: none;
  border-radius: 3px;
  border: 1px solid transparent;
  background: white;
  width: 100%;
  padding: 6px;

`

export const EditName= styled.input`
  outline: none;
  border-radius: 3px;
  border: 1px solid #EEEEEE;
  background: white;
  width: 100%;
  padding: 10px;
  margin: 6px;
`

export const DisabledInput = styled.input`
  outline: none;
  border-radius: 3px;
  border: 1px solid transparent;
  background: Gainsboro;
  width: 100%;
  padding: 6px;
  font-family: Arial, FontAwesome;
`

export const TextDiv = styled.p`
  font-size: 14px;
  
`

export const FlexDiv = styled.p`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;

`

export const Label = styled.h5`
 margin: 2px;
`

export const DropdownLabel = styled.h5`
 margin: 2px;
 color: grey;
 font-weight: lighter;
`

export const CalenderLabel = styled.h5`
 margin: 2px;
 color: grey;
 font-weight: lighter;
`

export const RightTopDiv = styled.div `
 display: inline-block;
 width: 50%;
 margin-bottom: 0px;
`

export const LeftTopDiv = styled.div `
display: inline-block;
width: 50%;
margin-bottom: 0px;
`

export const TopSection = styled.div `
 display: flex;
 align-items: center;
 width: 100%;
 margin-bottom: 15px;
`

export const CardStyle = styled.div`
  outline: none;
  border-radius: 3px;
  border: 1px solid transparent;
  background: white;
  width: 100%;
  height: 26px;
`

export const Button = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 3px;
  margin: 10px 5px 10px 10px;
  background-color: #269FB0;
  text-align: center;
  color: #ffffff;
  border: none;
  cursor: pointer;
`

export const RedButton = styled.button`
  background-color: #C73642;
  width: 120px;
  height: 40px;
  border-radius: 3px;
  margin: 10px 5px 10px 10px;
  text-align: center;
  border: none;
  cursor: pointer;
`

export const DropdownContent =  styled.div`
  display: block;
  position: absolute;
  width: 40px;
  background: red;
  z-index: 1;
`

export const DashboardWrap = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0;
  overflow: hidden;
`

export const TabsWrap = styled.div`
  height: 100%;
  width: 11rem;
  min-width: 11rem;
  flex: 1 1 auto;
  background: #15ADA4;
`

export const DisplayWrap = styled.div`
  width: 100%;
  /* max-width: 100%; */
  /* display: flex; */
  padding: 3.5rem 2rem 0 2.5rem;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}
`
export const TabWrap = styled.div``

export const TabsWrapColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 145px;
`

//student form and info tab styles
export const StudentFormWrap = styled.form`
border: 0px transparant;
border-radius: 3px;
font-size: 12px;
display: flex;
flex-direction: column;
transition: all 200ms ease;
`

export const label = styled.label`
color: #89878a;
`

export const StudentData = styled.div`
color: black;
font-weight: 450;
`

export const StudentInput = styled.input`
outline: none;
border-radius: 3px;
background: white;
width: 100%;
height: 31px;
font-size: 14px;
font-weight: 400;
margin-left: -2px;
`

export const ButtonDiv = styled.div`
align-self: flex-end;
margin-right: 15px;
`

export const CancelButton = styled.button`
background-color: #C73642; 
color:#FFFFFF; 
width: 80px;
height: 40px;
border-radius: 3px;
margin: 10px 5px 10px 10px;
text-align: center;
border: none;
cursor: pointer;
`

export const SaveButton = styled.button`
width: 80px;
height: 40px;
border-radius: 3px;
margin: 10px 5px 10px 10px;
text-align: center;
color: #FFFFFF; 
background-color: #26ABBD;
border: none;
cursor: pointer;
`

export const DeleteButton = styled.button`
width: 80px;
height: 40px;
border-radius: 3px;
margin: 10px 5px 10px 10px;
text-align: center;
color: #FFFFFF; 
background-color: #EC404E;
border: none;
cursor: pointer;
`

export const AddButton = styled.button`
width: 120px;
height: 40px;
border-radius: 3px;
margin: 10px 5px 10px 10px;
text-align: center;
color: #FFFFFF; 
background-color: #26ABBD;
border: none;
cursor: pointer;
`

export const EditButton = styled.button`
width: 120 px;
height: 40px;
border-radius: 3px;
margin: 10px 5px 10px 10px;
text-align: center;
color: #FFFFFF;
background-color: #26ABBD;
border: none;
cursor: pointer;
`