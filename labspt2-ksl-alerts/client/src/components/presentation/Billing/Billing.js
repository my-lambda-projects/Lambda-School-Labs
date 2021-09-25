import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import styled from "styled-components";
// import {StripeProvider, Elements} from 'react-stripe-elements';
export default class Billing extends Component {

    render(){
        return (
            <Container>
                <div></div>
                <h1>Billing</h1>
                <h2>Payment Info</h2>
                <Wrapper>
                <h3>Enter Payment Details</h3>                
                <div>
                <input type="text" placeholder="CC#"/>
                </div>
                <div>
                <input type="text" placeholder="EXP"/>
                </div>
                <div>
                <input type="text" placeholder="CVV"/>
                </div>
                </Wrapper>
                <h2>Subscription</h2>
                <div class="ui checkbox">
                    <input type="checkbox" name="example"/>
                    <label>1 Month Subscription - $20</label>
                    <label>1 Client - $1.99</label>
                </div>
            <div>
            <Button class="ui button active">Buy Now</Button>
            </div>
            </Container>
            //  <StripeProvider apiKey="pk_test_LY1SFml6J5FYX6AjIV0ij18g00xq6NEpg2">
            //     <Elements>
            //     <BillingForm />
            //     </Elements>
            // </StripeProvider>


            

       
            
        )
    }
    
}

const Container = styled.section`
margin-left: 50px;
`;

const Wrapper = styled.section`
border: 1px solid black;
width: 250px;
text-align: center;
padding: 25px;
margin-bottom 25px;
`;

const Button = styled.button`
margin-top: 25px;
height: 100px;
width: 250px;
font-size: 35px;
`;