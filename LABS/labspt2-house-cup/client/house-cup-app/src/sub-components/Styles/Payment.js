import styled from 'styled-components';


const Payment = styled.div`
    max-width:35%;
    margin: 56px auto;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    align-items:center;
    padding:50px;
    max-height:375px;
    background-color: rgb(7, 101, 112);
    color:white;
    text-shadow: 1px 2px 2px rgba(0,0,0,.3);
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    h1 {
      text-align:center;
    }
    span {
      font-size:16px;
      text-align:center;
    }
        @media (max-width:800px) {
         flex-direction:column;
         max-width:90%;
         height: 150px;
         padding:40px;

                
      }
`;

export default Payment;