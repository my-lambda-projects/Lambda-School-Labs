// Libraries
import React, {Component} from 'react';
import styled from 'styled-components';

// Components
import Checkout from '../Billing/Checkout';

// Stylings
const Payer = styled.div`
width: 200px;
height: 40px;
background-color: none;
display: flex;
justify-content: center;
border-radius: 4px;
font-size: 26px;
`
const Welcomer = styled.h1`
position: absolute;
color: #F56600;
width: 200px;
font-size: 36px;

@media (max-width: 400px) {
    font-size: 36px;
    width: 150px;
  }
`

const Checker = styled.div`
position: absolute;
margin-top: 200px;
@media (max-width: 1024px) {
    margin-top: 200px;
  }
  
@media (max-width: 400px) {
   margin-top: 300px;
  }
`
class Billing extends Component {
    
    render() {
       
        return (
        <Payer> 
               <Welcomer>Upgrade to a PREMIUM Randomizer Membership</Welcomer>
            <Checker>
            <Checkout
           name={'Stripe Component'}
           description={'Gimme $$$'}
           amount={1}
         />
         </Checker>
        </Payer>
        )
    }
}
export default Billing;